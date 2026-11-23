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
 * The harness the written code runs inside, as a file rather than a string.
 *
 * Four things make this safe, and only the last two are the boundary:
 *
 * - `sandbox="allow-scripts"` **without** `allow-same-origin`, set on the
 *   element. The pair is the whole point: scripts run, and they run at an
 *   **opaque origin** — an origin that is nobody's, so the code cannot read
 *   this page, its cookies, its storage or its token.
 * - The harness's own `default-src 'none'` with **no `connect-src`**.
 *   Everything inherits the none: fetch, XHR, WebSocket, EventSource, a
 *   tracking pixel, `sendBeacon`. A piece cannot phone anywhere, including
 *   home.
 * - `script-src 'unsafe-inline'` and *not* `'unsafe-eval'`, which is why the
 *   code is injected as a `<script>` element and never `eval`'d or passed to
 *   `new Function`. Those two are different permissions, and only the first is
 *   given.
 *
 * The code arrives by `postMessage` rather than being written into the
 * document, so there is no escaping to get wrong: a `</script>` inside a
 * generated piece would otherwise end the harness early and leave the rest as
 * markup.
 *
 * **It is a fetched file and not `srcdoc` because of the site's own policy.**
 * A `srcdoc` document has no url of its own, so it *inherits* the policy of
 * the page that holds it, and the two intersect: the site allows named inline
 * scripts and this frame allows any, which together allow none. The piece
 * drew nothing and said nothing, because the refusal is the frame's and the
 * frame is where the error went. Fetched over https the document carries its
 * own policy alone — the one above, which is the stricter of the two — and the
 * sandbox still puts it at an opaque origin.
 */
const HARNESS = 'assets/piece-harness.html';

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

      // Set here rather than bound in the template, so the frame is loaded
      // once and reused: reassigning `src` reloads the document and throws
      // away the piece that is running in it.
      if (element.getAttribute('src') !== HARNESS) element.setAttribute('src', HARNESS);

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
