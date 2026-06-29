import { X, MapPin, Camera, Play, Sparkles } from 'lucide-react';
import { CalendarEvent } from '../types';

interface EventModalProps {
  events: CalendarEvent[] | null;
  onClose: () => void;
  onSelectInquiryDate: (dateString: string) => void;
}

export default function EventModal({ events, onClose }: EventModalProps) {
  if (!events || events.length === 0) return null;

  const firstEvent = events[0];
  const isPast = firstEvent.type === 'past';

  // Format date helper
  const formatDateString = (dateStr: string) => {
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

        {/* Modal Header */}
        <div className="p-6 md:p-8 bg-white border-b border-[#debfbf]/20 flex-shrink-0">
          <span className="font-sans text-[10px] font-semibold text-[#8b1a2b] uppercase tracking-[0.25em] mb-1.5 block">
            {isPast ? 'Celebration Archives' : 'Date Schedule'}
          </span>
          <h3 className="font-serif text-xl md:text-2xl font-semibold text-[#1c1b1b]">
            {formatDateString(firstEvent.date)}
          </h3>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1">
          {isPast ? (
            /* PAST EVENTS VIEW: Lists cards vertically stacked downwards */
            <div className="flex flex-col gap-6">
              {events.map((evt) => {
                const hasHighlights = evt.highlightsCount && evt.highlightsCount > 0;

                return (
                  <div 
                    key={evt.id} 
                    className="bg-white p-5 rounded-lg border border-[#debfbf]/20 shadow-sm flex flex-col justify-between"
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
          ) : (
            /* UPCOMING EVENTS VIEW: Minimal modal, NO CTA button */
            <div className="text-center py-8 space-y-6 max-w-md mx-auto">
              <div className="w-12 h-12 bg-[#ffdada] text-[#690018] rounded-full flex items-center justify-center mx-auto">
                <Sparkles className="w-5 h-5" />
              </div>
              
              <div className="space-y-3">
                <h4 className="font-serif text-lg md:text-xl font-semibold text-[#1c1b1b]">
                  There are {events.length} {events.length === 1 ? 'event' : 'events'} on this date
                </h4>
                <p className="font-sans text-xs md:text-sm text-[#5e5e5d] leading-relaxed">
                  Want to know more or book this date? Reach out to us directly.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#f0eded]/40 border-t border-[#debfbf]/10 text-center flex-shrink-0 select-none">
          <p className="font-sans text-[9px] text-[#5e5e5d] uppercase tracking-widest flex items-center justify-center gap-1">
            Cherished Voices Premium Experience
          </p>
        </div>

      </div>
    </div>
  );
}
