-- The initial seed (20260705000000) inserted events without gcal_event_id. The Google Calendar
-- sync later added the same events with an id, and since it upserts on gcal_event_id it never
-- matched the seed rows, so those events show twice on the public calendar.
--
-- Remove each legacy (gcal_event_id IS NULL) row that has a Google Calendar twin with the same
-- date and title (case/whitespace-insensitive). Location is deliberately not part of the match:
-- the legacy rows spell it differently or leave it empty ("Grand Hyatt Jakarta" vs "Grand Hyatt",
-- NULL vs "Thamrinine Ballroom"), and the Google Calendar row is the one to keep. Legacy rows
-- without a twin are kept and need manual review. No row involved has media_urls, so nothing
-- needs to be carried over.

delete from public.calendar_events l
where l.gcal_event_id is null
  and exists (
    select 1
    from public.calendar_events g
    where g.gcal_event_id is not null
      and g.date = l.date
      and lower(trim(g.title)) = lower(trim(l.title))
  );
