/**
 * The brightness of a screen somebody is looking at, over time.
 *
 * A phone or a tablet held under a face does not glow steadily: it holds a
 * level while a page is read, then jumps when something else is opened, and
 * drifts a little in between as the picture on it changes. Three terms, which
 * is enough for the eye to stop predicting it:
 *
 * - a slow drift, so it is never quite still;
 * - a faster, smaller ripple at a frequency that does not divide the first,
 *   so the two never line up into an obvious beat;
 * - a step, every few seconds, to a new level — which is the one that reads
 *   as a screen rather than as a candle.
 *
 * Pure arithmetic of `t`: the same second always gives the same brightness,
 * so a sketch that is paused and resumed does not jump.
 */
export class ScreenGlow {
  constructor(
    /** The dimmest it goes, as a share of full. */
    private readonly least = 0.45,
    /** The brightest. Over one is allowed: the mask is drawn additively. */
    private readonly most = 1.15,
    /** How long a level is held before it steps somewhere else, in seconds. */
    private readonly holds = 3.2
  ) {}

  /** Brightness at `t` seconds, between `least` and `most`. */
  at(t: number): number {
    const drift = Math.sin(t * 0.31);
    const ripple = Math.sin(t * 1.27 + 1.1) * 0.35;
    // A new level every `holds` seconds, eased into over a third of a second
    // rather than cut to: a hard jump reads as a dropped frame.
    const step = this.stepAt(t);

    const mixed = (drift + ripple) / 1.35; // back into -1..1
    const level = (mixed * 0.5 + 0.5) * 0.55 + step * 0.45;
    return this.least + level * (this.most - this.least);
  }

  /**
   * The held level at `t`, eased across the change.
   *
   * Deterministic from the index of the interval, so it is the same on every
   * run and needs no state: a sketch left open for an hour and one just
   * started agree about what the screen was doing at eleven seconds.
   */
  private stepAt(t: number): number {
    const index = Math.floor(t / this.holds);
    const into = (t - index * this.holds) / this.holds;
    const ease = Math.min(1, into / 0.1); // a tenth of the hold to arrive
    return level(index) + (level(index + 1) - level(index)) * smooth(ease);
  }
}

/** A repeatable pseudo-random level in 0..1 for the nth interval. */
function level(index: number): number {
  const mixed = Math.sin(index * 12.9898) * 43758.5453;
  return mixed - Math.floor(mixed);
}

/** Smoothstep, so a change of level arrives rather than snaps. */
function smooth(at: number): number {
  return at * at * (3 - 2 * at);
}
