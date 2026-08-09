import type { IncomingMessage, ServerResponse } from 'http';
import { createClient } from '@supabase/supabase-js';
import WebSocket from 'ws';

interface CalendarEventOut {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  location: string;
  eventType: string | null;
  type: 'past' | 'upcoming';
  media_urls?: string[] | null;
}

async function fetchCalendarEvents(): Promise<CalendarEventOut[]> {
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const anonKey = process.env.VITE_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !anonKey) {
    throw new Error('Supabase credentials are not set');
  }

  const supabase = createClient(supabaseUrl, anonKey, {
    realtime: { transport: WebSocket as unknown as typeof globalThis.WebSocket },
  });
  const { data, error } = await supabase
    .from('calendar_events')
    .select('id, date, title, location, event_type, type, media_urls')
    .not('gcal_event_id', 'is', null)
    .order('date', { ascending: true });

  if (error) throw error;

  return (data ?? []).map((row) => ({
    id: row.id,
    date: row.date,
    title: row.title,
    location: row.location ?? '',
    eventType: row.event_type,
    type: row.type,
    media_urls: row.media_urls,
  }));
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
