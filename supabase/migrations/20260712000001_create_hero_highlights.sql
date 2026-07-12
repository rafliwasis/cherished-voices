-- Create hero_highlights table
create table if not exists public.hero_highlights (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  caption text,
  is_active boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.hero_highlights enable row level security;

-- Anyone can read (for public Hero section)
create policy "Public read access to hero highlights"
  on public.hero_highlights
  for select
  to anon
  using (true);

-- Only authenticated users can manage
create policy "Authenticated full access to hero highlights"
  on public.hero_highlights
  for all
  to authenticated
  using (true)
  with check (true);
