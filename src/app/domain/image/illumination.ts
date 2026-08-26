import { downscale, sampleBilinear, toLuminance, type Raster } from './raster';
import { solveLinearSystem } from './linear';

/** The lighting is worked out on a copy this small. A lamp's falloff is a broad thing. */
const FIELD_LONG_SIDE = 96;
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
/** Passes of fit-and-discard when working out the light. */
const FITTING_ROUNDS = 3;
/** How far off the surface a patch may sit before it is taken for paint, not light. */
const OUTLIER_SPREAD = 2;
/** If this much of the painting disagrees with the surface, the surface is not to be trusted. */
const MIN_AGREEING = 0.45;

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
  /** False when the painting's own content swamped the fit and nothing can be said. */
  trusted: boolean;
}

export function measureIllumination(raster: Raster): IlluminationReport {
  const field = estimateField(raster);
  if (!field.trusted || field.average <= 0) return { variation: 0, uniform: true };

  const sorted = Float32Array.from(field.values).sort();
  const low = sorted[Math.floor(sorted.length * 0.05)];
  const high = sorted[Math.floor(sorted.length * 0.95)];
  const variation = (high - low) / field.average;

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
  if (!field.trusted || field.average <= 0) return;

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

/**
 * What the light was doing across the painting.
 *
 * Fitted as a plane rather than read off a blurred copy of the picture.
 * Blurring cannot tell light from paint: a white garment across the middle of a
 * canvas is a bright patch at every scale, so it comes back as a bright lamp,
 * and the correction then shades the garment to put that lamp out. A plane is
 * only able to say that one side of the painting got more light than the other,
 * which is the common fault and one a garment cannot fake.
 *
 * Then fitted again, twice, each time setting aside whatever disagreed most
 * with the previous surface. That is what stops a large light passage from
 * tilting the fit before it has been recognised as paint. If too much of the
 * painting ends up set aside, the fit was reading composition rather than
 * light, and it says so instead of guessing.
 */
function estimateField(raster: Raster): Field {
  const small = downscale(raster, FIELD_LONG_SIDE);
  const { width, height } = small;
  const gray = toLuminance(small);

  const weights = new Float32Array(gray.length).fill(1);
  let surface: Float32Array<ArrayBuffer> = new Float32Array(gray.length);
  let agreeing = gray.length;

  for (let round = 0; round < FITTING_ROUNDS; round++) {
    surface = fitSurface(gray, width, height, weights);

    const deviations: number[] = [];
    for (let p = 0; p < gray.length; p++) deviations.push(Math.abs(gray[p] - surface[p]));
    const typical = median(deviations);
    if (typical <= 0) break;

    agreeing = 0;
    for (let p = 0; p < gray.length; p++) {
      weights[p] = deviations[p] <= OUTLIER_SPREAD * typical ? 1 : 0;
      agreeing += weights[p];
    }
    if (agreeing < gray.length * MIN_AGREEING) break;
  }

  let total = 0;
  for (const value of surface) total += value;

  return {
    values: surface,
    width,
    height,
    average: total / surface.length,
    trusted: agreeing >= gray.length * MIN_AGREEING,
  };
}

/**
 * Least squares over 1, x and y, with both axes running -1 to 1.
 *
 * A plane, and deliberately nothing richer. Add the squared terms and the
 * surface gains enough freedom to sit down over a white garment in the middle
 * of the canvas and call it a lamp — and then the discarding step throws out
 * the evenly lit ground instead, as the thing that disagrees. A plane can only
 * say that one side is brighter than the other, which is what a lamp off to one
 * side does, and is a sentence a garment cannot make it say.
 */
function fitSurface(
  gray: Float32Array,
  width: number,
  height: number,
  weights: Float32Array
): Float32Array<ArrayBuffer> {
  const terms = 3;
  const matrix = Array.from({ length: terms }, () => new Array<number>(terms).fill(0));
  const targets = new Array<number>(terms).fill(0);
  const basis = new Array<number>(terms);

  for (let y = 0; y < height; y++) {
    const v = height > 1 ? (y / (height - 1)) * 2 - 1 : 0;
    for (let x = 0; x < width; x++) {
      const p = y * width + x;
      const weight = weights[p];
      if (!weight) continue;

      const u = width > 1 ? (x / (width - 1)) * 2 - 1 : 0;
      fillBasis(basis, u, v);
      for (let i = 0; i < terms; i++) {
        for (let j = 0; j < terms; j++) matrix[i][j] += weight * basis[i] * basis[j];
        targets[i] += weight * basis[i] * gray[p];
      }
    }
  }

  const coefficients = solveLinearSystem(matrix, targets);
  const surface = new Float32Array(gray.length);
  for (let y = 0; y < height; y++) {
    const v = height > 1 ? (y / (height - 1)) * 2 - 1 : 0;
    for (let x = 0; x < width; x++) {
      const u = width > 1 ? (x / (width - 1)) * 2 - 1 : 0;
      fillBasis(basis, u, v);
      let value = 0;
      for (let i = 0; i < terms; i++) value += coefficients[i] * basis[i];
      surface[y * width + x] = value;
    }
  }
  return surface;
}

function fillBasis(basis: number[], u: number, v: number): void {
  basis[0] = 1;
  basis[1] = u;
  basis[2] = v;
}

function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[sorted.length >> 1];
}
