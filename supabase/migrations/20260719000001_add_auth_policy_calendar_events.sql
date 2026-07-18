create policy "Authenticated read access to calendar events"
  on public.calendar_events
  for select
  to authenticated
  using (true);
