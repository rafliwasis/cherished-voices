-- Add video_url column to hero_highlights for custom uploaded videos
alter table public.hero_highlights
  add column if not exists video_url text;
