import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  base: '/Aulfiom/',
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'save-schema-middleware',
      configureServer(server) {
        server.middlewares.use('/api/save-schema', (req, res) => {
          if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
              body += chunk;
            });
            req.on('end', () => {
              try {
                const data = JSON.parse(body);
                const filePath = path.join(__dirname, 'src', 'stats', 'schema', data.filename);
                fs.writeFileSync(filePath, data.code, 'utf-8');
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true }));
              } catch (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: err.message }));
              }
            });
          } else {
            res.writeHead(405);
            res.end();
          }
        });
      }
    }
  ],
})
