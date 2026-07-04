export default function AboutUs() {
  return (
    <section className="py-24 md:py-32 bg-[#FAF8F6]" id="about-us">
      <div className="px-6 md:px-16 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
          
          {/* Left Block: Video */}
          <div className="md:col-span-4">
            <div className="relative aspect-[3/4] bg-[#303232] rounded-lg shadow-md border border-[#8b1a2b]/20 overflow-hidden">
              <div className="wedding-tone-overlay rounded-lg" />
              <video
                className="w-full h-full object-cover wedding-tone"
                src="/about-video.mp4"
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          </div>

          {/* Right Block: Pitch & Details */}
          <div className="md:col-span-8 space-y-6">
            <span className="font-sans text-xs font-semibold text-[#912A55] uppercase tracking-[0.25em] block">
              ABOUT US
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-light italic text-[#1C1B1B] leading-tight">
              What is Cherished Voices?
            </h2>
            <p className="font-[family-name:--font-body] text-lg md:text-xl text-[#574141] leading-relaxed">
              Cherished Voices is a premium audio &amp; video guestbook service where guests record heartfelt voice and video messages for the celebrant, preserving memories forever. Available for weddings, gatherings, and birthday celebrations.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
