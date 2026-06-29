import { ABOUT_VIDEO_PREVIEW } from '../data';

export default function AboutUs() {
  return (
    <section className="py-24 md:py-32 bg-[#FAF8F6]" id="about-us">
      <div className="px-6 md:px-16 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
          
          {/* Left Block: Beautiful static image preview */}
          <div className="md:col-span-5">
            <div 
              className="relative aspect-video bg-[#303232] rounded-lg shadow-md border border-[#8b1a2b]/20 overflow-hidden select-none pointer-events-none"
            >
              <div 
                className="w-full h-full bg-cover bg-center opacity-90"
                style={{ backgroundImage: `url(${ABOUT_VIDEO_PREVIEW})` }}
              />
            </div>
          </div>

          {/* Right Block: Pitch & Details */}
          <div className="md:col-span-7 space-y-6">
            <span className="font-sans text-xs font-semibold text-[#8b1a2b] uppercase tracking-[0.25em] block">
              ABOUT US
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#1C1B1B] leading-tight">
              What is Cherished Voices?
            </h2>
            <p className="font-sans text-base md:text-lg text-[#574141] leading-relaxed font-light">
              Cherished Voices is a premium audio &amp; video guestbook service where guests record heartfelt voice and video messages for the celebrant, preserving memories forever. Available for weddings, gatherings, and birthday celebrations.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
