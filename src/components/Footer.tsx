import React from 'react';
import { Instagram, MessageCircle, MapPin } from 'lucide-react';

export default function Footer() {
  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1A1A1A] py-10 border-t border-white/5 select-none text-white/95">
      <div className="max-w-[1200px] mx-auto px-6 md:px-16 flex flex-col sm:flex-row justify-between items-center gap-6">
        
        {/* Left Side: Brand & Copyright */}
        <div className="text-center sm:text-left space-y-1">
          <a
            href="#"
            onClick={handleScrollToTop}
            className="font-[family-name:--font-script] text-2xl text-[#912A55] hover:text-[#B05480] transition-colors duration-300 cursor-pointer block leading-none"
          >
            Cherished Voices
          </a>
          <p className="font-[family-name:--font-body] text-[10px] text-white/35 italic tracking-wide">
            © 2026 Cherished Voices. All rights reserved.
          </p>
        </div>

        {/* Right Side: Social Icons & Location */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-white/80">
          
          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-white/50">
            <MapPin className="w-3.5 h-3.5 text-[#912A55]" />
            <span className="font-sans">South Tangerang, ID</span>
          </div>

          {/* Social Icons Row */}
          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com/cherishedvoices"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/5 hover:bg-[#912A55] hover:text-white text-white/80 transition-all rounded-full"
              title="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/5 hover:bg-[#912A55] hover:text-white text-white/80 transition-all rounded-full"
              title="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}
