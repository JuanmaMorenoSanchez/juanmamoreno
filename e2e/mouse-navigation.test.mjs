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
  return CHROME_CANDIDATES.find((path) => existsSync(path)) ?? null;
}

/**
 * Sandboxing is what a browser does to isolate a page from the machine. On a
 * throwaway CI container there is nothing to isolate it from and the kernel
 * features it needs are often not there, so Chrome refuses to start at all.
 */
const LAUNCH_ARGS = process.env.CI
  ? ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
  : [];

async function requireServer() {
  const response = await fetch(BASE_URL, { signal: AbortSignal.timeout(10_000) }).catch(() => null);
  if (!response?.ok) {
    throw new Error(`Nothing answering at ${BASE_URL}. Start it with \`npm start\`.`);
  }
}

/** How far the pointer wanders between press and release. Four is enough. */
const DRIFT_PX = 12;

/** Where the drag count is kept. See {@link clickWithDriftingMouse}. */
const DRAG_COUNT = 'e2e.dragStarts';

/**
 * Waiting for the address to change, and not for the page to finish loading.
 *
 * The catalogue hangs its thumbnails off a third-party CDN, a hundred and sixty
 * of them, and the load event waits on every one. Left at its default this asks
 * whether someone else's image host answered promptly, which is not what is
 * being tested here and is not something this repository can keep true: the
 * catalogue passed on the deployed build and failed on the same assertion an
 * hour later, on a commit that touched none of it.
 */
/**
 * Generous on purpose. A cold CI runner is far slower than a laptop, and this
 * step has already blocked a deploy once by giving up on a navigation that was
 * merely slow — a flaky gate on publishing is worse than no gate, because it
 * teaches everyone to ignore it. What is being measured is whether a click
 * navigates at all, never how quickly.
 */
const ARRIVAL = { timeout: 30_000, waitUntil: 'commit' };
const READY = { timeout: 30_000 };

let browser;
/**
 * Set when this machine cannot run a browser at all, as opposed to running one
 * and finding the catalogue broken. The difference matters: a missing Chrome is
 * a fact about the runner, and failing the deploy over it would stop the site
 * being published because of something that says nothing about the site. A real
 * regression still fails, which is the whole point of the suite.
 */
let cannotRun = null;

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

  // Counted in sessionStorage rather than on window, because the count has to
  // outlive the document. Before the page has hydrated the link is a plain
  // anchor and opening it replaces the document, taking any counter on window
  // with it — and an undefined counter then reads as "the link was dragged",
  // which is the opposite of what happened. sessionStorage survives the
  // navigation, so the answer is the same whichever way the link was followed.
  await page.evaluate((key) => {
    sessionStorage.setItem(key, '0');
    document.addEventListener(
      'dragstart',
      () => {
        const seen = Number(sessionStorage.getItem(key) ?? '0');
        sessionStorage.setItem(key, String(seen + 1));
      },
      true
    );
  }, DRAG_COUNT);

  await page.mouse.move(x, y);
  await page.mouse.down();
  for (let step = 1; step <= DRIFT_PX; step += 1) {
    await page.mouse.move(x + step, y + step);
    await page.waitForTimeout(8);
  }
  await page.mouse.up();

  await page.waitForURL((url) => url.pathname === href, ARRIVAL).catch(() => {});

  return {
    href,
    landedOn: new URL(page.url()).pathname,
    dragStarts: Number(
      await page.evaluate((key) => sessionStorage.getItem(key) ?? '0', DRAG_COUNT)
    ),
  };
}

async function openPage(path) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
  await page.goto(BASE_URL + path, { waitUntil: 'domcontentloaded' });
  // The prerendered markup carries the tiles, but the router only intercepts a
  // click once the page has hydrated. Clicking before that still navigates —
  // they are real anchors — yet it makes the test measure a different thing on
  // a fast machine than on a slow one, which is where flakiness comes from.
  await page.waitForLoadState('load').catch(() => {});
  return page;
}

describe('opening an artwork with a mouse', () => {
  before(async () => {
    await requireServer();

    const chrome = findChrome();
    if (!chrome) {
      cannotRun = `no Chrome on this machine. Looked in:\n  ${CHROME_CANDIDATES.join('\n  ')}`;
      console.log(`Skipping: ${cannotRun}`);
      return;
    }

    try {
      browser = await chromium.launch({
        executablePath: chrome,
        headless: true,
        args: LAUNCH_ARGS,
      });
      console.log(`Driving ${chrome}${LAUNCH_ARGS.length ? ' (sandbox off)' : ''}`);
    } catch (error) {
      cannotRun = `${chrome} would not start: ${error.message.split('\n')[0]}`;
      console.log(`Skipping: ${cannotRun}`);
    }
  });

  after(async () => {
    await browser?.close();
  });

  it('opens the artwork when a catalogue tile is clicked', async (t) => {
    if (cannotRun) return t.skip(cannotRun);

    const page = await openPage('/artworks');
    await page.waitForSelector('mat-grid-tile a.tile-link', READY);
    const link = page.locator('mat-grid-tile a.tile-link').first();
    const href = await link.getAttribute('href');

    assert.match(href, /^\/artwork\/\d+$/);
    await link.click();
    await page.waitForURL((url) => url.pathname === href, ARRIVAL);
    await page.close();
  });

  it('still opens it when the mouse drifts between press and release', async (t) => {
    if (cannotRun) return t.skip(cannotRun);

    const page = await openPage('/artworks');
    await page.waitForSelector('mat-grid-tile a.tile-link', READY);

    const { href, landedOn, dragStarts } = await clickWithDriftingMouse(
      page,
      'mat-grid-tile a.tile-link'
    );

    assert.equal(dragStarts, 0, 'the tile was dragged instead of clicked, which eats the click');
    assert.equal(landedOn, href, 'the catalogue did not open the artwork');
    await page.close();
  });

  it('still opens the featured painting when the mouse drifts on the home page', async (t) => {
    if (cannotRun) return t.skip(cannotRun);

    const page = await openPage('/');
    await page.waitForSelector('a.home-featured', READY);

    const { href, landedOn, dragStarts } = await clickWithDriftingMouse(page, 'a.home-featured');

    assert.equal(dragStarts, 0, 'the hero link was dragged instead of clicked');
    assert.equal(landedOn, href, 'the home page did not open the featured painting');
    await page.close();
  });
});
