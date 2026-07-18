-- Widen the aspect check constraint to match the app's actual aspect options
alter table public.moments drop constraint if exists moments_aspect_check;
alter table public.moments
  add constraint moments_aspect_check
  check (aspect in ('3/4', 'square', '4/5', '9/16', '2/3', 'video'));
