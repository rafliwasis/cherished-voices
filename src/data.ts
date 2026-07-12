import { CalendarEvent, MomentItem, Testimonial } from './types';

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

export const TESTIMONIALS_ROW1: Testimonial[] = [
  {
    id: 't1',
    quote: 'Hearing my grandmother\'s laugh again was the best gift.',
    author: 'Sarah & Mark',
    delayClass: 'delay-1'
  },
  {
    id: 't2',
    quote: 'The video quality was stunning. It felt like being back at the reception.',
    author: 'James T.',
    delayClass: 'delay-2'
  },
  {
    id: 't3',
    quote: 'Every guest loved how easy it was to use. Such a unique addition to our wedding!',
    author: 'Chloe V.',
    delayClass: 'delay-3'
  },
  {
    id: 't4',
    quote: 'The audio guestbook captured the true energy of the night.',
    author: 'The Miller Family',
    delayClass: 'delay-4'
  },
  {
    id: 't5',
    quote: 'Worth every single penny. These memories are priceless.',
    author: 'Amanda R.',
    delayClass: 'delay-1'
  }
];

export const TESTIMONIALS_ROW2: Testimonial[] = [
  {
    id: 't6',
    quote: 'The setup was beautiful and matched our wedding theme perfectly.',
    author: 'Emily & David',
    delayClass: 'delay-1'
  },
  {
    id: 't7',
    quote: 'Our guests are still talking about it weeks later!',
    author: 'Rachel W.',
    delayClass: 'delay-2'
  },
  {
    id: 't8',
    quote: 'So much better than a traditional guestbook. We love listening to the messages.',
    author: 'The Johnson Family',
    delayClass: 'delay-3'
  },
  {
    id: 't9',
    quote: 'The quality exceeded our expectations. Highly recommend!',
    author: 'Michael P.',
    delayClass: 'delay-4'
  },
  {
    id: 't10',
    quote: 'A beautiful keepsake we will treasure forever.',
    author: 'Sophie & Alex',
    delayClass: 'delay-1'
  }
];

export const TESTIMONIALS: Testimonial[] = [...TESTIMONIALS_ROW1, ...TESTIMONIALS_ROW2];

export const INITIAL_CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: 'e0',
    date: '2025-12-28',
    title: "The Henderson's New Year Gala",
    location: 'The Ritz-Carlton, New York',
    type: 'past',
    highlightsCount: 2,
    recordings: [
      {
        id: 'r0-1',
        guestName: 'Mr. Henderson',
        message: 'What a night! Thank you all for coming to celebrate with us. Here is to a wonderful 2026!',
        duration: '0:18',
        timestamp: '11:45 PM'
      },
      {
        id: 'r0-2',
        guestName: 'Diana H.',
        message: 'The best gala I have attended all year! The decorations, the music, everything was perfect.',
        duration: '0:12',
        timestamp: '10:30 PM'
      }
    ]
  },
  {
    id: 'e0-2',
    date: '2025-12-30',
    title: 'Year-End Corporate Retreat',
    location: 'The Glass House, New York',
    type: 'past',
    highlightsCount: 1,
    recordings: [
      {
        id: 'r0-3',
        guestName: 'Michael Chen',
        message: 'Great team, great energy. Looking forward to an even bigger year ahead!',
        duration: '0:15',
        timestamp: '7:20 PM'
      }
    ]
  },
  {
    id: 'e-before-1',
    date: '2026-01-02',
    title: "The Parkers' Wedding Reception",
    location: 'Brooklyn Winery, New York',
    type: 'past',
    highlightsCount: 2,
    recordings: [
      {
        id: 'rb1',
        guestName: 'Maid of Honor — Jessica',
        message: 'Emma and Tom, you two are the definition of soulmates. So much love for you both!',
        duration: '0:22',
        timestamp: '8:15 PM'
      },
      {
        id: 'rb2',
        guestName: 'Uncle Bob',
        message: 'Finally my favorite niece is married! Tom, welcome to the family. Treat her right!',
        duration: '0:14',
        timestamp: '9:00 PM'
      }
    ]
  },
  {
    id: 'e1',
    date: '2026-01-04',
    title: 'The Sterling Wedding',
    location: 'The Glass House, New York',
    type: 'past',
    highlightsCount: 3,
    recordings: [
      {
        id: 'r1',
        guestName: 'Grandma Sterling',
        message: 'My dearest grandchildren, seeing you together makes my heart overflow. Live each day with patience, and never go to bed angry. I love you both so very much!',
        duration: '0:24',
        timestamp: '6:32 PM'
      },
      {
        id: 'r2',
        guestName: 'Arthur (Best Man)',
        message: 'Mark! You managed to pull the most beautiful girl in the world. I still remember when we were roommates and you said she was way out of your league. Congratulations guys, party hard!',
        duration: '0:18',
        timestamp: '9:15 PM'
      }
    ]
  },
  {
    id: 'e1-2',
    date: '2026-01-04',
    title: 'Silver Corporate Gala',
    location: 'Grand Hyatt Ballroom, New York',
    type: 'past',
    highlightsCount: 0
  },
  {
    id: 'e3-1',
    date: '2026-01-12',
    title: 'Private Wedding hold',
    location: 'Plaza Indonesia, Jakarta',
    type: 'upcoming'
  },
  {
    id: 'e3-2',
    date: '2026-01-12',
    title: 'Anniversary Banquet hold',
    location: 'The Glass House, Jakarta',
    type: 'upcoming'
  },
  {
    id: 'e2',
    date: '2026-01-18',
    title: 'Winter Gala 2026',
    location: 'Manhattan Penthouse',
    type: 'upcoming'
  },
  {
    id: 'e4',
    date: '2026-01-25',
    title: 'Upcoming Private Ceremony',
    location: 'The Ritz-Carlton, Boston',
    type: 'upcoming'
  },
  {
    id: 'e5-1',
    date: '2026-01-28',
    title: 'Morning Workshop Session',
    location: 'Convention Center, Jakarta',
    type: 'upcoming'
  },
  {
    id: 'e5-2',
    date: '2026-01-28',
    title: 'Afternoon Seminar',
    location: 'Convention Center, Jakarta',
    type: 'upcoming'
  },
  {
    id: 'e5-3',
    date: '2026-01-28',
    title: 'Evening Gala Dinner',
    location: 'The Ritz-Carlton, Jakarta',
    type: 'upcoming'
  },
  {
    id: 'e5-4',
    date: '2026-01-28',
    title: 'Night Party',
    location: 'Sky Lounge, Jakarta',
    type: 'upcoming'
  },
  {
    id: 'e5-5',
    date: '2026-01-28',
    title: 'VIP Afterparty',
    location: 'Private Residence, Jakarta',
    type: 'upcoming'
  },
  {
    id: 'e6-1',
    date: '2026-01-29',
    title: 'Corporate Summit',
    location: 'Grand Ballroom, Jakarta',
    type: 'upcoming'
  }
];
