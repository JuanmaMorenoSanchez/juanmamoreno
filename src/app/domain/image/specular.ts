import { blur, downscale, sampleBilinear, toLuminance, type Raster } from './raster';

/** The local reading a pixel is compared against comes from a copy this size. */
const LOCAL_LONG_SIDE = 192;
const LOCAL_BLUR = 3;
/** Glare is light bounced off varnish, so it keeps almost none of the paint's colour. */
const MAX_SATURATION = 0.18;
const MIN_BRIGHTNESS = 200;
/** It also has to be brighter than its surroundings, or every pale passage would qualify. */
const MIN_ABOVE_LOCAL = 28;
/** Smaller than this is sensor noise. */
const MIN_SPOT_PIXELS = 6;
/**
 * Larger than this is not a reflection.
 *
 * It is the single most important number here: a highlight is a small hot spot,
 * whereas white paint is a broad region that is also bright and also
 * unsaturated. Judging by size is what keeps the repair off the painting.
 */
const MAX_SPOT_SHARE = 0.004;
/** Glare fades out rather than stopping, so the repair takes a little more than was detected. */
const SKIRT = 2;

export interface SpecularFinding {
  /** One byte per pixel, 1 where glare was found. */
  mask: Uint8Array;
  spots: number;
  /** Share of the painting the repair would touch. */
  coverage: number;
}

interface Component {
  pixels: number[];
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

/**
 * Finds the white flare that varnish and wet oil throw back at the camera.
 *
 * Three things have to be true at once: the pixel is near white, it has lost
 * its colour, and it is markedly brighter than the paint around it. Anything
 * meeting all three but too large to be a reflection is left alone, which is
 * how a passage of white paint survives.
 */
export function findSpecular(raster: Raster): SpecularFinding {
  const { width, height, data } = raster;
  const small = downscale(raster, LOCAL_LONG_SIDE);
  const local = blur(toLuminance(small), small.width, small.height, LOCAL_BLUR);
  const scaleX = small.width / width;
  const scaleY = small.height / height;

  const candidates = new Uint8Array(width * height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const p = y * width + x;
      const i = p * 4;
      const value = Math.max(data[i], data[i + 1], data[i + 2]);
      if (value < MIN_BRIGHTNESS) continue;

      const saturation = (value - Math.min(data[i], data[i + 1], data[i + 2])) / value;
      if (saturation > MAX_SATURATION) continue;

      const around = sampleBilinear(local, small.width, small.height, x * scaleX, y * scaleY);
      if (value >= around + MIN_ABOVE_LOCAL) candidates[p] = 1;
    }
  }

  const largest = Math.max(MIN_SPOT_PIXELS, Math.floor(width * height * MAX_SPOT_SHARE));
  const mask = new Uint8Array(width * height);
  let spots = 0;
  for (const component of componentsOf(candidates, width, height)) {
    if (component.pixels.length < MIN_SPOT_PIXELS || component.pixels.length > largest) continue;
    for (const p of component.pixels) mask[p] = 1;
    spots++;
  }

  const grown = spots ? dilate(mask, width, height, SKIRT) : mask;
  let covered = 0;
  for (const flag of grown) covered += flag;

  return { mask: grown, spots, coverage: covered / (width * height) };
}

/**
 * Fills each spot from the paint that surrounds it, in place.
 *
 * The values inside a spot are solved so that every one of them is the average
 * of its neighbours, which is the smoothest surface that meets the paint
 * exactly at the edge of the hole. That is what makes the repair invisible:
 * the seam cannot show, because there is no step at the boundary to show.
 * The colour and the modelling come back; the brushmark that was buried under
 * the flare does not, since nothing in the photograph still records it.
 */
export function repairSpecular(raster: Raster, finding: SpecularFinding): void {
  if (!finding.spots) return;

  const { width, height, data } = raster;
  for (const component of componentsOf(finding.mask, width, height)) {
    const pad = 4;
    const minX = Math.max(0, component.minX - pad);
    const maxX = Math.min(width - 1, component.maxX + pad);
    const minY = Math.max(0, component.minY - pad);
    const maxY = Math.min(height - 1, component.maxY + pad);

    seed(data, finding.mask, width, component, minX, maxX, minY, maxY);

    const rounds = Math.min(400, Math.max(40, 6 * Math.max(maxX - minX, maxY - minY)));
    for (let round = 0; round < rounds; round++) {
      for (const p of component.pixels) {
        const x = p % width;
        const y = (p / width) | 0;
        const left = (y * width + Math.max(minX, x - 1)) * 4;
        const right = (y * width + Math.min(maxX, x + 1)) * 4;
        const up = (Math.max(minY, y - 1) * width + x) * 4;
        const down = (Math.min(maxY, y + 1) * width + x) * 4;
        const i = p * 4;
        for (let channel = 0; channel < 3; channel++) {
          data[i + channel] =
            (data[left + channel] +
              data[right + channel] +
              data[up + channel] +
              data[down + channel]) /
            4;
        }
      }
    }
  }
}

/** Starts every hole at the average of the paint around it, so the solve settles quickly. */
function seed(
  data: Uint8ClampedArray<ArrayBuffer>,
  mask: Uint8Array,
  width: number,
  component: Component,
  minX: number,
  maxX: number,
  minY: number,
  maxY: number
): void {
  let r = 0;
  let g = 0;
  let b = 0;
  let n = 0;
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const p = y * width + x;
      if (mask[p]) continue;
      const i = p * 4;
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
      n++;
    }
  }
  if (!n) return;

  for (const p of component.pixels) {
    const i = p * 4;
    data[i] = r / n;
    data[i + 1] = g / n;
    data[i + 2] = b / n;
  }
}

/** Eight-connected, with an explicit stack: a spot can be long enough to overflow recursion. */
function componentsOf(mask: Uint8Array, width: number, height: number): Component[] {
  const seen = new Uint8Array(mask.length);
  const found: Component[] = [];

  for (let start = 0; start < mask.length; start++) {
    if (!mask[start] || seen[start]) continue;

    const pixels: number[] = [];
    const stack = [start];
    seen[start] = 1;
    let minX = width;
    let maxX = 0;
    let minY = height;
    let maxY = 0;

    while (stack.length) {
      const p = stack.pop() as number;
      const x = p % width;
      const y = (p / width) | 0;
      pixels.push(p);
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;

      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
          const q = ny * width + nx;
          if (mask[q] && !seen[q]) {
            seen[q] = 1;
            stack.push(q);
          }
        }
      }
    }
    found.push({ pixels, minX, maxX, minY, maxY });
  }
  return found;
}

function dilate(mask: Uint8Array, width: number, height: number, radius: number): Uint8Array {
  const out = new Uint8Array(mask.length);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (!mask[y * width + x]) continue;
      for (let dy = -radius; dy <= radius; dy++) {
        const ny = y + dy;
        if (ny < 0 || ny >= height) continue;
        for (let dx = -radius; dx <= radius; dx++) {
          const nx = x + dx;
          if (nx < 0 || nx >= width) continue;
          if (dx * dx + dy * dy <= radius * radius) out[ny * width + nx] = 1;
        }
      }
    }
  }
  return out;
}
