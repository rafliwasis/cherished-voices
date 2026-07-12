import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Info } from 'lucide-react';
import { CalendarEvent } from '../types';

interface CalendarSectionProps {
  onOpenEventModal: (event: CalendarEvent, allDayEvents: CalendarEvent[]) => void;
  selectedDateForInquiry: string;
  setSelectedDateForInquiry: (date: string) => void;
  onScrollToContact: () => void;
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const getTodayString = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export default function CalendarSection({ 
  onOpenEventModal, 
  setSelectedDateForInquiry,
  onScrollToContact 
}: CalendarSectionProps) {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    fetch('/api/events')
      .then((res) => res.json())
      .then((data: Array<{ id: string; date: string; title: string; location: string; type: CalendarEvent['type'] }>) => {
        setEvents(
          data.map((row) => ({
            id: row.id,
            date: row.date,
            title: row.title,
            location: row.location,
            type: row.type,
          }))
        );
      })
      .catch((err) => {
        console.error('Failed to load calendar events', err);
      });
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Days calculations
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  // Adjust starting day so Monday is index 0 (JS: Sun=0, Mon=1)
  const startingDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  // Render arrays
  const emptyDays = Array.from({ length: startingDay });
  const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Match events on a specific day
  const getEventsForDay = (day: number): CalendarEvent[] => {
    const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(e => e.date === formattedDate);
  };

  return (
    <section className="py-24 md:py-32 bg-white" id="calendar">
      <div className="px-6 md:px-16 max-w-[1200px] mx-auto">
        
        {/* Title block */}
        <div className="text-center mb-16 space-y-4">
          <span className="font-sans text-xs font-semibold text-[#912A55] uppercase tracking-[0.25em] block">
            Event Schedule
          </span>
          <h2 className="font-serif text-4xl md:text-6xl font-light italic text-[#1C1B1B]">
            Calendar
          </h2>
          <div className="w-12 h-[1px] bg-[#912A55] mx-auto mt-6" />
        </div>

        {/* Dynamic Month Selector */}
        <div className="flex items-center justify-center gap-8 mb-12 select-none">
          <button
            onClick={handlePrevMonth}
            className="p-2 border border-[#D9BDD0]/40 hover:border-[#912A55] hover:text-[#912A55] text-[#5e5e5d] transition-all rounded-sm cursor-pointer"
            aria-label="Previous Month"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <h3 className="font-serif text-3xl font-light italic text-[#1C1B1B] min-w-[240px] text-center">
            {MONTHS[month]} {year}
          </h3>

          <button
            onClick={handleNextMonth}
            className="p-2 border border-[#D9BDD0]/40 hover:border-[#912A55] hover:text-[#912A55] text-[#5e5e5d] transition-all rounded-sm cursor-pointer"
            aria-label="Next Month"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Refined Grid Box */}
        <div className="max-w-4xl mx-auto border border-[#debfbf]/20 bg-[#fcf9f8]/30 p-6 md:p-8 rounded-lg shadow-sm">
          {/* Days of the Week Header */}
          <div className="grid grid-cols-7 text-center border-b border-[#debfbf]/20 pb-4 mb-4 font-sans text-xs font-semibold uppercase tracking-widest text-[#574141]/70">
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
            <div>Sun</div>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-y-4 md:gap-y-6">
            {/* Empty offset elements */}
            {emptyDays.map((_, idx) => (
              <div key={`empty-${idx}`} className="h-16 md:h-20" />
            ))}

            {/* Actual Month Days */}
            {monthDays.map((day) => {
              const dayEvents = getEventsForDay(day);
              const hasEvents = dayEvents.length > 0;
              
              const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const isToday = formattedDate === getTodayString();
              const visibleDots = dayEvents.slice(0, 2);
              const overflowCount = dayEvents.length - 2;

              return (
                <div
                  key={`day-${day}`}
                  onClick={() => onOpenEventModal(dayEvents[0] || { id: 'empty', date: formattedDate, title: '', location: '', type: 'upcoming' } as CalendarEvent, dayEvents.length > 0 ? dayEvents : [])}
                  className={`h-16 md:h-20 flex flex-col items-center justify-center relative transition-all rounded-sm cursor-pointer hover:bg-[#690018]/5 group ${
                    hasEvents ? '' : 'text-[#1c1b1b]'
                  }`}
                >
                  <span 
                    className={`font-sans text-sm md:text-base font-medium flex items-center justify-center ${
                      isToday
                        ? 'w-10 h-10 bg-[#F4DCEA] rounded-full text-[#912A55] font-semibold'
                        : 'text-[#1c1b1b]'
                    }`}
                  >
                    {day}
                  </span>

                  {hasEvents && (
                    <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 flex items-center gap-0.5 justify-center">
                      {visibleDots.map((evt, evtIdx) => (
                        <span 
                          key={`${evt.id}-${evtIdx}`}
                          className={`text-[10px] md:text-[12px] font-bold leading-none ${
                            evt.type === 'past' 
                              ? 'text-[#c4b5b5]'
                              : 'text-[#912A55]'
                          }`}
                        >
                          ●
                        </span>
                      ))}
                      {overflowCount > 0 && (
                        <span className="text-[9px] md:text-[10px] font-sans font-semibold text-[#912A55] leading-none ml-0.5">
                          +{overflowCount}
                        </span>
                      )}
                    </div>
                  )}

                  {hasEvents && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-20 bg-[#303232] text-white text-[10px] py-1 px-2 uppercase tracking-wider whitespace-nowrap rounded shadow-md pointer-events-none">
                      {dayEvents[0].type === 'past' 
                        ? `View ${dayEvents.length} Past ${dayEvents.length === 1 ? 'Event' : 'Events'}`
                        : `${dayEvents.length} Upcoming ${dayEvents.length === 1 ? 'Event' : 'Events'}`
                      }
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
