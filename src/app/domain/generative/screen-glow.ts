/** A colour, as the three bytes a canvas wants. */
export interface Cast {
  red: number;
  green: number;
  blue: number;
}

/**
 * What the light is most of the time: the cold white of a lit screen.
 *
 * Short of white on every channel on purpose. It is added to paint, and a
 * light with no headroom has nowhere to go but white, which is what a blown
 * forehead is.
 */
const COLD_WHITE: Cast = { red: 0xc4, green: 0xd4, blue: 0xec };

/**
 * And what it takes on instead, now and then.
 *
 * A screen is not one colour. What is on it changes, and with it the cast of
 * the light it throws. These are written close to the cold white already —
 * the change wanted is the one you notice without being able to name it —
 * and then levelled, below, so that none of them is any dimmer than it.
 */
const PAINTED: readonly Cast[] = [
  { red: 228, green: 202, blue: 202 }, // red
  { red: 176, green: 214, blue: 250 }, // blue
  { red: 232, green: 220, blue: 182 }, // yellow
  { red: 182, green: 224, blue: 198 }, // green
  { red: 214, green: 202, blue: 248 }, // violet
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

/** The colour the nth interval is lit in. */
function castAt(index: number): Cast {
  // A different draw from the one the level uses, or every bright interval
  // would be the same colour as every other bright one.
  const pick = level(index * 7 + 3);
  if (pick < PLAIN) return COLD_WHITE;

  const which = Math.min(
    PAINTED.length - 1,
    Math.floor(((pick - PLAIN) / (1 - PLAIN)) * PAINTED.length)
  );
  return CASTS[which];
}

/** How much light a colour is, which is not how much of it there is. */
function brightness(colour: Cast): number {
  return 0.2126 * colour.red + 0.7152 * colour.green + 0.0722 * colour.blue;
}

/**
 * A cast lifted or dropped bodily until it is exactly as bright as the cold
 * white.
 *
 * Without this, a cast reads as the light going out rather than as the light
 * changing colour: the eye is far better at brightness than at hue, and a
 * redder white is a dimmer one unless something is done about it. Adding the
 * same amount to all three channels moves brightness without turning the
 * colour, and brightness is linear, so anything mixed between two levelled
 * casts is level too.
 */
function levelled(cast: Cast): Cast {
  const lift = brightness(COLD_WHITE) - brightness(cast);
  return { red: cast.red + lift, green: cast.green + lift, blue: cast.blue + lift };
}

const CASTS: readonly Cast[] = PAINTED.map(levelled);

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
