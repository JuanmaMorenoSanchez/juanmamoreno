import type { Raster } from './raster';

/** Where the tonal range is read from, ignoring the few stray darkest and lightest pixels. */
const LOW_PERCENTILE = 0.002;
const HIGH_PERCENTILE = 0.998;
/** Already this close to the ends means the photograph is using the range it has. */
const BLACK_ENOUGH = 5;
const WHITE_ENOUGH = 250;
/**
 * The most the tones may be opened out.
 *
 * A photograph of a painting is usually a little flat, because light scattering
 * inside the lens veils the darks. Undoing that is restoring what was there.
 * Going further would be improving on the painting, which is not the job, so
 * the correction stops well short of what a contrast tool would do.
 */
const MAX_LEVELS_GAIN = 1.3;
/** The floor and ceiling the corrected range is mapped to, leaving both ends unclipped. */
const KEEP_HEADROOM = 2;

/** Pixels this bright and this colourless are the ones that ought to have been neutral. */
const NEUTRAL_BRIGHTNESS = 0.9;
const NEUTRAL_SATURATION = 0.25;
/** Below this share of the picture there is nothing neutral enough to judge a cast by. */
const MIN_NEUTRAL_SHARE = 0.003;
/** The most any channel may be moved. Enough to lift a cast, not enough to recolour a painting. */
const MAX_CHANNEL_GAIN = 1.14;
/** Under this, the cast is too slight to be worth touching. */
const CAST_NOTICEABLE = 0.02;

export interface LevelsReport {
  applied: boolean;
  /** The darkest and lightest the photograph actually got to, before any correction. */
  low: number;
  high: number;
}

export type Cast = 'blue' | 'yellow' | 'green' | 'magenta' | 'neutral';

export interface CastReport {
  /** False when the painting held nothing near-neutral, so no cast could be judged. */
  judged: boolean;
  applied: boolean;
  cast: Cast;
  /** How far off neutral, as a fraction. */
  strength: number;
}

/**
 * Opens the tones back out to the range the photograph failed to use, in place.
 *
 * Both ends are left a little headroom rather than driven to pure black and
 * pure white: a painting that contains neither should not be given both.
 */
export function autoLevels(raster: Raster): LevelsReport {
  const histogram = channelHistogram(raster);
  const total = raster.width * raster.height * 3;
  const low = percentileOf(histogram, total, LOW_PERCENTILE);
  const high = percentileOf(histogram, total, HIGH_PERCENTILE);

  if ((low <= BLACK_ENOUGH && high >= WHITE_ENOUGH) || high - low < 1) {
    return { applied: false, low, high };
  }

  const span = 255 - KEEP_HEADROOM * 2;
  const gain = Math.min(MAX_LEVELS_GAIN, span / (high - low));
  if (gain <= 1.01) return { applied: false, low, high };

  const { data } = raster;
  for (let i = 0; i < data.length; i += 4) {
    data[i] = (data[i] - low) * gain + KEEP_HEADROOM;
    data[i + 1] = (data[i + 1] - low) * gain + KEEP_HEADROOM;
    data[i + 2] = (data[i + 2] - low) * gain + KEEP_HEADROOM;
  }
  return { applied: true, low, high };
}

/**
 * Takes a blue or yellow cast off the photograph, in place.
 *
 * Judged only from the pale, colourless parts of the painting, on the reasoning
 * that whatever was nearly white in the paint should still be nearly white in
 * the photograph. The usual trick of assuming the whole picture averages to
 * grey cannot be used here: a painting is allowed to be mostly one colour, and
 * a terracotta ground would be neutralised into mud.
 *
 * A painting with nothing pale in it gives no evidence either way, and then
 * nothing is done and the report says so.
 */
export function autoWhiteBalance(raster: Raster): CastReport {
  const neutral = neutralAverage(raster);
  if (!neutral) return { judged: false, applied: false, cast: 'neutral', strength: 0 };

  const [red, green, blue] = neutral;
  const target = (red + green + blue) / 3;
  const gains = [target / red, target / green, target / blue].map((gain) =>
    Math.min(MAX_CHANNEL_GAIN, Math.max(1 / MAX_CHANNEL_GAIN, gain))
  );

  const strength = Math.max(...gains.map((gain) => Math.abs(gain - 1)));
  const cast = castOf(red, green, blue);
  if (strength < CAST_NOTICEABLE)
    return { judged: true, applied: false, cast: 'neutral', strength };

  const { data } = raster;
  for (let i = 0; i < data.length; i += 4) {
    data[i] *= gains[0];
    data[i + 1] *= gains[1];
    data[i + 2] *= gains[2];
  }
  return { judged: true, applied: true, cast, strength };
}

/** Which way the pale parts lean, named the way a photographer would name it. */
function castOf(red: number, green: number, blue: number): Cast {
  const warmth = red - blue;
  const tint = green - (red + blue) / 2;
  if (Math.abs(warmth) >= Math.abs(tint)) return warmth > 0 ? 'yellow' : 'blue';
  return tint > 0 ? 'green' : 'magenta';
}

/** The average colour of whatever in the painting is pale enough to have been white. */
function neutralAverage({ width, height, data }: Raster): [number, number, number] | null {
  const bright = NEUTRAL_BRIGHTNESS * 255;
  let red = 0;
  let green = 0;
  let blue = 0;
  let found = 0;

  for (let i = 0; i < data.length; i += 4) {
    const top = Math.max(data[i], data[i + 1], data[i + 2]);
    if (top < bright) continue;

    const saturation = (top - Math.min(data[i], data[i + 1], data[i + 2])) / top;
    if (saturation > NEUTRAL_SATURATION) continue;

    red += data[i];
    green += data[i + 1];
    blue += data[i + 2];
    found++;
  }

  if (found < width * height * MIN_NEUTRAL_SHARE) return null;
  return [red / found, green / found, blue / found];
}

/**
 * Every channel value, counted separately.
 *
 * Not the luminance. A saturated red sits at a luminance of about 80 while its
 * own green and blue are at nothing, and a black point taken from luminance and
 * then applied to all three channels drives those two below zero — the reds of
 * the painting come back as pure red with the modelling inside them gone. The
 * range that matters for a correction applied per channel is the range the
 * channels themselves occupy.
 */
function channelHistogram({ data }: Raster): Int32Array {
  const histogram = new Int32Array(256);
  for (let i = 0; i < data.length; i += 4) {
    histogram[data[i]]++;
    histogram[data[i + 1]]++;
    histogram[data[i + 2]]++;
  }
  return histogram;
}

function percentileOf(histogram: Int32Array, total: number, fraction: number): number {
  const target = total * fraction;
  let seen = 0;
  for (let value = 0; value < 256; value++) {
    seen += histogram[value];
    if (seen >= target) return value;
  }
  return 255;
}
