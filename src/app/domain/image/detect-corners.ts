import { blur, downscale, toLuminance, type Raster } from './raster';
import {
  fullFrame,
  isConvex,
  orderCorners,
  quadArea,
  scaleQuad,
  type Point,
  type Quad,
} from './quad';

/** Detection runs on a copy this big. Large enough to hold the edges, small enough to be quick. */
const DETECTION_LONG_SIDE = 720;
/** Brushwork and canvas weave are edges too; this softens them below the painting's own outline. */
const DETECTION_BLUR = 1.5;
/** Only the strongest gradients vote, which on a photograph of a painting means its boundary. */
const EDGE_PERCENTILE = 0.92;
/**
 * A floor under that, as a share of the strongest edge in the picture.
 *
 * A percentile alone fails at both ends: on a photograph against a plain wall
 * almost every pixel is flat, so the ninety-second of them is still zero and
 * nothing votes at all, while on a densely worked painting it sits low enough
 * to let the brushwork in. The strongest edge present is the honest yardstick.
 */
const EDGE_FLOOR_SHARE = 0.15;
const THETA_BINS = 180;
/** Bins run from here upwards, so neither family of edges straddles the ends of the array. */
const THETA_FLOOR_DEGREES = -45;
const MAX_PEAKS = 30;
/** Opposite sides of a rectangle stay nearly parallel unless the camera was somewhere absurd. */
const MAX_OPPOSITE_TILT_DEGREES = 25;
/** Two edges closer than this are the two flanks of one line, not two sides of a painting. */
const MIN_SEPARATION = 0.3;
/** How many candidate outlines to try before giving up and handing back the frame. */
const MAX_CANDIDATES = 4;
const MIN_AREA_SHARE = 0.12;
/** A corner may sit a little outside the frame: a painting shot tight still has findable edges. */
const CORNER_SLACK = 0.15;

interface Line {
  /** Radians, measured on the normal, so that x*cos(theta) + y*sin(theta) = rho. */
  theta: number;
  rho: number;
  votes: number;
}

export interface QuadDetection {
  quad: Quad;
  /** False when the edges were not found and the whole frame was handed back instead. */
  detected: boolean;
}

/**
 * Finds the painting's outline in a photograph of it.
 *
 * A painting is a rectangle, so in the photograph it is four long straight
 * lines. That is what a Hough transform is for: every edge pixel votes for the
 * line it might lie on, and a real edge collects far more votes than the wall
 * behind or the brushwork inside. Intersecting an upright pair with a level
 * pair then gives the corners, including a corner that falls outside the
 * photograph, which chasing the outline as a contour could never do.
 *
 * Of the strong lines it is the *outermost* pair that bounds the painting, not
 * the most voted one. A composition often has a longer, higher-contrast line
 * running through the middle of it — a horizon, the edge of a large dark shape
 * — than the painting's own rim against the wall, and picking by votes walks
 * straight into it. Outermost first, then the next widest, until one of them
 * makes a shape a photographed rectangle could actually have.
 */
export function detectQuad(source: Raster): QuadDetection {
  const small = downscale(source, DETECTION_LONG_SIDE);
  const scale = source.width / small.width;
  const lines = findLines(small);

  const sides = lines.filter((line) => Math.abs(inDegrees(line.theta)) < 45);
  const rails = lines.filter((line) => Math.abs(inDegrees(line.theta)) >= 45);

  for (const sidePair of widestPairs(sides, small.width * MIN_SEPARATION)) {
    for (const railPair of widestPairs(rails, small.height * MIN_SEPARATION)) {
      const corners = [
        intersect(sidePair[0], railPair[0]),
        intersect(sidePair[1], railPair[0]),
        intersect(sidePair[1], railPair[1]),
        intersect(sidePair[0], railPair[1]),
      ].filter((corner): corner is Point => corner !== null);
      if (corners.length !== 4) continue;

      const quad = orderCorners(corners);
      if (isPlausible(quad, small)) return { quad: scaleQuad(quad, scale), detected: true };
    }
  }

  return { quad: fullFrame(source), detected: false };
}

