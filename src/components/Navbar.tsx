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
            ? 'bg-[#FCF9F8]/90 backdrop-blur-md text-[#1C1B1B] border-[#e5e2e1]/40 shadow-sm py-4'
            : 'bg-transparent text-white border-white/10 py-6'
        }`}
      >
        <div className="flex justify-between items-center px-6 md:px-16 max-w-[1200px] mx-auto">
          {/* Brand Identity */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`font-serif text-2xl tracking-tight transition-colors duration-300 font-medium ${
              isScrolled ? 'text-[#690018]' : 'text-white'
            }`}
          >
            Cherished Voices
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-10">
            <button
              onClick={() => scrollToSection('about-us')}
              className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 hover:opacity-70 relative group cursor-pointer"
            >
              About Us
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-current transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button
              onClick={() => scrollToSection('moments')}
              className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 hover:opacity-70 relative group cursor-pointer"
            >
              Moments
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-current transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button
              onClick={() => scrollToSection('calendar')}
              className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 hover:opacity-70 relative group cursor-pointer"
            >
              Calendar
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-current transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 hover:opacity-70 relative group cursor-pointer"
            >
              Contact Us
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-current transition-all duration-300 group-hover:w-full"></span>
            </button>
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
        <div className="flex justify-between items-center mb-12">
          <span className="font-serif text-lg font-semibold text-[#690018]">Cherished Voices</span>
          <button onClick={() => setIsMobileMenuOpen(false)} className="p-1">
            <X className="w-5 h-5 text-[#1C1B1B]" />
          </button>
        </div>

        <div className="flex flex-col gap-6 font-sans text-xs font-semibold tracking-widest uppercase">
          <button
            onClick={() => scrollToSection('about-us')}
            className="text-left py-2 hover:text-[#690018] border-b border-[#e5e2e1]/40"
          >
            About Us
          </button>
          <button
            onClick={() => scrollToSection('moments')}
            className="text-left py-2 hover:text-[#690018] border-b border-[#e5e2e1]/40"
          >
            Moments
          </button>
          <button
            onClick={() => scrollToSection('calendar')}
            className="text-left py-2 hover:text-[#690018] border-b border-[#e5e2e1]/40"
          >
            Calendar
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="text-left py-2 hover:text-[#690018] border-b border-[#e5e2e1]/40"
          >
            Contact Us
          </button>
        </div>

        {/* Footer info inside drawer */}
        <div className="absolute bottom-8 left-8 right-8 text-[#5e5e5d] text-xs space-y-4">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#8b1a2b]" />
            <span>089178875</span>
          </div>
          <div className="flex items-center gap-2">
            <Instagram className="w-4 h-4 text-[#8b1a2b]" />
            <span>@cherishedvoices</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#8b1a2b]" />
            <span className="text-[10px]">South Tangerang, ID</span>
          </div>
        </div>
      </div>
    </>
  );
}
