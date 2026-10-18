/** A colour, as the three bytes a canvas wants. */
export interface Cast {
  red: number;
  green: number;
  blue: number;
}

/**
 * The casts the light takes, as hues.
 *
 * Saturated, which earlier versions of this were not and which is why they
 * could not be seen. A pale coloured light screened onto pale paint is a
 * white light: screening runs towards white on every channel at once, and
 * what little difference there was between a cold white and a warm one is
 * gone by the time it lands on a lit cheek. So the brightness and the colour
 * are two passes now, and this is the colour one — laid on with the blend
 * that takes the hue and the saturation of what is drawn and the brightness
 * of what is under it. Nothing here can make the paint darker, whatever its
 * own brightness: the paint keeps its own.
 */
const CASTS: readonly Cast[] = [
  { red: 0xff, green: 0x6e, blue: 0x5a }, // red
  { red: 0x5a, green: 0x9b, blue: 0xff }, // blue
  { red: 0xff, green: 0xd2, blue: 0x4a }, // yellow
  { red: 0x5a, green: 0xe0, blue: 0x8c }, // green
  { red: 0xbe, green: 0x6e, blue: 0xff }, // violet
];

/**
 * How often the light is simply its own colour.
 *
 * Half the time, which makes the cold white far and away the most frequent:
 * the five casts share the other half between them.
 */
const PLAIN = 0.5;

/**
 * How far a change of level may wander from the beat, as a share of it.
 *
 * A screen does not change on a metronome. Under a half the boundaries
 * cannot overtake each other, so the intervals stay in order while none of
 * them is the same length as the one before.
 */
const WANDERS = 0.45;

/** How long a change takes to arrive, in seconds, whatever the interval. */
const ARRIVES = 0.35;

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
 * - a step, every couple of seconds and never twice the same couple, to a new
 *   level and a new cast — which is the one that reads as a screen rather
 *   than as a candle.
 *
 * Pure arithmetic of `t`: the same second always gives the same light, so a
 * sketch that is paused and resumed does not jump.
 */
export class ScreenGlow {
  constructor(
    /** The dimmest it goes, as a share of full. */
    private readonly least = 0.45,
    /** The brightest. Over one is allowed: the mask is drawn additively. */
    private readonly most = 1.15,
    /** About how long a level is held before it steps, in seconds. */
    private readonly holds = 2
  ) {}

  /** Brightness at `t` seconds, between `least` and `most`. */
  at(t: number): number {
    const drift = Math.sin(t * 0.31);
    const ripple = Math.sin(t * 1.27 + 1.1) * 0.35;
    const step = this.stepAt(t);

    const mixed = (drift + ripple) / 1.35; // back into -1..1
    const level = (mixed * 0.5 + 0.5) * 0.55 + step * 0.45;
    return this.least + level * (this.most - this.least);
  }

  /**
   * The colour of the light at `t` seconds.
   *
   * It changes when the level changes and across the same arrival, because
   * it is the same event: something else came up on the screen, and it is
   * both brighter and a different colour. Half the intervals are the plain
   * cold white and the rest take a cast, so what it mostly is, is itself.
   */
  tint(t: number): Cast {
    const { index, arrived } = this.whenAt(t);
    return mix(castAt(index), castAt(index + 1), arrived);
  }

  /**
   * How much of that colour is actually in the light at `t`: none for the
   * intervals that are the plain white of a screen, all of it for the rest.
   *
   * Separate from the colour so that an interval with no cast still has a
   * hue to fade towards, and the change is a colour arriving rather than a
   * swing through grey on the way to it.
   */
  colouring(t: number): number {
    const { index, arrived } = this.whenAt(t);
    const from = castsAt(index) ? 1 : 0;
    const to = castsAt(index + 1) ? 1 : 0;
    return from + (to - from) * arrived;
  }

  /**
   * The held level at `t`, eased across the change.
   *
   * Deterministic from the index of the interval, so it is the same on every
   * run and needs no state: a sketch left open for an hour and one just
   * started agree about what the screen was doing at eleven seconds.
   */
  private stepAt(t: number): number {
    const { index, arrived } = this.whenAt(t);
    return level(index) + (level(index + 1) - level(index)) * arrived;
  }

  /**
   * Which interval `t` falls in, and how far through its arrival it is.
   *
   * The boundaries sit near multiples of `holds` and are pushed either side
   * of it by a draw on their own number, so no two gaps are the same length
   * and none can overtake its neighbour. The arrival is a fixed number of
   * seconds rather than a share of the gap, or a short interval would snap
   * where a long one eased.
   */
  private whenAt(t: number): { index: number; arrived: number } {
    let index = Math.floor(t / this.holds);
    while (changesAt(index, this.holds) > t) index--;
    while (changesAt(index + 1, this.holds) <= t) index++;

    const since = t - changesAt(index, this.holds);
    return { index, arrived: smooth(Math.min(1, since / ARRIVES)) };
  }
}

/**
 * When the nth change happens, in seconds.
 *
 * Near the nth beat and pushed either side of it by a draw on its own
 * number, so no two gaps are the same length. `WANDERS` is under a half,
 * which is what keeps a boundary from overtaking the one after it.
 *
 * Exported because it is the whole of the irregularity and the only way to
 * check it without inferring boundaries from the brightness either side.
 */
export function changesAt(index: number, holds: number): number {
  return (index + (level(index * 31 + 11) - 0.5) * WANDERS) * holds;
}

/** Whether the nth interval is cast at all, or the plain white of a screen. */
function castsAt(index: number): boolean {
  return level(index * 7 + 3) >= PLAIN;
}

/**
 * Which colour the nth interval would be cast in, cast or not.
 *
 * A different draw from the one that decides whether it is cast, so the
 * plain intervals are not all drawn from the same end of the list.
 */
function castAt(index: number): Cast {
  return CASTS[Math.floor(level(index * 13 + 5) * CASTS.length) % CASTS.length];
}

/** `how` of the way from one colour to another. */
function mix(from: Cast, to: Cast, how: number): Cast {
  return {
    red: from.red + (to.red - from.red) * how,
    green: from.green + (to.green - from.green) * how,
    blue: from.blue + (to.blue - from.blue) * how,
  };
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
