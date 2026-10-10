import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { SketchPreviewComponent } from './sketch-preview.component';

/**
 * Code nobody read, running where being wrong costs nothing.
 *
 * Most of this file asserts on the *shape of the sandbox* rather than on
 * behaviour, which is unusual and deliberate. The boundary is three attribute
 * and policy values, each of which has a neighbour that looks identical in a
 * diff and does something else: `allow-scripts` against
 * `allow-scripts allow-same-origin`, which hands the frame this page's origin;
 * `'unsafe-inline'` against `'unsafe-eval'`, which are different permissions;
 * and a policy with a `connect-src` against one without.
 *
 * This is written down because the same mistake has already been made once in
 * this feature: `targetAddressSpace: 'local'` was asserted happily by a test
 * when Chrome wanted `'loopback'`, and the test passing is what let it ship.
 * A sandbox quietly widened would pass every behavioural test in here.
 *
 * The piece itself cannot run — jsdom executes nothing inside an iframe and has
 * no canvas — so what the harness *does* is left to the browser and what it is
 * *allowed* to do is pinned here.
 */
describe('SketchPreviewComponent', () => {
  const GOOD = 'class Piece {\n  draw(ctx, frame) { ctx.fillRect(0, 0, 10, 10); }\n}';

  const build = (code = GOOD, file: string | null = 'a1b2-piece.js') => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [SketchPreviewComponent],
      providers: [provideZonelessChangeDetection()],
    });
    const fixture = TestBed.createComponent(SketchPreviewComponent);
    fixture.componentRef.setInput('code', code);
    fixture.componentRef.setInput('file', file);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;
    const frame = host.querySelector('[data-testid="piece-frame"]') as HTMLIFrameElement;
    return { fixture, host, frame, harness: frame.getAttribute('srcdoc') ?? '' };
  };

  describe('the sandbox', () => {
    it('allows scripts and nothing else', () => {
      // Exactly this string. `allow-same-origin` beside it would give the
      // written code this page's origin — its storage, its admin token, its
      // DOM — and is the one word that turns this feature into a hole.
      const { frame } = build();

      expect(frame.getAttribute('sandbox')).toBe('allow-scripts');
    });

    it('never grants same-origin, forms, popups or top navigation', () => {
      const { frame } = build();
      const granted = frame.getAttribute('sandbox') ?? '';

      for (const never of [
        'allow-same-origin',
        'allow-forms',
        'allow-popups',
        'allow-top-navigation',
        'allow-modals',
        'allow-downloads',
      ]) {
        expect(granted).not.toContain(never);
      }
    });

    it('refuses everything by default in its own policy', () => {
      const { harness } = build();

      expect(harness).toContain("default-src 'none'");
    });

    it('gives the frame no way to reach the network', () => {
      // No `connect-src` at all, so fetch, XHR, WebSocket and EventSource all
      // inherit the `none`. A `connect-src` of any value — even 'self', which
      // for an opaque origin means nothing — would be a way out.
      const { harness } = build();

      expect(harness).not.toContain('connect-src');
      expect(harness).not.toContain('img-src');
    });

    it('allows inline script but not eval', () => {
      // Two different permissions, one letter apart to read. The code is
      // injected as a <script> element precisely so the second is not needed.
      const { harness } = build();

      expect(harness).toContain("script-src 'unsafe-inline'");
      expect(harness).not.toContain('unsafe-eval');
    });

    it('sends no referrer', () => {
      const { frame } = build();

      expect(frame.getAttribute('referrerpolicy')).toBe('no-referrer');
    });
  });

  describe('handing the code over', () => {
    it('never writes the code into the frame markup', () => {
      // It arrives by postMessage. Written into the srcdoc, a piece
      // containing the characters that close a script tag would end the
      // harness early and leave the rest of itself as markup — and a model
      // writing about scripts is not far-fetched.
      const { harness } = build('class Piece { /* </script><img> */ }');

      expect(harness).not.toContain('class Piece');
      expect(harness).not.toContain('<img>');
    });

    it('hands it over once the frame says it is there', () => {
      const { fixture, frame } = build();
      const inner = frame.contentWindow;
      const heard: unknown[] = [];
      if (inner) inner.postMessage = ((message: unknown) => heard.push(message)) as never;

      window.dispatchEvent(new MessageEvent('message', { data: { kind: 'ready' }, source: inner }));
      fixture.detectChanges();

      expect(heard).toEqual([{ kind: 'code', code: GOOD }]);
    });

    it('does not hand it over twice when load and ready both arrive', () => {
      // Either can be first and both mean the same thing, so both are
      // listened to — which would otherwise restart the piece.
      const { fixture, frame } = build();
      const inner = frame.contentWindow;
      const heard: unknown[] = [];
      if (inner) inner.postMessage = ((message: unknown) => heard.push(message)) as never;

      window.dispatchEvent(new MessageEvent('message', { data: { kind: 'ready' }, source: inner }));
      frame.dispatchEvent(new Event('load'));
      fixture.detectChanges();

      expect(heard).toHaveLength(1);
    });

    it('ignores a message from anything but its own frame', () => {
      // The origin cannot be checked: a sandbox without `allow-same-origin`
      // has an opaque one, which arrives as the string "null" and is the same
      // for every such frame on the page. The window is the identity.
      const { fixture, host } = build();

      window.dispatchEvent(
        new MessageEvent('message', { data: { kind: 'broken', message: 'from elsewhere' } })
      );
      fixture.detectChanges();

      expect(host.querySelector('[data-testid="piece-trouble"]')).toBeNull();
    });
  });

  describe('when the piece throws', () => {
    const breaks = (message: string, where = 'in draw()') => {
      const made = build();
      window.dispatchEvent(
        new MessageEvent('message', {
          data: { kind: 'broken', message, where },
          source: made.frame.contentWindow,
        })
      );
      made.fixture.detectChanges();
      return made;
    };

    it('says what it was and where', () => {
      const { host } = breaks('this.dots is undefined');
      const said = host.querySelector('[data-testid="piece-trouble"]')?.textContent ?? '';

      expect(said).toContain('this.dots is undefined');
      expect(said).toContain('in draw()');
    });

    it('says the page is fine and what to do next', () => {
      // A stack trace with no instruction reads like the tool broke. It did
      // not: the model wrote something wrong, which is expected at this size.
      const { host } = breaks('Unexpected token');
      const said = host.querySelector('[data-testid="piece-trouble"]')?.textContent ?? '';

      expect(said).toContain('Nothing is broken but the piece');
      expect(said).toContain('run the box again');
    });
  });

  describe('the notes about the code', () => {
    it('points out a piece that asks for the network', () => {
      const { host } = build("class Piece { draw() { fetch('http://x/y'); } }");

      expect(host.querySelector('[data-testid="piece-notes"]')?.textContent).toContain(
        'has no network'
      );
    });

    it('shows the piece anyway, because the note is not the boundary', () => {
      // A scan is defeated by self['fe'+'tch']. It is here for fast feedback,
      // and refusing to run on it would buy nothing and lose the preview.
      const { host } = build("class Piece { draw() { fetch('http://x/y'); } }");

      expect(host.querySelector('[data-testid="piece-frame"]')).not.toBeNull();
    });

    it('says nothing about code that asks for nothing', () => {
      const { host } = build();

      expect(host.querySelector('[data-testid="piece-notes"]')).toBeNull();
    });

    it('says when the policy actually refused something', () => {
      // The one failure here that looks like nothing happening: `fetch`
      // rejects a promise nobody awaited and an <img> simply never loads, so
      // the piece runs on drawing nothing with no error to report. Measured in
      // Chrome: an image beacon in draw() made 74 attempts in half a second,
      // every one refused, and said not a word.
      //
      // This is also the half the scan cannot do, which is why both exist:
      // the scan reads the code and guesses, this reports what happened.
      const { fixture, host, frame } = build("class Piece { draw() { self['fe'+'tch']('/x'); } }");

      window.dispatchEvent(
        new MessageEvent('message', {
          data: { kind: 'refused', directive: 'connect-src' },
          source: frame.contentWindow,
        })
      );
      fixture.detectChanges();

      const said = host.querySelector('[data-testid="piece-notes"]')?.textContent ?? '';
      expect(said).toContain('refused something it asked for');
      expect(said).toContain('connect-src');
    });

    it('keeps showing the piece when something was refused', () => {
      // A refusal is the frame working. The piece is still running and may
      // still be worth keeping.
      const { fixture, host, frame } = build();

      window.dispatchEvent(
        new MessageEvent('message', {
          data: { kind: 'refused', directive: 'img-src' },
          source: frame.contentWindow,
        })
      );
      fixture.detectChanges();

      expect(host.querySelector('[data-testid="piece-trouble"]')).toBeNull();
      expect(host.querySelector('[data-testid="piece-frame"]')).not.toBeNull();
    });
  });

  it('shows the code, and how much of it there is', () => {
    const { host } = build();

    expect(host.querySelector('[data-testid="piece-code"]')?.textContent).toContain('class Piece');
    expect(host.textContent).toContain('3 lines');
  });

  it('says where the file landed, and that publishing it is a deliberate act', () => {
    // It used to publish anything saved, which put pieces nobody had chosen
    // on the site. Registering is by hand now, and this says so.
    const { host } = build(GOOD, 'a1b2-piece.js');

    expect(host.textContent).toContain('a1b2-piece.js');
    expect(host.textContent).toContain('registry.ts');
  });

  it('closes when Done is pressed', () => {
    const { fixture, host } = build();
    let closed = false;
    fixture.componentInstance.dismissed.subscribe(() => (closed = true));

    (host.querySelector('[data-testid="piece-close"]') as HTMLButtonElement).click();

    expect(closed).toBe(true);
  });
});
