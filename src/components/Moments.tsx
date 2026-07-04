import { useState } from 'react';
import { Heart, X, ZoomIn } from 'lucide-react';
import { MOMENT_ITEMS } from '../data';
import { MomentItem } from '../types';

export default function Moments() {
  const [selectedMoment, setSelectedMoment] = useState<MomentItem | null>(null);

  // Split items into 3 columns for asymmetric masonry look matching the original screenshot
  const col1 = [MOMENT_ITEMS[0], MOMENT_ITEMS[2]]; // Aspect 3/4, Aspect square
  const col2 = [MOMENT_ITEMS[1], MOMENT_ITEMS[3]]; // Aspect square, Aspect 3/4
  const col3 = [MOMENT_ITEMS[4], MOMENT_ITEMS[5]]; // Aspect 4/5, Aspect square

  const renderColumn = (items: MomentItem[]) => {
    return (
      <div className="flex flex-col gap-3">
        {items.map((item) => {
          const aspectClass = 
            item.aspect === '3/4' ? 'aspect-[3/4]' :
            item.aspect === '4/5' ? 'aspect-[4/5]' :
            'aspect-square';

          return (
            <div
              key={item.id}
              onClick={() => setSelectedMoment(item)}
              className={`relative group overflow-hidden ${aspectClass} bg-[#e5e2e1] cursor-pointer shadow-sm`}
            >
              {/* Fade overlay on hover */}
              <div className="absolute inset-0 bg-[#912A55]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center z-10 gap-2">
                <Heart className="w-8 h-8 text-white fill-white animate-pulse" />
                <span className="font-sans text-[10px] text-white uppercase tracking-[0.2em] font-medium">
                  View Story
                </span>
              </div>

              {/* Image Asset */}
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${item.imageUrl})` }}
              />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <section className="py-24 md:py-32 bg-white" id="moments">
      <div className="px-6 md:px-16 max-w-[1200px] mx-auto">
        
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

        {/* 3-Column Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {renderColumn(col1)}
          {renderColumn(col2)}
          {renderColumn(col3)}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedMoment && (
        <div 
          className="fixed inset-0 z-[100] modal-backdrop flex items-center justify-center p-4"
          onClick={() => setSelectedMoment(null)}
        >
          <div 
            className="bg-[#F4DCEA]/90 max-w-2xl w-full rounded-2xl shadow-2xl overflow-hidden relative border border-[#D9BDD0]/40"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedMoment(null)}
              className="absolute top-4 right-4 bg-[#912A55]/60 hover:bg-[#912A55]/80 text-white p-2 rounded-full z-20 transition-all cursor-pointer"
              aria-label="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Display Image */}
            <div className="aspect-[4/3] w-full overflow-hidden bg-black relative">
              <div
                className="w-full h-full bg-contain bg-no-repeat bg-center"
                style={{ backgroundImage: `url(${selectedMoment.imageUrl})` }}
              />
            </div>

            {/* Caption details block */}
            <div className="p-6 md:p-8 space-y-3">
              <span className="font-sans text-[10px] font-semibold text-[#912A55] uppercase tracking-widest block">
                Cherished Archive
              </span>
              <h3 className="font-serif text-2xl font-light italic text-[#1c1b1b]">
                {selectedMoment.caption}
              </h3>
              <p className="font-[family-name:--font-body] text-base text-[#5e5e5d] leading-relaxed">
                A pristine, tangible record of the laughter, words of wisdom, and raw emotion shared at this premium celebration.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
