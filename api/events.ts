import type { IncomingMessage, ServerResponse } from 'http';
import { fetchCalendarEventsFromSheet } from './_lib/googleSheets';

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
