import type { IncomingMessage, ServerResponse } from 'http';
import { GoogleAuth } from 'google-auth-library';

const CALENDAR_ID = 'hello.confess.team@gmail.com';

interface CalendarEventOut {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  location: string;
  eventType: string | null;
  type: 'past' | 'upcoming';
}

interface GCalEvent {
  id: string;
  status?: string;
  summary?: string;
  start?: { date?: string; dateTime?: string };
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

async function fetchCalendarEvents(): Promise<CalendarEventOut[]> {
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
  const events: CalendarEventOut[] = [];
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
        id: item.id,
        date,
        title,
        location,
        eventType: null,
        type: date < today ? 'past' : 'upcoming',
      });
    }

    pageToken = res.data.nextPageToken;
  } while (pageToken);

  return events;
}

export default async function handler(_req: IncomingMessage, res: ServerResponse) {
  try {
    const events = await fetchCalendarEvents();
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(events));
  } catch (err) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: (err as Error).message }));
  }
}
