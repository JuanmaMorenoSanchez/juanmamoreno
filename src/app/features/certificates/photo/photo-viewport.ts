import { signal } from '@angular/core';

/**
 * How far into the photograph one can go.
 *
 * The stage shows the whole photograph at once, which is right for judging it
 * and wrong for placing a corner: a corner dropped a pixel out on a stage a
 * thousand pixels wide is six pixels out on the photograph. Zooming the whole
 * browser was the way round that, and it takes the controls with it. Four is
 * as far as it is worth going — beyond that the preview itself, capped at two
 * thousand pixels, has no more detail to show.
 */
export const MAX_ZOOM = 4;

/**
 * Whether the space bar already means something where it was pressed.
 *
 * Only where it does: a box being written in, a list being chosen from, a box
 * being ticked. A range slider and a button do nothing with it that Enter
 * cannot also do.
 */
export function isTypingInto(target: EventTarget | null): boolean {
  const element = target as HTMLElement | null;
  if (!element) return false;
  if (element.isContentEditable) return true;

  const tag = element.tagName;
  if (tag === 'TEXTAREA' || tag === 'SELECT') return true;
  if (tag !== 'INPUT') return false;

  const type = (element as HTMLInputElement).type;
  return type !== 'range' && type !== 'button' && type !== 'submit';
}

/**
 * How far the stage is magnified, and the hand that moves it.
 *
 * Kept apart from the corrector the way `PhotoBrush` and `PhotoRights` already
 * are, and for the same reason: it owes nothing to the rest of it. It holds a
 * magnification, whether the hand is down, and where the view was when it went
 * down — and it neither knows nor cares about corners, straightening, colour or
 * metadata.
 *
 * It was the part of the component a wrong edit could make unusable without
 * failing a test, because nothing could ask it anything without a photograph,
 * a canvas and a pointer. Now the questions are direct: does the space bar get
 * taken while a caption is being typed, does the picture follow the pointer
 * exactly, does zooming back out put the hand away.
 *
 * It is handed the scrolling element and whether there is a photograph at all,
 * rather than reaching for either: both belong to the component, and a class
 * that reaches into a template cannot be tested without one.
 */
export class PhotoViewport {
  /** How far the stage is magnified. One is the whole photograph, as before. */
  readonly zoom = signal(1);

  /**
   * Whether the pointer is moving the view rather than the picture.
   *
   * The hand tool, and held down rather than switched on for the same reason it
   * is in every other program: panning happens in the middle of placing a
   * corner, and a mode you have to leave and come back to is a mode you forget
   * you are in.
   */
  readonly panning = signal(false);

  /** Where the pointer was and where the view was, at the moment of the grab. */
  private from: { x: number; y: number; left: number; top: number } | null = null;

  constructor(
    private readonly element: () => HTMLElement | null | undefined,
    private readonly hasPhotograph: () => boolean,
  ) {}

  setZoom(value: number): void {
    this.zoom.set(Number.isFinite(value) ? Math.min(MAX_ZOOM, Math.max(1, value)) : 1);
    if (this.zoom() <= 1) this.stopPanning();
  }

  /**
   * Claims the space bar, but only where it is worth claiming.
   *
   * Space does something already: it types, it ticks a checkbox, it presses the
   * button that has the focus. So it is taken only when there is a photograph
   * on the stage that is magnified — which is the only time there is anywhere
   * to pan to — and never while something is being typed into. Buttons and the
   * sliders give it up in that case, which is the one real cost; Enter still
   * presses a button.
   */
  takeSpace(event: KeyboardEvent): void {
    if (event.code !== 'Space' || !this.hasPhotograph() || this.zoom() <= 1) return;
    if (isTypingInto(event.target)) return;
    // Otherwise the page jumps a screenful down under the picture being panned.
    event.preventDefault();
    this.panning.set(true);
  }

  releaseSpace(event: KeyboardEvent): void {
    if (event.code === 'Space') this.stopPanning();
  }

  /** Also on losing the window, where no keyup is ever going to arrive. */
  stopPanning(): void {
    this.panning.set(false);
    this.from = null;
  }

  /**
   * Lets go of the view without putting the hand away.
   *
   * What a pointer-up means: this drag is over. The hand is held, not switched
   * on, so if the space bar is still down the next drag pans again — and
   * `stopPanning` here would drop out of hand mode on every pan, mid-gesture.
   */
  releaseGrab(): void {
    this.from = null;
  }

  startPan(event: PointerEvent): void {
    const viewport = this.element();
    if (!viewport) return;
    this.from = {
      x: event.clientX,
      y: event.clientY,
      left: viewport.scrollLeft,
      top: viewport.scrollTop,
    };
    (event.target as Element).setPointerCapture?.(event.pointerId);
    event.preventDefault();
  }

  /**
   * Moves the view under the hand, the opposite way to a scrollbar.
   *
   * The picture follows the pointer exactly, which is what makes this more
   * intuitive than the scrollbars it replaces: the distance dragged is the
   * distance the painting moves, in the direction it was dragged.
   */
  pan(event: PointerEvent): void {
    const from = this.from;
    const viewport = this.element();
    if (!from || !viewport) return;
    viewport.scrollLeft = from.left - (event.clientX - from.x);
    viewport.scrollTop = from.top - (event.clientY - from.y);
  }

  /** Back to the whole photograph, with the hand put away. */
  reset(): void {
    this.zoom.set(1);
    this.stopPanning();
  }
}
