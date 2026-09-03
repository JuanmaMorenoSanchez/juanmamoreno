import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { ParallaxTiltDirective } from './parallax-tilt.directive';

@Component({
  imports: [ParallaxTiltDirective],
  template: `
    <div appParallaxTilt tiltSelector=".tile" class="grid">
      <div class="tile" id="first"><img alt="" /></div>
      <div class="tile" id="second"><img alt="" /></div>
    </div>
  `,
})
class GridHost {}

/**
 * The tile under the pointer leans, and nothing else moves.
 *
 * It used to measure from the centre of the viewport and write the answer once,
 * on the grid, so every tile leaned the same way at the same time — the page
 * appearing to slide rather than answering the pointer.
 */
describe('ParallaxTiltDirective', () => {
  let frames: FrameRequestCallback[] = [];
  const nextFrame = () => {
    const queued = frames;
    frames = [];
    for (const fn of queued) fn(0);
  };

  /**
   * jsdom gives every element a zero-sized rect, and the whole calculation is
   * the pointer's offset within the tile — so the tiles are given a size.
   */
  const sizeTiles = (host: HTMLElement) => {
    for (const tile of Array.from(host.querySelectorAll<HTMLElement>('.tile'))) {
      tile.getBoundingClientRect = () =>
        ({ left: 0, top: 0, width: 100, height: 100 }) as DOMRect;
    }
  };

  function setup({ reducedMotion = false } = {}) {
    vi.stubGlobal(
      'matchMedia',
      vi.fn((query: string) => ({
        matches: query.includes('reduced-motion') ? reducedMotion : false,
        addEventListener: () => {},
        removeEventListener: () => {},
      }))
    );
    // Queued, then run on demand — not run inside requestAnimationFrame
    // itself. The directive stores the id it is handed and the callback clears
    // it, so a stub that runs the callback first leaves the id set for ever
    // and every later move is swallowed as "a frame is already queued".
    frames = [];
    vi.stubGlobal('requestAnimationFrame', (fn: FrameRequestCallback) => frames.push(fn));

    TestBed.configureTestingModule({ imports: [GridHost] });
    const fixture = TestBed.createComponent(GridHost);
    fixture.detectChanges();
    const host = fixture.nativeElement.querySelector('.grid') as HTMLElement;
    sizeTiles(fixture.nativeElement);
    return { fixture, host };
  }

  const point = (host: HTMLElement, target: string, clientX: number, clientY: number) => {
    const element = host.querySelector(target)!;
    element.dispatchEvent(
      new PointerEvent('pointermove', { clientX, clientY, bubbles: true })
    );
    nextFrame();
  };

  const lean = (host: HTMLElement, id: string) => {
    const tile = host.querySelector<HTMLElement>(`#${id}`)!;
    return [tile.style.getPropertyValue('--parallax-x'), tile.style.getPropertyValue('--parallax-y')];
  };

  afterEach(() => {
    vi.unstubAllGlobals();
    TestBed.resetTestingModule();
  });

  it('leans the tile the pointer is over', () => {
    const { host } = setup();

    // Bottom-right corner of a 100×100 tile: fully leaned both ways.
    point(host, '#first img', 100, 100);

    expect(lean(host, 'first')).toEqual(['4.50%', '4.50%']);
  });

  it('leans towards the corner the pointer is in', () => {
    const { host } = setup();

    point(host, '#first img', 0, 0);

    expect(lean(host, 'first')).toEqual(['-4.50%', '-4.50%']);
  });

  it('leaves a tile flat when the pointer is at its middle', () => {
    const { host } = setup();

    point(host, '#first img', 50, 50);

    expect(lean(host, 'first')).toEqual(['0.00%', '0.00%']);
  });

  // The whole point of the change: two hundred tiles no longer move together.
  it('leaves every other tile alone', () => {
    const { host } = setup();

    point(host, '#first img', 100, 100);

    expect(lean(host, 'second')).toEqual(['', '']);
  });

  it('puts a tile back when the pointer moves to the next one', () => {
    const { host } = setup();
    point(host, '#first img', 100, 100);

    point(host, '#second img', 0, 0);

    expect(lean(host, 'first')).toEqual(['', '']);
    expect(lean(host, 'second')).toEqual(['-4.50%', '-4.50%']);
  });

  it('puts the tile back when the pointer leaves the grid', () => {
    const { host } = setup();
    point(host, '#first img', 100, 100);

    host.dispatchEvent(new PointerEvent('pointerleave'));

    expect(lean(host, 'first')).toEqual(['', '']);
  });

  /**
   * The reduced-motion rule in styles.scss collapses the transition, which
   * would leave the picture snapping to the pointer rather than gliding with
   * it — more movement, not less. So nothing is written at all.
   */
  it('does not move anything for a reader who asked for less movement', () => {
    const { host } = setup({ reducedMotion: true });

    point(host, '#first img', 100, 100);

    expect(lean(host, 'first')).toEqual(['', '']);
  });
});
