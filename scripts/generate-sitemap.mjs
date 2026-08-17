// Builds sitemap.xml from what was actually prerendered, rather than from a
// hand-maintained list: every index.html in the build output is a real URL that
// GitHub Pages will serve with a 200, and nothing else is. Run after `ng build`
// (see the postbuild script), overwriting the placeholder copied from src/.
import { readdir, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const ORIGIN = 'https://juanmamoreno.com';
const OUTPUT_DIR = 'dist/juanmamoreno/browser';

// Pages that are not artworks get a higher priority and are listed first: they
// are the entry points, and the catalogue hangs off them.
const PRIORITIES = {
  '': '1.0',
  artworks: '0.9',
  cv: '0.8',
  about: '0.8',
  contact: '0.6',
  terms: '0.3',
  privacy: '0.3',
};

async function prerenderedRoutes(dir, base = dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const routes = [];

  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      routes.push(...(await prerenderedRoutes(path, base)));
    } else if (entry.name === 'index.html') {
      // index.csr.html is the client-render shell, not a page.
      routes.push(relative(base, dir).split('\\').join('/'));
    }
  }

  return routes;
}

const routes = await prerenderedRoutes(OUTPUT_DIR);
const sorted = routes.sort((a, b) => {
  const known = (route) => (route in PRIORITIES ? 0 : 1);
  return known(a) - known(b) || a.localeCompare(b);
});

const body = sorted
  .map((route) => {
    const priority = PRIORITIES[route] ?? '0.7';
    const changefreq = route in PRIORITIES ? 'monthly' : 'yearly';
    return [
      '  <url>',
      `    <loc>${ORIGIN}/${route}</loc>`,
      `    <priority>${priority}</priority>`,
      `    <changefreq>${changefreq}</changefreq>`,
      '  </url>',
    ].join('\n');
  })
  .join('\n');

await writeFile(
  join(OUTPUT_DIR, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`,
  'utf8',
);

console.log(`sitemap.xml: ${sorted.length} prerendered urls`);
