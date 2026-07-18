import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config({ path: path.resolve(__dirname, '.env.local') });

function eventsApiPlugin() {
  return {
    name: 'events-api',
    configureServer(server: any) {
      // Save testimonials to data.ts
      server.middlewares.use('/api/save-testimonials', (req: any, res: any, next: any) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk: any) => { body += chunk.toString(); });
          req.on('end', () => {
            try {
              const newTestimonials = JSON.parse(body);
              const dataPath = path.join(__dirname, 'src', 'data.ts');
              let content = fs.readFileSync(dataPath, 'utf8');
              
              const startToken = 'export const TESTIMONIALS: Testimonial[] = [';
              const startIndex = content.indexOf(startToken);
              
              if (startIndex === -1) {
                throw new Error("Could not find TESTIMONIALS array in data.ts");
              }
              
              const startOfArray = startIndex + startToken.length - 1; // points to '['
              
              // We need to replace the entire array. Instead of a complex AST parser,
              // we will stringify the new data and replace the block.
              // To find the end of the array safely:
              let brackets = 0;
              let endIndex = -1;
              for (let i = startOfArray; i < content.length; i++) {
                if (content[i] === '[') brackets++;
                if (content[i] === ']') brackets--;
                if (brackets === 0) {
                  endIndex = i;
                  break;
                }
              }
              
              if (endIndex === -1) throw new Error("Could not find the end of TESTIMONIALS array");
              
              const newArrayStr = JSON.stringify(newTestimonials, null, 2);
              const newContent = content.slice(0, startOfArray) + newArrayStr + content.slice(endIndex + 1);
              
              fs.writeFileSync(dataPath, newContent, 'utf8');
              
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true }));
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
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
