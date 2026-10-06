import { useState, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import { CalendarEvent } from './types';

// Lazy load components below the fold for better initial load performance
const Moments = lazy(() => import('./components/Moments'));
const CalendarSection = lazy(() => import('./components/CalendarSection'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const ContactUs = lazy(() => import('./components/ContactUs'));
const Footer = lazy(() => import('./components/Footer'));
const EventModal = lazy(() => import('./components/EventModal'));

export default function App() {
  const [selectedEvents, setSelectedEvents] = useState<CalendarEvent[] | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenEventModal = (event: CalendarEvent, allEvents: CalendarEvent[]) => {
    setSelectedDate(event.date);
    setSelectedEvents(allEvents);
  };

  const handleCloseEventModal = () => {
    setSelectedDate('');
    setSelectedEvents(null);
  };

  return (
    <div className="bg-[#FCF9F8] text-[#1C1B1B] font-sans antialiased min-h-screen selection:bg-[#690018]/10 selection:text-[#690018]">
      {/* Scrollable Main Layout */}
      <Navbar />

      <main className="relative">
        <Hero onContactUs={() => scrollToSection('contact')} />

        <AboutUs />

        <Suspense fallback={<div className="h-32 flex items-center justify-center"><div className="w-6 h-6 border-2 border-[#912A55]/20 border-t-[#912A55] rounded-full animate-spin" /></div>}>
          <Testimonials />

          <CalendarSection onOpenEventModal={handleOpenEventModal} />

          <Moments />

          <ContactUs />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />

        {/* Global Interactive Event Modal */}
        <EventModal 
          events={selectedEvents}
          selectedDate={selectedDate}
          onClose={handleCloseEventModal}
        />
      </Suspense>
    </div>
  );
}

