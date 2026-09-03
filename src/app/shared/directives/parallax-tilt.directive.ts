import { Directive, ElementRef, inject, input, OnDestroy } from '@angular/core';

/**
 * Shift at the pointer's extremes, as a percentage of the image's own size.
 *
 * Bounded by how much bigger than its frame the image is drawn: at `scale(1.1)`
 * there is 5% of overhang on each side, and a shift past that pulls the edge of
 * the picture into view. The two numbers move together — see `.front-image` in
 * art-pieces-list.component.scss.
 *
 * Twice what it was when the whole grid leaned at once, and less than the 6%
 * it was first tried at: confined to one tile, the movement reads as larger
 * than the number suggests, because it is the only thing moving.
 */
const DEFAULT_MAX_SHIFT_PERCENT = 4.5;

/**
 * The tile under the pointer leans; the rest of the grid stays where it is.
 *
 * Tracks the pointer's offset from the centre of the tile it is over and writes
 * it as `--parallax-x` / `--parallax-y` on that tile. Anything nested inside
 * reacts in css alone:
 *
 *   .frame { overflow: hidden; }
 *   .image { transform: translate(var(--parallax-x, 0%), var(--parallax-y, 0%)) scale(1.14);
 *            transition: transform 0.2s ease-out; }
 *
 * It used to measure from the centre of the *viewport* and write the answer
 * once, on the grid, so all two hundred tiles leaned the same way at the same
 * time. That reads as the whole page sliding — wallpaper rather than an answer
 * to where the pointer is — and it meant the movement had to stay small,
 * because two hundred things moving at once is a lot of movement. Confined to
 * one tile it can be half again as far and still be quieter overall.
 *
 * Still one listener however long the grid is: the tile is found from the event
 * rather than by giving every tile a listener of its own, and only two elements
 * are ever written to — the tile being entered and the one being left.
 */
@Directive({ selector: '[appParallaxTilt]' })
export class ParallaxTiltDirective implements OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);

  // Deliberately not aliased to the selector name: `appParallaxTilt` is meant
  // to be usable as a bare marker attribute (no binding), which only works if
  // no input publicly shares that exact name.
  readonly maxShiftPercent = input(DEFAULT_MAX_SHIFT_PERCENT);

  /**
   * What counts as a tile. A selector rather than a directive on each tile,
   * which would mean one listener per tile — the thing this is arranged to
   * avoid on a page holding the whole catalogue.
   */
  readonly tiltSelector = input('mat-grid-tile');

  private rafId = 0;
  /** The tile currently leaning, so it can be put back when the pointer leaves it. */
  private leaning: HTMLElement | null = null;

  private readonly onPointerMove = (event: PointerEvent): void => {
    if (this.rafId) return; // a frame is already queued; coalesce bursts of events
    const target = event.target as Element | null;
    const { clientX, clientY } = event;
    this.rafId = requestAnimationFrame(() => {
      this.rafId = 0;
      this.apply(target, clientX, clientY);
    });
  };

  private readonly onPointerLeave = (): void => this.settle();

  constructor() {
    // Nothing points at anything while the pages are being prerendered, and
    // there is no document to listen on.
    if (typeof document === 'undefined') return;
    // The one movement on the site that css cannot quiet on its own. The
    // reduced-motion rule in styles.scss collapses the transition, which would
    // leave the thumbnail snapping to the pointer rather than gliding with it
    // — more movement, not less. So the listener is never attached: no custom
    // property is written, and every image sits still at its default.
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    const host = this.el.nativeElement;
    host.addEventListener('pointermove', this.onPointerMove, { passive: true });
    host.addEventListener('pointerleave', this.onPointerLeave, { passive: true });
  }

  ngOnDestroy(): void {
    if (typeof document === 'undefined') return;
    const host = this.el.nativeElement;
    host.removeEventListener('pointermove', this.onPointerMove);
    host.removeEventListener('pointerleave', this.onPointerLeave);
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }

  private apply(target: Element | null, clientX: number, clientY: number): void {
    const tile = target?.closest?.(this.tiltSelector()) as HTMLElement | null;
    if (!tile) {
      this.settle();
      return;
    }

    // Between tiles the one being left is put back before the next one leans,
    // so the grid never holds two of them out of place at once.
    if (this.leaning && this.leaning !== tile) this.straighten(this.leaning);
    this.leaning = tile;

    const box = tile.getBoundingClientRect();
    if (!box.width || !box.height) return;

    // Measured from the tile's own middle: the picture leans towards the
    // corner the pointer is in, which is what makes it read as an answer to
    // the pointer rather than as the page drifting.
    const refX = this.clamp((clientX - (box.left + box.width / 2)) / (box.width / 2));
    const refY = this.clamp((clientY - (box.top + box.height / 2)) / (box.height / 2));
    const max = this.maxShiftPercent();

    tile.style.setProperty('--parallax-x', `${(refX * max).toFixed(2)}%`);
    tile.style.setProperty('--parallax-y', `${(refY * max).toFixed(2)}%`);
  }

  /** Puts back whichever tile was leaning, if any. */
  private settle(): void {
    if (!this.leaning) return;
    this.straighten(this.leaning);
    this.leaning = null;
  }

  /**
   * Removes the properties rather than setting them to zero, so the tile goes
   * back to inheriting whatever the page says and leaves nothing behind on the
   * two hundred elements a pointer may cross.
   */
  private straighten(tile: HTMLElement): void {
    tile.style.removeProperty('--parallax-x');
    tile.style.removeProperty('--parallax-y');
  }

  private clamp(value: number): number {
    return Math.min(1, Math.max(-1, value));
  }
}
