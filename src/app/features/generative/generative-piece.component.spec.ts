import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { GenerativePieceComponent } from './generative-piece.component';

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
  vi.stubGlobal('ResizeObserver', class {
    observe() {}
    unobserve() {}
    disconnect() {}
  });
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
