import { computed, signal } from '@angular/core';
import {
  clearSelection,
  createSelection,
  hasSelection,
  paintDab,
  type Selection,
} from '@domain/image/selection';
import type { Size } from '@domain/image/raster';
import type { Point } from '@domain/image/quad';

const RADIUS_KEY = 'juanmamoreno.studio.brushRadius';
const SOFTNESS_KEY = 'juanmamoreno.studio.brushSoftness';

const MIN_RADIUS = 1;
const MAX_RADIUS = 60;

function remembered(key: string, fallback: number): number {
  if (typeof window === 'undefined') return fallback;
  const stored = Number(window.localStorage.getItem(key));
  return Number.isFinite(stored) && stored > 0 ? stored : fallback;
}

function remember(key: string, value: number): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, String(value));
  } catch {
    // A browser that refuses to remember is not a reason to stop working.
  }
}

/**
 * Which part of the photograph the sliders apply to, and the tool that says so.
 *
 * Kept apart from the component because it is the one piece of the corrector
 * that owes nothing to the rest of it: it holds a mask, two settings and which
 * way the next stroke goes, and it neither knows nor cares about corners,
 * straightening or metadata. The component still owns the geometry and hands
 * over positions already in the corrected picture's own pixels.
 */
export class PhotoBrush {
  /** Whether the brush is in hand at all. */
  readonly selecting = signal(false);

  /**
   * Which way it goes.
   *
   * Taking a selection back was once only on shift, which is to say nowhere
   * anybody would find it, and pulling an edge back is most of what selecting
   * an area is.
   */
  readonly mode = signal<'add' | 'erase'>('add');

  readonly radius = signal(remembered(RADIUS_KEY, 22));
  readonly softness = signal(remembered(SOFTNESS_KEY, 80));

  /**
   * Where the brush is and how wide, in percentages of the stage.
   *
   * A ring under the pointer, because the size slider is a number and a number
   * does not say how much of this painting it covers. Null when the pointer is
   * not over the stage, so none is left behind when it leaves.
   */
  readonly cursor = signal<{ x: number; y: number; size: number } | null>(null);

  readonly selection = signal<Selection | null>(null);

  /** Bumped on every dab, since a Float32Array mutated in place is not new. */
  readonly version = signal(0);

  readonly hasArea = computed(() => {
    this.version();
    return hasSelection(this.selection());
  });

  use(mode: 'add' | 'erase'): void {
    this.selecting.set(true);
    this.mode.set(mode);
  }

  toggle(): void {
    this.selecting.update((on) => !on);
  }

  setRadius(value: number): void {
    const bounded = Math.min(MAX_RADIUS, Math.max(MIN_RADIUS, value));
    this.radius.set(bounded);
    remember(RADIUS_KEY, bounded);
  }

  setSoftness(value: number): void {
    const bounded = Math.min(100, Math.max(0, value));
    this.softness.set(bounded);
    remember(SOFTNESS_KEY, bounded);
  }

  clear(): void {
    const selection = this.selection();
    if (!selection) return;
    clearSelection(selection);
    this.version.update((n) => n + 1);
  }

  /**
   * Which way one dab goes: the chosen tool, reversed while shift is held.
   *
   * Reversing rather than always erasing, so the shortcut means the same thing
   * from either tool — the other one, for as long as the key is down.
   */
  erases(reversed: boolean): boolean {
    return this.mode() === 'erase' ? !reversed : reversed;
  }

  /**
   * One dab, in the corrected picture's own pixels.
   *
   * The radius is a share of the picture rather than a number of pixels, so a
   * brush set on one photograph means the same thing on the next whatever size
   * it came in.
   */
  dab(at: Point, target: Size, erase: boolean): void {
    let selection = this.selection();
    if (!selection || selection.width < 2) {
      selection = createSelection(target.width, target.height);
      this.selection.set(selection);
    }

    paintDab(selection, target, {
      x: at.x,
      y: at.y,
      radius: (this.radius() / 100) * Math.max(target.width, target.height),
      softness: this.softness() / 100,
      erase,
    });
    this.version.update((n) => n + 1);
  }
}
