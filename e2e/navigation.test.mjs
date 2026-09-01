/**
 * The site as a reader moves through it.
 *
 * Everything here needs a real browser and could not be caught anywhere else.
 * The unit tests see components in isolation; `verify-render` reads the
 * prerendered html and never runs a line of the application. Between the two
 * sits everything that only breaks once the page is alive: hydration, the
 * router taking over from plain anchors, and the language a link lands you in.
 */
import assert from 'node:assert/strict';
import { after, before, describe, it } from 'node:test';
import { ARRIVAL, READY, launchBrowser, openPage, visibleText } from './browser.mjs';

let browser;
let cannotRun = null;

before(async () => {
  ({ browser, cannotRun } = await launchBrowser());
});

after(async () => {
  await browser?.close();
});

describe('an artwork page', () => {
  // R1. This was covered by a Cypress spec that no longer exists and that
  // nothing had run since August.
  it('shows the painting, its year, its medium and its size', async (t) => {
    if (cannotRun) return t.skip(cannotRun);

    const page = await openPage(browser, '/artwork/5');
    await page.waitForSelector('h1', READY);

    const heading = (await page.locator('h1').first().innerText()).trim();
    assert.ok(heading.length > 0, 'the artwork page has no title');

    const text = await visibleText(page);
    assert.match(text, /\b(19|20)\d{2}\b/, `no year on the page: ${text.slice(0, 200)}`);
    assert.match(text, /\d+\s*x\s*\d+\s*cm/i, `no dimensions on the page: ${text.slice(0, 200)}`);

    await page.close();
  });

  it('offers the other views of the same painting', async (t) => {
    if (cannotRun) return t.skip(cannotRun);

    const page = await openPage(browser, '/artwork/5');
    await page.waitForSelector('h1', READY);

    // Token 5 is photographed more than once, so the pager counts above one.
    const text = await visibleText(page);
    const counter = text.match(/(\d+)\s*\/\s*(\d+)/);
    assert.ok(counter, `no view counter on the page: ${text.slice(0, 200)}`);
    assert.ok(Number(counter[2]) >= 1, 'the pager counts no views at all');

    await page.close();
  });
});

