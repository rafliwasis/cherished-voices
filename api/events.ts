import type { IncomingMessage, ServerResponse } from 'http';
import { GoogleAuth } from 'google-auth-library';

const SHEET_ID = '1-AXrD8khFDU69VcHvjUPd2ViZi5lHrfC5FNskNO3Iio';
const RANGE = 'Clients Data!A2:H';

interface SheetCalendarEvent {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  location: string;
  eventType: string | null;
  type: 'past' | 'upcoming';
}

// Google Sheets stores dates as serial numbers (days since 1899-12-30).
function serialToIsoDate(serial: number): string {
  const ms = Date.UTC(1899, 11, 30) + serial * 86400000;
  const d = new Date(ms);
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
}

function todayIsoDate(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

async function fetchCalendarEventsFromSheet(): Promise<SheetCalendarEvent[]> {
  const keyJson = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!keyJson) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_KEY is not set');
  }

  const auth = new GoogleAuth({
    credentials: JSON.parse(keyJson),
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
  const client = await auth.getClient();

  const res = await client.request<{ values?: unknown[][] }>({
    url: `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(RANGE)}`,
    params: { valueRenderOption: 'UNFORMATTED_VALUE' },
  });

  const rows = res.data.values ?? [];
  const today = todayIsoDate();
  const events: SheetCalendarEvent[] = [];

  rows.forEach((row, idx) => {
    const [, date, name, , eventType, , , location] = row;
    if (typeof name !== 'string' || !name.trim()) return;
    if (typeof date !== 'number') return; // skips blank/"TBA" rows

    const isoDate = serialToIsoDate(date);
    events.push({
      id: `sheet-${idx}`,
      date: isoDate,
      title: name.trim(),
      location: typeof location === 'string' ? location.trim() : '',
      eventType: typeof eventType === 'string' && eventType.trim() ? eventType.trim() : null,
      type: isoDate < today ? 'past' : 'upcoming',
    });
  });

  return events;
}

export default async function handler(_req: IncomingMessage, res: ServerResponse) {
  try {
    const events = await fetchCalendarEventsFromSheet();
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(events));
  } catch (err) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: (err as Error).message }));
  }
}
