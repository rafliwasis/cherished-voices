import { CalendarEvent, MomentItem, Testimonial } from './types';

export const HERO_BG_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkbH11iZBrVIRjzfHEJz2gvx9L7gBi_ZlfH4APTl4IH-hHA4J6VDUjBmvftC0Q0bFgFqwaU8MPdRj8-Bx_XLXW9VWD6Oj1vFAmtaJ_AKR9UnfamcZ-Mc7sY7ugsEWS6rUMdruElabEY9ASbDs3kIj1KlS6DeYryULLZCNlyIldEP3xiK5FcOzsoSN3Er32H2hze0KCmeOVmCbJIsKWVUbAS3gLOmTJkqOHk2uZJZLuzRV9Fy_LcZFzktwwl868mv4yZDvkZPBupuYJ';

export const HERO_BG_VIDEO = 'https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-having-their-first-dance-39872-large.mp4';

export const ABOUT_VIDEO_PREVIEW = 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1QpdzClYz4az1DrZ2e9fcUyLW6stGiC24PTOeYDfr0u_uwg-KWyHMv_Kcv1_E45NXZUoMQIgbMHjsvJU9zNFTu1UwzbJaTVIT-oYpFPIkSgIxTm38OH0Pmhgi_U-uhAIX3vxLGvw5CcifPBVErJBBzJ-Y5VJtOxyKitl5MkT6LmstsAua6r02zxjHeHs2osm71Gocrw_n6h3Zv2IgXJpGXQ-CS0whA6uKDmvtpO5zExVi7CIVjP1TbbijhN9iOM0cAUOuL8Wo9M9M';

export const MOMENT_ITEMS: MomentItem[] = [
  {
    id: 'm1',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdZDvxY461NGpVP7vmcLbkgR2BPdhjok31dC6yvxYrFbLS0kH9hedRqFB_-kojoi32kAAq2BlZA8aRuUN92qjk5l7WLl_EEaDaaiLJKGmeKQyGIWvC2X5AKvnhEJRwZntTJ--0E--pH0CxxVIpMqKA3klUZ3BCJvqUhiXzlPdjJkBqSvJr7p_ssriQ2Ysu-i3-Ij3B9KhSLrNpxGsU78mFYYKGGyUyj824JEohCzK-iXlraut6QoWoG0auTP9y1tENx4SqMeeZSrs3',
    caption: 'Leaving a voice message at the reception',
    aspect: '3/4'
  },
  {
    id: 'm2',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBIXP10jTxUzG5--Ej3fQIY0HCFgRCrb7g1ad2KznQiw0ZraDWaZvppY3zHFRcwC0ZmAcj-z6F-hJ7WCwe3RgQ26XxryPbFjfkL-9IDDNKY0Hm86rsLF5-Scdl14qR0xk3ktah35epVAFuVMWyNWl7qRpZjqP4fZXmg-zcJsG82ZSbde54JzBYPwxaL3f05GRvumt-Qi6dApXgkWNV_nj2wf-MqNbdDfQbsNK_vcWv2poGl8OvAAKP1AB6im48hq3rk6CBYnk924Lg',
    caption: 'Laughter and stories forever recorded',
    aspect: 'square'
  },
  {
    id: 'm3',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdmhQGC-e2Pxw6YVyFA5F5nDpagabAUqiTkxWTtFye15wvgtmvjive1N75ToGDfyn1VecKYmGrwgdLh1pcMsmuxTsxH9-jSU0Pw16IC7ECgYMQ6SksaULILrGw34PEqnHEw3qW7aDLnW9NBp3z7oY0_U9Me_S7jQwAm_lfFsIeQFbtGzpTubG1j1KDCPBBZfI3XrQDsi7urdvCIsJkVtARt8RVKvldYZffKIx7mhqdpwzKAzGEwHjAbtRlw9dWUoH61dcvJ1pVmBqt',
    caption: 'Vintage setup designed for luxury events',
    aspect: 'square'
  },
  {
    id: 'm4',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoHtANri4v2ajaefGEG3C8op2Zo8W-xr5g_bgupAhVRDaSCjBnSKMKJ29WhQ6TgYKQgSD0tRX7ptwLtzLNdeF-VsJFxSRVPEcSj4g_lNhrz3sbV0mSB0rhsdbQBsobZqBnF9h-sVkhY9JyuWqmZz7rKLxg6pzqlEOxcr99sgLDFpevLhKsCggWB6sQQEipkqrjQ-IYLLJ19SbziA6Ju_na_NHrhRX1f6bh6Jb27r9Rp63N-Y8BdQ0zApHQ3kwG7-NfuHSqn50QDRNP',
    caption: 'Picking up the receiver to record',
    aspect: '3/4'
  },
  {
    id: 'm5',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiNXXlZtiFSIQga3Bw1JpE1W-FNmNmQ_9CN9zydSUN0e3EzKFhIqaqy-8DkeYAckjV8ErAKDMwjiKOWEkapTJOwMqhUo3SHJ0tNRDUhvi07XSx1sZqJp2fbqglnlzUtB4vpqHBPSJsMoi1wfIc4yiv2n_dwSVv1QXJO_z1z64HenpC2s5mVF3EirFIYg_K-APF_-E3wtqtMETiXdO-b_dJGcFWDHHWOzGPpyoCdIeBydCd2FaZvuBI7I47d3OzX4EyJ4SoEa0HleJB',
    caption: 'Gathering around the memory booth',
    aspect: '4/5'
  },
  {
    id: 'm6',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6EqLgwSGssT1ErX3oUHp6CZUJ7UmCw1vaEsj3bgeI_hOmnY_PocViyr2cL2RX2m3VclQAUMHe4AXSUKC0SrzOGRibDYEjqFeTn1JH9F0LMr7M4gSBoG9wwjNKataXqeVzzTfcg2kjnpeDv5HxEWrd6XGr33Ry9Dfy22ZuGWVSeh1_sayfXX5KNPc2oy780sfAsx9F2AvVMVaTVc63XXI7MIA4Xqo3hXfAmOI2o24PW7-6c_aveQrqHZoTyurKCDWU9AGWpSB1mg1o',
    caption: 'Timeless decor for tablescapes',
    aspect: 'square'
  }
];

export const TESTIMONIALS: Testimonial[] = [
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

export const INITIAL_CALENDAR_EVENTS: CalendarEvent[] = [
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
    highlightsCount: 0 // No video highlights yet
  },
  {
    id: 'e2',
    date: '2026-01-18',
    title: 'Winter Gala 2026',
    location: 'Manhattan Penthouse',
    type: 'past',
    highlightsCount: 1,
    recordings: [
      {
        id: 'rg1',
        guestName: 'CEO Catherine',
        message: 'Welcome everyone to our 2026 Gala. This year has been monumental, and seeing all of your wonderful faces gathered in this room is the absolute highlight.',
        duration: '0:35',
        timestamp: '8:45 PM'
      }
    ]
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
    id: 'e4',
    date: '2026-01-25',
    title: 'Upcoming Private Ceremony',
    location: 'The Ritz-Carlton, Boston',
    type: 'upcoming'
  }
];
