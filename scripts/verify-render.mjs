// Checks what the build actually produced, page by page.
//
// The site is prerendered, so the html in dist is exactly what a reader and a
// crawler receive — which makes it testable without a browser. Every fault
// below is one that has really happened here: a breadcrumb rendering
// "[object Object]", a translation key leaking into the page as literal text,
// every page claiming the home page as its canonical, a Spanish page carrying
// English navigation. Runs after every build (see the postbuild script), and
// fails the build rather than shipping a broken page.
import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

// Takes a directory so the checks can be pointed at a fixture and proved to
// fail, rather than being trusted because they happen to pass.
const OUTPUT_DIR = process.argv[2] ?? 'dist/juanmamoreno/browser';
const ORIGIN = 'https://juanmamoreno.com';
const SITE_NAME = 'Juanma Moreno Sánchez';

// Prefixes of translation keys. Seeing one in the rendered text means a key was
// never resolved and the reader is looking at "textsPage.intro".
const KEY_PREFIXES = [
  'seo.',
  'menu.',
  'textsPage.',
  'cv.',
  'statement.',
  'quote.',
  'viewer.',
  'dossier.',
  'error.',
  'traits.',
  'sortMethod.',
  'viewTypes.',
  'critic.',
  'links.',
  'download.',
];

const failures = [];
const fail = (route, message) => failures.push({ route, message });

async function pages(dir, base = dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) found.push(...(await pages(path, base)));
    else if (entry.name === 'index.html')
      found.push({ file: path, route: relative(base, dir).split('\\').join('/') });
  }
  return found;
}

const textOf = (html) => {
  const body = html.match(/<app-root[^>]*>([\s\S]*?)<\/app-root>/);
  if (!body) return '';
  return body[1]
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

const checked = [];
for (const { file, route } of await pages(OUTPUT_DIR)) {
  const html = await readFile(file, 'utf8');
  const text = textOf(html);
  const spanish = route === 'es' || route.startsWith('es/');
  const url = route ? `${ORIGIN}/${route}/` : `${ORIGIN}/`;
  checked.push(route);

  // 1. The page says it is itself. Every route once claimed to be the home page.
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if (canonical !== url) fail(route, `canonical is ${canonical ?? 'missing'}, expected ${url}`);

  // 2. A title of its own, not the shell's default.
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1]?.trim();
  if (!title) fail(route, 'no <title>');
  else if (title === `${SITE_NAME}, artist.`) fail(route, `still has the index.html title`);

  // 3. Both languages declared, pointing at each other.
  const alternates = [...html.matchAll(/hreflang="([^"]+)" href="([^"]+)"/g)];
  if (alternates.length !== 3) fail(route, `${alternates.length} hreflang tags, expected 3`);
  const bare = route.replace(/^es\/?/, '');
  const expectedEn = bare ? `${ORIGIN}/${bare}/` : `${ORIGIN}/`;
  const en = alternates.find(([, lang]) => lang === 'en')?.[2];
  if (en && en !== expectedEn) fail(route, `hreflang en points at ${en}, expected ${expectedEn}`);

  // 4. Objects rendered where a string belonged.
  if (html.includes('[object Object]')) fail(route, 'renders "[object Object]"');

  // 5. Translation keys that never resolved.
  for (const prefix of KEY_PREFIXES) {
    const leaked = text.match(new RegExp(`\\b${prefix.replace('.', '\\.')}[a-zA-Z]+`));
    if (leaked) fail(route, `unresolved translation key in the text: "${leaked[0]}"`);
  }

  // 6. Something actually rendered. A page of chrome and no content is the
  //    shape /artworks had when its data never arrived at build time.
  if (text.length < 120) fail(route, `only ${text.length} characters of text`);

  // 7. Nothing in the page shows the build asked the reverse image search.
  //
  //    Angular carries the answers a build fetched into the markup, so a page
  //    that asked says so. This looks for that, because the cost of asking is
  //    not paid here: while that endpoint re-ran the search when its answer
  //    had aged, a build of 186 artwork pages was 186 billed Google calls, and
  //    a few days of building came to about ninety euros before anyone read
  //    the meter. The endpoint no longer searches — and this stays, because a
  //    build must not be able to make that mistake affordable again by
  //    accident.
  if (/vision\/search/.test(html))
    fail(route, 'the build asked the reverse image search; that belongs in the browser');

  // 8. The navigation is in the page's own language.
  if (spanish && / Paintings | Contact | About /.test(` ${text} `))
    fail(route, 'English navigation on a Spanish page');
  if (!spanish && / Pinturas | Contacto | Acerca de /.test(` ${text} `))
    fail(route, 'Spanish navigation on an English page');
}

const english = checked.filter((r) => !(r === 'es' || r.startsWith('es/'))).length;
console.log(`verify-render: ${checked.length} pages (${english} en / ${checked.length - english} es)`);

if (failures.length) {
  const shown = failures.slice(0, 25);
  console.error(`\n${failures.length} problem(s):`);
  for (const { route, message } of shown) console.error(`  /${route || ''} — ${message}`);
  if (failures.length > shown.length) console.error(`  …and ${failures.length - shown.length} more`);
  process.exit(1);
}
console.log('verify-render: every page has its own canonical, title, hreflang pair and content.');
