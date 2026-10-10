import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';

/**
 * Things in the code that are worth saying out loud.
 *
 * **This is not the security boundary.** A static scan can be walked around by
 * anyone who wants to — `self['fe'+'tch']` defeats it in nine characters — and
 * it is here only because a note arriving instantly is more use than a silence
 * followed by a blocked request. What actually stops the code reaching
 * anything is the frame it runs in: an opaque origin, so there is nothing of
 * this site's to reach, and a policy with no `connect-src`, so there is
 * nowhere to send it.
 */
const SUSPECT: { looks: RegExp; note: string }[] = [
  {
    looks: /\bfetch\s*\(|XMLHttpRequest|WebSocket|EventSource|navigator\.sendBeacon/,
    note: 'asks the network for something — the frame has no network, so it will fail',
  },
  {
    looks: /\bimport\s*[({]|\brequire\s*\(/,
    note: 'tries to load a library — there are none in the frame',
  },
  { looks: /\beval\s*\(|new\s+Function/, note: 'builds code at runtime, which the policy refuses' },
  {
    looks: /\b(localStorage|sessionStorage|indexedDB|document\.cookie)\b/,
    note: 'reaches for storage, which an opaque origin does not have',
  },
  {
    looks: /\b(setTimeout|setInterval)\s*\(/,
    note: 'uses its own timer — a sketch is driven by draw(), and a timer will fight it',
  },
];

/**
 * The harness the written code runs inside.
 *
 * Four things make this safe, and only the last two are the boundary:
 *
 * - `sandbox="allow-scripts"` **without** `allow-same-origin`, which is set on
 *   the element rather than here. The pair is the whole point: scripts run,
 *   and they run at an **opaque origin** — a origin that is nobody's, so the
 *   code cannot read this page, its cookies, its storage or its token.
 * - A policy of `default-src 'none'` with **no `connect-src`**. Everything
 *   inherits the none: fetch, XHR, WebSocket, EventSource, a tracking pixel,
 *   `sendBeacon`. A piece cannot phone anywhere, including home.
 * - `script-src 'unsafe-inline'` and *not* `'unsafe-eval'`, which is why the
 *   code is injected as a `<script>` element and never `eval`'d or passed to
 *   `new Function`. Those two are different permissions, and only the first is
 *   given.
 *
 * The code arrives by `postMessage` rather than being written into this string
 * so there is no escaping to get wrong: a `</script>` inside a generated piece
 * would otherwise end the harness early and leave the rest as markup.
 */
const HARNESS = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="Content-Security-Policy"
      content="default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'">
<title>sketch</title>
<style>
  html, body { margin: 0; height: 100%; background: #0b0b0c; overflow: hidden; }
  canvas { display: block; width: 100%; height: 100%; }
</style>
</head>
<body>
<canvas id="stage"></canvas>
<script>
(function () {
  var stage = document.getElementById('stage');
  var ctx = stage.getContext('2d');
  var piece = null;
  var started = 0;
  var last = 0;
  var frame = 0;
  var pointer = { x: 0, y: 0, vx: 0, vy: 0, down: false, active: false };

  function tell(message) { parent.postMessage(message, '*'); }

  function blame(what, where) {
    cancelAnimationFrame(frame);
    piece = null;
    tell({ kind: 'broken', message: String(what), where: where || '' });
  }

  window.onerror = function (message, _file, line) {
    blame(message, line ? 'line ' + line : '');
    return true;
  };

  // A refused request is silent otherwise, which is the one failure here that
  // looks like nothing happening: fetch rejects a promise nobody awaited and
  // an image simply never loads, so the piece runs on drawing nothing and
  // there is no error to report. Measured in Chrome: an image beacon in draw()
  // made 74 attempts in half a second, every one refused, and said nothing.
  //
  // Reported once. At sixty frames a second the alternative is a thousand
  // messages a minute, and the first says everything the rest would.
  //
  // (No backticks in here, ever: this whole harness is a template literal and
  // one would end it. Nor a dollar-brace, which would interpolate.)
  var mentioned = false;
  document.addEventListener('securitypolicyviolation', function (event) {
    if (mentioned) return;
    mentioned = true;
    tell({ kind: 'refused', directive: String(event.violatedDirective || 'a request') });
  });

  function size() {
    var box = stage.getBoundingClientRect();
    var ratio = Math.min(window.devicePixelRatio || 1, 2);
    stage.width = Math.max(1, Math.round(box.width * ratio));
    stage.height = Math.max(1, Math.round(box.height * ratio));
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    return { width: box.width, height: box.height };
  }

  stage.addEventListener('pointermove', function (event) {
    var box = stage.getBoundingClientRect();
    var x = event.clientX - box.left;
    var y = event.clientY - box.top;
    pointer.vx = x - pointer.x;
    pointer.vy = y - pointer.y;
    pointer.x = x;
    pointer.y = y;
    pointer.active = true;
  });
  stage.addEventListener('pointerdown', function () {
    pointer.down = true;
    if (piece && piece.pointerDown) {
      try { piece.pointerDown(pointer.x, pointer.y); } catch (e) { blame(e && e.message); }
    }
  });
  stage.addEventListener('pointerup', function () { pointer.down = false; });

  window.addEventListener('resize', function () {
    if (!piece) return;
    var at = size();
    if (piece.resize) {
      try { piece.resize(ctx, at.width, at.height); } catch (e) { blame(e && e.message); }
    }
  });

  function run() {
    var at = size();
    started = performance.now();
    last = started;

    var tick = function (now) {
      var frameInfo = {
        t: (now - started) / 1000,
        dt: Math.min((now - last) / 1000, 0.1),
        width: at.width,
        height: at.height,
        pointer: pointer
      };
      last = now;
      // A throw here would otherwise repeat sixty times a second, so the loop
      // stops at the first one and says what it was.
      try {
        piece.draw(ctx, frameInfo);
      } catch (e) {
        blame((e && e.message) || e, 'in draw()');
        return;
      }
      pointer.vx *= 0.9;
      pointer.vy *= 0.9;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
  }

  window.addEventListener('message', function (event) {
    if (!event.data || event.data.kind !== 'code') return;

    cancelAnimationFrame(frame);
    piece = null;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, stage.width, stage.height);

    // Two elements rather than one string. A class declared at the top level
    // of a classic script lands in the global lexical environment, which the
    // next script can read — so the code needs no line appended to it and
    // there is no newline to escape.
    var written = document.createElement('script');
    written.textContent = event.data.code;
    document.body.appendChild(written);

    var reach = document.createElement('script');
    reach.textContent = 'self.__piece = typeof Piece === "function" ? Piece : null;';
    document.body.appendChild(reach);

    if (!self.__piece) {
      blame('the code defines no class called Piece');
      return;
    }

    try {
      piece = new self.__piece();
      var at = size();
      var setup = piece.setup && piece.setup(ctx, at.width, at.height);
      if (setup && typeof setup.then === 'function') {
        setup.then(function () { tell({ kind: 'running' }); run(); },
                   function (e) { blame((e && e.message) || e, 'in setup()'); });
        return;
      }
    } catch (e) {
      blame((e && e.message) || e, 'in setup()');
      return;
    }

    tell({ kind: 'running' });
    run();
  });

  tell({ kind: 'ready' });
}());
</script>
</body>
</html>`;

/**
 * A written piece, running, nowhere near this page.
 *
 * Workflow C's whole problem is that a model wrote the code and nobody read
 * it. The answer is not to read it — it is to give it somewhere to run where
 * being wrong, or malicious, costs nothing: a frame at an **opaque origin**
 * with **no network at all**. See {@link HARNESS} for which of those is the
 * boundary and which is merely a kindness.
 *
 * It takes code rather than a url, so the same component shows a piece from
 * the engine and a piece being edited, and neither ever lands on a server.
 */
@Component({
  selector: 'app-sketch-preview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sketch-preview.component.html',
  styleUrl: './sketch-preview.component.scss',
  host: { '(document:keydown.escape)': 'dismissed.emit()' },
})
export class SketchPreviewComponent {
  readonly code = input.required<string>();
  /** What the engine called the file, so he can find it on his own machine. */
  readonly file = input<string | null>(null);
  readonly dismissed = output<void>();

  private readonly frame = viewChild<ElementRef<HTMLIFrameElement>>('frame');

  protected readonly state = signal<'starting' | 'running' | 'broken'>('starting');
  protected readonly trouble = signal<{ message: string; where: string } | null>(null);
  protected readonly copied = signal(false);
  /**
   * What the policy refused, if it refused anything.
   *
   * Reported alongside the piece rather than instead of it: the piece is still
   * running and the refusal is the frame working correctly. Worth saying
   * because it is otherwise invisible — and worth saying *here* rather than
   * trusting the scan below, which this catches the misses of.
   */
  private readonly refused = signal<string | null>(null);

  protected readonly lines = computed(() => this.code().split('\n').length);
  protected readonly notes = computed(() => {
    const code = this.code();
    const said = SUSPECT.filter((suspect) => suspect.looks.test(code)).map(
      (suspect) => suspect.note
    );

    const stopped = this.refused();
    if (stopped) {
      said.unshift(
        `the frame refused something it asked for (${stopped}) — it has no network, so that part of the piece will do nothing`
      );
    }
    return said;
  });

  /** True once the frame is there to be spoken to. */
  private standing = false;
  /** The code last handed over, so a second nudge does not restart the piece. */
  private sent: string | null = null;

  constructor() {
    const listen = (event: MessageEvent) => {
      // Not the origin: a sandboxed frame without `allow-same-origin` has an
      // opaque one, which arrives as the string "null" and would match any
      // other such frame. The window itself is the identity here.
      if (event.source !== this.frame()?.nativeElement.contentWindow) return;
      const said = event.data as {
        kind?: string;
        message?: string;
        where?: string;
        directive?: string;
      };

      if (said?.kind === 'ready') {
        this.up();
      } else if (said?.kind === 'running') {
        this.state.set('running');
        this.trouble.set(null);
      } else if (said?.kind === 'broken') {
        this.state.set('broken');
        this.trouble.set({ message: said.message ?? 'it threw', where: said.where ?? '' });
      } else if (said?.kind === 'refused') {
        this.refused.set(said.directive ?? 'a request');
      }
    };

    window.addEventListener('message', listen);
    inject(DestroyRef).onDestroy(() => window.removeEventListener('message', listen));

    effect(() => {
      const element = this.frame()?.nativeElement;
      if (!element) return;

      // Set here rather than bound in the template. `srcdoc` is an HTML
      // context, so a binding is sanitised and the harness would arrive with
      // its script stripped — which looks exactly like a piece that draws
      // nothing.
      if (element.getAttribute('srcdoc') !== HARNESS) element.setAttribute('srcdoc', HARNESS);

      // Reads the code, so new code resends it rather than needing a reload:
      // the harness takes a second piece quite happily and swaps it in.
      this.code();
      this.state.set('starting');
      this.trouble.set(null);
      this.refused.set(null);
      this.send();
    });
  }

  /**
   * The frame loaded. Belt and braces with the harness's own `ready`, because
   * `load` and that message race and either may be first.
   */
  protected arrived(): void {
    this.up();
  }

  private up(): void {
    this.standing = true;
    this.send();
  }

  /** Hands the code over, at most once per piece. */
  private send(): void {
    if (!this.standing) return;
    const code = this.code();
    if (this.sent === code) return;
    this.sent = code;
    this.frame()?.nativeElement.contentWindow?.postMessage({ kind: 'code', code }, '*');
  }

  protected async copy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.code());
      this.copied.set(true);
    } catch {
      // No clipboard permission, or no clipboard. The code is on screen.
      this.copied.set(false);
    }
  }
}
