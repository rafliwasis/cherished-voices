export interface BookingInquiry {
  id: string;
  clientName: string;
  email: string;
  phone?: string;
  eventDate: string;
  eventType: string;
  location: string;
  message?: string;
  createdAt: string;
}

export interface GuestbookRecording {
  id: string;
  guestName: string;
  message: string;
  duration: string;
  timestamp: string;
  audioUrl?: string;
  isSimulated?: boolean;
}

export interface CalendarEvent {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  location: string;
  type: 'past' | 'upcoming';
  highlightsCount?: number;
  recordings?: GuestbookRecording[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  delayClass: string;
}

export interface MomentItem {
  id: string;
  imageUrl: string;
  caption: string;
  description?: string;
  aspect: '3/4' | 'square' | '4/5' | '9/16' | '2/3' | 'video';
}
