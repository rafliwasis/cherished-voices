create table if not exists public.calendar_events (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  title text not null,
  location text,
  event_type text,
  type text not null check (type in ('past', 'upcoming')),
  highlights_count integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.calendar_events enable row level security;

create policy "Public read access to calendar events"
  on public.calendar_events
  for select
  to anon
  using (true);
