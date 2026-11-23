/**
 * The site's own policy, tried in a real browser on real pages.
 *
 * A content security policy is the one change here that breaks a page by
 * working: the browser refuses something, says so in a console nobody is
 * reading, and the reader gets a blank panel. Nothing below a browser can see
 * that — jsdom has no policy engine at all — so this is the only thing between
 * a tightened directive and a broken site, which is why it gates the deploy.
 *
 * It fails on **any** refusal, and names the directive and what was blocked, so
 * a failure says what to add rather than that something is wrong. Chrome logs
 * every violation to the console and fires `securitypolicyviolation` on the
 * document; both are collected, because the two do not always agree.
 *
 * What it cannot reach: the wallet. Connecting one opens a popup at Coinbase
 * and needs a wallet to answer, so `keys.coinbase.com` and the walletlink
 * relay are in the policy on the strength of Coinbase's documentation and are
 * checked by him signing in once, not here.
 */
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { after, before, describe, it } from 'node:test';
import { BASE_URL, launchBrowser } from './browser.mjs';

/**
 * The pages a refusal would be noticed on.
 *
 * One of each kind rather than all four hundred: the policy is identical on
 * every page, so what varies is which parts of the application run. An artwork
 * page draws the catalogue and the viewer, the atelier runs the sandboxed
 * frame, the door offers the wallet, and `/pieces` is one of the four
 * routes with no file of its own — it arrives through `404.html`, which is the
 * copy of the home page, and proves the policy travelled into that too.
 */
const PAGES = [
  '/',
  '/about',
  '/artworks',
  '/artwork/66',
  '/contact',
  '/texts',
  '/es/',
  '/es/artworks',
  '/door',
  '/pieces',
  '/atelier',
];

/**
 * Opens a page with every refusal recorded.
 *
 * The listener is installed as an init script because a policy refuses things
 * while the document is still parsing — the two scripts that set the theme and
 * the `js` class run before anything else on the page, and a listener added
 * after `load` would never see them refused.
 */
