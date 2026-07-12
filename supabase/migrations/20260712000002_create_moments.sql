-- Create moments table
create table if not exists public.moments (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  caption text not null,
  aspect text not null default 'square' check (aspect in ('3/4', 'square', '4/5')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.moments enable row level security;

-- Anyone can read (for public Moments section)
create policy "Public read access to moments"
  on public.moments
  for select
  to anon
  using (true);

-- Only authenticated users can manage
create policy "Authenticated full access to moments"
  on public.moments
  for all
  to authenticated
  using (true)
  with check (true);
