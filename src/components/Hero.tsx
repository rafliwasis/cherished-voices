import { useEffect, useState } from 'react';

// Served by Vercel from /public/media (not Supabase). To change them, replace the files
// and use a new filename (e.g. hero-v2.mp4) since /media/* is cached for a year.
const HERO_VIDEO = '/media/hero.mp4';
const HERO_POSTER = '/media/hero-poster.webp';

// Skip the video for visitors who asked for reduced motion or are on Data Saver.
function canPlayHeroVideo() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return !connection?.saveData;
}

interface HeroProps {
  onContactUs: () => void;
}

export default function Hero({ onContactUs }: HeroProps) {
  const [loadVideo, setLoadVideo] = useState(false);

  // Show the poster immediately and only fetch the video once the page has finished loading.
  useEffect(() => {
    if (!canPlayHeroVideo()) return;
    const start = () => setLoadVideo(true);
    if (document.readyState === 'complete') {
      start();
      return;
    }
    window.addEventListener('load', start, { once: true });
    return () => window.removeEventListener('load', start);
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#1C1B1B]">
      {/* Background Video with Dark Hero Gradient overlay */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <video
          src={loadVideo ? HERO_VIDEO : undefined}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          poster={HERO_POSTER}
          className="w-full h-full object-cover scale-105 transition-transform duration-[10s] ease-out animate-[fadeIn_1s_ease-out]"
        />
        {/* Soft, cinematic darkening gradient */}
        <div className="absolute inset-0 hero-gradient bg-black/40" />
      </div>

      {/* Floating typography card content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto text-white mt-12 md:mt-16">
        <h1 className="font-serif text-5xl md:text-7xl font-light italic tracking-tight leading-[1.05] mb-6 drop-shadow-sm">
          Every Voice, Forever Cherished
        </h1>
        
      <p className="font-[family-name:--font-body] text-lg md:text-xl text-white/85 max-w-3xl mx-auto leading-relaxed mb-10">
        A premium audio & video guestbook service for weddings and any kind of celebrations :-)
        <br />
        We're here to keep heartfelt messages from your loved ones!
      </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
          <a
            href="https://drive.google.com/drive/folders/19PmXpZdBZn-mEkkl9yLQdd_TdEHGSNng"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-center w-full sm:w-auto px-10 py-4 md:py-5 bg-[#912A55] hover:bg-[#B05480] text-white font-sans text-xs font-medium uppercase tracking-[0.15em] transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98] cursor-pointer rounded-full"
          >
            See Pricelist
          </a>
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
