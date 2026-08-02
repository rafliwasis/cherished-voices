-- Create testimonials table
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  quote text not null,
  photo_url text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.testimonials enable row level security;

-- Anyone can read (for public Testimonials section)
create policy "Public read access to testimonials"
  on public.testimonials
  for select
  to anon
  using (true);

-- Only authenticated users can manage
create policy "Authenticated full access to testimonials"
  on public.testimonials
  for all
  to authenticated
  using (true)
  with check (true);

-- Seed the 10 existing testimonials previously stored in src/data.ts
insert into public.testimonials (name, quote, photo_url, sort_order) values
  ($$Cherie & Radit$$, $$baikkk!! thank you banget ya kakkkk 🥺🥺🥺🥺 walau kita ga sempet ke atas tp melihat orgorg pd ngisi, LUCU BINGITTTTTTT 😊😊😊❤️❤️ MAKASIH BANYAK KA AMMAR & KA AISYAH SERTA TIM CHERISHED VOICES LAINNYA. ditunggu hasilnyaaaaaaaaa aaaaaa tidak sabaar 🥰🥰🥰$$, $$https://ui-avatars.com/api/?name=Cherie+%26+Radit&background=912A55&color=fff&size=64$$, 0),
  ($$Jessica$$, $$Omg thank you hahahaha. Lucu lucu bangett moment gt. Thank you ya sekali lagii teamm. Pokoknya thank you udah bantuin! Udh aku save semua video dan upload🥳🌸 suka banget. Next amin kalo wedding HAHA aku pake lagiii$$, $$https://ui-avatars.com/api/?name=Jessica&background=912A55&color=fff&size=64$$, 1),
  ($$Intan & Aziz$$, $$halo team cherishedvoices! thank you so much yaaa sudah berpartisipasi diacaraku kemarinnn.. maaf kalau banyak kurangnyaaa.. semoga kalian sukses selalu yaaaa!! semoga juga kita berjodoh lagi barengan di next event lainnyaaa.. AAAMMMIINNN🩵🌸$$, $$https://ui-avatars.com/api/?name=Intan+%26+Aziz&background=912A55&color=fff&size=64$$, 2),
  ($$Dila & Ari$$, $$Haloo kak ammar!! Maaf baru bales kakkk 😭Kita juga makasih banget yaaa kak dari cv udah ramaikan acara nikahan kitaaa, seneng banget bisa denger ucapan dari teman dan kerabat kitaa 🧡Aku juga udah liat post di tiktok nya lucu bangettt hehehehe. Once again thankyou so much for cv!! Semoga kita bisa ketemu lagi di event lainnya yaaa kakkk$$, $$https://ui-avatars.com/api/?name=Dila+%26+Ari&background=912A55&color=fff&size=64$$, 3),
  ($$Karin & Fadil$$, $$kaaa thank you so much yahhh🥺💜 aminamin makasih doanyaaa & makasihhhh krn hasilnya lucu2 hehehe$$, $$https://ui-avatars.com/api/?name=Karin+%26+Fadil&background=912A55&color=fff&size=64$$, 4),
  ($$Feli$$, $$Hi Kak Ammar & Aisyah!! Thank you so so much for making our wedding more fun & special!! 🥺🥺🤍🤍$$, $$https://ui-avatars.com/api/?name=Feli&background=912A55&color=fff&size=64$$, 5),
  ($$Nia$$, $$woaaaa aku baru sempet nonton videonya, seruuuu sekaliiii. makasih yaaaa untuk kerja samanya.$$, $$https://ui-avatars.com/api/?name=Nia&background=912A55&color=fff&size=64$$, 6),
  ($$Ericx$$, $$Halo kak aisyah, mas ammar dan mba sabina, TERIMAKASIH BANYAKKK YAAAA!!! maaf akuu baru sempattt responnnn, aku lagi balik ke kampung halaman sama bella😁😁, jadi agak susahh sinyallll, tapi terimakasihhh banyakkk untuk tim cherished voices udah ikut sertaaa membantu memeriahkan pernikahan aku dan bellaaa, makasih banyakkk yaaaa!!!!$$, $$https://ui-avatars.com/api/?name=Ericx&background=912A55&color=fff&size=64$$, 7),
  ($$Rahma$$, $$Hi Kak, makasih banyak yaa kak atas bantuan dan kerjasamanya selama wedding prep and the event itself! Banyak yg muji lucu video guestbook nyaa🫶🏻$$, $$https://ui-avatars.com/api/?name=Rahma&background=912A55&color=fff&size=64$$, 8),
  ($$Elizabeth$$, $$love banget kemarin selama acara impresinya bagus banget!! kami juga minta terimakasih banget ya kak udah bantu ramein acara dan bikin konsep audio guestbook jni!! love banget konsepnya semuanya!! bisa di patenin ga si kak? kalo bisa jangan lupa di patenin di indo wkwkwkw$$, $$https://ui-avatars.com/api/?name=Elizabeth&background=912A55&color=fff&size=64$$, 9);
