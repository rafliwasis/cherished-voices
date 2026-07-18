import { useRef, useState, useCallback } from 'react';
import { X, MapPin, Camera, Play, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { CalendarEvent } from '../types';

const WHATSAPP_NUMBER = '6281234567890';
const WHATSAPP_MESSAGE = 'Hi Cherished Voices, I would like to inquire about booking for';

interface EventModalProps {
  events: CalendarEvent[] | null;
  selectedDate: string;
  onClose: () => void;
  onSelectInquiryDate: (dateString: string) => void;
}

export default function EventModal({ events, selectedDate, onClose }: EventModalProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const scrollTo = useCallback((index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const card = container.children[index] as HTMLElement;
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
    setActiveSlide(index);
  }, []);

  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const totalCards = container.children.length;
    if (totalCards < 2) return;
    const cardWidth = container.scrollWidth / totalCards;
    const newIndex = Math.round(container.scrollLeft / cardWidth);
    if (newIndex !== activeSlide && newIndex < totalCards) {
      setActiveSlide(newIndex);
    }
  }, [activeSlide]);

  if (!events || !selectedDate) return null;

  const hasEvents = events.length > 0;
  const dateStr = selectedDate;

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const isPast = dateStr < todayStr;
  const isFuture = dateStr > todayStr;
  const shouldShowWhatsAppCTA = isFuture;

  const formatDateString = (dateStr: string) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 transition-all duration-300">
      <div className="bg-[#FCF9F8] w-full max-w-2xl rounded-lg shadow-2xl relative overflow-hidden border border-[#debfbf]/30 flex flex-col max-h-[90vh]">
        
        {/* Close Button top-right */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-[#574141] hover:text-[#690018] p-1.5 bg-[#f0eded]/80 hover:bg-[#eae7e7] rounded-full z-10 transition-colors cursor-pointer"
          aria-label="Close Modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 md:p-8 bg-white border-b border-[#debfbf]/20 flex-shrink-0">
          <span className="font-sans text-[10px] font-semibold text-[#8b1a2b] uppercase tracking-[0.25em] mb-1.5 block">
            Date Schedule
          </span>
          <h3 className="font-serif text-xl md:text-2xl font-semibold text-[#1c1b1b]">
            {formatDateString(dateStr)}
          </h3>
        </div>

        <div className="p-6 md:p-8 overflow-y-auto flex-1">
          {!hasEvents ? (
            shouldShowWhatsAppCTA ? (
              <div className="text-center py-8 space-y-6 max-w-md mx-auto">
                <div className="w-12 h-12 bg-[#ffdada] text-[#690018] rounded-full flex items-center justify-center mx-auto">
                  <Sparkles className="w-5 h-5" />
                </div>
                
                <div className="space-y-3">
                  <p className="font-sans text-xs md:text-sm text-[#5e5e5d] leading-relaxed">
                    This date may still be available for booking. Contact us to confirm availability or discuss your event.
                  </p>
                </div>

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`${WHATSAPP_MESSAGE} ${formatDateString(dateStr)}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#912A55] text-white hover:bg-[#B05480] font-sans text-xs font-semibold uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98] rounded-full cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                  </svg>
                  Connect via WhatsApp
                </a>
              </div>
            ) : (
              <div className="text-center py-8 space-y-6 max-w-md mx-auto">
                <div className="w-12 h-12 bg-[#e5e2e1] text-[#5e5e5d] rounded-full flex items-center justify-center mx-auto">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="space-y-3">
                  <p className="font-sans text-xs md:text-sm text-[#5e5e5d] leading-relaxed">
                    This date has passed and no events were recorded.
                  </p>
                </div>
              </div>
            )
          ) : isPast ? (
            /* PAST EVENTS VIEW: Horizontal carousel with dot navigation */
            <div className="relative">
              {/* Arrow buttons */}
              {events.length > 1 && (
                <>
                  <button
                    onClick={() => scrollTo(Math.max(0, activeSlide - 1))}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 z-10 w-8 h-8 bg-white/90 hover:bg-white text-[#912A55] shadow-md rounded-full flex items-center justify-center transition-all cursor-pointer"
                    aria-label="Previous event"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => scrollTo(Math.min(events.length - 1, activeSlide + 1))}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 z-10 w-8 h-8 bg-white/90 hover:bg-white text-[#912A55] shadow-md rounded-full flex items-center justify-center transition-all cursor-pointer"
                    aria-label="Next event"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {/* Carousel track */}
              <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory gap-5 pb-2 scrollbar-hide -mx-2 px-2"
              >
                {events.map((evt) => {
                  const hasHighlights = evt.highlightsCount && evt.highlightsCount > 0;

                  return (
                    <div
                      key={evt.id}
                      className="snap-start shrink-0 w-[80vw] max-w-[460px] min-w-[250px] bg-white p-5 rounded-lg border border-[#debfbf]/20 shadow-sm flex flex-col justify-between"
                    >
                      {/* Event Name & Location */}
                      <div className="space-y-2 mb-4">
                        <h4 className="font-serif text-lg font-semibold text-[#1c1b1b]">
                          {evt.title}
                        </h4>
                        <div className="flex items-center gap-1.5 text-xs text-[#574141] font-sans">
                          <MapPin className="w-3.5 h-3.5 text-[#8b1a2b]" />
                          <span>{evt.location}</span>
                        </div>
                      </div>

                      {/* Video Highlights / Moments Placeholder */}
                      <div className="mt-2">
                        <span className="font-sans text-[9px] font-bold text-[#8b1a2b] uppercase tracking-widest block mb-2">
                          Video Highlights
                        </span>

                        {hasHighlights ? (
                          /* Beautiful simulated play reel */
                          <div className="aspect-video bg-[#eae7e7] rounded-md flex flex-col items-center justify-center relative overflow-hidden group select-none">
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/15 transition-colors duration-300" />
                            <div className="w-12 h-12 bg-[#690018]/95 hover:bg-[#8b1a2b] rounded-full flex items-center justify-center text-white shadow-md transition-transform duration-300 group-hover:scale-105 z-10">
                              <Play className="w-5 h-5 fill-current ml-0.5" />
                            </div>
                          </div>
                        ) : (
                          /* Placeholder: Camera icon & label "Moments coming soon" */
                          <div className="aspect-video bg-[#faf8f6] border border-dashed border-[#debfbf]/40 rounded-md flex flex-col items-center justify-center gap-1.5 text-[#8b7171]/60 p-4 text-center select-none">
                            <Camera className="w-6 h-6 text-[#8b7171]/40" />
                            <span className="font-sans text-[10px] font-semibold uppercase tracking-wider text-[#5e5e5d]">
                              Moments coming soon
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Dots navigation */}
              {events.length > 1 && (
                <div className="flex items-center justify-center gap-2 mt-5">
                  {events.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => scrollTo(idx)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        idx === activeSlide
                          ? 'bg-[#912A55] w-5'
                          : 'bg-[#D9BDD0] hover:bg-[#912A55]/50'
                      }`}
                      aria-label={`Go to event ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 space-y-6 max-w-md mx-auto">
              <div className="w-12 h-12 bg-[#ffdada] text-[#690018] rounded-full flex items-center justify-center mx-auto">
                <Sparkles className="w-5 h-5" />
              </div>
              
              <div className="space-y-3">
                <h4 className="font-serif text-lg md:text-xl font-semibold text-[#1c1b1b]">
                  There {events.length === 1 ? 'is' : 'are'} {events.length} {events.length === 1 ? 'event' : 'events'} on this date
                </h4>
                <p className="font-sans text-xs md:text-sm text-[#5e5e5d] leading-relaxed">
                  This date may still be available for booking. Contact us to confirm availability or discuss your event.
                </p>
              </div>

              {shouldShowWhatsAppCTA && (
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`${WHATSAPP_MESSAGE} ${formatDateString(dateStr)}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#912A55] text-white hover:bg-[#B05480] font-sans text-xs font-semibold uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98] rounded-full cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                  </svg>
                  Connect via WhatsApp
                </a>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#f0eded]/40 border-t border-[#debfbf]/10 text-center flex-shrink-0 select-none">
          <p className="font-sans text-[9px] text-[#5e5e5d] uppercase tracking-widest flex items-center justify-center gap-1">
            Cherished Voices
          </p>
        </div>

      </div>
    </div>
  );
}
