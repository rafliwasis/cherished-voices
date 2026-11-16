declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// Sends a GA4 event when a visitor clicks a WhatsApp or pricelist link, so organic
// search traffic can be tied to real inquiries. Mark `whatsapp_click` as a key event in GA4.
export function trackOutboundClicks() {
  document.addEventListener('click', (e) => {
    const link = (e.target as HTMLElement | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
    if (!link || !window.gtag) return;

    const href = link.href;
    // e.g. "contact", "faq", "footer" — shows which CTA on the page converts.
    const section =
      link.closest('section[id]')?.id ?? link.closest('footer, nav')?.tagName.toLowerCase() ?? 'other';

    if (href.includes('whatsapp.com') || href.includes('wa.me')) {
      window.gtag('event', 'whatsapp_click', { link_location: section });
    } else if (href.includes('drive.google.com')) {
      window.gtag('event', 'pricelist_click', { link_location: section });
    }
  });
}
