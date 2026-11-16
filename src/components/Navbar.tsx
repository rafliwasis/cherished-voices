import { useEffect, useState } from 'react';
import { Menu, X, Phone, Instagram, MapPin } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out border-b ${
          isScrolled
            ? 'bg-[#FDFBFD]/92 backdrop-blur-md text-[#1C1820] border-[#E5DAE3]/40 shadow-sm py-4'
            : 'bg-transparent text-white border-white/10 py-6'
        }`}
      >
        <div className="flex justify-between items-center px-6 md:px-16 max-w-[1200px] mx-auto">
          {/* Brand Identity */}
          <a
            href="/"
            aria-label="Cherished Voices home"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="block leading-none"
          >
            <img
              src={isScrolled ? '/logo/cherished-logo-og.webp' : '/logo/cherished-voices-white.webp'}
              alt="Cherished Voices"
              width={358}
              height={132}
              className="h-9 md:h-11 w-auto transition-all duration-300"
            />
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-10">
            <a
              href="#about-us"
              onClick={(e) => { e.preventDefault(); scrollToSection('about-us'); }}
              className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 hover:opacity-70 relative group cursor-pointer"
            >
              About Us
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-current transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#calendar"
              onClick={(e) => { e.preventDefault(); scrollToSection('calendar'); }}
              className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 hover:opacity-70 relative group cursor-pointer"
            >
              Calendar
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-current transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#moments"
              onClick={(e) => { e.preventDefault(); scrollToSection('moments'); }}
              className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 hover:opacity-70 relative group cursor-pointer"
            >
              Moments
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-current transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#faq"
              onClick={(e) => { e.preventDefault(); scrollToSection('faq'); }}
              className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 hover:opacity-70 relative group cursor-pointer"
            >
              FAQ
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-current transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
              className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 hover:opacity-70 relative group cursor-pointer"
            >
              Contact Us
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-current transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden focus:outline-none p-1 rounded-sm"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Mobile Drawer Content */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] bg-[#FCF9F8] text-[#1C1B1B] z-50 p-8 shadow-2xl transition-transform duration-300 ease-in-out transform md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-end items-center mb-12">
          <button onClick={() => setIsMobileMenuOpen(false)} className="p-1" aria-label="Close menu">
            <X className="w-5 h-5 text-[#1C1B1B]" />
          </button>
        </div>

        <div className="flex flex-col gap-6 font-serif text-sm tracking-wide">
          <a
            href="#about-us"
            onClick={(e) => { e.preventDefault(); scrollToSection('about-us'); }}
            className="text-left py-2 hover:text-[#912A55] border-b border-[#E5DAE3]/40"
          >
            About Us
          </a>
          <a
            href="#calendar"
            onClick={(e) => { e.preventDefault(); scrollToSection('calendar'); }}
            className="text-left py-2 hover:text-[#912A55] border-b border-[#E5DAE3]/40"
          >
            Calendar
          </a>
          <a
            href="#moments"
            onClick={(e) => { e.preventDefault(); scrollToSection('moments'); }}
            className="text-left py-2 hover:text-[#912A55] border-b border-[#E5DAE3]/40"
          >
            Moments
          </a>
          <a
            href="#faq"
            onClick={(e) => { e.preventDefault(); scrollToSection('faq'); }}
            className="text-left py-2 hover:text-[#912A55] border-b border-[#E5DAE3]/40"
          >
            FAQ
          </a>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
            className="text-left py-2 hover:text-[#912A55] border-b border-[#E5DAE3]/40"
          >
            Contact Us
          </a>
        </div>

        {/* Footer info inside drawer */}
        <div className="absolute bottom-8 left-8 right-8 text-[#5e5e5d] text-xs space-y-4">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#912A55]" />
            <a href="https://api.whatsapp.com/send/?phone=6285196548001" target="_blank" rel="noopener noreferrer">+62 851-9654-8001</a>
          </div>
          <div className="flex items-center gap-2">
            <Instagram className="w-4 h-4 text-[#912A55]" />
            <a href="https://instagram.com/cherishedvoices" target="_blank" rel="noopener noreferrer">@cherishedvoices</a>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#912A55]" />
            <span className="text-[10px]">South Tangerang, ID</span>
          </div>
        </div>
      </div>
    </>
  );
}
