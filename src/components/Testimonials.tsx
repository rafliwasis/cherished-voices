import { TESTIMONIALS } from '../data';

function TestimonialCard({ quote, author, index }: { quote: string; author: string; index: number; key?: string }) {
  const tailSide = index % 2 === 0 ? 'left' : 'right';
  const radiusClass = tailSide === 'left'
    ? 'rounded-3xl rounded-bl-sm'
    : 'rounded-3xl rounded-br-sm';

  return (
    <div className="flex-shrink-0 w-[85vw] md:w-[420px] mr-6">
      <div className={`bg-white px-7 py-7 ${radiusClass} shadow-sm border border-[#D9BDD0]/20`}>
        <p className="font-[family-name:--font-body] text-base text-[#1C1820] italic leading-relaxed mb-3">
          "{quote}"
        </p>
        <span className="font-sans text-[10px] font-bold text-[#912A55] uppercase tracking-wider">
          — {author}
        </span>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-24 md:py-32 bg-[#F8F4F7] overflow-hidden" id="testimonials">
      <div className="px-6 md:px-16">

        <div className="text-center mb-16 space-y-4">
          <span className="font-sans text-xs font-semibold text-[#912A55] uppercase tracking-[0.25em] block">
            What They Say
          </span>
          <h2 className="font-serif text-4xl md:text-6xl font-light italic text-[#1C1820]">
            Testimonials
          </h2>
          <div className="w-12 h-[1px] bg-[#912A55] mx-auto mt-6" />
        </div>

        <div className="relative">
          {/* Edge fade masks */}
          <div className="absolute inset-y-0 left-0 w-12 md:w-24 z-10 bg-gradient-to-r from-[#F8F4F7] to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-12 md:w-24 z-10 bg-gradient-to-l from-[#F8F4F7] to-transparent pointer-events-none" />

          <div className="overflow-hidden select-none">
            <div className="flex w-max animate-marquee">
              {[...TESTIMONIALS, ...TESTIMONIALS].map((item, i) => (
                <TestimonialCard
                  key={`${item.id}-${i}`}
                  quote={item.quote}
                  author={item.author}
                  index={i}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
