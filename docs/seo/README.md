# SEO: baseline, targets and how we measure

**Goal:** when someone in Indonesia searches "audio guestbook" (and related terms), Cherished Voices shows up first.

We prove progress with three kinds of numbers, compared month by month against the baseline taken on **16 Nov 2026**:

1. **Keyword rankings.** Where www.cherishedvoices.com appears for each target search. This is the main proof.
2. **Search traffic.** Impressions, clicks and average position from Google Search Console.
3. **Business results.** WhatsApp inquiries that came from Google visitors (GA4 `whatsapp_click` event).

The Lighthouse score is only a technical health check. It does not measure rankings.

---

## 1. Keyword baseline and targets

The full sheet is [`keyword-tracking.csv`](keyword-tracking.csv). Add a new column each month.

| Group | Example keywords | Baseline (16 Nov 2026) | Target | By |
|---|---|---|---|---|
| Brand | cherished voices | #2, below Instagram, no description shown | #1 with description | Dec 2026 |
| Local long-tail | audio guestbook jakarta / tangerang / jabodetabek | Not found | Top 3 | Feb–Mar 2027 |
| Indonesian mid | audio guestbook pernikahan, buku tamu audio, telepon guestbook | Not found | Page 1 | Mar 2027 |
| Head term | audio guestbook, video guestbook, audio guestbook wedding | Not found | Top 5 on google.co.id | May 2027 |
| Head term #1 | audio guestbook | Not found | #1 on google.co.id | 6–12 months, not guaranteed |

**How the baseline was taken.** The brand row comes from a manual Google search ([screenshot](baseline-2026-11-16/google-brand-search.png)). The other rows come from a web-search scan, which is **not identical to google.co.id from Jakarta**. Before reporting to the client, re-check each keyword by hand:

- Open an incognito window and go to `google.co.id`, ideally from Jabodetabek.
- Search the keyword and note the position of `cherishedvoices.com`, checking up to page 5. Beyond that, record "not found".
- Take a screenshot for the record.

**Who we're up against (Nov 2026).** Local competitors mostly have no real website. They rely on Instagram (sudutkata.co, secretvoice.co, voicehub.id), Bridestory listings (Phone A Friend, Eternal Tones, Janur Wedding) and press coverage (Phone A Friend). The English head term is dominated by US brands. **No specialist page exists for Tangerang or BSD**, so that's the quickest local win.

## 2. Technical baseline (Lighthouse, live site, 16 Nov 2026)

Full reports: [mobile](baseline-2026-11-16/lighthouse-live-mobile.html), [desktop](baseline-2026-11-16/lighthouse-live-desktop.html).

| | Mobile before | Desktop before | Mobile after* | Desktop after* |
|---|---|---|---|---|
| SEO | 83 | 83 | 100 | 100 |
| Performance | 69 | 95 | 79–88 | 99 |
| Accessibility | 88 | 95 | 100 | 100 |
| Largest Contentful Paint | 7.1 s | 1.4 s | 3.5–5.1 s | 0.8 s |

\*Measured on a local production build. Re-run on the live site after deploy using [PageSpeed Insights](https://pagespeed.web.dev/?url=https://www.cherishedvoices.com/) and save those as the official "after".

Problems found at baseline:

- No meta description. This is why the Google result had no text under the title.
- `robots.txt` returned the homepage HTML.
- Any made-up URL (e.g. `/abc`) returned the homepage with status 200, so Google saw duplicate pages.
- The page text was not in the HTML. "Every Voice, Forever Cherished" appeared 0 times until JavaScript ran.
- No link-preview tags, so WhatsApp and Instagram shares showed a bare title.
- Oversized images: a 432 KB logo, and 500–750 KB testimonial photos shown at 48 px.

## 3. Business baseline

- Organic visitors and `whatsapp_click` events: **0 / not tracked** before this change. GA4 starts counting once it's deployed.
- Search Console: **not set up yet.** It must be set up to get impression and click data (see below).

---

## Monthly measurement routine (about 30 minutes)

1. **Search Console** → Performance → last 28 days: record total clicks, impressions and average position. Then filter by each keyword in the CSV.
2. **Manual rank check** of each keyword on google.co.id (see above). Fill in that month's column in the CSV.
3. **GA4** → Reports → Acquisition → Traffic acquisition: record "Organic Search" sessions. Under Events, record `whatsapp_click` (filter by session source = google).
4. **PageSpeed Insights** on the live URL: record the SEO and Performance scores.

## One-time setup (owner to do)

- [ ] **Google Search Console:** add the property `cherishedvoices.com` (Domain type, verified via a DNS TXT record). Then submit `https://www.cherishedvoices.com/sitemap.xml`.
- [ ] **Bing Webmaster Tools:** import from Search Console.
- [ ] **GA4:** Admin → Events → mark `whatsapp_click` as a **key event**.
- [ ] **Google Business Profile:** category "Wedding service" / "Event planner", area South Tangerang plus the Jabodetabek service area, and phone +62 851-9654-8001. Ask past clients for Google reviews.
- [ ] **Listings that link back to the site:** Bridestory and Weddingku vendor profiles, plus the website link in the Instagram and TikTok bios.

## Next content steps (biggest ranking levers after this release)

- An Indonesian-language page: "Audio Guestbook Pernikahan Jabodetabek".
- Location pages: `/audio-guestbook-tangerang` and `/audio-guestbook-jakarta`.
- Packages and prices on the site instead of only in Google Drive. Competitors win on Bridestory partly because they show prices.
- Re-upload existing testimonial photos via the admin. New uploads are now auto-resized to 256 px, but old ones are still 500–750 KB.
