import { Directive, ElementRef, inject, input, OnDestroy } from '@angular/core';

const DEFAULT_MAX_SHIFT_PERCENT = 3;

/**
 * Subtle, list-wide parallax: tracks the pointer's offset from the viewport
 * centre and writes it as `--parallax-x` / `--parallax-y` CSS custom
 * properties (percentages) on the host element. Anything nested inside can
 * react to it purely in CSS, e.g.:
 *
 *   .frame { overflow: hidden; }
 *   .image { transform: translate(var(--parallax-x, 0%), var(--parallax-y, 0%)) scale(1.1);
 *            transition: transform 0.2s ease-out; }
 *
 * An image scaled slightly larger than its frame pans within it as the
 * custom properties change, clipped by the frame's `overflow: hidden` — it
 * never reveals an edge. Because the properties are set once on the host and
 * read via `var()` by every descendant, this costs one listener no matter how
 * many images are inside — no per-image JS, however large the list.
 */
@Directive({ selector: '[appParallaxTilt]' })
export class ParallaxTiltDirective implements OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);

  // Deliberately not aliased to the selector name: `appParallaxTilt` is meant
  // to be usable as a bare marker attribute (no binding), which only works if
  // no input publicly shares that exact name.
  /** Shift at the pointer's extremes, as a percentage of each element's own size. */
  readonly maxShiftPercent = input(DEFAULT_MAX_SHIFT_PERCENT);

  private rafId = 0;

  private readonly onPointerMove = (event: PointerEvent): void => {
    if (this.rafId) return; // a frame is already queued; coalesce bursts of events
    const { clientX, clientY } = event;
    this.rafId = requestAnimationFrame(() => {
      this.rafId = 0;
      this.apply(clientX, clientY);
    });
  };

  constructor() {
    document.addEventListener('pointermove', this.onPointerMove, { passive: true });
  }

  ngOnDestroy(): void {
    document.removeEventListener('pointermove', this.onPointerMove);
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }

  private apply(clientX: number, clientY: number): void {
    const refX = this.clamp((clientX - window.innerWidth / 2) / (window.innerWidth / 2));
    const refY = this.clamp((clientY - window.innerHeight / 2) / (window.innerHeight / 2));
    const max = this.maxShiftPercent();
    const style = this.el.nativeElement.style;
    style.setProperty('--parallax-x', `${(refX * max).toFixed(2)}%`);
    style.setProperty('--parallax-y', `${(refY * max).toFixed(2)}%`);
  }

  private clamp(value: number): number {
    return Math.min(1, Math.max(-1, value));
  }
}
