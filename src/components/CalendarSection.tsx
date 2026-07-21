import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { supabasePublic } from '../lib/supabase';
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
    const todayStr = getTodayString();
    supabasePublic
      .from('calendar_events')
      .select('id, date, title, location, type, highlights_count')
      .then(({ data, error }) => {
        if (error) {
          console.error('Failed to load calendar events', error);
          return;
        }
        setEvents(
          (data ?? []).map((row) => ({
            id: row.id,
            date: row.date,
            title: row.title,
            location: row.location ?? '',
            type: (row.type as CalendarEvent['type']) ?? (row.date < todayStr ? 'past' : 'upcoming'),
            highlightsCount: row.highlights_count,
          }))
        );
      });
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const thisMonthCount = events.filter(e => {
    const [y, m] = e.date.split('-');
    return Number(y) === year && Number(m) === month + 1;
  }).length;

  const maxDateStr = events.reduce((max, e) => e.date > max ? e.date : max, '');
  const maxDateFormatted = maxDateStr
    ? new Date(maxDateStr + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : '';

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
    <section className="py-24 md:py-32 bg-[#912A55]" id="calendar">
      <div className="px-6 md:px-16 max-w-[1200px] mx-auto">
        
        {/* Title block */}
        <div className="text-center mb-14">
          <h2 className="font-serif text-4xl md:text-6xl font-light italic text-white">
            Our Calendar
          </h2>
          <div className="w-12 h-[1px] bg-white mx-auto mt-5" />
        </div>

        {/* Dynamic Month Selector */}
        <div className="flex items-center justify-center gap-3 mb-5 select-none">
          <button
            onClick={handlePrevMonth}
            className="p-1 text-white/60 hover:text-white transition-colors cursor-pointer"
            aria-label="Previous Month"
          >
            <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
          </button>
          
          <h3 className="font-serif text-3xl font-light italic text-white min-w-[180px] text-center">
            {MONTHS[month]} {year}
          </h3>

          <button
            onClick={handleNextMonth}
            className="p-1 text-white/60 hover:text-white transition-colors cursor-pointer"
            aria-label="Next Month"
          >
            <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>

        {/* Stat 1: This month count */}
        {thisMonthCount > 0 && (
          <p className="font-serif text-base md:text-lg font-medium italic text-white tracking-wide text-center mb-8">
            {thisMonthCount} celebrations entrusted to us this month!
          </p>
        )}

        {/* Refined Grid Box */}
        <div className="max-w-4xl mx-auto border border-[#debfbf]/20 bg-white p-6 md:p-8 rounded-lg shadow-sm">
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
              const hOffset = isToday ? 24 : 14;
              const hc = Math.min(dayEvents.length, 4);
              const topN = hc <= 2 ? 0 : hc === 3 ? 1 : 2;
              const bottomN = hc - topN;
              const overflowCount = dayEvents.length - 4;
              const h = (key: number) => (
                <Heart key={key} className="w-1.5 h-1.5 md:w-2 md:h-2 text-[#912A55] fill-[#912A55]" />
              );

              const fallbackType = formattedDate < getTodayString() ? 'past' : 'upcoming';
              return (
                <div
                  key={`day-${day}`}
                  onClick={() => onOpenEventModal(dayEvents[0] || { id: 'empty', date: formattedDate, title: '', location: '', type: fallbackType } as CalendarEvent, dayEvents.length > 0 ? dayEvents : [])}
                  className={`h-16 md:h-20 flex flex-col items-center justify-center relative transition-all rounded-sm cursor-pointer hover:bg-[#690018]/5 group ${
                    hasEvents ? '' : 'text-[#1c1b1b]'
                  }`}
                >
                  <span 
                    className={`font-sans text-sm md:text-base font-medium flex items-center justify-center relative z-10 ${
                      isToday
                        ? 'w-10 h-10 bg-[#F4DCEA] rounded-full text-[#912A55] font-semibold'
                        : 'text-[#1c1b1b]'
                    }`}
                  >
                    {day}
                  </span>

                  {hasEvents && topN > 0 && (
                    <div
                      className="absolute left-1/2 flex justify-center leading-none"
                      style={{ bottom: `calc(50% + ${hOffset}px)`, transform: 'translateX(-50%)' }}
                    >
                      {topN === 1 ? h(0) : <span className="flex gap-px">{h(0)}{h(1)}</span>}
                    </div>
                  )}

                  {hasEvents && bottomN > 0 && (
                    <div
                      className="absolute left-1/2 flex justify-center leading-none"
                      style={{ top: `calc(50% + ${hOffset}px)`, transform: 'translateX(-50%)' }}
                    >
                      {bottomN === 1 ? h(topN) : <span className="flex gap-px">{h(topN)}{h(topN + 1)}</span>}
                    </div>
                  )}

                  {hasEvents && overflowCount > 0 && (
                    <span
                      className="absolute left-1/2 font-sans font-semibold text-[#912A55] leading-none"
                      style={{ top: 'calc(50% + 22px)', transform: 'translateX(-50%)' }}
                    >
                      +{overflowCount}
                    </span>
                  )}

                  {hasEvents && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-20 bg-[#303232] text-white text-[10px] py-1 px-2 uppercase tracking-wider whitespace-nowrap rounded shadow-md pointer-events-none">
                      {formattedDate < getTodayString()
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

        {/* Stat 2: Commitment line */}
        {maxDateFormatted && (
          <p className="font-serif text-xl md:text-2xl font-medium italic text-white tracking-wide text-center mt-10">
            Our calendar is reserved through {maxDateFormatted}
          </p>
        )}

      </div>
    </section>
  );
}
