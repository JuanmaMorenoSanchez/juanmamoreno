/**
 * Serves the built site so the mouse tests can be run against what actually
 * ships, rather than against the dev server's version of it.
 *
 * GitHub Pages serves this directory as plain files, and the site is fully
 * prerendered, so directory-plus-index is the whole of the routing: /artworks
 * is artworks/index.html on disk. This does the same and nothing more — no
 * single-page fallback, because a path with no file behind it is a 404 on
 * Pages too, and a server that hid that would hide a broken build.
 *
 *   node e2e/serve-dist.mjs
 *   E2E_BASE_URL=http://127.0.0.1:4300 npm run test:e2e:mouse
 */
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve, sep } from 'node:path';

const ROOT = resolve(process.argv[2] ?? 'dist/juanmamoreno/browser');
const PORT = Number(process.env.E2E_PORT ?? 4300);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

/** The file a url asks for, or null if it points outside the built site. */
async function resolveFile(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0]);
  const candidate = resolve(join(ROOT, normalize(decoded)));
  if (candidate !== ROOT && !candidate.startsWith(ROOT + sep)) return null;
  const found = await stat(candidate).catch(() => null);
  if (found?.isFile()) return candidate;
  if (found?.isDirectory()) {
    const index = join(candidate, 'index.html');
    return (await stat(index).catch(() => null))?.isFile() ? index : null;
  }
  return null;
}

const server = createServer(async (request, response) => {
  const file = await resolveFile(request.url ?? '/');
  if (file) {
    response.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' });
    createReadStream(file).pipe(response);
    return;
  }

  // What Pages does with a path it has no file for: answer `404.html`, and
  // still answer 404. Because that file is the application, the four routes
  // rendered in the browser rather than written out — `/pieces`, `/atelier`
  // and `/generative/:id` — arrive at the right page, which is how they work
  // in production. `scripts/write-404.mjs` puts the file there.
  //
  // Still a 404, so this is not the single-page fallback this file refused to
  // have: a prerendered page missing from the build is a 404 here as it would
  // be on Pages, and `verify-render.mjs` has already failed the build by then.
  const shell = await resolveFile('/404.html');
  if (shell) {
    response.writeHead(404, { 'content-type': TYPES['.html'] });
    createReadStream(shell).pipe(response);
    return;
  }

  response.writeHead(404, { 'content-type': 'text/plain' });
  response.end('not found');
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`serving ${ROOT} at http://127.0.0.1:${PORT}`);
});
