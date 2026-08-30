// Builds sitemap.xml from what was actually prerendered, rather than from a
// hand-maintained list: every index.html in the build output is a real URL that
// GitHub Pages will serve with a 200, and nothing else is. Run after `ng build`
// (see the postbuild script), overwriting the placeholder copied from src/.
import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
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

// When each page was written. Crawlers use it to decide what is worth
// re-fetching — which is how a newly written essay gets noticed rather than
// waiting for the whole catalogue to be crawled again.
/**
 * When the page last actually changed.
 *
 * The file's own timestamp is the moment of the last build, which is the same
 * for all three hundred and eighty-eight of them and changes on every deploy —
 * so the sitemap was telling crawlers the entire catalogue had been rewritten
 * again, every time anything shipped. A signal that is always "just now" is
 * worth nothing and is liable to be ignored altogether.
 *
 * A page carrying an essay states when that essay was last changed, so that is
 * used where it exists, which is what makes a newly corrected one stand out
 * from the two hundred that did not change. Everything else falls back to the
 * build, which for a page whose content is its markup is honest enough.
 */
const lastmodOf = async (route, html) => {
  const stated = html.match(/<meta property="article:modified_time" content="([^"]+)"/)?.[1];
  if (stated) {
    const when = new Date(stated);
    if (!isNaN(when.getTime())) return when.toISOString().slice(0, 10);
  }

  const { mtime } = await stat(join(OUTPUT_DIR, route, 'index.html'));
  return mtime.toISOString().slice(0, 10);
};

/**
 * The painting on the page, and what it is called.
 *
 * This is a catalogue of pictures, and a great deal of the way people arrive at
 * one is by seeing it first — an image sitemap is how those pictures get into
 * that index rather than waiting to be noticed inside the page. Read back out
 * of the prerendered html so it can only ever name an image the page really
 * shows, and taken from og:image, which is the one the page itself nominates.
 */
const imageOf = (html) => {
  const loc = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
  if (!loc) return null;

  const title = html.match(/<meta property="og:title" content="([^"]+)"/)?.[1] ?? '';
  return { loc, title: title.split(' · ')[0] };
};

/** XML has five characters it cannot be handed raw, and titles carry them. */
const xml = (text) =>
  text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const body = (
  await Promise.all(
    sorted.map(async (route) => {
      const priority = PRIORITIES[route] ?? '0.7';
      const changefreq = route in PRIORITIES ? 'monthly' : 'yearly';
      const html = await readFile(join(OUTPUT_DIR, route, 'index.html'), 'utf8');
      const image = imageOf(html);
      return [
        '  <url>',
        // Trailing slash: that is the address Pages serves without a redirect,
        // and it is what the page declares as its canonical.
        `    <loc>${ORIGIN}/${route}${route ? '/' : ''}</loc>`,
        `    <lastmod>${await lastmodOf(route, html)}</lastmod>`,
        `    <priority>${priority}</priority>`,
        `    <changefreq>${changefreq}</changefreq>`,
        ...(image
          ? [
              '    <image:image>',
              `      <image:loc>${xml(image.loc)}</image:loc>`,
              ...(image.title ? [`      <image:title>${xml(image.title)}</image:title>`] : []),
              '    </image:image>',
            ]
          : []),
        '  </url>',
      ].join('\n');
    }),
  )
).join('\n');

await writeFile(
  join(OUTPUT_DIR, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${body}\n</urlset>\n`,
  'utf8',
);

console.log(`sitemap.xml: ${sorted.length} prerendered urls`);
