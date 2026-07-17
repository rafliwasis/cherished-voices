import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import fs from 'fs';
import dotenv from 'dotenv';
import eventsHandler from './api/events';

dotenv.config({ path: path.resolve(__dirname, '.env.local') });

function localUploadPlugin() {
  return {
    name: 'local-upload',
    configureServer(server: any) {
      server.middlewares.use('/api/events', (req: any, res: any, next: any) => {
        if (req.method === 'GET') {
          eventsHandler(req, res);
          return;
        }
        next();
      });

      server.middlewares.use('/api/upload', (req: any, res: any, next: any) => {
        if (req.method === 'POST') {
          const filename = req.headers['x-filename'] as string;
          if (!filename) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'Missing x-filename header' }));
            return;
          }
          const destPath = path.join(__dirname, 'public', filename);
          
          // Ensure directory exists
          const dir = path.dirname(destPath);
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }

          const writeStream = fs.createWriteStream(destPath);
          req.pipe(writeStream);
          req.on('end', () => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ url: '/' + filename }));
          });
          req.on('error', (err: any) => {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message }));
          });
          return;
        }
        next();
      });

      // Simple JSON file saving endpoint
      server.middlewares.use('/api/save-data', (req: any, res: any, next: any) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk: any) => { body += chunk.toString(); });
          req.on('end', () => {
            try {
              const destPath = path.join(__dirname, 'public', 'admin-overrides.json');
              fs.writeFileSync(destPath, body, 'utf8');
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true }));
            } catch (err: any) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }
        next();
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), localUploadPlugin()],
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
