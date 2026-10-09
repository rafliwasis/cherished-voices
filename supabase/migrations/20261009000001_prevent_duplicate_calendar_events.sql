-- Prevent the same event (same date + title) from existing twice in calendar_events.
-- Comparison is case/whitespace-insensitive. Location is not compared, see the dedupe migration.
--
-- A plain unique index on (date, title) is not used on purpose: two distinct Google Calendar
-- events can legitimately share a title and date (e.g. "Alma" on 2026-06-27), and such an index
-- would make the whole sync upsert fail. The duplicates we saw were always a legacy row
-- (gcal_event_id IS NULL) next to a Google Calendar row, so this trigger covers that:
--   * inserting a Google Calendar row absorbs a matching legacy row (media is carried over);
--   * inserting a legacy row is rejected if a row with the same date + title already exists.

create or replace function public.calendar_events_prevent_duplicates()
returns trigger
language plpgsql
as $$
declare
  legacy_media text[];
begin
  if new.gcal_event_id is not null then
    delete from public.calendar_events l
    where l.gcal_event_id is null
      and l.date = new.date
      and lower(trim(l.title)) = lower(trim(new.title))
    returning l.media_urls into legacy_media;

    if legacy_media is not null and coalesce(array_length(new.media_urls, 1), 0) = 0 then
      new.media_urls := legacy_media;
    end if;
  elsif exists (
    select 1
    from public.calendar_events e
    where e.date = new.date
      and lower(trim(e.title)) = lower(trim(new.title))
  ) then
    raise exception 'calendar event "%" on % already exists', new.title, new.date
      using errcode = '23505';
  end if;

  return new;
end;
$$;

drop trigger if exists calendar_events_prevent_duplicates on public.calendar_events;

create trigger calendar_events_prevent_duplicates
  before insert on public.calendar_events
  for each row
  execute function public.calendar_events_prevent_duplicates();
