import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import dotenv from 'dotenv';
import fs from 'fs';
import eventsHandler from './api/events';
import syncCalendarHandler from './api/cron/sync-calendar';

if (fs.existsSync(path.resolve(__dirname, '.env.local'))) {
  dotenv.config({ path: path.resolve(__dirname, '.env.local') });
} else {
  dotenv.config({ path: path.resolve(__dirname, '.env') });
}

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

      server.middlewares.use('/api/cron/sync-calendar', (req: any, res: any, next: any) => {
        if (req.method === 'GET') {
          syncCalendarHandler(req, res);
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
    optimizeDeps: {
      exclude: ['@ffmpeg/ffmpeg', '@ffmpeg/util'],
    },
  };
});
