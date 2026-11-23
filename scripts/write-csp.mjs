/**
 * Writes the content security policy into every prerendered page.
 *
 * A policy is the list the page hands the browser of where code and content
 * may come from; the browser refuses everything else. The site's one api-fed
 * `[innerHTML]` is already sanitised by Angular, so this is a second lock on a
 * door that has one — what is behind the door is the admin bearer in
 * `localStorage`, which is worth two.
 *
 * **It is a meta tag because GitHub Pages serves files and sets no headers.**
 * There is no server in front of `gh-pages` to add one, so the policy has to
 * travel inside the document. The one real cost of that is `frame-ancestors`,
 * which browsers ignore in a meta tag — the site cannot refuse to be framed
 * from here. The api can and does; for a portfolio the loss is acceptable.
 *
 * **The hashes are read out of the built pages rather than written down.**
 * Angular emits five inline scripts: the two in `src/index.html` that run
 * before the first paint, its own event-replay contract, the one line that
 * starts it, and the stylesheet un-deferrer. That one line names the events a
 * particular page replays, so it differs between pages — which is exactly why
 * this counts them rather than trusting a list. Ten across four hundred pages
 * today; a sixth script, or a new event on one page, takes care of itself.
 *
 * Hashes and not `'unsafe-inline'`: the two are mutually exclusive by design,
 * and a `script-src` with `'unsafe-inline'` stops approximately nothing while
 * passing a scanner, which is worse than having no policy at all.
 *
 * Point it at a directory to test it: `node scripts/write-csp.mjs some/dir`.
 */
import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';

const ROOT = resolve(process.argv[2] ?? 'dist/juanmamoreno/browser');

/**
 * Where everything but script may come from, and why.
 *
 * Every host here is one the site really reaches. A host missing from this
 * list is a feature that stops working with nothing in the build failing,
 * which is why each one says what it is for.
 */
const SOURCES = {
  // Nothing is allowed unless something below allows it.
  'default-src': ["'none'"],

  // Material injects styles at runtime and the build inlines the critical css
  // into the head, so neither can be hashed ahead of time. Inline *style* is
  // not the hole inline *script* is: it cannot call anything.
  'style-src': ["'self'", "'unsafe-inline'", 'https://accounts.google.com/gsi/style'],

  // Thumbnails come from the api, paintings from the originals bucket and from
  // Arweave, a Google avatar from googleusercontent. `data:` and `blob:` are
  // the atelier's own: a canvas exported, a file chosen before it is uploaded.
  'img-src': [
    "'self'",
    'data:',
    'blob:',
    'https://backend.juanmamoreno.com',
    'https://juanmamoreno-backend-164035848667.europe-west1.run.app',
    'https://storage.googleapis.com',
    'https://arweave.net',
    'https://*.arweave.net',
    'https://*.googleusercontent.com',
  ],

  // Archivo and the material icons ship with the site.
  'font-src': ["'self'"],

  /**
   * Every address the page itself asks for something from.
   *
   * The run.app host is the api's fallback, used when the custom domain fails.
   * Leaving it out would mean the fallback worked in every environment except
   * the one it exists for.
   */
  'connect-src': [
    "'self'",
    'https://backend.juanmamoreno.com',
    'https://juanmamoreno-backend-164035848667.europe-west1.run.app',
    'https://storage.googleapis.com',
    'https://arweave.net',
    'https://*.arweave.net',
    'https://ethereum-rpc.publicnode.com',
    'https://accounts.google.com/gsi/',
    'https://keys.coinbase.com',
    'https://cca-lite.coinbase.com',
    'wss://www.walletlink.org',
  ],

  // `'self'` is the atelier's sandboxed harness, which is a file on this site.
  // The other two are Google's sign-in button and Coinbase's signer.
  'frame-src': ["'self'", 'https://accounts.google.com/gsi/', 'https://keys.coinbase.com'],

  // A painting's video, and a file chosen in the atelier before it is sent.
  'media-src': ["'self'", 'blob:', 'https://storage.googleapis.com'],

  'worker-src': ["'self'", 'blob:'],

  // The contact form posts through the api by script, never by a form action.
  'form-action': ["'self'"],
  'base-uri': ["'self'"],
  'object-src': ["'none'"],
};

