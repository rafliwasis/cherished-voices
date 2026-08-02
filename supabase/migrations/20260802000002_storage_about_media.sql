-- Create public about-media storage bucket (for the About Us video)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('about-media', 'about-media', true, 52428800, array['video/mp4', 'video/webm', 'video/quicktime'])
on conflict (id) do nothing;

-- Allow authenticated admin uploads/removals to the about-media bucket.
-- Public read access is granted via the bucket's public flag.
create policy "Authenticated write access to about-media"
  on storage.objects
  for all
  to authenticated
  using (bucket_id = 'about-media')
  with check (bucket_id = 'about-media');
