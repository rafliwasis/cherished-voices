alter table public.calendar_events
  add column if not exists gcal_event_id text;

create unique index if not exists calendar_events_gcal_event_id_key
  on public.calendar_events (gcal_event_id);
