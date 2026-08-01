import type { IncomingMessage, ServerResponse } from 'http';
import { GoogleAuth } from 'google-auth-library';
import { createClient } from '@supabase/supabase-js';
import WebSocket from 'ws';

const CALENDAR_ID = 'hello.confess.team@gmail.com';

interface GCalEvent {
  id: string;
  status?: string;
  summary?: string;
  start?: { date?: string; dateTime?: string };
}

interface CalendarEventRow {
  gcal_event_id: string;
  date: string;
  title: string;
  location: string;
  event_type: string | null;
  type: 'past' | 'upcoming';
}

function todayIsoDate(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function extractDate(start: { date?: string; dateTime?: string }): string | null {
  if (start.date) return start.date; // all-day event, already YYYY-MM-DD
  if (start.dateTime) return start.dateTime.slice(0, 10);
  return null;
}

// Event titles follow the convention "Name — Venue"
function splitSummary(summary: string): { title: string; location: string } {
  const parts = summary.split('—').map((p) => p.trim());
  if (parts.length >= 2) {
    return { title: parts[0], location: parts.slice(1).join(' — ') };
  }
  return { title: summary.trim(), location: '' };
}

async function fetchCalendarEvents(): Promise<CalendarEventRow[]> {
  const keyJson = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!keyJson) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_KEY is not set');
  }

  const auth = new GoogleAuth({
    credentials: JSON.parse(keyJson),
    scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
  });
  const client = await auth.getClient();

  const today = todayIsoDate();
  const events: CalendarEventRow[] = [];
  let pageToken: string | undefined;

  do {
    const res = await client.request<{ items?: GCalEvent[]; nextPageToken?: string }>({
      url: `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events`,
      params: { singleEvents: true, maxResults: 250, pageToken },
    });

    for (const item of res.data.items ?? []) {
      if (item.status === 'cancelled') continue;
      const date = extractDate(item.start ?? {});
      if (!date) continue;

      const { title, location } = splitSummary(item.summary ?? 'Untitled Event');
      events.push({
        gcal_event_id: item.id,
        date,
        title,
        location,
        event_type: null,
        type: date < today ? 'past' : 'upcoming',
      });
    }

    pageToken = res.data.nextPageToken;
  } while (pageToken);

  return events;
}

function isAuthorized(req: IncomingMessage): boolean {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) return true; // no secret configured (e.g. local dev)
  return req.headers.authorization === `Bearer ${cronSecret}`;
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (!isAuthorized(req)) {
    res.statusCode = 401;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Unauthorized' }));
    return;
  }

  try {
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error('Supabase service credentials are not set');
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      realtime: { transport: WebSocket as unknown as typeof globalThis.WebSocket },
    });
    const events = await fetchCalendarEvents();

    if (events.length === 0) {
      throw new Error('Fetched zero events from Google Calendar; aborting to avoid wiping the table');
    }

    const { error: upsertError } = await supabase
      .from('calendar_events')
      .upsert(events, { onConflict: 'gcal_event_id' });
    if (upsertError) throw upsertError;

    const liveIds = new Set(events.map((e) => e.gcal_event_id));
    const { data: existingRows, error: fetchError } = await supabase
      .from('calendar_events')
      .select('gcal_event_id')
      .not('gcal_event_id', 'is', null);
    if (fetchError) throw fetchError;

    const staleIds = (existingRows ?? [])
      .map((r) => r.gcal_event_id as string)
      .filter((id) => !liveIds.has(id));

    if (staleIds.length > 0) {
      const { error: deleteError } = await supabase
        .from('calendar_events')
        .delete()
        .in('gcal_event_id', staleIds);
      if (deleteError) throw deleteError;
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ synced: events.length }));
  } catch (err) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: (err as Error).message }));
  }
}
