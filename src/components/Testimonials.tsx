import { useState, useEffect } from 'react';
import { Testimonial } from '../types';
import { getTestimonials } from '../lib/cms';

function TestimonialCard({ quote, name, photoUrl }: { quote: string; name: string; photoUrl?: string }) {
  return (
    <div className="flex-shrink-0 mx-5 w-[300px] md:w-[360px]">
      <div className="message-bubble-received">
        <p className="font-sans text-[13px] md:text-[14px] text-[#1C1820] leading-relaxed mb-3">
          {quote}
        </p>
        <div className="flex items-center justify-between gap-3">
          <span className="font-sans text-xs font-semibold text-[#912A55] uppercase tracking-[0.08em]">
            {name}
          </span>
          {photoUrl && (
            <img
              src={photoUrl}
              alt={name}
              className="w-11 h-11 md:w-12 md:h-12 rounded-full flex-shrink-0 object-cover border border-[#D9BDD0]/30"
            />
          )}
        </div>
      </div>
    </div>
  );
}

function splitRows(items: Testimonial[]): [Testimonial[], Testimonial[]] {
  const row1: Testimonial[] = [];
  const row2: Testimonial[] = [];
  items.forEach((item, i) => {
    if (i % 2 === 0) row1.push(item);
    else row2.push(item);
  });
  return [row1, row2];
}

function MarqueeRow({
  data,
  reverse = false,
}: {
  data: Testimonial[];
  reverse?: boolean;
}) {
  const doubled = [...data, ...data];

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="marquee-track flex w-max min-w-full"
        style={{
          animationName: 'marqueeScroll',
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {doubled.map((item, i) => (
          <TestimonialCard
            key={`${item.id}-${i}`}
            quote={item.quote}
            name={item.name}
            photoUrl={item.photoUrl}
          />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [items, setItems] = useState<Testimonial[]>([]);

  useEffect(() => {
    getTestimonials().then(setItems);
  }, []);

  const [row1, row2] = splitRows(items);

  return (
    <>
      <style>{`
        .message-bubble-received {
          background-color: #ffffff;
          color: #1C1820;
          border-radius: 1.15rem;
          line-height: 1.35;
          padding: 0.875rem 1.125rem;
          position: relative;
          word-wrap: break-word;
        }
        .message-bubble-received::before,
        .message-bubble-received::after {
          bottom: -0.1rem;
          content: "";
          height: 1rem;
          position: absolute;
        }
        .message-bubble-received::before {
          border-bottom-right-radius: 0.8rem 0.7rem;
          border-left: 1rem solid #ffffff;
          left: -0.35rem;
          transform: translate(0, -0.1rem);
        }
        .message-bubble-received::after {
          background-color: #F8F4F7;
          border-bottom-right-radius: 0.5rem;
          left: 20px;
          transform: translate(-30px, -2px);
          width: 10px;
        }
        .marquee-track {
          will-change: transform;
          backface-visibility: hidden;
        }
        @keyframes marqueeScroll {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @media (max-width: 767px) {
          .marquee-track {
            animation-duration: 15s !important;
          }
        }
        @media (min-width: 768px) {
          .marquee-track {
            animation-duration: 25s !important;
          }
        }
      `}</style>

      <section className="py-16 md:py-24 bg-[#F8F4F7] overflow-hidden" id="testimonials">
        <div className="px-6 md:px-16">

          <div className="text-center mb-12 space-y-4">
            <h2 className="font-serif text-4xl md:text-6xl font-light italic text-[#1C1820]">
              What They Say
            </h2>
            <div className="w-12 h-[1px] bg-[#912A55] mx-auto mt-6" />
          </div>

          <div className="flex flex-col gap-8">
            <MarqueeRow data={row1} reverse={true} />
            <MarqueeRow data={row2} reverse={false} />
          </div>
        </div>
      </section>
    </>
  );
}
