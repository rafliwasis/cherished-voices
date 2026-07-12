import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import dotenv from 'dotenv';
import eventsHandler from './api/events';

dotenv.config({ path: path.resolve(__dirname, '.env.local') });

function eventsApiPlugin() {
  return {
    name: 'events-api',
    configureServer(server: any) {
      server.middlewares.use('/api/events', (req: any, res: any, next: any) => {
        if (req.method === 'GET') {
          eventsHandler(req, res);
          return;
        }
        next();
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), eventsApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
