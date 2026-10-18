/** A colour, as the three bytes a canvas wants. */
export interface Cast {
  red: number;
  green: number;
  blue: number;
}

/**
 * What the light is most of the time: the cold white of a lit screen.
 */
const COLD_WHITE: Cast = { red: 0xcf, green: 0xe4, blue: 0xff };

/**
 * And what it takes on instead, now and then.
 *
 * A screen is not one colour. What is on it changes, and with it the cast of
 * the light it throws — warmer for a photograph, redder for one thing, bluer
 * for another. These are the directions it goes in, never the colours it
 * becomes: only a share of each is ever mixed in.
 */
const CASTS: readonly Cast[] = [
  { red: 0xff, green: 0xaa, blue: 0x96 }, // red
  { red: 0x96, green: 0xbe, blue: 0xff }, // blue
  { red: 0xff, green: 0xeb, blue: 0x96 }, // yellow
  { red: 0xaa, green: 0xff, blue: 0xc8 }, // green
  { red: 0xd7, green: 0xaa, blue: 0xff }, // violet
];

/**
 * How much of a cast is mixed in.
 *
 * A third, so the light is still the same light. A screen that went properly
 * red would be a different lamp rather than the same one showing something
 * else, and the face it falls on is paint, which has its own colour to keep.
 */
const HOW_FAR = 0.35;

/**
 * How often the light is simply its own colour.
 *
 * Half the time, which makes the cold white far and away the most frequent:
 * the five casts share the other half between them.
 */
const PLAIN = 0.5;

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
    private readonly holds = 2
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
   * The colour of the light at `t` seconds.
   *
   * It changes when the level changes and across the same easing, because it
   * is the same event: something else came up on the screen, and it is both
   * brighter and a different colour. Half the intervals are the plain cold
   * white and the rest lean a third of the way towards one of five casts, so
   * what it mostly is, is itself.
   */
  tint(t: number): Cast {
    const index = Math.floor(t / this.holds);
    const into = (t - index * this.holds) / this.holds;
    const ease = smooth(Math.min(1, into / 0.1));
    return mix(castAt(index), castAt(index + 1), ease);
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

/** The colour the nth interval is lit in. */
function castAt(index: number): Cast {
  // A different draw from the one the level uses, or every bright interval
  // would be the same colour as every other bright one.
  const pick = level(index * 7 + 3);
  if (pick < PLAIN) return COLD_WHITE;

  const which = Math.min(
    CASTS.length - 1,
    Math.floor(((pick - PLAIN) / (1 - PLAIN)) * CASTS.length)
  );
  return mix(COLD_WHITE, CASTS[which], HOW_FAR);
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
