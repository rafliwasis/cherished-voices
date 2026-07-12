-- Add description column to moments table
alter table public.moments
  add column if not exists description text;
