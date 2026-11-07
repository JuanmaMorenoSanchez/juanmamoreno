/**
 * The three published pieces, run in a real browser.
 *
 * Nothing exercised them. They are the one part of the site rendered on the
 * client rather than written out at build time, so `verify-render` never opens
 * them; jsdom has no canvas, so no unit test can run a line of one; and a
 * sketch whose `setup` throws is caught, logged to the console and left as a
 * blank canvas, which means a piece can stop existing without failing anything
 * or telling the reader.
 *
 * That gap is not hypothetical. `ipad-light` builds fourteen sprites out of
 * seven cuts and two sizes of paint at load, and a single wrong key in that
 * wiring hands `drawImage` an `undefined` and takes the page to black.
 *
 * The three ids are written out rather than read from the registry, and
 * `registry.spec.ts` pins the registry to exactly these three — so a fourth
 * piece fails that spec, and whoever is adding it is sent here.
 */
import assert from 'node:assert/strict';
import { after, before, describe, it } from 'node:test';
import { ARRIVAL, BASE_URL, launchBrowser } from './browser.mjs';

/** Long enough for the images to load and the cuts to be made. */
const SETTLES = 20_000;

let browser;
let cannotRun = null;

before(async () => {
  ({ browser, cannotRun } = await launchBrowser());
});

after(async () => {
  await browser?.close();
});

/**
 * What the piece drew, and whether it complained.
 *
 * The canvas is read as a grid of samples rather than compared with a
 * reference picture: every one of these moves, two of them tear on their own
 * clock, and an image comparison would be a test that fails on Tuesdays.
 */
async function run(id) {
  const page = await browser.newPage({ viewport: { width: 900, height: 900 } });
  const complaints = [];
  page.on('console', (message) => {
    if (message.type() === 'error') complaints.push(message.text());
  });

  await page.goto(`${BASE_URL}/generative/${id}`, ARRIVAL);
  await page.waitForSelector('canvas', { timeout: SETTLES });
  await page.waitForTimeout(SETTLES);

  const drawn = await page.evaluate(() => {
    const canvas = document.querySelector('canvas');
    const ctx = canvas?.getContext('2d', { willReadFrequently: true });
    if (!ctx || !canvas.width) return null;

    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const seen = new Set();
    // Every pixel is more than this needs; a grid of a few thousand says
    // whether there is a picture here as well as reading them all would.
    const step = Math.max(1, Math.floor(data.length / 4 / 4000)) * 4;
    for (let at = 0; at < data.length; at += step) {
      // Coarsened, so that a gradient of one colour does not read as many.
      seen.add(`${data[at] >> 4},${data[at + 1] >> 4},${data[at + 2] >> 4},${data[at + 3] >> 4}`);
    }
    return { colours: seen.size, width: canvas.width, height: canvas.height };
  });

  await page.close();
  return { drawn, complaints };
}

/** The same three assertions, wherever they are made. */
async function expectDraws(id, t) {
  if (cannotRun) return t.skip(cannotRun);

  const { drawn, complaints } = await run(id);

  assert.ok(drawn, `/generative/${id} has no canvas with a size`);
  // A piece whose setup threw leaves the canvas as it was: one colour, or
  // none. Thirty-two is far below what any of the three draw and far above
  // what a blank or flat canvas can reach.
  assert.ok(
    drawn.colours >= 32,
    `/generative/${id} drew ${drawn.colours} distinct colours, which is a blank page`
  );
  assert.deepEqual(
    complaints.filter((said) => said.includes('sketch setup')),
    [],
    `/generative/${id} failed to set up`
  );
}

// Written out one at a time rather than looped over `PIECES`. A generated
// name is not in the file, so `verify-requirements` cannot find the test a
// requirement cites and every proof naming this file reads as a lie — which
// is precisely the drift that check exists to catch, and it caught this.
describe('the published generative pieces', () => {
  it('believe draws a picture', (t) => expectDraws('believe', t));

  it('hide draws a picture', (t) => expectDraws('hide', t));

  it('ipad-light draws a picture', (t) => expectDraws('ipad-light', t));
});
