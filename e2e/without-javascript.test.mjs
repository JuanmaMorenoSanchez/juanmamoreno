/**
 * The site with javascript turned off.
 *
 * Every route is written out as html at build time so that it can be read
 * without javascript. Nothing proved it: `verify-render` reads the html as
 * text, which cannot see that an element is in the markup and invisible, and
 * every other test here runs a browser with scripting on.
 *
 * That gap hid the thing this file exists for. Both of the viewer's image
 * layers are written by the loader and the blurred preview under them is a
 * runtime binding, so an artwork page shipped with no painting in it at all —
 * 186 of them, in two languages — while `og:image` still advertised one to
 * crawlers. The page passed every check the build had.
 */
import assert from 'node:assert/strict';
import { after, before, describe, it } from 'node:test';
import { BASE_URL, READY, SMALL_PHONE, launchBrowser } from './browser.mjs';

let browser;
let cannotRun = null;

before(async () => {
  ({ browser, cannotRun } = await launchBrowser());
});

after(async () => {
  await browser?.close();
});

/** A reader whose browser runs none of the application. */
async function openWithoutJavascript(path) {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(BASE_URL + path, { waitUntil: 'domcontentloaded' });
  return { context, page };
}

describe('an artwork page with javascript off', () => {
  it('shows the painting', async (t) => {
    if (cannotRun) return t.skip(cannotRun);

    const { context, page } = await openWithoutJavascript('/artwork/5');
    await page.waitForSelector('img.art-viewer', READY);

    const painting = await page.$eval('img.art-viewer', (img) => ({
      src: img.getAttribute('src') ?? '',
      alt: img.getAttribute('alt') ?? '',
      opacity: Number(getComputedStyle(img).opacity),
      width: Math.round(img.getBoundingClientRect().width),
      height: Math.round(img.getBoundingClientRect().height),
    }));

    // Visible, not merely present: the fault this file was written for was an
    // element in the markup that css kept at nothing.
    assert.match(painting.src, /^https?:\/\//, 'the painting has no source');
    assert.ok(painting.opacity > 0.9, `the painting is at opacity ${painting.opacity}`);
    assert.ok(painting.width > 100, `the painting is ${painting.width}px wide`);
    assert.ok(painting.height > 100, `the painting is ${painting.height}px tall`);
    // A painting a screen reader can name, since without javascript there is
    // nothing else on the page that will ever describe it.
    assert.ok(painting.alt.length > 0, 'the painting has no alt text');
    // The web copy, not the original: this is the only image this reader is
    // ever given, and the original is the photograph at full resolution.
    assert.ok(
      !/juanmamoreno-originals/.test(painting.src),
      `sent the full-resolution original: ${painting.src}`
    );

    await context.close();
  });

  it('still says what the painting is', async (t) => {
    if (cannotRun) return t.skip(cannotRun);

    const { context, page } = await openWithoutJavascript('/artwork/5');
    const text = (await page.locator('body').innerText()).replace(/\s+/g, ' ');

    assert.match(
      text,
      /\d+\s*x\s*\d+\s*cm/i,
      `no measurements without javascript: ${text.slice(0, 160)}`
    );

    await context.close();
  });
});

describe('the landing page with javascript off', () => {
  /**
   * The painting is stacked: a blurred thumbnail with the full picture over it
   * at opacity 0, raised by a class the component adds once the image reports
   * that it has decoded. With no javascript to listen, the class never came —
   * so the full image sat in the same html, already downloaded, hidden behind
   * the blur of the placeholder it was there to replace.
   */
  it('shows the painting rather than the blur over it', async (t) => {
    if (cannotRun) return t.skip(cannotRun);

    const { context, page } = await openWithoutJavascript('/');
    await page.waitForSelector('.home-featured-image--full', READY);

    const opacity = await page.$eval('.home-featured-image--full', (img) =>
      Number(getComputedStyle(img).opacity)
    );

    assert.ok(opacity > 0.9, `the full painting is at opacity ${opacity}`);

    await context.close();
  });
});

describe('the catalogue with javascript off', () => {
  it('shows the paintings it lists', async (t) => {
    if (cannotRun) return t.skip(cannotRun);

    const { context, page } = await openWithoutJavascript('/artworks');
    await page.waitForSelector('.tile img', READY);

    const shown = await page.$$eval(
      '.tile img',
      (images) =>
        images.filter((img) => {
          const box = img.getBoundingClientRect();
          return box.width > 40 && box.height > 40 && Number(getComputedStyle(img).opacity) > 0.9;
        }).length
    );

    assert.ok(shown > 10, `only ${shown} paintings are visible without javascript`);

    await context.close();
  });
});

/**
 * The way out of the page, for a reader whose browser runs none of it.
 *
 * The top bar holds both menus and css chooses between them. A hamburger needs
 * a script to open, so the choice has to come out the other way when there is
 * no script — and when it did not, a phone with scripting off was given a
 * hamburger that could not open and a row of links set to `display: none`.
 * There was no way to anywhere from any page, in either language, and nothing
 * here noticed: every other suite runs a browser with scripting on, and this
 * one had never looked at the menu.
 */
describe('the way out, with javascript off', () => {
  for (const [what, viewport] of [
    ['on a phone', SMALL_PHONE],
    ['on a desktop', { width: 1440, height: 900 }],
  ]) {
    it(`offers the pages of the site ${what}`, async (t) => {
      if (cannotRun) return t.skip(cannotRun);

      const context = await browser.newContext({ javaScriptEnabled: false, viewport });
      const page = await context.newPage();
      await page.goto(BASE_URL + '/about', { waitUntil: 'domcontentloaded' });

      const reachable = await page.$$eval('header a[href], header button', (controls) =>
        controls
          .filter((el) => {
            const style = getComputedStyle(el);
            const box = el.getBoundingClientRect();
            return style.display !== 'none' && style.visibility !== 'hidden' && box.width > 0;
          })
          .map((el) => (el.getAttribute('href') ?? '').trim())
          .filter(Boolean)
      );

      // The four pages the bar links to directly. Not the catalogue: it hangs
      // off a submenu, which is an overlay and needs a script to open — a gap
      // this records rather than pretends about.
      for (const page of ['/about', '/cv', '/texts', '/contact']) {
        assert.ok(
          reachable.some((href) => href.endsWith(page)),
          `no way to ${page} without javascript ${what}: ${JSON.stringify(reachable)}`
        );
      }

      await context.close();
    });
  }
});
