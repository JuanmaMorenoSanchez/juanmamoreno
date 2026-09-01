/**
 * The shared harness for the end-to-end suites.
 *
 * Everything here answers one question: is there a browser on this machine and
 * a server to point it at. Both suites need that and neither should own it.
 *
 * Run against a server you started yourself:
 *   npm start            # in one terminal
 *   npm run test:e2e     # in another
 * E2E_BASE_URL points it somewhere else (the deployed site, a preview build),
 * CHROME_PATH at a Chrome the script could not find on its own.
 */
import { existsSync } from 'node:fs';
import { chromium } from 'playwright-core';

export const BASE_URL = process.env.E2E_BASE_URL ?? 'http://127.0.0.1:4201';

/**
 * Generous on purpose. A cold CI runner is far slower than a laptop, and this
 * step has already blocked a deploy once by giving up on a navigation that was
 * merely slow — a flaky gate on publishing is worse than no gate, because it
 * teaches everyone to ignore it. What is measured is whether something happens
 * at all, never how quickly.
 */
export const ARRIVAL = { timeout: 30_000, waitUntil: 'commit' };
export const READY = { timeout: 30_000 };

// playwright-core ships no browser of its own, on purpose: these suites are
// about what Chrome does, so they run the Chrome that is installed.
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

/**
 * Sandboxing is what a browser does to isolate a page from the machine. On a
 * throwaway CI container there is nothing to isolate it from and the kernel
 * features it needs are often not there, so Chrome refuses to start at all.
 */
const LAUNCH_ARGS = process.env.CI
  ? ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
  : [];

function findChrome() {
  return CHROME_CANDIDATES.find((path) => existsSync(path)) ?? null;
}

/**
 * A browser, or the reason there is not one.
 *
 * `cannotRun` is set when this machine cannot run a browser at all, as opposed
 * to running one and finding the site broken. The difference matters: a missing
 * Chrome is a fact about the runner, and failing the deploy over it would stop
 * the site being published because of something that says nothing about the
 * site. A real regression still fails, which is the whole point.
 */
export async function launchBrowser() {
  const response = await fetch(BASE_URL, { signal: AbortSignal.timeout(10_000) }).catch(() => null);
  if (!response?.ok) {
    throw new Error(`Nothing answering at ${BASE_URL}. Start it with \`npm start\`.`);
  }

  const chrome = findChrome();
  if (!chrome) {
    const cannotRun = `no Chrome on this machine. Looked in:\n  ${CHROME_CANDIDATES.join('\n  ')}`;
    console.log(`Skipping: ${cannotRun}`);
    return { browser: null, cannotRun };
  }

  try {
    const browser = await chromium.launch({
      executablePath: chrome,
      headless: true,
      args: LAUNCH_ARGS,
    });
    console.log(`Driving ${chrome}${LAUNCH_ARGS.length ? ' (sandbox off)' : ''}`);
    return { browser, cannotRun: null };
  } catch (error) {
    const cannotRun = `${chrome} would not start: ${error.message.split('\n')[0]}`;
    console.log(`Skipping: ${cannotRun}`);
    return { browser: null, cannotRun };
  }
}

/**
 * Opens a page and waits for it to hydrate.
 *
 * The prerendered markup carries the content, but the router only intercepts a
 * click once the page has hydrated. Acting before that still works — they are
 * real anchors — yet it makes a test measure a different thing on a fast
 * machine than on a slow one, which is where flakiness comes from.
 */
export async function openPage(browser, path, locale = 'en-US') {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, locale });
  await page.goto(BASE_URL + path, { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('load').catch(() => {});
  return page;
}

/** The whole page as a reader would read it, whitespace collapsed. */
export async function visibleText(page) {
  return (await page.locator('body').innerText()).replace(/\s+/g, ' ').trim();
}