function findLines(raster: Raster): Line[] {
  const { width, height } = raster;
  const gray = blur(toLuminance(raster), width, height, DETECTION_BLUR);
  const magnitude = new Float32Array(width * height);
  const angle = new Float32Array(width * height);

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const i = y * width + x;
      const gx =
        gray[i - width + 1] +
        2 * gray[i + 1] +
        gray[i + width + 1] -
        gray[i - width - 1] -
        2 * gray[i - 1] -
        gray[i + width - 1];
      const gy =
        gray[i + width - 1] +
        2 * gray[i + width] +
        gray[i + width + 1] -
        gray[i - width - 1] -
        2 * gray[i - width] -
        gray[i - width + 1];
      magnitude[i] = Math.hypot(gx, gy);
      angle[i] = Math.atan2(gy, gx);
    }
  }

  const [common, strongest] = percentiles(magnitude, [EDGE_PERCENTILE, 0.999]);
  const threshold = Math.max(common, strongest * EDGE_FLOOR_SHARE);
  if (threshold <= 0) return [];

  return vote(thin(magnitude, angle, width, height, threshold), angle, width, height);
}

/**
 * Non-maximum suppression: keeps only the ridge of each edge.
 *
 * A soft edge is several pixels wide, and every one of them would vote for a
 * slightly different line, smearing the peak this whole method depends on
 * being sharp.
 */
function thin(
  magnitude: Float32Array,
  angle: Float32Array,
  width: number,
  height: number,
  threshold: number
): Float32Array {
  const kept = new Float32Array(magnitude.length);
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const i = y * width + x;
      const strength = magnitude[i];
      if (strength < threshold) continue;

      const direction = ((Math.round(angle[i] / (Math.PI / 4)) % 4) + 4) % 4;
      const step = [1, width + 1, width, width - 1][direction];
      if (strength >= magnitude[i - step] && strength >= magnitude[i + step]) kept[i] = strength;
    }
  }
  return kept;
}

function vote(magnitude: Float32Array, angle: Float32Array, width: number, height: number): Line[] {
  const rhoMax = Math.ceil(Math.hypot(width, height));
  const rhoBins = rhoMax * 2 + 1;
  const accumulator = new Float32Array(THETA_BINS * rhoBins);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = y * width + x;
      const strength = magnitude[i];
      if (strength === 0) continue;

      // The gradient points across the edge, so it is the line's own normal:
      // one candidate angle per pixel, rather than sweeping all of them.
      const centre = binOf(angle[i]);
      for (let offset = -1; offset <= 1; offset++) {
        const bin = centre + offset;
        if (bin < 0 || bin >= THETA_BINS) continue;

        const theta = thetaOf(bin);
        const rho = Math.round(x * Math.cos(theta) + y * Math.sin(theta)) + rhoMax;
        if (rho >= 0 && rho < rhoBins) accumulator[bin * rhoBins + rho] += strength;
      }
    }
  }

  return peaks(accumulator, rhoBins, rhoMax);
}

/** Folds a gradient direction into the half turn of distinct line angles, then into a bin. */
function binOf(gradient: number): number {
  let theta = gradient;
  while (theta < 0) theta += Math.PI;
  while (theta >= Math.PI) theta -= Math.PI;

  let degree = inDegrees(theta);
  if (degree >= THETA_FLOOR_DEGREES + 180) degree -= 180;
  return Math.min(THETA_BINS - 1, Math.max(0, Math.round(degree - THETA_FLOOR_DEGREES)));
}

function thetaOf(bin: number): number {
  return ((bin + THETA_FLOOR_DEGREES) * Math.PI) / 180;
}

function inDegrees(radians: number): number {
  return (radians * 180) / Math.PI;
}

