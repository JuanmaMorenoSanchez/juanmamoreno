import { createRaster, type Raster, type Size } from './raster';
import { distance, type Quad } from './quad';

/** Below this the warp is shrinking enough that point sampling would alias, so soften first. */
const PREFILTER_BELOW = 0.8;

/**
 * The eight coefficients taking a point in the corrected image to the point in
 * the photograph it came from.
 *
 * Solved in that direction on purpose. Filling the result means asking, for
 * every one of its pixels, where to read from — going the other way would
 * scatter source pixels across the output and leave holes between them.
 */
export function solveHomography(from: Quad, to: Quad): Float64Array {
  const matrix: number[][] = [];
  const targets: number[] = [];

  for (let i = 0; i < 4; i++) {
    const { x: u, y: v } = from[i];
    const { x, y } = to[i];
    matrix.push([u, v, 1, 0, 0, 0, -u * x, -v * x]);
    targets.push(x);
    matrix.push([0, 0, 0, u, v, 1, -u * y, -v * y]);
    targets.push(y);
  }

  return solve(matrix, targets);
}

/**
 * Straightens the photographed painting into a rectangle of the given size.
 *
 * Catmull-Rom rather than bilinear: the result is a reproduction of a painting,
 * where a bilinear average visibly softens the brushwork it exists to record.
 */
export function warpPerspective(source: Raster, quad: Quad, size: Size): Raster {
  const { width, height } = size;
  const destination: Quad = [
    { x: 0, y: 0 },
    { x: width, y: 0 },
    { x: width, y: height },
    { x: 0, y: height },
  ];

  const sampled = prefilter(source, quad, size);
  const h = solveHomography(destination, quad);
  const out = createRaster(width, height);

  for (let v = 0; v < height; v++) {
    const cy = v + 0.5;
    for (let u = 0; u < width; u++) {
      const cx = u + 0.5;
      const w = h[6] * cx + h[7] * cy + 1;
      const x = (h[0] * cx + h[1] * cy + h[2]) / w;
      const y = (h[3] * cx + h[4] * cy + h[5]) / w;
      sampleCubic(sampled, x - 0.5, y - 0.5, out.data, (v * width + u) * 4);
    }
  }
  return out;
}

/**
 * A photograph is only ever shrunk into the corrected rectangle, never
 * stretched — but if the painting's real proportions differ much from the
 * proportions it was photographed at, one axis shrinks noticeably, and
 * sampling a canvas weave at less than one pixel per thread produces moire.
 * A blur matched to the shrink is what stops that.
 */
function prefilter(source: Raster, quad: Quad, size: Size): Raster {
  const [tl, tr, br, bl] = quad;
  const widest = Math.max(distance(tl, tr), distance(bl, br));
  const tallest = Math.max(distance(tl, bl), distance(tr, br));
  const scale = Math.min(size.width / widest, size.height / tallest);
  if (!isFinite(scale) || scale >= PREFILTER_BELOW) return source;

  return blurRgb(source, 0.5 / scale);
}

function blurRgb(source: Raster, sigma: number): Raster {
  const radius = Math.max(1, Math.ceil(sigma * 2));
  const kernel = new Float32Array(radius * 2 + 1);
  let total = 0;
  for (let k = -radius; k <= radius; k++) {
    const weight = Math.exp(-(k * k) / (2 * sigma * sigma));
    kernel[k + radius] = weight;
    total += weight;
  }
  for (let k = 0; k < kernel.length; k++) kernel[k] /= total;

  const { width, height } = source;
  const pass = createRaster(width, height);
  const out = createRaster(width, height);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let r = 0;
      let g = 0;
      let b = 0;
      for (let k = -radius; k <= radius; k++) {
        const i = (y * width + Math.min(width - 1, Math.max(0, x + k))) * 4;
        const weight = kernel[k + radius];
        r += source.data[i] * weight;
        g += source.data[i + 1] * weight;
        b += source.data[i + 2] * weight;
      }
      const o = (y * width + x) * 4;
      pass.data[o] = r;
      pass.data[o + 1] = g;
      pass.data[o + 2] = b;
      pass.data[o + 3] = 255;
    }
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let r = 0;
      let g = 0;
      let b = 0;
      for (let k = -radius; k <= radius; k++) {
        const i = (Math.min(height - 1, Math.max(0, y + k)) * width + x) * 4;
        const weight = kernel[k + radius];
        r += pass.data[i] * weight;
        g += pass.data[i + 1] * weight;
        b += pass.data[i + 2] * weight;
      }
      const o = (y * width + x) * 4;
      out.data[o] = r;
      out.data[o + 1] = g;
      out.data[o + 2] = b;
      out.data[o + 3] = 255;
    }
  }
  return out;
}

function catmullRom(t: number): [number, number, number, number] {
  const t2 = t * t;
  const t3 = t2 * t;
  return [
    -0.5 * t3 + t2 - 0.5 * t,
    1.5 * t3 - 2.5 * t2 + 1,
    -1.5 * t3 + 2 * t2 + 0.5 * t,
    0.5 * t3 - 0.5 * t2,
  ];
}

function sampleCubic(
  source: Raster,
  x: number,
  y: number,
  target: Uint8ClampedArray<ArrayBuffer>,
  offset: number
): void {
  const { width, height, data } = source;
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const wx = catmullRom(x - x0);
  const wy = catmullRom(y - y0);

  let r = 0;
  let g = 0;
  let b = 0;
  for (let j = 0; j < 4; j++) {
    const sy = Math.min(height - 1, Math.max(0, y0 - 1 + j));
    for (let i = 0; i < 4; i++) {
      const sx = Math.min(width - 1, Math.max(0, x0 - 1 + i));
      const weight = wx[i] * wy[j];
      const p = (sy * width + sx) * 4;
      r += data[p] * weight;
      g += data[p + 1] * weight;
      b += data[p + 2] * weight;
    }
  }

  target[offset] = r;
  target[offset + 1] = g;
  target[offset + 2] = b;
  target[offset + 3] = 255;
}

/** Gaussian elimination with partial pivoting. Eight unknowns; nothing cleverer is warranted. */
function solve(matrix: number[][], targets: number[]): Float64Array {
  const n = targets.length;
  const rows = matrix.map((row, i) => [...row, targets[i]]);

  for (let column = 0; column < n; column++) {
    let pivot = column;
    for (let row = column + 1; row < n; row++) {
      if (Math.abs(rows[row][column]) > Math.abs(rows[pivot][column])) pivot = row;
    }
    [rows[column], rows[pivot]] = [rows[pivot], rows[column]];

    const divisor = rows[column][column];
    if (Math.abs(divisor) < 1e-12) continue;

    for (let row = 0; row < n; row++) {
      if (row === column) continue;
      const factor = rows[row][column] / divisor;
      for (let k = column; k <= n; k++) rows[row][k] -= factor * rows[column][k];
    }
  }

  const solution = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    const divisor = rows[i][i];
    solution[i] = Math.abs(divisor) < 1e-12 ? 0 : rows[i][n] / divisor;
  }
  return solution;
}
