import { MomentItem, Testimonial } from './types';

export const HERO_BG_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkbH11iZBrVIRjzfHEJz2gvx9L7gBi_ZlfH4APTl4IH-hHA4J6VDUjBmvftC0Q0bFgFqwaU8MPdRj8-Bx_XLXW9VWD6Oj1vFAmtaJ_AKR9UnfamcZ-Mc7sY7ugsEWS6rUMdruElabEY9ASbDs3kIj1KlS6DeYryULLZCNlyIldEP3xiK5FcOzsoSN3Er32H2hze0KCmeOVmCbJIsKWVUbAS3gLOmTJkqOHk2uZJZLuzRV9Fy_LcZFzktwwl868mv4yZDvkZPBupuYJ';

export const HERO_BG_VIDEO = 'https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-having-their-first-dance-39872-large.mp4';

export const ABOUT_VIDEO_PREVIEW = 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1QpdzClYz4az1DrZ2e9fcUyLW6stGiC24PTOeYDfr0u_uwg-KWyHMv_Kcv1_E45NXZUoMQIgbMHjsvJU9zNFTu1UwzbJaTVIT-oYpFPIkSgIxTm38OH0Pmhgi_U-uhAIX3vxLGvw5CcifPBVErJBBzJ-Y5VJtOxyKitl5MkT6LmstsAua6r02zxjHeHs2osm71Gocrw_n6h3Zv2IgXJpGXQ-CS0whA6uKDmvtpO5zExVi7CIVjP1TbbijhN9iOM0cAUOuL8Wo9M9M';

export const MOMENT_ITEMS: MomentItem[] = [
  {
    id: 'm1',
    imageUrl: '/images/cv_1.jpg',
    caption: 'Leaving a voice message at the reception',
    description: 'Guests step up to the vintage telephone and pour their hearts out — laughter, tears, and heartfelt wishes captured forever in a single take.',
    aspect: '3/4'
  },
  {
    id: 'm2',
    imageUrl: '/images/cv_2.jpg',
    caption: 'Laughter and stories forever recorded',
    description: 'Every inside joke, every toast, every spontaneous cheer is preserved in pristine audio — a living scrapbook your family will treasure for generations.',
    aspect: 'square'
  },
  {
    id: 'm3',
    imageUrl: '/images/cv_3.jpg',
    caption: 'Vintage setup designed for luxury events',
    description: 'Our bespoke guestbook booth blends seamlessly into any décor — a timeless centerpiece that draws guests in and invites them to leave their mark.',
    aspect: '4/5'
  },
  {
    id: 'm4',
    imageUrl: '/images/cv_4.jpg',
    caption: 'Picking up the receiver to record',
    description: 'There is something magical about lifting a handset. It signals the start of something personal — a private moment in the middle of a grand celebration.',
    aspect: '3/4'
  },
  {
    id: 'm5',
    imageUrl: '/images/cv_5.jpg',
    caption: 'Gathering around the memory booth',
    description: 'Friends and family huddle together, laughing before they even start recording. The booth becomes the heart of the party — a magnet for the warmest moments.',
    aspect: 'square'
  },
  {
    id: 'm6',
    imageUrl: '/images/cv_6.jpg',
    caption: 'Timeless decor for tablescapes',
    description: 'Styled to complement the finest wedding aesthetics, our setup adds an heirloom quality to your event — beautiful to photograph, even more beautiful to experience.',
    aspect: '4/5'
  }
];

