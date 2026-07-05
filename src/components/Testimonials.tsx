import { TESTIMONIALS_ROW1, TESTIMONIALS_ROW2 } from '../data';

function TestimonialCard({ quote, author }: { quote: string; author: string }) {
  return (
    <div className="flex-shrink-0 mx-5 w-[300px] md:w-[360px]">
      <div className="message-bubble-received">
        <p className="font-sans text-[13px] md:text-[14px] text-[#1C1820] leading-relaxed mb-3">
          {quote}
        </p>
        <span className="font-sans text-[9px] font-semibold text-[#912A55] uppercase tracking-[0.08em] block">
          {author}
        </span>
      </div>
    </div>
  );
}

function MarqueeRow({
  data,
  reverse = false,
}: {
  data: typeof TESTIMONIALS_ROW1;
  reverse?: boolean;
}) {
  const doubled = [...data, ...data];

  return (
    <div className="relative w-full overflow-hidden">
      <div className="pointer-events-none absolute left-0 top-0 h-full w-20 md:w-32 z-10 bg-gradient-to-r from-[#F8F4F7] to-transparent" />
      <div
        className="flex min-w-[200%]"
        style={{
          animation: `marqueeScroll 25s linear infinite`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {doubled.map((item, i) => (
          <TestimonialCard
            key={`${item.id}-${i}`}
            quote={item.quote}
            author={item.author}
          />
        ))}
      </div>
      <div className="pointer-events-none absolute right-0 top-0 h-full w-20 md:w-32 z-10 bg-gradient-to-l from-[#F8F4F7] to-transparent" />
    </div>
  );
}

export default function Testimonials() {
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
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <section className="py-16 md:py-24 bg-[#F8F4F7] overflow-hidden" id="testimonials">
        <div className="px-6 md:px-16">

          <div className="text-center mb-12 space-y-4">
            <span className="font-sans text-xs font-semibold text-[#912A55] uppercase tracking-[0.25em] block">
              What They Say
            </span>
            <h2 className="font-serif text-4xl md:text-6xl font-light italic text-[#1C1820]">
              Testimonials
            </h2>
            <div className="w-12 h-[1px] bg-[#912A55] mx-auto mt-6" />
          </div>

          <div className="flex flex-col gap-8">
            <MarqueeRow data={TESTIMONIALS_ROW1} reverse={true} />
            <MarqueeRow data={TESTIMONIALS_ROW2} reverse={false} />
          </div>
        </div>
      </section>
    </>
  );
}
