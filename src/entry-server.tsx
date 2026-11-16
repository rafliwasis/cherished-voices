import { StrictMode } from 'react';
import { prerenderToNodeStream } from 'react-dom/static';
import { StaticRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes.tsx';

// Build-time only: renders a route to static HTML so crawlers and link previews
// see real content instead of an empty <div id="root">. Waits for lazy sections to resolve.
export async function render(url: string): Promise<string> {
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </StrictMode>,
  );

  let html = '';
  for await (const chunk of prelude) html += chunk;
  return html;
}
