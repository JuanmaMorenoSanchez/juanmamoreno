import { luminance, type Raster } from './raster';

/** How deep into the painting a rim of shadow or light is looked for, as a share of the short side. */
const BAND = 0.04;
/** The band just inside that one, taken as what the paint ought to read. */
const REFERENCE_DEPTH = 2;
/** Under this the rim is within the ordinary variation of paint and is left alone. */
const NOTICEABLE = 0.05;
/** The most any pixel in the rim may be moved. */
const MAX_GAIN = 1.3;
/** Places sampled along a side when reading its profile. */
const SAMPLES = 400;

export type Border = 'left' | 'right' | 'top' | 'bottom';

export interface BorderReport {
  /** Which sides carried a rim, and were evened out. Empty when all four were clean. */
  corrected: Border[];
}

const BORDERS: Border[] = ['left', 'right', 'top', 'bottom'];

/**
 * Evens out a rim of shadow or glare along the edges of the painting, in place.
 *
 * A canvas laid down or hung against a wall picks up a dark line where it lifts
 * off the surface, and one lit from an angle picks up a bright one on the side
 * facing the lamp. Either survives the crop as a band a few pixels deep that
 * belongs to the photograph rather than to the painting.
 *
 * It is looked for one side at a time, because a rim is usually on one or two
 * sides and not all four, and it is read as the median across the length of the
 * side, so a dark passage of paint that happens to reach the edge cannot invent
 * one. The correction fades to nothing by the inner edge of the band, so there
 * is no line where it stops.
 */
export function evenOutBorders(raster: Raster): BorderReport {
  const depth = Math.max(2, Math.round(Math.min(raster.width, raster.height) * BAND));
  const corrected: Border[] = [];

  for (const border of BORDERS) {
    const profile = readProfile(raster, border, depth * REFERENCE_DEPTH);
    const reference = median(profile.slice(depth));
    if (reference <= 0) continue;

    if (Math.abs(profile[0] - reference) / reference < NOTICEABLE) continue;

    corrected.push(border);
    applyGains(raster, border, gainsFor(profile, reference, depth));
  }

  return { corrected };
}

/** Median luminance at each depth in from one side, so paint cannot fake a rim. */
function readProfile(raster: Raster, border: Border, depth: number): number[] {
  const { width, height, data } = raster;
  const along = border === 'left' || border === 'right' ? height : width;
  const step = Math.max(1, Math.floor(along / SAMPLES));
  const profile: number[] = [];

  for (let d = 0; d < depth; d++) {
    const readings: number[] = [];
    for (let n = 0; n < along; n += step) {
      const x = border === 'left' ? d : border === 'right' ? width - 1 - d : n;
      const y = border === 'top' ? d : border === 'bottom' ? height - 1 - d : n;
      if (x < 0 || y < 0 || x >= width || y >= height) continue;
      const i = (y * width + x) * 4;
      readings.push(luminance(data[i], data[i + 1], data[i + 2]));
    }
    profile.push(median(readings));
  }
  return profile;
}

/** Full correction at the very edge, none at all by the time the band ends. */
function gainsFor(profile: number[], reference: number, depth: number): number[] {
  const gains: number[] = [];
  for (let d = 0; d < depth; d++) {
    const here = profile[d];
    const wanted = here > 0 ? Math.min(MAX_GAIN, Math.max(1 / MAX_GAIN, reference / here)) : 1;
    const fade = 1 - d / depth;
    gains.push(1 + (wanted - 1) * fade);
  }
  return gains;
}

function applyGains(raster: Raster, border: Border, gains: number[]): void {
  const { width, height, data } = raster;
  const along = border === 'left' || border === 'right' ? height : width;

  for (let d = 0; d < gains.length; d++) {
    const gain = gains[d];
    if (gain === 1) continue;

    for (let n = 0; n < along; n++) {
      const x = border === 'left' ? d : border === 'right' ? width - 1 - d : n;
      const y = border === 'top' ? d : border === 'bottom' ? height - 1 - d : n;
      if (x < 0 || y < 0 || x >= width || y >= height) continue;

      const i = (y * width + x) * 4;
      data[i] *= gain;
      data[i + 1] *= gain;
      data[i + 2] *= gain;
    }
  }
}

function median(values: number[]): number {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[sorted.length >> 1];
}
