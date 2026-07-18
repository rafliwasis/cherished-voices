-- Allow authenticated admin uploads to the hero-media and moments buckets.
-- Public read access is already granted via the buckets' public flag.

create policy "Authenticated write access to hero-media"
  on storage.objects
  for all
  to authenticated
  using (bucket_id = 'hero-media')
  with check (bucket_id = 'hero-media');

create policy "Authenticated write access to moments"
  on storage.objects
  for all
  to authenticated
  using (bucket_id = 'moments')
  with check (bucket_id = 'moments');
