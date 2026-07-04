import { TESTIMONIALS } from '../data';

// Assigns alternating tail directions and stagger offsets to cards in each column
const leftCards  = [0, 2, 4]; // indices in TESTIMONIALS
const rightCards = [1, 3];

interface BubbleProps {
  index: number;
  tailSide: 'left' | 'right';
  offsetClass: string;
  delayClass: string;
}

function TestimonialBubble({ index, tailSide, offsetClass, delayClass }: BubbleProps) {
  const radiusClass = tailSide === 'left'
    ? 'rounded-3xl rounded-bl-sm'
    : 'rounded-3xl rounded-br-sm';

  return (
    <div className={`animate-drift ${delayClass} ${offsetClass}`}>
      <div className={`bg-white px-7 py-5 ${radiusClass} shadow-sm border border-[#D9BDD0]/20 w-full`}>
        <p className="font-[family-name:--font-body] text-base text-[#1C1820] italic leading-relaxed mb-3">
          "{TESTIMONIALS[index].quote}"
        </p>
        <span className="font-sans text-[10px] font-bold text-[#912A55] uppercase tracking-wider">
          — {TESTIMONIALS[index].author}
        </span>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-24 md:py-32 bg-[#F8F4F7] overflow-hidden" id="testimonials">
      <div className="px-6 md:px-16 max-w-[1200px] mx-auto">

        {/* Title Block */}
        <div className="text-center mb-16 space-y-4">
          <span className="font-sans text-xs font-semibold text-[#912A55] uppercase tracking-[0.25em] block">
            What They Say
          </span>
          <h2 className="font-serif text-4xl md:text-6xl font-light italic text-[#1C1820]">
            Testimonials
          </h2>
          <div className="w-12 h-[1px] bg-[#912A55] mx-auto mt-6" />
        </div>

        {/* 
          Two-column staggered layout — no absolute positioning so cards never overlap.
          Left column has 3 cards (indices 0,2,4), right column has 2 cards (1,3).
          Each column shifts vertically with mt- to create an organic feel.
        */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start select-none">

          {/* Left Column */}
          <div className="flex flex-col gap-6">
            <TestimonialBubble index={0} tailSide="left"  offsetClass="md:mr-4"  delayClass="delay-1" />
            <TestimonialBubble index={2} tailSide="left"  offsetClass="md:ml-8"  delayClass="delay-3" />
            <TestimonialBubble index={4} tailSide="left"  offsetClass="md:mr-2"  delayClass="delay-2" />
          </div>

          {/* Right Column — offset downward to stagger vs left */}
          <div className="flex flex-col gap-6 md:mt-16">
            <TestimonialBubble index={1} tailSide="right" offsetClass="md:ml-4"  delayClass="delay-2" />
            <TestimonialBubble index={3} tailSide="right" offsetClass="md:mr-6"  delayClass="delay-4" />
          </div>

        </div>
      </div>
    </section>
  );
}