function peaks(accumulator: Float32Array, rhoBins: number, rhoMax: number): Line[] {
  const found: Line[] = [];
  const suppressRho = Math.max(4, Math.round(rhoBins * 0.02));
  const suppressTheta = 10;
  const working = Float32Array.from(accumulator);

  for (let n = 0; n < MAX_PEAKS; n++) {
    let best = 0;
    let bestIndex = -1;
    for (let i = 0; i < working.length; i++) {
      if (working[i] > best) {
        best = working[i];
        bestIndex = i;
      }
    }
    if (bestIndex < 0) break;
    if (found.length && best < found[0].votes * 0.25) break;

    const bin = Math.floor(bestIndex / rhoBins);
    const rho = bestIndex % rhoBins;
    found.push({ theta: thetaOf(bin), rho: rho - rhoMax, votes: best });

    const firstBin = Math.max(0, bin - suppressTheta);
    const lastBin = Math.min(THETA_BINS - 1, bin + suppressTheta);
    for (let t = firstBin; t <= lastBin; t++) {
      const first = Math.max(0, rho - suppressRho);
      const last = Math.min(rhoBins - 1, rho + suppressRho);
      for (let r = first; r <= last; r++) working[t * rhoBins + r] = 0;
    }
  }
  return found;
}

/**
 * Pairs of a family that could be opposite edges, widest apart first.
 *
 * Every line here already cleared the strength cut in {@link peaks}, so the
 * question is no longer which is strongest but which encloses the rest. Ties
 * on separation go to the better supported pair.
 */
function widestPairs(lines: Line[], minSeparation: number): [Line, Line][] {
  const pairs: { pair: [Line, Line]; separation: number; votes: number }[] = [];

  for (let i = 0; i < lines.length; i++) {
    for (let j = i + 1; j < lines.length; j++) {
      const tilt = Math.abs(inDegrees(lines[i].theta - lines[j].theta));
      if (tilt > MAX_OPPOSITE_TILT_DEGREES) continue;

      const separation = Math.abs(lines[i].rho - lines[j].rho);
      if (separation < minSeparation) continue;

      pairs.push({
        pair: [lines[i], lines[j]],
        separation,
        votes: lines[i].votes + lines[j].votes,
      });
    }
  }

  return pairs
    .sort((a, b) => b.separation - a.separation || b.votes - a.votes)
    .slice(0, MAX_CANDIDATES)
    .map((entry) => entry.pair);
}

function intersect(a: Line, b: Line): Point | null {
  const determinant = Math.cos(a.theta) * Math.sin(b.theta) - Math.sin(a.theta) * Math.cos(b.theta);
  if (Math.abs(determinant) < 1e-6) return null;

  return {
    x: (a.rho * Math.sin(b.theta) - b.rho * Math.sin(a.theta)) / determinant,
    y: (b.rho * Math.cos(a.theta) - a.rho * Math.cos(b.theta)) / determinant,
  };
}

function isPlausible(quad: Quad, { width, height }: Raster): boolean {
  const inFrame = quad.every(
    (corner) =>
      corner.x > -width * CORNER_SLACK &&
      corner.x < width * (1 + CORNER_SLACK) &&
      corner.y > -height * CORNER_SLACK &&
      corner.y < height * (1 + CORNER_SLACK)
  );
  return inFrame && isConvex(quad) && quadArea(quad) >= width * height * MIN_AREA_SHARE;
}

/** Histogram based, so several thresholds cost one pass rather than a sort of every pixel. */
function percentiles(values: Float32Array, fractions: number[]): number[] {
  let max = 0;
  for (const value of values) if (value > max) max = value;
  if (max <= 0) return fractions.map(() => 0);

  const buckets = new Int32Array(256);
  for (const value of values) buckets[Math.min(255, Math.floor((value / max) * 255))]++;

  return fractions.map((fraction) => {
    const target = values.length * fraction;
    let seen = 0;
    for (let bucket = 0; bucket < 256; bucket++) {
      seen += buckets[bucket];
      if (seen >= target) return (bucket / 255) * max;
    }
    return max;
  });
}
