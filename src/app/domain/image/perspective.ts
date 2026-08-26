import { createRaster, type Raster, type Size } from './raster';
import {
  bezierAt,
  bowsAreStraight,
  distance,
  EDGE_CORNERS,
  straightBows,
  type EdgeBows,
  type Point,
  type Quad,
} from './quad';
import { solveLinearSystem } from './linear';

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

  return solveLinearSystem(matrix, targets);
}

/**
 * Straightens the photographed painting into a rectangle of the given size.
 *
 * Catmull-Rom rather than bilinear: the result is a reproduction of a painting,
 * where a bilinear average visibly softens the brushwork it exists to record.
 *
 * The homography does the perspective. It is the right model for a flat thing
 * seen at an angle and nothing replaces it — in particular not a patch fitted
 * to the four sides, which interpolates evenly between them and so loses the
 * foreshortening that makes the far edge of a leaning canvas shorter than the
 * near one. When the sides are bowed, that bow is carried on top of it as a
 * displacement: each side's departure from its own straight chord, faded across
 * the picture so the two facing sides share the interior between them. Every
 * departure is zero at a corner, which is what keeps the corners exactly where
 * the homography put them.
 */
export function warpPerspective(
  source: Raster,
  quad: Quad,
  size: Size,
  bows?: EdgeBows
): Raster {
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
  // Straight sides displace nothing, so the arithmetic is skipped rather than
  // run to produce zeroes: this is the common case and the loop is per pixel.
  const bow = bows && !bowsAreStraight(quad, bows) ? bowDisplacement(quad, bows) : null;

  for (let v = 0; v < height; v++) {
    const cy = v + 0.5;
    for (let u = 0; u < width; u++) {
      const cx = u + 0.5;
      const w = h[6] * cx + h[7] * cy + 1;
      let x = (h[0] * cx + h[1] * cy + h[2]) / w;
      let y = (h[3] * cx + h[4] * cy + h[5]) / w;
      if (bow) {
        const shift = bow(cx / width, cy / height);
        x += shift.x;
        y += shift.y;
      }
      sampleCubic(sampled, x - 0.5, y - 0.5, out.data, (v * width + u) * 4);
    }
  }
  return out;
}

/**
 * How far to move the point the homography chose, for a position across the
 * corrected rectangle.
 *
 * Each side contributes what it departs from its own chord at the matching
 * parameter, weighted by how near that side is. The corner terms a Coons patch
 * would subtract are not needed here: a departure is zero at both ends of every
 * side, so the four contributions already vanish at the corners.
 */
function bowDisplacement(quad: Quad, bows: EdgeBows): (u: number, v: number) => Point {
  const chord = straightBows(quad);

  const departure = (edge: keyof EdgeBows, t: number): Point => {
    const [from, to] = EDGE_CORNERS[edge];
    const curved = bezierAt(quad[from], bows[edge][0], bows[edge][1], quad[to], t);
    const straight = bezierAt(quad[from], chord[edge][0], chord[edge][1], quad[to], t);
    return { x: curved.x - straight.x, y: curved.y - straight.y };
  };

  return (u, v) => {
    const top = departure('top', u);
    const bottom = departure('bottom', u);
    const left = departure('left', v);
    const right = departure('right', v);
    return {
      x: (1 - v) * top.x + v * bottom.x + (1 - u) * left.x + u * right.x,
      y: (1 - v) * top.y + v * bottom.y + (1 - u) * left.y + u * right.y,
    };
  };
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