async function watched(browser, path) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const refusals = [];

  await page.addInitScript(() => {
    globalThis.__refusals = [];
    document.addEventListener('securitypolicyviolation', (event) => {
      globalThis.__refusals.push(`${event.violatedDirective} blocked ${event.blockedURI}`);
    });
  });

  // The console is the backstop. A violation on a resource the document never
  // owned — a stylesheet's own fetch, say — logs without firing the event.
  page.on('console', (message) => {
    const text = message.text();
    if (/Content Security Policy|Refused to/i.test(text)) refusals.push(text.split('\n')[0]);
  });

  await page.goto(BASE_URL + path, { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('load').catch(() => {});
  // Long enough for the lazy chunk, the catalogue and the frame to settle.
  await page.waitForTimeout(2_500);

  const fromPage = await page.evaluate(() => globalThis.__refusals ?? []);
  await page.close();
  return [...new Set([...refusals, ...fromPage])];
}

describe('the content security policy', () => {
  let browser;
  let cannotRun;

  before(async () => {
    ({ browser, cannotRun } = await launchBrowser());
  });

  after(async () => {
    await browser?.close();
  });

  it('is in the page at all', async () => {
    const html = await readFile('dist/juanmamoreno/browser/index.html', 'utf8');
    const tag = html.match(/<meta http-equiv="Content-Security-Policy" content="([^"]*)"\s*\/?>/i);

    assert.ok(tag, 'no policy in the built home page — did write-csp.mjs run?');
    assert.match(tag[1], /default-src 'none'/);
    assert.match(tag[1], /sha256-/, 'no inline script hashes, so the policy cannot be working');
  });

  it('allows no inline script beyond the ones it names', async () => {
    // The tempting fix for any refusal below, and the one that would make the
    // whole policy decorative: with `'unsafe-inline'` present a browser runs
    // any script in the page, which is the thing being prevented.
    const html = await readFile('dist/juanmamoreno/browser/index.html', 'utf8');
    const script = html.match(/script-src ([^;"]*)/)?.[1] ?? '';

    assert.ok(script, 'no script-src in the policy');
    assert.ok(!script.includes('unsafe-inline'), `script-src has unsafe-inline: ${script}`);
    assert.ok(!script.includes('unsafe-eval'), `script-src has unsafe-eval: ${script}`);
  });

  it('names no host but this one as a source of script', async () => {
    // What removing the Google door bought. `accounts.google.com/gsi/client`
    // was the one outside host allowed to hand this site a script, and a
    // script runs with every privilege the page has — so this is a stronger
    // statement than any directive below it. Asserted rather than assumed
    // because adding a host here is one line and reads as harmless.
    const html = await readFile('dist/juanmamoreno/browser/index.html', 'utf8');
    const script = html.match(/script-src ([^;"]*)/)?.[1] ?? '';
    const hosts = script.split(' ').filter((source) => source.startsWith('http'));

    assert.deepEqual(hosts, [], `script-src names outside hosts: ${hosts.join(', ')}`);
  });

  it('allows no Google host anywhere in the policy', async () => {
    // The sign-in is gone from the door, the service, the environment and the
    // menu; four directives named Google for it, and a policy is the one place
    // a removal like that leaves no visible trace if it is forgotten.
    const html = await readFile('dist/juanmamoreno/browser/index.html', 'utf8');
    const policy = html.match(/Content-Security-Policy" content="([^"]*)"/)?.[1] ?? '';

    assert.ok(policy, 'no policy to check');
    assert.ok(!policy.includes('accounts.google.com'), 'the policy still allows Google sign-in');
    assert.ok(!policy.includes('googleusercontent'), 'the policy still allows the Google avatar');
  });

  it('is in the file that answers the routes with no file of their own', async () => {
    // `/pieces`, `/atelier` and `/generative/:id` are served as `404.html`.
    // It is copied from the home page after the policy is written, so this
    // fails if those two build steps are ever reordered.
    const html = await readFile('dist/juanmamoreno/browser/404.html', 'utf8');

    assert.match(html, /<meta http-equiv="Content-Security-Policy"/i);
  });

  it('leaves the sandbox harness its own, stricter policy', async () => {
    // The writer walked every `.html` in the build at first, which replaced
    // this file's policy with the site's. The site allows the api; this file
    // allows nothing at all, and that is the whole boundary around code a
    // model wrote — a generated piece could have phoned the backend.
    const html = await readFile('dist/juanmamoreno/browser/assets/piece-harness.html', 'utf8');

    assert.match(html, /default-src 'none'; script-src 'unsafe-inline'/);
    assert.ok(!html.includes('connect-src'), 'the harness has a connect-src, so it has a way out');
    assert.ok(!html.includes('sha256-'), 'the site policy was written over the harness');
  });

  it('still runs a piece in the sandbox, loaded as a file under the policy', async (t) => {
    if (!browser) return t.skip(cannotRun);

    // The harness moved out of the component and into `assets` *because* of
    // this policy, and nothing else here proves the move worked: the atelier
    // is behind the door, and the sandbox suite loads the harness from disk
    // rather than from the site. So the frame is built the way the component
    // builds it — same attributes, same postMessage — on a real page of the
    // real site, which is the only place `frame-src` is actually consulted.
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(BASE_URL + '/', { waitUntil: 'domcontentloaded' });

    const said = await page.evaluate(async () => {
      const frame = document.createElement('iframe');
      frame.setAttribute('sandbox', 'allow-scripts');
      frame.setAttribute('referrerpolicy', 'no-referrer');
      frame.style.cssText = 'width:400px;height:300px';

      const heard = new Promise((settle) => {
        const timer = setTimeout(() => settle('nothing in five seconds'), 5_000);
        window.addEventListener('message', (event) => {
          if (event.source !== frame.contentWindow) return;
          if (event.data?.kind === 'ready') {
            frame.contentWindow.postMessage(
              { kind: 'code', code: 'class Piece { draw(ctx) { ctx.fillRect(0, 0, 10, 10); } }' },
              '*'
            );
            return;
          }
          clearTimeout(timer);
          settle(event.data?.kind === 'running' ? 'running' : JSON.stringify(event.data));
        });
      });

      frame.setAttribute('src', 'assets/piece-harness.html');
      document.body.appendChild(frame);
      return heard;
    });

    await page.close();
    assert.equal(said, 'running', `the sandbox did not run the piece: ${said}`);
  });

  for (const path of PAGES) {
    it(`refuses nothing on ${path}`, async (t) => {
      if (!browser) return t.skip(cannotRun);

      const refusals = await watched(browser, path);

      assert.deepEqual(refusals, [], `${path} was refused:\n  ${refusals.join('\n  ')}`);
    });
  }
});
