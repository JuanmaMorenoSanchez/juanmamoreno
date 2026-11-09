/**
 * What a page costs the reader: how much it moves under them, and how much it
 * weighs.
 *
 * Both are things every other check here is blind to. `verify-render` reads the
 * built html as text, so a page that is correct and then rearranges itself
 * passes it. The unit tests run in jsdom, which has no layout at all. And the
 * suites in this folder ask whether something happens, never what it costs — so
 * the site shipped for months with every page on every phone jumping 80px
 * upwards about 140ms after it appeared, and nothing noticed. A prerendered page
 * that moves is the one fault a prerendered site is supposed to be free of.
 *
 * Measured at 393px, which is a phone held in a hand, because that is where
 * both faults were worst and where most readers are.
 */
import assert from 'node:assert/strict';
import { after, before, describe, it } from 'node:test';
import { BASE_URL, launchBrowser } from './browser.mjs';

/** A phone held in a hand: an iPhone 15 at its own pixel ratio. */
const PHONE = { width: 393, height: 852 };

/**
 * What each page is allowed to cost: how far it may shift, and how many
 * kilobytes it may send. Ceilings with room above today's measurement, not
 * targets — they are here to catch the next regression, not to argue with a
 * number somebody chose on purpose.
 *
 * **The shift figures are two different things.** The landing page and the
 * prose pages are at zero and are held to Google's "good" band, 0.1. The
 * catalogue and an artwork page are allowed 0.23 and 0.33, which is over
 * Google's "poor" line, because they still carry one known fault: the browser
 * discards the prerendered page body and builds it again about 30ms in, when a
 * signal that depends on the catalogue reads empty for one frame. It is
 * measured, it is old, and closing it is its own piece of work — either the
 * data travels in the page as it already does on /artworks, or those blocks
 * keep their prerendered html through `@defer (hydrate …)`. Until then these
 * two numbers are a ratchet, and they come down when it is fixed.
 *
 * **The weight figures are uncompressed.** `serve-dist.mjs` sends no
 * `content-encoding`, so a page measures around three times what a reader
 * actually downloads from GitHub Pages, which serves everything compressed.
 * The numbers are consistent between runs, which is all a gate needs.
 *
 * An artwork page is allowed its four megabytes on purpose. The painting shown
 * is the original photograph, unchanged, because that is what the artist
 * decided an artwork page is; the archival copies are extra rungs and never a
 * replacement. The ceiling is here so a *second* full-size image cannot creep
 * in beside it unnoticed.
 */
const CEILING = {
  '/': { cls: 0.1, kb: 2_600 },
  '/about': { cls: 0.1, kb: 2_400 },
  '/artworks': { cls: 0.23, kb: 3_600 },
  '/artwork/66': { cls: 0.33, kb: 5_000 },
};

const PAGES = Object.keys(CEILING);

let browser;
let cannotRun = null;

before(async () => {
  ({ browser, cannotRun } = await launchBrowser());
});

after(async () => {
  await browser?.close();
});

/**
 * Opens a page on a phone and reports what it cost.
 *
 * `locale` is pinned: a browser that prefers Spanish is sent from /about to
 * /es/about by the language guard on a first visit, and that redirect is itself
 * a navigation — measuring it gives the shift of a page nobody asked for.
 *
 * The observers are installed before anything of the page exists, and
 * `buffered: true` hands them the entries from before they were listening, so
 * nothing between the first paint and here is missed.
 */
async function costOf(path) {
  const context = await browser.newContext({ viewport: PHONE, locale: 'en-US' });
  const page = await context.newPage();

  // Asked of the request rather than read off a `content-length` header: all but
  // three of the fifty-odd responses an artwork page makes send no such header,
  // and summing them reported a page of 0kB.
  const weighed = [];
  page.on('response', (response) => {
    weighed.push(
      response
        .request()
        .sizes()
        .then((sizes) => sizes.responseBodySize)
        .catch(() => 0)
    );
  });

  await page.addInitScript(() => {
    window.__shift = { total: 0, worst: [] };
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // A shift the reader caused by tapping something is not a fault.
        if (entry.hadRecentInput) continue;
        window.__shift.total += entry.value;
        for (const source of entry.sources ?? []) {
          const node = source.node;
          window.__shift.worst.push({
            value: Math.round(entry.value * 1000) / 1000,
            what: node?.tagName
              ? `${node.tagName.toLowerCase()}${node.className ? `.${String(node.className).split(/\s+/)[0]}` : ''}`
              : 'unknown',
            by: Math.round(source.currentRect.top - source.previousRect.top),
          });
        }
      }
    }).observe({ type: 'layout-shift', buffered: true });
  });

  await page.goto(BASE_URL + path, { waitUntil: 'load' });
  // Everything that was going to arrive has arrived, then a moment for whatever
  // it moved. Both waits swallow their own timeout: a quiet network that never
  // reports itself idle must not fail a test about layout.
  await page.waitForLoadState('networkidle', { timeout: 20_000 }).catch(() => {});
  await page.waitForTimeout(1_500);

  const shift = await page.evaluate(() => window.__shift);
  const bytes = (await Promise.all(weighed)).reduce((all, one) => all + one, 0);
  await context.close();

  return {
    cls: Math.round(shift.total * 1000) / 1000,
    moved: shift.worst.sort((a, b) => b.value - a.value).slice(0, 4),
    kb: Math.round(bytes / 1024),
  };
}

describe('what a page costs on a phone', () => {
  // One load per page answers both questions, so it is loaded once.
  for (const path of PAGES) {
    it(`${path} settles where it was drawn, and weighs what it should`, async (t) => {
      if (cannotRun) return t.skip(cannotRun);

      const { cls, moved, kb } = await costOf(path);
      const allowed = CEILING[path];
      console.log(`  ${path}: CLS ${cls} (of ${allowed.cls}), ${kb}kB (of ${allowed.kb})`);

      assert.ok(
        cls <= allowed.cls,
        `${path} shifted ${cls}, over its ${allowed.cls}. Worst: ${moved
          .map((m) => `${m.what} by ${m.by}px`)
          .join('; ')}`
      );
      assert.ok(kb <= allowed.kb, `${path} sent ${kb}kB to a phone, over its ${allowed.kb}kB`);
    });
  }
});
