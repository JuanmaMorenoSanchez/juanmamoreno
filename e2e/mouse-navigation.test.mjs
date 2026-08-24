/**
 * The catalogue grid, clicked the way a hand clicks it.
 *
 * These exist because of a fault no other test here could have seen. Every tile
 * had a correct href and a correct routerLink, the unit tests passed, the
 * Cypress suite passed, and on a desktop the tiles still refused to open: an
 * <a> and an <img> are both draggable by default, so pressing a tile and
 * letting the mouse drift about four pixels before releasing started a native
 * drag, and a browser that has started a drag fires no click at all. Touch has
 * no drag gesture, so phones were fine. Display scaling shrinks that threshold
 * in css pixels, so on some machines it was near-permanent.
 *
 * Reproducing it needs a real pointer — mousedown, a few mousemoves, mouseup —
 * driven at the browser level. Cypress dispatches synthetic events, which the
 * drag machinery ignores, so a Cypress test of this passes whether the bug is
 * present or not. Playwright drives the browser's own input, which is the only
 * reason these tests can fail.
 *
 * Run against a server you started yourself:
 *   npm start                 # in one terminal
 *   npm run test:e2e:mouse    # in another
 * E2E_BASE_URL points it somewhere else (the deployed site, a preview build),
 * CHROME_PATH at a Chrome the script could not find on its own.
 */
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { after, before, describe, it } from 'node:test';
import { chromium } from 'playwright-core';

const BASE_URL = process.env.E2E_BASE_URL ?? 'http://127.0.0.1:4201';

// playwright-core ships no browser of its own, on purpose: this suite is about
// what Chrome does, so it runs the Chrome that is installed.
const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/opt/google/chrome/chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].filter(Boolean);

function findChrome() {
  const found = CHROME_CANDIDATES.find((path) => existsSync(path));
  if (!found) {
    throw new Error(
      `No Chrome found. Looked in:\n  ${CHROME_CANDIDATES.join('\n  ')}\nSet CHROME_PATH to point at one.`
    );
  }
  return found;
}

async function requireServer() {
  const response = await fetch(BASE_URL, { signal: AbortSignal.timeout(10_000) }).catch(() => null);
  if (!response?.ok) {
    throw new Error(`Nothing answering at ${BASE_URL}. Start it with \`npm start\`.`);
  }
}

/** How far the pointer wanders between press and release. Four is enough. */
const DRIFT_PX = 12;

let browser;

/**
 * Presses the link, moves the pointer a little, releases — a click as a hand
 * makes it, not as a script makes it — and answers with where the browser ended
 * up and whether a drag was started instead.
 */
async function clickWithDriftingMouse(page, selector) {
  const link = page.locator(selector).first();
  await link.scrollIntoViewIfNeeded();
  const href = await link.getAttribute('href');
  const box = await link.boundingBox();
  assert.ok(box, `${selector} has no box on screen`);
  const x = box.x + box.width / 2;
  const y = box.y + box.height / 2;

  await page.evaluate(() => {
    window.__dragStarts = 0;
    document.addEventListener('dragstart', () => (window.__dragStarts += 1), true);
  });

  await page.mouse.move(x, y);
  await page.mouse.down();
  for (let step = 1; step <= DRIFT_PX; step += 1) {
    await page.mouse.move(x + step, y + step);
    await page.waitForTimeout(8);
  }
  await page.mouse.up();

  await page.waitForURL((url) => url.pathname === href, { timeout: 8000 }).catch(() => {});

  return {
    href,
    landedOn: new URL(page.url()).pathname,
    dragStarts: await page.evaluate(() => window.__dragStarts),
  };
}

async function openPage(path) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
  await page.goto(BASE_URL + path, { waitUntil: 'domcontentloaded' });
  return page;
}

describe('opening an artwork with a mouse', () => {
  before(async () => {
    await requireServer();
    browser = await chromium.launch({ executablePath: findChrome(), headless: true });
  });

  after(async () => {
    await browser?.close();
  });

  it('opens the artwork when a catalogue tile is clicked', async () => {
    const page = await openPage('/artworks');
    await page.waitForSelector('mat-grid-tile a.tile-link');
    const link = page.locator('mat-grid-tile a.tile-link').first();
    const href = await link.getAttribute('href');

    assert.match(href, /^\/artwork\/\d+$/);
    await link.click();
    await page.waitForURL((url) => url.pathname === href, { timeout: 8000 });
    await page.close();
  });

  it('still opens it when the mouse drifts between press and release', async () => {
    const page = await openPage('/artworks');
    await page.waitForSelector('mat-grid-tile a.tile-link');

    const { href, landedOn, dragStarts } = await clickWithDriftingMouse(
      page,
      'mat-grid-tile a.tile-link'
    );

    assert.equal(dragStarts, 0, 'the tile was dragged instead of clicked, which eats the click');
    assert.equal(landedOn, href, 'the catalogue did not open the artwork');
    await page.close();
  });

  it('still opens the featured painting when the mouse drifts on the home page', async () => {
    const page = await openPage('/');
    await page.waitForSelector('a.home-featured');

    const { href, landedOn, dragStarts } = await clickWithDriftingMouse(page, 'a.home-featured');

    assert.equal(dragStarts, 0, 'the hero link was dragged instead of clicked');
    assert.equal(landedOn, href, 'the home page did not open the featured painting');
    await page.close();
  });
});
