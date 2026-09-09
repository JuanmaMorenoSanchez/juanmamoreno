/**
 * The years menu, which is as long as the artist has been painting.
 *
 * Nineteen entries and one more every year, and Material caps a menu panel at
 * the viewport less forty-eight pixels — which for a list this long is no cap
 * at all. It measured exactly the height of the window at every size tried:
 * 800px on a desktop, 700 on a laptop, 844 on a phone. Opening it replaced the
 * page rather than covering part of it.
 *
 * The cap is a stylesheet rule on the overlay panel, so nothing below the
 * browser can see whether it is in effect: jsdom applies no stylesheet, and the
 * panel is drawn outside the component that declares it. A real browser
 * measuring a real panel is the only thing that can fail here.
 */
import assert from 'node:assert/strict';
import { after, before, describe, it } from 'node:test';
import { READY, launchBrowser, openPage } from './browser.mjs';

let browser;
let cannotRun = null;

/** Opens Paintings → By Year and hands back the panel that appeared. */
async function openYears(page) {
  await page.waitForSelector('mat-toolbar', READY);
  await page.locator('mat-toolbar button:has-text("Paintings")').first().click();
  await page.locator('button:has-text("By Year")').first().click();
  await page.waitForSelector('.years-menu', READY);
  return page.locator('.years-menu').last();
}

describe('the years menu', () => {
  before(async () => {
    ({ browser, cannotRun } = await launchBrowser());
  });

  after(async () => {
    await browser?.close();
  });

  /**
   * The whole complaint: it took the entire height of the screen. A menu the
   * size of the window is not a menu, it is a page.
   */
  it('leaves most of the page visible behind it', async (t) => {
    if (cannotRun) return t.skip(cannotRun);

    const page = await openPage(browser, '/');
    await page.setViewportSize({ width: 1280, height: 800 });
    const panel = await openYears(page);

    const box = await panel.boundingBox();
    assert.ok(box, 'the years panel has no box on screen');
    assert.ok(
      box.height < 800 * 0.6,
      `the years panel is ${Math.round(box.height)}px of an 800px window`,
    );
    await page.close();
  });

  it('sits inside the window rather than running off it', async (t) => {
    if (cannotRun) return t.skip(cannotRun);

    const page = await openPage(browser, '/');
    await page.setViewportSize({ width: 1280, height: 800 });
    const box = await (await openYears(page)).boundingBox();

    assert.ok(box.y >= 0, `the panel starts at y=${Math.round(box.y)}`);
    assert.ok(box.y + box.height <= 800, 'the panel runs past the bottom of the window');
    await page.close();
  });

  /**
   * Capping the height is only half of it: every year has to remain reachable.
   * A panel that hides the early work and cannot be scrolled to it would be a
   * worse fault than the one being fixed.
   */
  it('scrolls to the years it cannot show at once', async (t) => {
    if (cannotRun) return t.skip(cannotRun);

    const page = await openPage(browser, '/');
    await page.setViewportSize({ width: 1280, height: 800 });
    const panel = await openYears(page);

    const scrollable = await panel.evaluate((el) => el.scrollHeight > el.clientHeight + 1);
    assert.ok(scrollable, 'the panel shows every year at once, so the cap is not in effect');

    await panel.evaluate((el) => {
      el.scrollTop = el.scrollHeight;
    });
    const last = panel.locator('.mat-mdc-menu-item').last();
    await last.waitFor({ state: 'visible', ...READY });
    assert.ok(await last.isVisible(), 'the oldest year cannot be reached by scrolling');
    await page.close();
  });

  // The cap is relative as well as absolute, so a short window gets a shorter
  // menu rather than one that overflows it.
  it('gets shorter on a short window rather than overflowing it', async (t) => {
    if (cannotRun) return t.skip(cannotRun);

    const page = await openPage(browser, '/');
    await page.setViewportSize({ width: 1280, height: 500 });
    const box = await (await openYears(page)).boundingBox();

    assert.ok(box.height <= 500 * 0.62, `the panel is ${Math.round(box.height)}px of a 500px window`);
    assert.ok(box.y + box.height <= 500, 'the panel runs past the bottom of a short window');
    await page.close();
  });

  // Still a menu: the years have to be there and lead somewhere.
  it('still lists the years and opens one', async (t) => {
    if (cannotRun) return t.skip(cannotRun);

    const page = await openPage(browser, '/');
    await page.setViewportSize({ width: 1280, height: 800 });
    const panel = await openYears(page);

    const years = await panel.locator('.mat-mdc-menu-item').allTextContents();
    assert.ok(years.length > 10, `only ${years.length} years in the menu`);
    assert.match(years[0].trim(), /^\d{4}$/);

    await panel.locator('.mat-mdc-menu-item').first().click();
    await page.waitForURL((url) => url.pathname.endsWith('/artworks'), READY);
    assert.match(page.url(), /years=\d{4}/);
    await page.close();
  });
});
