-- Create public testimonial-photos storage bucket
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('testimonial-photos', 'testimonial-photos', true, 5242880, array['image/png', 'image/jpeg', 'image/webp', 'image/gif'])
on conflict (id) do nothing;

-- Allow authenticated admin uploads/removals to the testimonial-photos bucket.
-- Public read access is granted via the bucket's public flag.
create policy "Authenticated write access to testimonial-photos"
  on storage.objects
  for all
  to authenticated
  using (bucket_id = 'testimonial-photos')
  with check (bucket_id = 'testimonial-photos');
