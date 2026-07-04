import { ChevronDown } from 'lucide-react';
import { HERO_BG_IMAGE } from '../data';

interface HeroProps {
  onCheckAvailability: () => void;
  onContactUs: () => void;
}

export default function Hero({ onCheckAvailability, onContactUs }: HeroProps) {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Video with Dark Hero Gradient overlay */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105 transition-transform duration-[10s] ease-out"
          poster={HERO_BG_IMAGE}
        >
          <source src="/hero-cherished.mp4" type="video/mp4" />
        </video>
        {/* Soft, cinematic darkening gradient */}
        <div className="absolute inset-0 hero-gradient bg-black/40" />
      </div>

      {/* Floating typography card content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto text-white mt-12 md:mt-16">
        <span className="inline-block font-[family-name:--font-body] text-sm italic text-[#F4DCEA]/90 mb-4 md:mb-6 tracking-wide">
          Audio & Video Guestbook
        </span>
        
        <h1 className="font-serif text-5xl md:text-7xl font-light italic tracking-tight leading-[1.05] mb-6 drop-shadow-sm">
          Every Voice, Forever Cherished
        </h1>
        
        <p className="font-[family-name:--font-body] text-lg md:text-xl text-white/85 max-w-2xl mx-auto leading-relaxed mb-10">
          Capture every heartfelt message, every spontaneous laugh, and every whispered wish, preserving them as living memories to be revisited forever.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
          <button
            onClick={onCheckAvailability}
            className="w-full sm:w-auto px-10 py-4 md:py-5 bg-[#912A55] hover:bg-[#B05480] text-white font-sans text-xs font-medium uppercase tracking-[0.15em] transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98] cursor-pointer rounded-full"
          >
            Check Availability
          </button>
          <button
            onClick={onContactUs}
            className="w-full sm:w-auto px-10 py-4 md:py-5 border border-white/70 bg-white/10 hover:bg-white/20 text-white font-sans text-xs font-medium uppercase tracking-[0.15em] transition-all duration-300 active:scale-[0.98] cursor-pointer rounded-full"
          >
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}
