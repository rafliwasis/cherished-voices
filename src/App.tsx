import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import Moments from './components/Moments';
import CalendarSection from './components/CalendarSection';
import Testimonials from './components/Testimonials';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';
import EventModal from './components/EventModal';
import { CalendarEvent } from './types';

export default function App() {
  const [selectedEvents, setSelectedEvents] = useState<CalendarEvent[] | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedDateForInquiry, setSelectedDateForInquiry] = useState<string>('');

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

  // Callback when a user reserves an upcoming date inside the modal
  const handleSelectInquiryDate = (dateString: string) => {
    setSelectedDateForInquiry(dateString);
    setSelectedEvents(null); // Close the modal
    setTimeout(() => {
      scrollToSection('contact');
    }, 200);
  };

  return (
    <div className="bg-[#FCF9F8] text-[#1C1B1B] font-sans antialiased min-h-screen selection:bg-[#690018]/10 selection:text-[#690018]">
      {/* Scrollable Main Layout */}
      <Navbar />

      <main className="relative">
        <Hero 
          onCheckAvailability={() => scrollToSection('calendar')}
          onContactUs={() => scrollToSection('contact')}
        />

        <AboutUs />

        <Moments />

        <CalendarSection 
          onOpenEventModal={handleOpenEventModal}
          selectedDateForInquiry={selectedDateForInquiry}
          setSelectedDateForInquiry={setSelectedDateForInquiry}
          onScrollToContact={() => scrollToSection('contact')}
        />

        <Testimonials />

        <ContactUs 
          selectedDate={selectedDateForInquiry}
          setSelectedDate={setSelectedDateForInquiry}
        />
      </main>

      <Footer />

      {/* Global Interactive Event Modal */}
      <EventModal 
        events={selectedEvents}
        selectedDate={selectedDate}
        onClose={handleCloseEventModal}
        onSelectInquiryDate={handleSelectInquiryDate}
      />
    </div>
  );
}

