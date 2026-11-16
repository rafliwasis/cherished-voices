import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import AppRoutes from './AppRoutes.tsx';
import { trackOutboundClicks } from './lib/analytics';

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>
);

// The homepage is prerendered at build time (see scripts/prerender.mjs), so hydrate it.
// Admin routes and the dev server get an empty shell and render from scratch.
// Only "/" is prerendered; anything else that receives that HTML is rendered fresh instead.
if (container.firstElementChild && window.location.pathname === '/') {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}

trackOutboundClicks();
