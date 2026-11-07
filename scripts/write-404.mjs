/**
 * Writes `404.html` into the built site, as a copy of `index.html`.
 *
 * **Four of the site's routes are not written out as files.** `/pieces`,
 * `/atelier` and `/generative/:id` are rendered in the browser — a canvas
 * needs one to exist at all — so there is no `generative/ipad-light/index.html`
 * for a static host to answer with. GitHub Pages answers a path it has no file
 * for with `404.html`, and because that file is the application, the router
 * reads the address and draws the right page. The status stays 404; the page
 * is correct. That is the ordinary way a single-page app lives on Pages.
 *
 * **It used to be written by the deploy step and not by the build.**
 * `angular-cli-ghpages` makes one by default, which is why this works in
 * production today. Nothing checked it: the default is the deploy tool's to
 * change, and the day it changed, every client-rendered route would have
 * started showing GitHub's own 404 page with nothing in this repository
 * failing. It is also why the e2e suite could not open one of those pages —
 * it runs against `dist`, which did not have the file — so the behaviour that
 * only existed after publishing is now part of what is built and checked.
 */
import { copyFile, stat } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const ROOT = resolve(process.argv[2] ?? 'dist/juanmamoreno/browser');
const FROM = join(ROOT, 'index.html');
const TO = join(ROOT, '404.html');

const found = await stat(FROM).catch(() => null);
if (!found?.isFile()) {
  console.error(`write-404: no index.html in ${ROOT}; the build did not finish`);
  process.exit(1);
}

await copyFile(FROM, TO);
console.log(`write-404: 404.html written from index.html (${found.size} bytes)`);