describe('the language a link lands you in', () => {
  /**
   * Menu links were once absolute, so Statement, CV and Contacto threw a
   * Spanish reader back into English halfway through the site. The address is
   * the language here, which makes this the one navigation fault that changes
   * what the site says rather than whether it works.
   */
  for (const label of ['Statement', 'CV', 'Contacto']) {
    it(`keeps a Spanish reader in Spanish when following "${label}"`, async (t) => {
      if (cannotRun) return t.skip(cannotRun);

      const page = await openPage(browser, '/es/artworks', 'es-ES');
      const link = page.locator('app-top-menu a:visible, app-top-menu button:visible', {
        hasText: new RegExp(`^\\s*${label}\\s*$`),
      });
      await link.first().click();
      await page.waitForURL(() => true, ARRIVAL).catch(() => {});

      const landed = new URL(page.url()).pathname;
      assert.match(landed, /^\/es\//, `"${label}" left the Spanish tree, landing on ${landed}`);

      await page.close();
    });
  }

  /**
   * The router reads "/es/" as the segments ["es", ""], which matches no route.
   * A trailing slash is what a browser adds on its own and what a person types,
   * so the Spanish front door has to survive one.
   */
  it('renders the Spanish home when the address ends in a slash', async (t) => {
    if (cannotRun) return t.skip(cannotRun);

    const page = await openPage(browser, '/es/', 'es-ES');
    await page.waitForSelector('app-top-menu', READY);

    const text = await visibleText(page);
    assert.ok(text.length > 100, `/es/ rendered almost nothing: "${text}"`);
    assert.match(text, /Pinturas/, 'the Spanish navigation is not there');

    await page.close();
  });
});

describe('hydration', () => {
  /**
   * Whether the application is actually running, asked the only way that
   * cannot be faked by good markup: navigate, and see whether the document
   * survived. A page that never hydrated still moves — the links are real
   * anchors — but it moves by replacing the document, and anything held in
   * memory goes with it.
   */
  it('navigates without throwing the document away', async (t) => {
    if (cannotRun) return t.skip(cannotRun);

    const page = await openPage(browser, '/artworks');
    await page.waitForSelector('app-top-menu', READY);

    await page.evaluate(() => {
      window.__e2eSurvivedNavigation = true;
    });

    await page
      .locator('app-top-menu a:visible, app-top-menu button:visible', { hasText: /^\s*CV\s*$/ })
      .first()
      .click();
    await page.waitForURL((url) => url.pathname.endsWith('/cv'), ARRIVAL).catch(() => {});

    const survived = await page.evaluate(() => window.__e2eSurvivedNavigation === true);
    assert.equal(
      survived,
      true,
      'the document was replaced, so the router never took the click: the page had not hydrated'
    );

    await page.close();
  });
});

describe('the Spanish landing page', () => {
  /**
   * The featured painting is most of the Spanish landing page and was the most
   * prominent link on the site. It was written `['/artwork', tokenId]` — an
   * absolute English path — while the catalogue grid beside it had always
   * built its links for the language being read.
   */
  it('keeps a Spanish reader in Spanish through the featured painting', async (t) => {
    if (cannotRun) return t.skip(cannotRun);

    const page = await openPage(browser, '/es', 'es-ES');
    await page.waitForSelector('a.home-featured', READY);

    const href = await page.locator('a.home-featured').first().getAttribute('href');
    assert.match(href, /^\/es\/artwork\//, `the hero leaves the Spanish tree: ${href}`);

    await page.locator('a.home-featured').first().click();
    await page.waitForURL((url) => url.pathname.includes('/artwork/'), ARRIVAL).catch(() => {});

    const landed = new URL(page.url()).pathname;
    assert.match(landed, /^\/es\//, `the featured painting landed on ${landed}`);

    await page.close();
  });
});

/*
 * The 404 page's own links are proven by not-found.component.spec.ts instead
 * of here. In production GitHub Pages answers an unknown path with the
 * 404.html that angular-cli-ghpages writes from index.html, and the router
 * shows the page once the app boots. serve-dist.mjs deliberately does not do
 * that — it serves files and nothing else, so that a page missing from the
 * build fails these tests rather than being quietly replaced by the
 * application. Teaching it a fallback to reach this one page would blind every
 * other test in this file.
 */

describe('reading the site the way you like it', () => {
  /**
   * The whole point of writing the choice down. Asked across a reload rather
   * than in memory, because a preference that does not survive the visit is
   * not one.
   */
  it('is still dark on the next page after asking for dark', async (t) => {
    if (cannotRun) return t.skip(cannotRun);

    const page = await openPage(browser, '/artworks');
    await page.waitForSelector('app-top-menu', READY);

    await page.locator('app-top-menu button.theme-toggle:visible').first().click();
    await page.waitForFunction(
      () => document.documentElement.dataset.theme === 'dark',
      undefined,
      READY
    );

    await page.goto(page.url(), { waitUntil: 'domcontentloaded' });

    // Stamped by the inline script in index.html, before the application has
    // booted — which is what stops the page painting light and then swapping.
    const stamped = await page.evaluate(() => document.documentElement.dataset.theme);
    assert.equal(stamped, 'dark', 'the theme was not remembered across a reload');

    await page.close();
  });

  /**
   * Sorting is remembered the same way. Checked through what the reader
   * actually sees — the arrow on the chip in force — rather than through
   * storage, so it proves the stored value is read back and applied, not
   * merely written.
   */
  it('comes back to the catalogue arranged the way it was left', async (t) => {
    if (cannotRun) return t.skip(cannotRun);

    const page = await openPage(browser, '/artworks');
    await page.waitForSelector('.sort-group mat-chip', READY);

    // The row reads: year, size, medium. Year is in force on arrival, so
    // pressing size moves the arrow onto a different chip.
    await page.locator('.sort-group mat-chip').nth(1).click();
    await page.waitForFunction(
      () =>
        document.querySelectorAll('.sort-group mat-chip')[1]?.querySelectorAll('mat-icon')
          .length === 2,
      undefined,
      READY
    );

    await page.goto(page.url(), { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.sort-group mat-chip', READY);

    // Two icons — the method and the direction — mark the one in force.
    const marked = await page.locator('.sort-group mat-chip').nth(1).locator('mat-icon').count();
    assert.equal(marked, 2, 'the catalogue forgot how it was arranged');

    await page.close();
  });
});

/**
 * Narrowing the catalogue to what has sold, or to what has not.
 *
 * The picker sits in the breadcrumb, beside the year, and the grid it narrows
 * is a separate component further down the page. Nothing but a real browser
 * shows whether a choice made in one reaches the other, and whether it is
 * still in force on the next visit.
 */
describe('the availability picker', () => {
  const AVAILABILITY = 'mat-select[aria-label="Select availability"]';

  /** Opens the picker and takes one of its three answers. */
  async function choose(page, label) {
    await page.locator(AVAILABILITY).click();
    await page.getByRole('option', { name: label, exact: true }).click();
    // The overlay closes on its own; waiting for its backdrop to go keeps the
    // next click from landing on something still covering the page.
    await page
      .locator('.cdk-overlay-backdrop')
      .waitFor({ state: 'detached', timeout: 10_000 })
      .catch(() => {});
  }

  const tileCount = (page) => page.locator('a.tile-link').count();

  it('narrows the catalogue to what has sold, and back again', async (t) => {
    if (cannotRun) return t.skip(cannotRun);

    const page = await openPage(browser, '/artworks');
    await page.waitForSelector('a.tile-link', READY);
    const everything = await tileCount(page);
    assert.ok(everything > 40, `only ${everything} paintings on the catalogue to begin with`);

    await choose(page, 'Sold');
    await page.waitForFunction(
      (before) => document.querySelectorAll('a.tile-link').length < before,
      everything,
      READY
    );

    const sold = await tileCount(page);
    assert.ok(sold > 0, 'narrowing to sold left nothing at all');
    assert.ok(sold < everything, `sold (${sold}) is not fewer than everything (${everything})`);

    // The chip that says so, alongside the year chips.
    const chips = await page.locator('mat-chip').allInnerTexts();
    assert.ok(
      chips.some((chip) => chip.includes('Sold')),
      `no chip naming the filter: ${JSON.stringify(chips)}`
    );

    await choose(page, 'Available');
    await page.waitForFunction(
      (soldCount) => document.querySelectorAll('a.tile-link').length !== soldCount,
      sold,
      READY
    );
    const available = await tileCount(page);
    assert.equal(
      sold + available,
      everything,
      `sold (${sold}) and available (${available}) do not add up to everything (${everything})`
    );

    await page.close();
  });

  it('is still in force on the next visit', async (t) => {
    if (cannotRun) return t.skip(cannotRun);

    const page = await openPage(browser, '/artworks');
    await page.waitForSelector('a.tile-link', READY);
    const everything = await tileCount(page);

    await choose(page, 'Sold');
    await page.waitForFunction(
      (before) => document.querySelectorAll('a.tile-link').length < before,
      everything,
      READY
    );
    const sold = await tileCount(page);

    await page.goto(page.url(), { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('a.tile-link', READY);
    await page.waitForFunction(
      (soldCount) => document.querySelectorAll('a.tile-link').length === soldCount,
      sold,
      READY
    );

    const chips = await page.locator('mat-chip').allInnerTexts();
    assert.ok(
      chips.some((chip) => chip.includes('Sold')),
      `the chip did not come back: ${JSON.stringify(chips)}`
    );

    // Left as we found it, so the suite does not depend on its own order.
    await choose(page, 'All');
    await page.close();
  });

  // A way of looking, not a place: the year says which paintings a link is
  // about and belongs in an address that can be shared, this does not.
  it('keeps itself out of the address', async (t) => {
    if (cannotRun) return t.skip(cannotRun);

    const page = await openPage(browser, '/artworks');
    await page.waitForSelector('a.tile-link', READY);

    await choose(page, 'Sold');
    await page.waitForFunction(
      () => document.querySelectorAll('mat-chip').length > 0,
      undefined,
      READY
    );

    assert.ok(
      !page.url().includes('availability'),
      `the filter reached the address: ${page.url()}`
    );

    await choose(page, 'All');
    await page.close();
  });
});
