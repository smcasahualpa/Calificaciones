// Servidor local opcional para revisar la demo con Node.js: node preview.mjs
// En Visual Studio Code también puedes usar directamente Live Preview.
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg' };
const server = http.createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const filename = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
    const relative = path.relative(root, filename);
    if (relative.startsWith('..') || path.isAbsolute(relative) || !types[path.extname(filename)]) {
      res.writeHead(404).end('No encontrado');
      return;
    }
    const content = await readFile(filename);
    res.writeHead(200, { 'Content-Type': types[path.extname(filename)], 'Cache-Control': 'no-store' });
    res.end(content);
  } catch {
    res.writeHead(404).end('No encontrado');
  }
});
server.listen(5500, '127.0.0.1', () => console.log('Vista previa: http://127.0.0.1:5500'));
