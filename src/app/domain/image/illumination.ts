import { blur, downscale, sampleBilinear, toLuminance, type Raster } from './raster';

/**
 * The lighting is estimated on a copy this small, then blurred hard on top of
 * that. Anything the artist actually painted has to survive; only a gradient
 * spanning the whole canvas can still be visible at this scale.
 */
const FIELD_LONG_SIDE = 96;
const FIELD_BLUR = 6;
/** Under a tenth of a stop across the whole painting is even lighting by any practical standard. */
const UNIFORM_BELOW = 0.1;
/**
 * How far a single pixel may be pushed.
 *
 * Without a photograph of the empty wall there is no way to tell a lamp that
 * fell off to the left from a painting that is darker on the left, so the
 * correction is deliberately kept too weak to flatten a composition even when
 * it has misread one.
 */
const MAX_GAIN = 1.35;

export interface IlluminationReport {
  /** Spread of the lighting across the painting, as a fraction of its average. */
  variation: number;
  uniform: boolean;
}

interface Field {
  values: Float32Array;
  width: number;
  height: number;
  average: number;
}

export function measureIllumination(raster: Raster): IlluminationReport {
  const field = estimateField(raster);
  const sorted = Float32Array.from(field.values).sort();
  const low = sorted[Math.floor(sorted.length * 0.05)];
  const high = sorted[Math.floor(sorted.length * 0.95)];
  const variation = field.average > 0 ? (high - low) / field.average : 0;

  return { variation, uniform: variation < UNIFORM_BELOW };
}

/**
 * Flattens uneven lighting, in place.
 *
 * Divides each pixel by how bright the light was where it sits, which is what
 * a flat-field correction does. The same gain goes to all three channels, so a
 * dim corner is lifted without its colour being touched: equalizing the
 * histogram instead would redistribute the tones the painter chose.
 */
export function equalizeIllumination(raster: Raster, strength = 1): void {
  const field = estimateField(raster);
  if (field.average <= 0) return;

  const { data, width, height } = raster;
  const scaleX = field.width / width;
  const scaleY = field.height / height;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const here = sampleBilinear(field.values, field.width, field.height, x * scaleX, y * scaleY);
      if (here <= 0) continue;

      const wanted = Math.min(MAX_GAIN, Math.max(1 / MAX_GAIN, field.average / here));
      const gain = 1 + (wanted - 1) * strength;
      const i = (y * width + x) * 4;
      data[i] *= gain;
      data[i + 1] *= gain;
      data[i + 2] *= gain;
    }
  }
}

function estimateField(raster: Raster): Field {
  const small = downscale(raster, FIELD_LONG_SIDE);
  const values = blur(toLuminance(small), small.width, small.height, FIELD_BLUR);

  let total = 0;
  for (const value of values) total += value;

  return { values, width: small.width, height: small.height, average: total / values.length };
}
