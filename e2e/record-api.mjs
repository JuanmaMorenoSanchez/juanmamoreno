/**
 * Records what the api answers, once, so the suites never ask it again.
 *
 * Recorded from here rather than through the browser, which is the mistake that
 * made this look impossible at first: the api allows one origin, so a page
 * served from `127.0.0.1` has every answer discarded before any listener sees
 * it. There is no such rule outside a browser. `fetch` from node simply gets
 * the body.
 *
 * Run by hand, when the shape of the api changes:
 *
 *   node e2e/record-api.mjs
 *
 * **Only free reads are recorded.** Nothing here may cost money per call, so
 * the list below is explicit rather than discovered by crawling — `/vision/
 * search/:id` re-runs a reverse image search on read and is exactly the kind of
 * endpoint a crawl would have found and billed. Everything not recorded is
 * answered with an empty envelope, which is what the page already saw.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { API, FIXTURES, fixtureFile } from './api-fixtures.mjs';

/**
 * The free reads the catalogue needs to render as it does in production.
 *
 * `/nfts-snapshot` is the one that matters: it is the catalogue itself, and
 * without it the app falls back to the subset bundled into the app, which has
 * fewer paintings than the site has — which is why one navigation test could
 * not reach every painting with the api cut off.
 */
const RECORD = ['nfts-snapshot', 'artwork-record', 'version', 'cv/entries'];

await mkdir(FIXTURES, { recursive: true });

let total = 0;
for (const path of RECORD) {
  const response = await fetch(`${API}/${path}`, { signal: AbortSignal.timeout(60_000) }).catch(
    (failure) => ({ ok: false, status: 0, statusText: failure.message })
  );

  if (!response.ok) {
    console.error(`  ${path} → ${response.status} ${response.statusText}; not recorded`);
    process.exitCode = 1;
    continue;
  }

  const body = Buffer.from(await response.arrayBuffer());
  const file = fixtureFile(path);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, body);
  total += body.length;
  console.log(`  ${path} → ${(body.length / 1024).toFixed(1)} kB`);
}

console.log(`\n${(total / 1024 / 1024).toFixed(2)} MB in ${FIXTURES}`);
