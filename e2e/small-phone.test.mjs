/**
 * The site on the narrowest screen it is built for.
 *
 * Nothing else here can see this. The unit tests render components into a
 * jsdom that has no layout at all — it reports every width as zero —
 * and `verify-render` reads the html as text. A line of content that is wider
 * than the phone holding it is only a fact once a real browser has laid it
 * out, and the failure it produces is the quietest kind there is: the page
 * does not scroll sideways, so the reader is given no way to reach what is
 * cut off, and nothing anywhere reports it.
 */
import assert from 'node:assert/strict';
import { after, before, describe, it } from 'node:test';
import { READY, SMALL_PHONE, launchBrowser, openPage } from './browser.mjs';

let browser;
let cannotRun = null;

before(async () => {
  ({ browser, cannotRun } = await launchBrowser());
});

after(async () => {
  await browser?.close();
});

/** What is wider than its own container, and so has an unreachable end. */
const clipped = (page, selector) =>
  page.$$eval(selector, (elements) =>
    elements
      .filter((element) => element.scrollWidth - element.clientWidth > 1)
      .map((element) => ({
        hidden: element.scrollWidth - element.clientWidth,
        text: (element.textContent ?? '').trim().replace(/\s+/g, ' ').slice(0, 60),
      }))
  );

describe('an artwork page on a 320px phone', () => {
  /**
   * Eight forty-pixel targets are three hundred and twenty pixels exactly, so
   * the row was wider than the screen it sat on and the button that opens the
   * next painting was off the edge of it — on the page whose whole purpose is
   * moving through the catalogue, and with no sideways scroll to reach it.
   */
  it('keeps every control in the viewer toolbar reachable', async (t) => {
    if (cannotRun) return t.skip(cannotRun);

    const page = await openPage(browser, '/artwork/5', 'en-US', SMALL_PHONE);
    await page.waitForSelector('.viewer-toolbar', READY);

    const offscreen = await page.$$eval('.viewer-toolbar button', (buttons) =>
      buttons
        .map((button) => ({ right: button.getBoundingClientRect().right, label: button.textContent }))
        .filter((button) => button.right > document.documentElement.clientWidth + 1)
    );

    assert.deepEqual(offscreen, [], `controls past the right edge: ${JSON.stringify(offscreen)}`);
    await page.close();
  });

});

/**
 * No page scrolls sideways on a phone.
 *
 * This was one page, the artwork one, and that is exactly how a regression got
 * through: giving the catalogue's two filters a row of their own left the row
 * 436px wide inside a 320px phone, because a flex item will not shrink below
 * its content unless it is told it may. The artwork page was fine and the
 * check said so. A reader meets all of these, so all of them are asked.
 */
describe('no page scrolls sideways on a 320px phone', () => {
  const READER_PAGES = [
    '/',
    '/artworks',
    '/artwork/5',
    '/cv',
    '/about',
    '/texts',
    '/contact',
    '/about-certificates-project',
  ];

  for (const path of READER_PAGES) {
    it(`${path} fits`, async (t) => {
      if (cannotRun) return t.skip(cannotRun);

      const page = await openPage(browser, path, 'en-US', SMALL_PHONE);
      await page.waitForSelector('main', READY);

      const over = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      );

      assert.equal(over, 0, `${path} is ${over}px wider than the phone`);
      await page.close();
    });
  }
});

/**
 * The Spanish half, which is where this breaks: the headings are uppercase and
 * tracked out, and a Spanish compound is one unbreakable word.
 * DESCONTEXTUALIZADAS at that tracking is wider than a 320px screen, so the
 * heading was cut off mid-word — in Spanish only, which is why nobody reading
 * the English half of the site ever saw it.
 */
describe('a long Spanish heading on a 320px phone', () => {
  it('is never cut off', async (t) => {
    if (cannotRun) return t.skip(cannotRun);

    const page = await openPage(browser, '/es/about', 'es-ES', SMALL_PHONE);
    await page.waitForSelector('.catalog-heading', READY);

    const cut = await clipped(page, '.catalog-heading, .catalog-subheading');

    assert.deepEqual(cut, [], `headings with an unreachable end: ${JSON.stringify(cut)}`);
    await page.close();
  });

  it('says it is Spanish, so it is hyphenated as Spanish', async (t) => {
    if (cannotRun) return t.skip(cannotRun);

    const page = await openPage(browser, '/es/about', 'es-ES', SMALL_PHONE);
    await page.waitForSelector('.catalog-heading', READY);

    assert.equal(await page.evaluate(() => document.documentElement.lang), 'es');
    await page.close();
  });
});

/**
 * The catalogue's two filters are read as a pair, so they wrap as a pair.
 *
 * Loose in the chip row they wrapped wherever they landed: the year rode up
 * beside the breadcrumb chips and availability dropped alone onto the next
 * line, against a different left edge and looking like a different kind of
 * control. Nothing was broken, which is why it survived — it just read as a
 * staircase rather than as a bar, on the page whose job is to show paintings.
 */
describe('the catalogue filters on a 320px phone', () => {
  it('puts the year and availability on one row, as equal halves', async (t) => {
    if (cannotRun) return t.skip(cannotRun);

    const page = await openPage(browser, '/artworks', 'en-US', SMALL_PHONE);
    await page.waitForSelector('.filters .small-input', READY);

    const boxes = await page.$$eval('.filters .small-input', (fields) =>
      fields.map((field) => {
        const box = field.getBoundingClientRect();
        return { top: Math.round(box.top), width: Math.round(box.width) };
      })
    );

    assert.equal(boxes.length, 2, 'the catalogue should offer two filters');
    assert.equal(boxes[0].top, boxes[1].top, `they sit on different rows: ${JSON.stringify(boxes)}`);
    assert.ok(
      Math.abs(boxes[0].width - boxes[1].width) <= 1,
      `they are not equal halves: ${JSON.stringify(boxes)}`
    );
    await page.close();
  });
});
