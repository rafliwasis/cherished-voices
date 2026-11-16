// Runs after `vite build` + the SSR build (see package.json "build").
// 1. dist/index.html  -> homepage with its real content prerendered (what Google & link previews read)
// 2. dist/spa.html    -> empty, noindex shell for /admin (rewritten to in vercel.json)
// 3. dist/404.html    -> real 404 page, so unknown URLs stop returning the homepage with status 200
import { readFile, writeFile, rm } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const dist = path.resolve('dist');
const ssrDir = path.resolve('dist-ssr');
const template = await readFile(path.join(dist, 'index.html'), 'utf8');
const EMPTY_ROOT = '<div id="root"></div>';
if (!template.includes(EMPTY_ROOT)) throw new Error('prerender: <div id="root"></div> not found in dist/index.html');

const noindex = (html) => html.replace('<head>', '<head>\n    <meta name="robots" content="noindex" />');

await writeFile(path.join(dist, 'spa.html'), noindex(template));

const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);
const appHtml = await render('/');
if (!appHtml.includes('<h1')) throw new Error('prerender: rendered homepage has no <h1>, refusing to ship it');
await writeFile(path.join(dist, 'index.html'), template.replace(EMPTY_ROOT, `<div id="root">${appHtml}</div>`));

await writeFile(
  path.join(dist, '404.html'),
  `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex" />
    <title>Page not found | Cherished Voices</title>
    <link rel="icon" type="image/png" href="/logo/favicon-48.png" />
    <style>
      body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #1C1820; color: #fff;
             font-family: Georgia, serif; text-align: center; padding: 24px; box-sizing: border-box; }
      img { height: 48px; width: auto; }
      h1 { font-weight: 300; font-style: italic; font-size: 2rem; margin: 24px 0 8px; }
      p { color: #C9B8C5; font-family: Arial, sans-serif; margin: 0 0 32px; }
      a.btn { display: inline-block; padding: 14px 32px; border-radius: 999px; background: #912A55; color: #fff;
              text-decoration: none; font-family: Arial, sans-serif; font-size: 12px; letter-spacing: .15em; text-transform: uppercase; }
    </style>
  </head>
  <body>
    <main>
      <img src="/logo/cherished-voices-white.webp" alt="Cherished Voices" />
      <h1>This page doesn't exist</h1>
      <p>The link may be old or mistyped.</p>
      <a class="btn" href="/">Back to Cherished Voices</a>
    </main>
  </body>
</html>
`,
);

await rm(ssrDir, { recursive: true, force: true });
console.log(`prerender: homepage ${Math.round(appHtml.length / 1024)} KB of HTML, spa.html and 404.html written`);