// =====================================================================
// TESTIMONIAL — Cara nambah data testimonial baru:
// =====================================================================
// Cukup copy block di bawah ini, tempel di array TESTIMONIALS,
// lalu isi data-nya:
//
// {
//   id: 't11',                                  // ID unik (t1, t2, t3, ...)
//   quote: 'Tulis testimoni di sini...',         // Isi testimoni
//   author: 'Nama Client / Pasangan',            // Nama orang/pasangan
//   avatar: 'https://ui-avatars.com/api/?name=Nama+Client&background=912A55&color=fff&size=64',  // URL foto (ganti bebas)
// },
//
// Catatan:
//   - id   → pakai prefix 't' + nomor urut (t1, t2, t3, ...)
//   - quote → teks bebas, boleh pakai 'petik satu' dengan backslash \'
//   - avatar → path gambar sendiri, letakkan di folder public/images/
//   - urutan card akan otomatis terbagi rata ke 2 baris marquee
// =====================================================================

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    quote: 'baikkk!! thank you banget ya kakkkk 🥺🥺🥺🥺 walau kita ga sempet ke atas tp melihat orgorg pd ngisi, LUCU BINGITTTTTTT 😊😊😊❤️❤️ MAKASIH BANYAK KA AMMAR & KA AISYAH SERTA TIM CHERISHED VOICES LAINNYA. ditunggu hasilnyaaaaaaaaa aaaaaa tidak sabaar 🥰🥰🥰',
    author: 'Cherie & Radit',
    avatar: 'https://ui-avatars.com/api/?name=Cherie+%26+Radit&background=912A55&color=fff&size=64',
  },
  {
    id: 't2',
    quote: 'Omg thank you hahahaha. Lucu lucu bangett moment gt. Thank you ya sekali lagii teamm. Pokoknya thank you udah bantuin! Udh aku save semua video dan upload🥳🌸 suka banget. Next amin kalo wedding HAHA aku pake lagiii',
    author: 'Jessica',
    avatar: 'https://ui-avatars.com/api/?name=Jessica&background=912A55&color=fff&size=64',
  },
  {
    id: 't3',
    quote: 'halo team cherishedvoices! thank you so much yaaa sudah berpartisipasi diacaraku kemarinnn.. maaf kalau banyak kurangnyaaa.. semoga kalian sukses selalu yaaaa!! semoga juga kita berjodoh lagi barengan di next event lainnyaaa.. AAAMMMIINNN🩵🌸',
    author: 'Intan & Aziz',
    avatar: 'https://ui-avatars.com/api/?name=Intan+%26+Aziz&background=912A55&color=fff&size=64',
  },
  {
    id: 't4',
    quote: 'Haloo kak ammar!! Maaf baru bales kakkk 😭Kita juga makasih banget yaaa kak dari cv udah ramaikan acara nikahan kitaaa, seneng banget bisa denger ucapan dari teman dan kerabat kitaa 🧡Aku juga udah liat post di tiktok nya lucu bangettt hehehehe. Once again thankyou so much for cv!! Semoga kita bisa ketemu lagi di event lainnya yaaa kakkk',
    author: 'Dila & Ari',
    avatar: 'https://ui-avatars.com/api/?name=Dila+%26+Ari&background=912A55&color=fff&size=64',
  },
  {
    id: 't5',
    quote: 'kaaa thank you so much yahhh🥺💜 aminamin makasih doanyaaa & makasihhhh krn hasilnya lucu2 hehehe',
    author: 'Karin & Fadil',
    avatar: 'https://ui-avatars.com/api/?name=Karin+%26+Fadil&background=912A55&color=fff&size=64',
  },
  {
    id: 't6',
    quote: 'Hi Kak Ammar & Aisyah!! Thank you so so much for making our wedding more fun & special!! 🥺🥺🤍🤍',
    author: 'Feli',
    avatar: 'https://ui-avatars.com/api/?name=Feli&background=912A55&color=fff&size=64',
  },
  {
    id: 't7',
    quote: 'woaaaa aku baru sempet nonton videonya, seruuuu sekaliiii. makasih yaaaa untuk kerja samanya.',
    author: 'Nia',
    avatar: 'https://ui-avatars.com/api/?name=Nia&background=912A55&color=fff&size=64',
  },
  {
    id: 't8',
    quote: 'Halo kak aisyah, mas ammar dan mba sabina, TERIMAKASIH BANYAKKK YAAAA!!! maaf akuu baru sempattt responnnn, aku lagi balik ke kampung halaman sama bella😁😁, jadi agak susahh sinyallll, tapi terimakasihhh banyakkk untuk tim cherished voices udah ikut sertaaa membantu memeriahkan pernikahan aku dan bellaaa, makasih banyakkk yaaaa!!!!',
    author: 'Ericx',
    avatar: 'https://ui-avatars.com/api/?name=Ericx&background=912A55&color=fff&size=64',
  },
  {
    id: 't9',
    quote: 'Hi Kak, makasih banyak yaa kak atas bantuan dan kerjasamanya selama wedding prep and the event itself! Banyak yg muji lucu video guestbook nyaa🫶🏻',
    author: 'Rahma',
    avatar: 'https://ui-avatars.com/api/?name=Rahma&background=912A55&color=fff&size=64',
  },
  {
    id: 't10',
    quote: 'love banget kemarin selama acara impresinya bagus banget!! kami juga minta terimakasih banget ya kak udah bantu ramein acara dan bikin konsep audio guestbook jni!! love banget konsepnya semuanya!! bisa di patenin ga si kak? kalo bisa jangan lupa di patenin di indo wkwkwkw',
    author: 'Elizabeth',
    avatar: 'https://ui-avatars.com/api/?name=Elizabeth&background=912A55&color=fff&size=64',
  },
];


