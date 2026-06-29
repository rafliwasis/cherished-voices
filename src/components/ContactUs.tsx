import { Phone, MessageSquare } from 'lucide-react';

export default function ContactUs() {
  return (
    <section className="py-24 md:py-32 bg-white" id="contact">
      <div className="px-6 md:px-16 max-w-2xl mx-auto text-center space-y-8">
        
        {/* Title Block */}
        <div className="space-y-4">
          <span className="font-sans text-xs font-semibold text-[#8b1a2b] uppercase tracking-[0.25em] block">
            GET IN TOUCH
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-[#1C1B1B]">
            Contact Us
          </h2>
          <div className="w-12 h-[1px] bg-[#690018] mx-auto mt-4" />
        </div>

        {/* Subtitle */}
        <p className="font-sans text-base text-[#574141] leading-relaxed max-w-lg mx-auto">
          Ready to preserve your memories? Reach out to us directly on WhatsApp to check availability, discuss custom packages, and plan your layout setup.
        </p>

        {/* Elegant Minimalist WhatsApp CTA Button */}
        <div className="pt-4">
          <a
            href="https://wa.me/6281234567890" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#690018] text-white hover:bg-[#8b1a2b] font-sans text-xs font-semibold uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98] rounded-sm cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            Connect via WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
}
