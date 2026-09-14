import { sampleBilinear, type Raster } from './raster';
import type { Selection } from './selection';

/**
 * The things that are actually wrong with a photograph of a painting.
 *
 * This replaced five checkboxes that each measured the photograph and decided
 * for themselves whether to act. They were honest about their own limits — the
 * lighting one is commented "there is no way to tell a lamp that fell off to the
 * left from a painting that is darker on the left" — and that doubt is exactly
 * why they were kept too weak to finish the job. A person looking at the
 * painting has the knowledge the measurement lacks, so they set the amount.
 *
 * Every adjustment is zero-centred: nought changes nothing, and the photograph
 * as it arrived is the middle of each slider rather than one end of it.
 */
export interface Adjustments {
  /** Darker below zero, lighter above. */
  brightness: number;
  /** Bluer below zero, more yellow above. */
  temperature: number;
  /**
   * The light half of the picture: duller below zero, whiter above.
   *
   * This and `darks` were one slider that stretched both ends away from mid
   * grey at once. A painting rarely needs both: a canvas photographed against a
   * lit wall has whites that have gone grey and blacks that are already black,
   * and moving the two together meant choosing which of them to get wrong.
   */
  whites: number;
  /** The dark half: lifted below zero, deeper above. */
  darks: number;
  /** Greyer below zero — grey altogether at the end of it — stronger above. */
  saturation: number;
}

export const NO_ADJUSTMENTS: Adjustments = {
  brightness: 0,
  temperature: 0,
  whites: 0,
  darks: 0,
  saturation: 0,
};

export function isUnchanged(adjustments: Adjustments): boolean {
  return (
    adjustments.brightness === 0 &&
    adjustments.temperature === 0 &&
    adjustments.whites === 0 &&
    adjustments.darks === 0 &&
    adjustments.saturation === 0
  );
}

/**
 * How far each slider can go at its ends.
 *
 * Brightness is a multiplier because light is: doubling it is what filling in a
 * corner that was photographed a stop down actually takes, and the measured
 * example needed about a half. The rest are gentler — they are finishing
 * adjustments, and the wide end of any of them is a photograph that looks
 * edited rather than corrected. Colour is the exception at its lower end, where
 * it goes all the way to grey: no colour at all is a real answer, and a
 * half-hearted one is not.
 */
const MAX_BRIGHTEN = 2;
const MAX_DARKEN = 0.5;
const MAX_STRETCH = 1.6;
const MIN_STRETCH = 0.6;
const MAX_SATURATE = 1.6;
/** At full warmth, red is lifted by this much and blue dropped by it. */
const MAX_TEMPERATURE = 0.18;

/** Mid grey: the tone that belongs to neither end of the scale, and so the hinge. */
const PIVOT = 127.5;

const clamp01 = (value: number) => Math.min(1, Math.max(-1, value));

/** What the eye reads as the brightness of a colour. */
function luminance(r: number, g: number, b: number): number {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** A slider from -1 to 1 as a multiplier, with nought at one. */
function stretchFor(value: number): number {
  return value >= 0 ? 1 + value * (MAX_STRETCH - 1) : 1 + value * (1 - MIN_STRETCH);
}

/**
 * Applies every adjustment in one pass, in place.
 *
 * One pass rather than one each because each would otherwise round to whole
 * numbers before the next one read them, and a rounding per slider on an
 * eight-bit channel is visible banding on a flat wall of colour.
 *
 * `selection` decides where. Nothing selected means the whole photograph, which
 * is what makes the brush optional rather than a step: the common case is a
 * photograph that is wrong all over.
 */
export function applyAdjustments(
  raster: Raster,
  adjustments: Adjustments,
  selection?: Selection | null
): void {
  if (isUnchanged(adjustments)) return;

  const brightness = clamp01(adjustments.brightness);
  const temperature = clamp01(adjustments.temperature);
  const saturation = clamp01(adjustments.saturation);

  // Each slider's own curve, worked out once rather than per pixel.
  const gain =
    brightness >= 0 ? 1 + brightness * (MAX_BRIGHTEN - 1) : 1 + brightness * (1 - MAX_DARKEN);
  const whiteStretch = stretchFor(clamp01(adjustments.whites));
  const darkStretch = stretchFor(clamp01(adjustments.darks));
  const colour = saturation >= 0 ? 1 + saturation * (MAX_SATURATE - 1) : 1 + saturation;
  const warmth = temperature * MAX_TEMPERATURE;

  const { data, width, height } = raster;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const i = (y * width + x) * 4;

      // How much of the adjustment this pixel gets. A feathered selection is
      // the whole reason this is a fraction rather than a yes or no.
      const strength = selection ? coverageAt(selection, width, height, x, y) : 1;
      if (strength <= 0) continue;

      // Brightness first: it is the one that means "there was less light
      // here", and everything after it is judging the light that should have
      // been there.
      const lift = 1 + (gain - 1) * strength;
      let r = data[i] * lift;
      let g = data[i + 1] * lift;
      let b = data[i + 2] * lift;

      // Then the two halves of the scale. Which half a pixel belongs to, and
      // how far into it, is read from the pixel's own brightness — so each
      // slider reaches the end it is named for and leaves the middle alone.
      // Splitting hard at mid grey instead would put a crease across every
      // smooth gradient, exactly where a wall behind a canvas has one.
      const tone = luminance(r, g, b);
      const above = tone > PIVOT ? Math.min(1, (tone - PIVOT) / PIVOT) : 0;
      const below = tone < PIVOT ? Math.min(1, (PIVOT - tone) / PIVOT) : 0;
      const stretch = 1 + ((whiteStretch - 1) * above + (darkStretch - 1) * below) * strength;
      r = PIVOT + (r - PIVOT) * stretch;
      g = PIVOT + (g - PIVOT) * stretch;
      b = PIVOT + (b - PIVOT) * stretch;

      // Then the strength of the colour, measured from this pixel's own grey,
      // which is what keeps a hue where it is while it gets stronger or weaker.
      if (colour !== 1) {
        const grey = luminance(r, g, b);
        const much = 1 + (colour - 1) * strength;
        r = grey + (r - grey) * much;
        g = grey + (g - grey) * much;
        b = grey + (b - grey) * much;
      }

      // Then the cast. Red up and blue down is warmer; green is left alone,
      // which is what keeps a temperature shift from becoming a tint.
      if (warmth !== 0) {
        r *= 1 + warmth * strength;
        b *= 1 - warmth * strength;
      }

      data[i] = r < 0 ? 0 : r > 255 ? 255 : r;
      data[i + 1] = g < 0 ? 0 : g > 255 ? 255 : g;
      data[i + 2] = b < 0 ? 0 : b > 255 ? 255 : b;
    }
  }
}

/** How selected a pixel is, from the small mask, smoothly. */
function coverageAt(
  selection: Selection,
  photoWidth: number,
  photoHeight: number,
  x: number,
  y: number
): number {
  const u = ((x + 0.5) / photoWidth) * selection.width - 0.5;
  const v = ((y + 0.5) / photoHeight) * selection.height - 0.5;
  return sampleBilinear(selection.values, selection.width, selection.height, u, v);
}
