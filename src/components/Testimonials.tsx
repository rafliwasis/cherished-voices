import { TESTIMONIALS } from '../data';

export default function Testimonials() {
  return (
    <section className="py-24 md:py-32 bg-[#FAF8F6] overflow-hidden" id="testimonials">
      <div className="px-6 md:px-16 max-w-[1200px] mx-auto">
        
        {/* Title Block */}
        <div className="text-center mb-16 space-y-4">
          <span className="font-sans text-xs font-semibold text-[#8b1a2b] uppercase tracking-[0.25em] block">
            What They Say
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-[#1C1B1B]">
            Testimonials
          </h2>
          <div className="w-12 h-[1px] bg-[#690018] mx-auto mt-6" />
        </div>

        {/* Floating Chat Bubbles Area */}
        <div className="relative min-h-[450px] md:min-h-[550px] max-w-5xl mx-auto select-none">
          
          {/* Bubble 1 - Top Left */}
          <div className="absolute top-[5%] left-[2%] md:left-[8%] animate-drift delay-1">
            <div className="bg-white px-8 py-5 rounded-3xl rounded-bl-none shadow-sm max-w-[280px] md:max-w-xs border border-[#debfbf]/10">
              <p className="font-sans text-xs md:text-sm text-[#1C1B1B] italic leading-relaxed mb-3">
                "{TESTIMONIALS[0].quote}"
              </p>
              <span className="font-sans text-[10px] font-bold text-[#8b1a2b] uppercase tracking-wider">
                — {TESTIMONIALS[0].author}
              </span>
            </div>
          </div>

          {/* Bubble 2 - Top Right */}
          <div className="absolute top-[18%] right-[2%] md:right-[10%] animate-drift delay-2">
            <div className="bg-white px-8 py-5 rounded-3xl rounded-br-none shadow-sm max-w-[280px] md:max-w-xs border border-[#debfbf]/10">
              <p className="font-sans text-xs md:text-sm text-[#1C1B1B] italic leading-relaxed mb-3">
                "{TESTIMONIALS[1].quote}"
              </p>
              <span className="font-sans text-[10px] font-bold text-[#8b1a2b] uppercase tracking-wider">
                — {TESTIMONIALS[1].author}
              </span>
            </div>
          </div>

          {/* Bubble 3 - Mid Left-Center */}
          <div className="absolute top-[44%] left-[6%] md:left-[22%] animate-drift delay-3">
            <div className="bg-white px-8 py-5 rounded-3xl rounded-bl-none shadow-sm max-w-[280px] md:max-w-sm border border-[#debfbf]/10">
              <p className="font-sans text-xs md:text-sm text-[#1C1B1B] italic leading-relaxed mb-3">
                "{TESTIMONIALS[2].quote}"
              </p>
              <span className="font-sans text-[10px] font-bold text-[#8b1a2b] uppercase tracking-wider">
                — {TESTIMONIALS[2].author}
              </span>
            </div>
          </div>

          {/* Bubble 4 - Bottom Right-Center */}
          <div className="absolute bottom-[8%] right-[4%] md:right-[18%] animate-drift delay-4">
            <div className="bg-white px-8 py-5 rounded-3xl rounded-br-none shadow-sm max-w-[280px] md:max-w-xs border border-[#debfbf]/10">
              <p className="font-sans text-xs md:text-sm text-[#1C1B1B] italic leading-relaxed mb-3">
                "{TESTIMONIALS[3].quote}"
              </p>
              <span className="font-sans text-[10px] font-bold text-[#8b1a2b] uppercase tracking-wider">
                — {TESTIMONIALS[3].author}
              </span>
            </div>
          </div>

          {/* Bubble 5 - Desktop Only Right Edge */}
          <div className="hidden md:block absolute top-[62%] right-[2%] animate-drift delay-1">
            <div className="bg-white px-8 py-5 rounded-3xl rounded-br-none shadow-sm max-w-xs border border-[#debfbf]/10">
              <p className="font-sans text-xs md:text-sm text-[#1C1B1B] italic leading-relaxed mb-3">
                "{TESTIMONIALS[4].quote}"
              </p>
              <span className="font-sans text-[10px] font-bold text-[#8b1a2b] uppercase tracking-wider">
                — {TESTIMONIALS[4].author}
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
