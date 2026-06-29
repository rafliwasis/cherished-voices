# Cherished Voices

An elegant, premium web application for **Cherished Voices**—a bespoke, luxury audio & video guestbook service tailored for weddings, corporate galas, and milestone celebrations.

This application features a highly-polished interactive portal where visitors can explore beautiful event highlights, browse a live interactive celebration calendar, and connect instantly with the team to reserve dates.

---

## Key Features

- **Cinematic Hero Display**: Responsive landing layout with muted, auto-playing video background to convey premium celebratory atmospheres.
- **Interactive Celebration Calendar**: Dynamic monthly viewer allowing guests to:
  - Explore archive recordings/recap reels of past events.
  - Check upcoming penciled-in holds and requested dates.
- **Bespoke Media Archive Modals**: Sleek overlays displaying specific memories, locations, and high-definition recap compilations from each event date.
- **Direct VIP Concierge**: Seamless integration for client acquisition routing inquiries directly to dedicated WhatsApp business communication links.

---

## Getting Started

To run this project locally, make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### 1. Clone & Navigate
Unpack the project directory and open your terminal in the root folder:
```bash
cd cherished-voices
```

### 2. Install Dependencies
Install the required packages from `package.json`:
```bash
npm install
```

### 3. Start Development Server
Run the local Vite development server:
```bash
npm run dev
```
Once the server starts, open your browser and navigate to the address displayed in your terminal (usually `http://localhost:3000`).

### 4. Build for Production
Compile a highly optimized static build to the `dist/` directory:
```bash
npm run build
```

### 5. Check Code Quality (Lint)
Verify TypeScript configurations and component structures:
```bash
npm run lint
```

---

## Project Structure

```text
├── src/
│   ├── components/       # Reusable, highly modular React components
│   │   ├── AboutUs.tsx          # "What is Cherished Voices" info section
│   │   ├── CalendarSection.tsx  # Dynamic monthly grid displaying events
│   │   ├── ContactUs.tsx        # WhatsApp instant inquiry CTA
│   │   ├── EventModal.tsx       # Detail showcase for archived celebrations
│   │   ├── Footer.tsx           # Minimalistic brand footer
│   │   ├── Hero.tsx             # Cinematic header with autoplaying video
│   │   ├── Moments.tsx          # Ambient highlights showcase
│   │   └── Navbar.tsx           # Float navigation header with custom scroll
│   ├── App.tsx           # Main application shell & global modal states
│   ├── data.ts           # Dynamic events data and static media resource links
│   ├── main.tsx          # React application entrypoint
│   ├── types.ts          # Shared TypeScript type signatures
│   └── index.css         # Tailwind directives and custom display typography imports
├── package.json          # Dependency manifest and execution scripts
└── vite.config.ts        # Vite environment & build options
```

---

*Preserving authentic, heartfelt voices & memories forever.*
