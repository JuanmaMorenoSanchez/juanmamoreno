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

/** The shape of the canvas itself, which the fit must not change. */
const CANVAS_SHAPE = 1500 / 1590;

/** The one colour the page is painted before anything is drawn on it. */
const GROUND = [7, 8, 11];

/**
 * Where Screenlight's painting sits in the window, in canvas pixels.
 *
 * The bars are found by whole columns rather than by sampling: the painting
 * has dark paint in it, and a single pixel that happens to match the page
 * behind it is not a bar.
 */
async function whereThePaintingSits(width, height) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto(`${BASE_URL}/generative/ipad-light`, ARRIVAL);
  await page.waitForSelector('canvas', { timeout: SETTLES });
  await page.waitForTimeout(SETTLES);

  const seen = await page.evaluate((ground) => {
    const canvas = document.querySelector('canvas');
    const ctx = canvas?.getContext('2d', { willReadFrequently: true });
    if (!ctx || !canvas.width) return null;

    const { width: wide, height: high } = canvas;
    const { data } = ctx.getImageData(0, 0, wide, high);
    const bare = (x, y) => {
      const at = (y * wide + x) * 4;
      return data[at] === ground[0] && data[at + 1] === ground[1] && data[at + 2] === ground[2];
    };
    const emptyColumn = (x) => {
      for (let y = 0; y < high; y++) if (!bare(x, y)) return false;
      return true;
    };

    let left = 0;
    while (left < wide && emptyColumn(left)) left++;
    let right = wide - 1;
    while (right > left && emptyColumn(right)) right--;

    let top = high;
    let bottom = -1;
    for (let y = 0; y < high; y++) {
      for (let x = left; x <= right; x++) {
        if (!bare(x, y)) {
          if (y < top) top = y;
          if (y > bottom) bottom = y;
          break;
        }
      }
    }
    return { canvas: { wide, high }, left, right, top, bottom };
  }, GROUND);

  await page.close();
  if (!seen) return null;
  return {
    ...seen,
    painted: { wide: seen.right - seen.left + 1, high: seen.bottom - seen.top + 1 },
    bars: { left: seen.left, right: seen.canvas.wide - 1 - seen.right },
    gaps: { top: seen.top, bottom: seen.canvas.high - 1 - seen.bottom },
  };
}

/**
 * A window wider than the canvas shows the whole painting.
 *
 * A portrait canvas made to cover a landscape window is enlarged until almost
 * all of it is outside: at 1600×900 the page was a detail of her shoulder,
 * with no sky, no horizon and nothing of the composition. The three pixels of
 * slack at the top and bottom are deliberate — they are the room the ground
 * needs to move its 4px without uncovering the page behind it.
 */
describe('Screenlight on a window wider than its canvas', () => {
  it('shows the whole painting, with black at the sides', async (t) => {
    if (cannotRun) return t.skip(cannotRun);

    const seen = await whereThePaintingSits(1600, 900);

    assert.ok(seen, 'no canvas with a size');
    assert.ok(
      seen.bars.left > 100 && seen.bars.right > 100,
      `expected black at both sides, got ${seen.bars.left} and ${seen.bars.right}`
    );
    assert.ok(
      Math.abs(seen.bars.left - seen.bars.right) <= 2,
      `the painting is not centred: ${seen.bars.left} against ${seen.bars.right}`
    );
    // The whole height, give or take the ground's travel.
    assert.ok(
      seen.gaps.top <= 10 && seen.gaps.bottom <= 10,
      `the painting does not fill the height: ${seen.gaps.top} above, ${seen.gaps.bottom} below`
    );
    const shape = seen.painted.wide / seen.painted.high;
    assert.ok(
      Math.abs(shape - CANVAS_SHAPE) / CANVAS_SHAPE < 0.01,
      `the painting is drawn at ${shape.toFixed(4)}, not the canvas's ${CANVAS_SHAPE.toFixed(4)}`
    );
  });

  it('still fills a phone edge to edge', async (t) => {
    if (cannotRun) return t.skip(cannotRun);
    // The other half of the rule. A window taller than the canvas keeps the
    // cover fit it always had: losing the top of the sky is right, and black
    // down the sides of a phone would be the fix applied where it does harm.
    const seen = await whereThePaintingSits(390, 844);

    assert.ok(seen, 'no canvas with a size');
    assert.deepEqual(seen.bars, { left: 0, right: 0 }, 'a phone has black at the sides');
    assert.deepEqual(seen.gaps, { top: 0, bottom: 0 }, 'a phone has black above or below');
  });
});
