/**
 * That the suites do not talk to the live api.
 *
 * They did, on every run, and got nothing back: the api allows one origin —
 * `https://juanmamoreno.com` — so a page served from `127.0.0.1` had every
 * answer discarded by the browser for want of a CORS header. The requests still
 * travelled, were answered, and were billed. And `load` waited for them, which
 * is how a page that renders perfectly timed out at thirty seconds and blocked
 * a deploy, then passed three seconds later.
 *
 * This is the test that keeps it that way. Without it the next person to add a
 * suite that makes its own pages, or to touch the harness, puts the whole gate
 * back on the live api and nothing says so until a deploy fails at random.
 */
import assert from 'node:assert/strict';
import { after, before, describe, it } from 'node:test';
import { recordedAnswer } from './api-fixtures.mjs';
import { apiCallsStopped, BASE_URL, launchBrowser, openPage } from './browser.mjs';

describe('the api is answered from disk', () => {
  let browser;
  let cannotRun;

  before(async () => {
    ({ browser, cannotRun } = await launchBrowser());
  });

  after(async () => {
    await browser?.close();
  });

  it('answers the calls the catalogue makes, rather than sending them', async (t) => {
    if (!browser) return t.skip(cannotRun);

    const before = apiCallsStopped();
    const page = await openPage(browser, '/artworks');
    await page.waitForTimeout(3_000);
    const stopped = apiCallsStopped() - before;
    await page.close();

    // The catalogue asks for about a dozen things. The number is not the point;
    // that it is more than none proves the interception is actually wired, and
    // a zero here would mean the suite had quietly gone back to live.
    assert.ok(stopped > 0, `expected the catalogue to try the api, intercepted ${stopped} calls`);
  });

  /**
   * The suites that open their own pages, which is four of them. A wrapper on
   * the browser covers those; a route installed in `openPage` would not have.
   *
   * What is counted is interceptions, not responses: an answer served from disk
   * is a real response to the page, so counting responses proves nothing about
   * where they came from.
   */
  it('answers them on a page the harness did not open', async (t) => {
    if (!browser) return t.skip(cannotRun);

    const before = apiCallsStopped();
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();

    await page.goto(`${BASE_URL}/artworks`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3_000);
    const answered = apiCallsStopped() - before;
    await context.close();

    assert.ok(answered > 0, `a page the harness did not open went live; intercepted ${answered}`);
  });

  /**
   * That the catalogue the suites see is the real one.
   *
   * Without the recording the app falls back to the smaller dataset bundled
   * into the bundle, and a navigation test could no longer reach every
   * painting. If the fixture goes missing this says so plainly instead of that
   * test failing for a reason nobody would guess.
   */
  it('serves the whole recorded catalogue, not the bundled subset', async (t) => {
    if (!browser) return t.skip(cannotRun);

    const { recorded } = recordedAnswer('nfts-snapshot');
    assert.ok(recorded, 'nfts-snapshot is not recorded; run `node e2e/record-api.mjs`');
  });
});
