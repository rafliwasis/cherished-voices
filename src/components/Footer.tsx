import React from 'react';
import { Instagram, MapPin } from 'lucide-react';

export default function Footer() {
  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1C1820] py-10 select-none text-white">
      <div className="max-w-[1200px] mx-auto px-6 md:px-16 flex flex-col sm:flex-row justify-between items-center gap-6">
        
        {/* Left Side: Brand & Copyright */}
        <div className="text-center sm:text-left space-y-1">
          <a
            href="#"
            onClick={handleScrollToTop}
            className="font-[family-name:--font-script] text-2xl text-white hover:text-white/70 transition-colors duration-300 cursor-pointer block leading-none"
          >
            Cherished Voices
          </a>
          <p className="font-[family-name:--font-body] text-[10px] text-white/40 italic tracking-wide">
            © 2026 Cherished Voices. All rights reserved.
          </p>
        </div>

        {/* Right Side: Social Icons & Location */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-white/80">
          
          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-white/50">
            <MapPin className="w-3.5 h-3.5 text-white/60" />
            <span className="font-sans">South Tangerang, ID</span>
          </div>

          {/* Social Icons Row */}
          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com/cherishedvoices"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all rounded-full"
              title="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all rounded-full"
              title="WhatsApp"
            >
              {/* <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M12.032 21.965c-5.591 0-10.126-4.534-10.126-10.126 0-5.59 4.535-10.124 10.126-10.124 5.59 0 10.125 4.534 10.125 10.124 0 5.592-4.535 10.126-10.125 10.126zm0-18.25c-4.479 0-8.126 3.647-8.126 8.124 0 4.479 3.647 8.126 8.126 8.126s8.126-3.647 8.126-8.126c0-4.477-3.647-8.124-8.126-8.124zm3.564 9.764c.176.516.176.958-.076 1.271-.149.196-.372.292-.613.292-.077 0-.157-.015-.24-.044-.327-.108-1.014-.36-1.9-.648-.006-.002-.012-.006-.018-.006-.317-.102-.62-.2-.922-.3-.869.868-1.741 1.638-2.244 1.973-.4.27-.89.3-1.31.3h-.066c-.604 0-1.112-.27-1.56-.822-.42-.518-1.112-1.512-1.442-2.764-.15-.57-.012-1.088.387-1.455.15-.138.343-.298.543-.465.14-.117.284-.238.419-.364.19-.176.207-.321.192-.434-.016-.112-.09-.258-.182-.44a11.76 11.76 0 00-.421-.803c-.316-.55-.646-1.127-.476-1.375.174-.256.546-.284.74-.284.185 0 .389.008.546.018.17.012.385.028.602.044.28.02.562.042.823.099.168.036.278.2.341.371.15.406.534 1.434.607 1.584.066.135.043.276-.056.4a1.558 1.558 0 01-.28.283c-.108.1-.14.141-.172.183-.047.062-.072.096-.024.195.048.099.282.542.621.916.437.481.896.82 1.384 1.047.14.065.27.095.387.095.208 0 .31-.143.4-.28.054-.083.107-.164.163-.232l.005-.007c.105-.132.216-.27.42-.27.078 0 .155.019.226.056l1.086.51c.294.136.51.236.604.34.101.112.13.254.054.43z"/>
              </svg> */}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16">
  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
</svg>
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}
