-- Add media_urls to calendar_events table
alter table public.calendar_events
add column if not exists media_urls text[] default array[]::text[];
