import { useState, useEffect, useRef } from 'react';
import { Heart, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { getMoments } from '../lib/cms';
import { MOMENT_ITEMS } from '../data';
import { MomentItem } from '../types';

const getAspectClass = (aspect?: string) => {
  switch (aspect) {
    case '4/5':
      return 'aspect-[4/5]';
    case '9/16':
      return 'aspect-[9/16]';
    case 'square':
    default:
      return 'aspect-square';
  }
};

export default function Moments() {
  const [items, setItems] = useState<MomentItem[]>([]);
  const [selectedMomentIndex, setSelectedMomentIndex] = useState<number | null>(null);

  const loadMoments = async () => {
    try {
      const rows = await getMoments();
      setItems(rows.length > 0 ? rows : MOMENT_ITEMS);
    } catch (error) {
      console.error('Failed to load moments', error);
      setItems(MOMENT_ITEMS);
    }
  };

  // Fall back to static data if the DB has no rows yet
  useEffect(() => {
    void loadMoments();
  }, []);

  useEffect(() => {
    const refreshOnFocus = () => {
      void loadMoments();
    };

    const refreshOnVisibilityChange = () => {
      if (!document.hidden) {
        void loadMoments();
      }
    };

    window.addEventListener('focus', refreshOnFocus);
    document.addEventListener('visibilitychange', refreshOnVisibilityChange);

    return () => {
      window.removeEventListener('focus', refreshOnFocus);
      document.removeEventListener('visibilitychange', refreshOnVisibilityChange);
    };
  }, []);

  const scrollStripRef = useRef<HTMLDivElement>(null);

  const selectedMoment = selectedMomentIndex !== null ? items[selectedMomentIndex] : null;

  const handlePrev = () => {
    if (selectedMomentIndex === null) return;
    setSelectedMomentIndex((selectedMomentIndex - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    if (selectedMomentIndex === null) return;
    setSelectedMomentIndex((selectedMomentIndex + 1) % items.length);
  };

  useEffect(() => {
    if (selectedMomentIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'Escape') {
        setSelectedMomentIndex(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMomentIndex]);

  // Sync scroll strip with currently selected moment
  useEffect(() => {
    if (selectedMomentIndex === null || !scrollStripRef.current) return;
    const container = scrollStripRef.current;
    const cards = container.children;
    const target = cards[selectedMomentIndex] as HTMLElement;
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [selectedMomentIndex]);

  return (
    <section className="py-24 md:py-32 bg-white" id="moments">
      <div className="px-6 md:px-16">
        
        {/* Title Block */}
        <div className="text-center mb-16 space-y-4">
          <span className="font-sans text-xs font-semibold text-[#912A55] uppercase tracking-[0.25em] block">
            Captured Memories
          </span>
          <h2 className="font-serif text-4xl md:text-6xl font-light italic text-[#1C1B1B]">
            Moments
          </h2>
          <div className="w-12 h-[1px] bg-[#912A55] mx-auto mt-6" />
        </div>

        {/* Horizontal Scroll Strip */}
        <div ref={scrollStripRef} className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scrollbar-hide">
          {items.map((item, idx) => {
            const aspectClass = getAspectClass(item.aspect);

            const widths = [300, 380, 320, 420, 340, 360];
            const itemWidth = widths[idx] ?? 340;

            return (
              <div
                key={item.id}
                onClick={() => setSelectedMomentIndex(idx)}
                    className={`relative group overflow-hidden ${aspectClass} bg-[#e5e2e1] cursor-pointer shadow-md flex-shrink-0 w-[70vw] snap-start rounded-lg transition-all duration-300 ${selectedMomentIndex === idx ? 'ring-2 ring-[#912A55] shadow-lg' : ''}`}
                style={{ width: itemWidth }}
              >
                {/* Wedding tone overlay */}
                <div className="wedding-tone-overlay rounded-lg" />

                {/* Fade overlay on hover */}
                <div className="absolute inset-0 bg-[#912A55]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center z-10 gap-2 rounded-lg">
                  <Heart className="w-8 h-8 text-white fill-white animate-pulse" />
                  <span className="font-sans text-[10px] text-white uppercase tracking-[0.2em] font-medium">
                    View Story
                  </span>
                </div>

                {/* Image Asset */}
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105 rounded-lg wedding-tone"
                  style={{ backgroundImage: `url(${item.imageUrl})` }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {selectedMoment && (
        <div 
          className="fixed inset-0 z-[100] modal-backdrop flex items-center justify-center p-3 sm:p-4"
          onClick={() => setSelectedMomentIndex(null)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#912A55] p-2.5 sm:p-3 rounded-full z-[110] transition-all duration-300 hover:scale-110 shadow-xl cursor-pointer backdrop-blur-sm"
            aria-label="Previous Moment"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#912A55] p-2.5 sm:p-3 rounded-full z-[110] transition-all duration-300 hover:scale-110 shadow-xl cursor-pointer backdrop-blur-sm"
            aria-label="Next Moment"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <div 
            key={selectedMomentIndex}
            className="bg-[#F4DCEA]/90 w-full max-w-[540px] sm:max-w-[480px] md:max-w-[520px] rounded-2xl shadow-2xl overflow-hidden relative border border-[#D9BDD0]/40 animate-[fadeIn_0.4s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedMomentIndex(null)}
              className="absolute top-3 right-3 bg-[#912A55]/60 hover:bg-[#912A55]/80 text-white p-2 rounded-full z-20 transition-all cursor-pointer"
              aria-label="Close Preview"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <div
                className={`${getAspectClass(selectedMoment.aspect)} w-full overflow-hidden bg-black relative animate-[slideIn_0.4s_cubic-bezier(0.4,0,0.2,1)]`}
              >
              <div
                className="w-full h-full bg-contain bg-no-repeat bg-center"
                style={{ backgroundImage: `url(${selectedMoment.imageUrl})` }}
              />
            </div>

            <div className="p-4 sm:p-5 md:p-6 space-y-2.5">
              <span className="font-sans text-[10px] font-semibold text-[#912A55] uppercase tracking-widest block">
                Cherished Moments
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-light italic text-[#1c1b1b]">
                {selectedMoment.caption}
              </h3>
              <p className="font-[family-name:--font-body] text-sm sm:text-base text-[#5e5e5d] leading-relaxed">
                {selectedMoment.description ?? 'A pristine, tangible record of the laughter, words of wisdom, and raw emotion shared at this premium celebration.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