/**
 * Where script may come from, given the hashes found in the build.
 *
 * `'self'` is the application bundle and its lazy chunks. The one external
 * script is Google's sign-in client, which the door loads when he signs in
 * that way; Google documents that url, the `/gsi/` prefix for its frame and
 * its endpoint, and advises the prefix over naming each url.
 */
const scriptSource = (hashes) => ["'self'", ...hashes, 'https://accounts.google.com/gsi/client'];

/**
 * The application's own pages, and nothing else that happens to be html.
 *
 * **Not every `.html` in the build.** The atelier's sandbox harness is a file
 * in `assets`, and it carries its own far stricter policy — `default-src
 * 'none'` with no `connect-src` at all, which is the entire boundary around
 * code a model wrote. Walking every file replaced that policy with this one,
 * which allows the api: a generated piece could have phoned the backend. It
 * also added the harness's own inline script to the site's hashes, so the
 * site then named a script it never runs. Both were caught by the hash count
 * going from ten to eleven, which is the only reason this says so.
 */
async function appPages(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) found.push(...(await appPages(path)));
    else if (entry.name === 'index.html' || entry.name === '404.html') found.push(path);
  }
  return found;
}

/**
 * The hashes of a page's inline scripts.
 *
 * A `<script src>` is covered by `'self'` and a `type` of json is data the
 * browser never executes — Angular's transferred state is a kilobyte of it on
 * every page, and hashing it would put a different hash in the policy for
 * every painting.
 */
function inlineHashes(html) {
  const found = new Set();
  for (const match of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)) {
    const [, attributes, body] = match;
    if (/\ssrc\s*=/.test(attributes) || /json/.test(attributes) || !body) continue;
    found.add(`'sha256-${createHash('sha256').update(body, 'utf8').digest('base64')}'`);
  }
  return found;
}

const CHARSET = /<meta\s+charset=["']?[^>"']+["']?\s*\/?>/i;
const EXISTING = /\s*<meta\s+http-equiv=["']Content-Security-Policy["'][^>]*>/i;

const pages = await appPages(ROOT);
if (!pages.length) {
  console.error(`write-csp: no index.html in ${ROOT}; the build did not finish`);
  process.exit(1);
}

// One policy for every page, from the union of what they contain. Simpler to
// read in a diff than four hundred nearly-identical ones, and a hash the page
// has no use for costs nothing.
const hashes = new Set();
const sources = await Promise.all(
  pages.map(async (file) => {
    const html = await readFile(file, 'utf8');
    for (const hash of inlineHashes(html)) hashes.add(hash);
    return [file, html];
  })
);

// `default-src` first and `script-src` second, because that is the order they
// are read in: everything is refused, and then script is the interesting one.
const policy = Object.entries({
  'default-src': SOURCES['default-src'],
  'script-src': scriptSource([...hashes].sort()),
  ...SOURCES,
})
  .map(([directive, values]) => `${directive} ${values.join(' ')}`)
  .join('; ');

const tag = `<meta http-equiv="Content-Security-Policy" content="${policy.replace(/"/g, '&quot;')}">`;

const failures = [];
for (const [file, html] of sources) {
  // Straight after the charset, so everything the browser then parses is
  // covered: a meta policy does not apply to anything above itself, and the
  // two scripts that set the theme and the js class are the very next lines.
  const already = html.replace(EXISTING, '');
  if (!CHARSET.test(already)) {
    failures.push(relative(ROOT, file));
    continue;
  }
  await writeFile(
    file,
    already.replace(CHARSET, (meta) => `${meta}\n    ${tag}`),
    'utf8'
  );
}

if (failures.length) {
  console.error(
    `write-csp: no <meta charset> to put the policy after in ${failures.length} page(s): ` +
      failures.slice(0, 5).join(', ')
  );
  process.exit(1);
}

console.log(
  `write-csp: policy written into ${pages.length} pages ` +
    `(${hashes.size} inline script hashes, ${policy.length} bytes)`
);
