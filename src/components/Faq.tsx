import { ChevronDown } from 'lucide-react';

const WHATSAPP_URL =
  'https://api.whatsapp.com/send/?phone=6285196548001&text=Hi%20Cherished%20Voices%2C%20I%20want%20to%20know%20more%20about%20your%20service%21';
const PRICELIST_URL = 'https://drive.google.com/drive/folders/19PmXpZdBZn-mEkkl9yLQdd_TdEHGSNng';

// Plain text that's prerendered into the HTML: this is the main place the page says the
// words people actually search for (audio guestbook, buku tamu audio, Jakarta, Tangerang...).
const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: 'What is an audio guestbook?',
    a: (
      <>
        An audio guestbook (<em>buku tamu audio</em>) is a vintage-style telephone set up at your event. Guests pick
        up the receiver and record a personal voice message for you: wishes, stories, toasts and laughter, kept
        forever instead of a few lines in a paper guestbook.
      </>
    ),
  },
  {
    q: 'Do you also offer a video guestbook?',
    a: (
      <>
        Yes. Cherished Voices offers both audio guestbook and video guestbook services, so your loved ones can leave
        a message you can hear, or one you can watch again and again.
      </>
    ),
  },
  {
    q: 'What kind of events is it for?',
    a: (
      <>
        Weddings (<em>pernikahan</em>) are where we started, but our audio and video guestbooks work for any
        celebration: engagements, birthdays, anniversaries, family gatherings and corporate events.
      </>
    ),
  },
  {
    q: 'Which areas do you serve?',
    a: (
      <>
        We are based in South Tangerang and serve events across Jabodetabek: Jakarta, Tangerang, BSD, Bogor, Depok
        and Bekasi. Planning an event outside Jabodetabek? Message us on WhatsApp and we'll talk it through.
      </>
    ),
  },
  {
    q: 'How much does it cost and how do I book?',
    a: (
      <>
        Check our{' '}
        <a href={PRICELIST_URL} target="_blank" rel="noopener noreferrer" className="text-[#912A55] underline underline-offset-2">
          pricelist
        </a>{' '}
        for packages, see open dates on the calendar above, then{' '}
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-[#912A55] underline underline-offset-2">
          message us on WhatsApp
        </a>{' '}
        to reserve your date.
      </>
    ),
  },
];

export default function Faq() {
  return (
    <section className="py-24 md:py-32 bg-[#FAF8F6]" id="faq">
      <div className="px-6 md:px-16 max-w-3xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <span className="font-sans text-xs font-semibold text-[#912A55] uppercase tracking-[0.25em] block">FAQ</span>
          <h2 className="font-serif text-4xl md:text-6xl font-light italic text-[#1C1B1B]">
            Audio &amp; Video Guestbook, Explained
          </h2>
          <div className="w-12 h-[1px] bg-[#912A55] mx-auto mt-4" />
        </div>

        <div className="divide-y divide-[#E5DAE3]">
          {FAQS.map(({ q, a }) => (
            <details key={q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
                <h3 className="font-serif text-xl md:text-2xl text-[#1C1B1B]">{q}</h3>
                <ChevronDown className="w-5 h-5 flex-shrink-0 text-[#912A55] transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p className="pt-4 font-[family-name:--font-body] text-base md:text-lg text-[#574141] leading-relaxed">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
