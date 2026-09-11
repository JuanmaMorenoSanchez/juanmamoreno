import { sampleBilinear, type Raster } from './raster';
import type { Selection } from './selection';

/**
 * The three things that are actually wrong with a photograph of a painting.
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
  /** Flatter below zero, blacker blacks and whiter whites above. */
  range: number;
}

export const NO_ADJUSTMENTS: Adjustments = { brightness: 0, temperature: 0, range: 0 };

export function isUnchanged(adjustments: Adjustments): boolean {
  return (
    adjustments.brightness === 0 && adjustments.temperature === 0 && adjustments.range === 0
  );
}

/**
 * How far each slider can go at its ends.
 *
 * Brightness is a multiplier because light is: doubling it is what filling in a
 * corner that was photographed a stop down actually takes, and the measured
 * example needed about a half. Range and temperature are gentler — they are
 * finishing adjustments, and the wide end of either is a photograph that looks
 * edited rather than corrected.
 */
const MAX_BRIGHTEN = 2;
const MAX_DARKEN = 0.5;
const MAX_RANGE = 1.6;
const MIN_RANGE = 0.6;
/** At full warmth, red is lifted by this much and blue dropped by it. */
const MAX_TEMPERATURE = 0.18;

/** Mid grey, which range expands away from and compresses towards. */
const PIVOT = 127.5;

const clamp01 = (value: number) => Math.min(1, Math.max(-1, value));

/**
 * Applies the three adjustments in one pass, in place.
 *
 * One pass rather than three because each would otherwise round to whole
 * numbers before the next one read them, and three roundings on an eight-bit
 * channel is visible banding on a flat wall of colour.
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
  const range = clamp01(adjustments.range);

  // Each slider's own curve, worked out once rather than per pixel.
  const gain = brightness >= 0 ? 1 + brightness * (MAX_BRIGHTEN - 1) : 1 + brightness * (1 - MAX_DARKEN);
  const stretch = range >= 0 ? 1 + range * (MAX_RANGE - 1) : 1 + range * (1 - MIN_RANGE);
  const warmth = temperature * MAX_TEMPERATURE;

  const { data, width, height } = raster;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const i = (y * width + x) * 4;

      // How much of the adjustment this pixel gets. A feathered selection is
      // the whole reason this is a fraction rather than a yes or no.
      const strength = selection ? coverageAt(selection, width, height, x, y) : 1;
      if (strength <= 0) continue;

      for (let channel = 0; channel < 3; channel += 1) {
        let value = data[i + channel];

        // Brightness first: it is the one that means "there was less light
        // here", and the other two are then judging the light that should
        // have been there.
        value *= 1 + (gain - 1) * strength;
        // Then the range, away from or towards mid grey.
        value = PIVOT + (value - PIVOT) * (1 + (stretch - 1) * strength);
        // Then the cast. Red up and blue down is warmer; green is left alone,
        // which is what keeps a temperature shift from becoming a tint.
        if (warmth !== 0 && channel !== 1) {
          const direction = channel === 0 ? 1 : -1;
          value *= 1 + warmth * direction * strength;
        }

        data[i + channel] = value < 0 ? 0 : value > 255 ? 255 : value;
      }
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
