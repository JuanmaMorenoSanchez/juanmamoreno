import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { GenerativePieceComponent } from './generative-piece.component';
import { SKETCHES } from './sketches/registry';

/**
 * The control that puts a sketch full screen, and takes itself away once it
 * has.
 *
 * The whole point of the state is that there is nothing on the screen but the
 * drawing, and a button floating over it is the one thing still in the way.
 * Nothing is lost by hiding it: the Fullscreen API leaves on Escape by itself,
 * and the browser says so when it enters.
 */
function setup() {
  // jsdom has neither the Fullscreen API nor a 2d canvas context, and the
  // sketch would start an animation loop. None of that is what is under test.
  vi.stubGlobal(
    'ResizeObserver',
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
  );
  HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue(null);

  TestBed.configureTestingModule({
    imports: [GenerativePieceComponent],
    providers: [
      provideTranslateService(),
      // A real sketch id: without one the component reports the piece missing
      // and offers no control at all, which is a different test.
      { provide: ActivatedRoute, useValue: { paramMap: of(new Map([['id', 'believe']])) } },
    ],
  });

  const fixture = TestBed.createComponent(GenerativePieceComponent);
  fixture.detectChanges();
  return fixture;
}

const button = (fixture: { nativeElement: HTMLElement }) =>
  fixture.nativeElement.querySelector('.fullscreen-btn');

/**
 * What the page is before the sketch has anything to draw.
 *
 * A sketch's setup fetches its pictures and cuts its sprites — the newest
 * one loads four and cuts eleven — and on a cold cache that is a second or
 * two of a black rectangle. A black rectangle is also what a failed page
 * looks like, so it says which it is.
 */
describe('GenerativePieceComponent — while it is loading', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    TestBed.resetTestingModule();
  });

  const cover = (fixture: { nativeElement: HTMLElement }) =>
    fixture.nativeElement.querySelector('[data-testid="sketch-loading"]');

  it('covers the page and says what it is doing', () => {
    const fixture = setup();
    fixture.componentInstance.loading.set(true);
    fixture.detectChanges();

    expect(cover(fixture)).not.toBeNull();
    expect(cover(fixture)?.getAttribute('role')).toBe('status');
  });

  it('fades rather than cutting, so it is still there while it goes', () => {
    // Taking it away the moment the sketch is ready is a cut, and a cut to a
    // painting that has just appeared reads as a glitch — which this page
    // has enough of on purpose.
    const fixture = setup();
    fixture.componentInstance.loading.set(false);
    fixture.componentInstance.settling.set(true);
    fixture.detectChanges();

    expect(cover(fixture)).not.toBeNull();
    expect(cover(fixture)?.classList.contains('settling')).toBe(true);
  });

  it('is gone once it has settled', () => {
    const fixture = setup();
    fixture.componentInstance.loading.set(false);
    fixture.componentInstance.settling.set(false);
    fixture.detectChanges();

    expect(cover(fixture)).toBeNull();
  });

  it('does not cover a piece that does not exist', () => {
    // That page has something to say of its own, and a spinner over it would
    // be a page still trying.
    const fixture = setup();
    fixture.componentInstance.notFound.set(true);
    fixture.componentInstance.loading.set(false);
    fixture.detectChanges();

    expect(cover(fixture)).toBeNull();
    expect(fixture.nativeElement.querySelector('.not-found')).not.toBeNull();
  });
});

describe('GenerativePieceComponent — going full screen', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    TestBed.resetTestingModule();
  });

  it('offers the way in while the sketch is in the page', () => {
    const fixture = setup();

    expect(button(fixture)).not.toBeNull();
    expect(fixture.nativeElement.textContent).toContain('fullscreen');
  });

  it('takes the button away once the sketch is full screen', () => {
    const fixture = setup();

    fixture.componentInstance.isFullScreen.set(true);
    fixture.detectChanges();

    expect(button(fixture)).toBeNull();
  });

  /**
   * Escape is what leaves, and the browser fires `fullscreenchange` for it —
   * the same event a click would cause. Without the button coming back on that
   * event there would be no way in a second time.
   */
  it('brings it back when the sketch stops being full screen', () => {
    const fixture = setup();
    fixture.componentInstance.isFullScreen.set(true);
    fixture.detectChanges();

    // What the browser does on Escape: no fullscreen element, then the event.
    fixture.componentInstance.onFullscreenChange();
    fixture.detectChanges();

    expect(fixture.componentInstance.isFullScreen()).toBe(false);
    expect(button(fixture)).not.toBeNull();
  });

  // A sketch id that matches nothing shows a message, and nothing to press.
  it('offers nothing when there is no sketch to show', () => {
    const fixture = setup();

    fixture.componentInstance.notFound.set(true);
    fixture.detectChanges();

    expect(button(fixture)).toBeNull();
  });
});

/**
 * Two routes waiting on the same canvas.
 *
 * A sketch's setup fetches its pictures, so on a cold cache two of them can be
 * in flight at once — and which one finishes first is a matter of how big its
 * pictures are, not of which address the reader is at. The canvas has to go to
 * the latest one asked for.
 */
describe('GenerativePieceComponent — two sketches asked for at once', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    delete SKETCHES['first'];
    delete SKETCHES['second'];
    TestBed.resetTestingModule();
  });

  /** A sketch whose setup finishes when the test says so. */
  const held = () => {
    let release = (): void => {};
    const settled = new Promise<void>((resolve) => (release = resolve));
    const sketch = {
      setup: () => settled,
      draw: vi.fn(),
      dispose: vi.fn(),
    };
    return { sketch, release: () => release() };
  };

  const waiting = () => {
    vi.stubGlobal(
      'ResizeObserver',
      class {
        observe() {}
        unobserve() {}
        disconnect() {}
      }
    );
    // A context, because without one the component gives up before setup. The
    // loop is stubbed out: nothing here is about drawing.
    vi.stubGlobal('requestAnimationFrame', () => 1);
    HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({
      setTransform: vi.fn(),
    } as unknown as CanvasRenderingContext2D);

    TestBed.configureTestingModule({
      imports: [GenerativePieceComponent],
      providers: [
        provideTranslateService(),
        { provide: ActivatedRoute, useValue: { paramMap: of(new Map()) } },
      ],
    });
    const fixture = TestBed.createComponent(GenerativePieceComponent);
    fixture.detectChanges();
    return fixture.componentInstance;
  };

  it('draws the one the address asks for, not the one that loaded first', async () => {
    const first = held();
    const second = held();
    SKETCHES['first'] = { label: 'First', factory: () => first.sketch };
    SKETCHES['second'] = { label: 'Second', factory: () => second.sketch };

    const page = waiting();
    const going = [page['loadSketch']('first'), page['loadSketch']('second')];

    // The smaller pictures arrive first, which is the whole of the trouble.
    first.release();
    second.release();
    await Promise.all(going);

    expect(page['sketch']).toBe(second.sketch);
  });

  it('lets go of the one it does not use', async () => {
    // Its pictures were fetched and its sprites cut; dropping it without a
    // word leaves all of that held.
    const first = held();
    const second = held();
    SKETCHES['first'] = { label: 'First', factory: () => first.sketch };
    SKETCHES['second'] = { label: 'Second', factory: () => second.sketch };

    const page = waiting();
    const going = [page['loadSketch']('first'), page['loadSketch']('second')];

    second.release();
    first.release();
    await Promise.all(going);

    expect(page['sketch']).toBe(second.sketch);
    expect(first.sketch.dispose).toHaveBeenCalled();
  });
});
