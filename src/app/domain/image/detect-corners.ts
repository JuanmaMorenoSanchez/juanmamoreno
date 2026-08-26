import { blur, downscale, toLuminance, type Raster } from './raster';
import { fullFrame, isConvex, orderCorners, quadArea, type Point, type Quad } from './quad';

/** Detection runs on a copy this big. The outline of a painting is a coarse thing. */
const DETECTION_LONG_SIDE = 480;
/** The band around the photograph taken to be wall, for the purpose of learning its colour. */
const WALL_BAND = 0.03;
/** A pixel this far off the wall colour is something else. Floored, so a clean wall stays quiet. */
const MIN_COLOUR_DISTANCE = 14;
const COLOUR_SPREAD_MULTIPLE = 4;
/** The same for texture: paint carries detail, a wall does not. */
const MIN_ACTIVITY = 3;
/** Kept small on purpose — see {@link activity}. */
const ACTIVITY_POOL = 1;
const ACTIVITY_SPREAD_MULTIPLE = 4;
/** Below this the mask found nothing worth calling a painting. */
const MIN_COVERAGE = 0.05;
/** Above this the painting runs past every edge, and the whole frame is the honest answer. */
const FILLS_FRAME = 0.97;
/** Corners are where two edges bend, so each is fitted on its straight middle and not its ends. */
const EDGE_MARGIN = 0.15;
/** Fewer points than this along a side is not enough to call it a line. */
const MIN_EDGE_POINTS = 8;
/** Candidate lines tried when looking for the one the most points agree with. */
const CONSENSUS_TRIES = 40;
/** How near a point must fall to count as agreeing, as a share of the side's length. */
const CONSENSUS_TOLERANCE = 0.008;
const MIN_CONSENSUS_TOLERANCE = 2;
/** How far either side of the rough edge the sharp pass looks, as a share of the short side. */
const REFINE_BAND = 0.03;
/** Places sampled along each side when refining it. */
const REFINE_SAMPLES = 240;
/** A step smaller than this is not a boundary, just paint that happens to resemble the wall. */
const MIN_EDGE_STEP = 20;
/** With fewer than this share of its samples resolved, a side keeps its rough fit. */
const MIN_REFINED_SHARE = 0.3;
const MIN_AREA_SHARE = 0.12;
/** A corner may sit a little outside the frame: a painting shot tight still has findable edges. */
const CORNER_SLACK = 0.15;

export interface QuadDetection {
  quad: Quad;
  /** False when the edges were not found and the whole frame was handed back instead. */
  detected: boolean;
}

/** One side of the silhouette, held as whichever of x(y) or y(x) stays well conditioned. */
interface Fit {
  slope: number;
  intercept: number;
}

/** The four sides: left and right as x(y), top and bottom as y(x). */
interface Edges {
  left: Fit;
  right: Fit;
  top: Fit;
  bottom: Fit;
}

type Wall = [number, number, number];

/**
 * Finds the painting's outline in a photograph of it.
 *
 * Not by looking for edges. The line between a painting and the wall behind it
 * is often the faintest one in the picture — a dark canvas on a dark wall
 * barely registers — while the boldest is usually a horizon, or the rim of
 * some large shape inside the composition. Hunting for strong straight lines
 * finds those instead, and finds them confidently.
 *
 * What actually separates the painting from the wall is that the wall is one
 * flat colour and the painting is not. So the wall's colour is read off the
 * border of the photograph, everything unlike it is marked — either in colour,
 * or in carrying any texture at all — and the four sides of that silhouette
 * are fitted as straight lines. Intersecting them gives the corners, including
 * a corner outside the frame, and nothing inside the painting can mislead it,
 * because nothing inside the painting is ever consulted.
 */
export function detectQuad(source: Raster): QuadDetection {
  const small = downscale(source, DETECTION_LONG_SIDE);
  const scale = source.width / small.width;
  const { width, height } = small;

  const wall = wallColour(small);
  const region = largestRegion(silhouette(small, wall), width, height);
  if (!region) return { quad: fullFrame(source), detected: false };

  const coverage = region.count / (width * height);
  if (coverage < MIN_COVERAGE) return { quad: fullFrame(source), detected: false };
  if (coverage > FILLS_FRAME) return { quad: fullFrame(source), detected: true };

  const rough = edgesOf(region, width, height);
  if (!rough) return { quad: fullFrame(source), detected: false };

  const quad = cornersFrom(sharpen(source, enlarge(rough, scale), region, scale, wall));
  if (!quad || !isPlausible(quad, source)) return { quad: fullFrame(source), detected: false };

  return { quad, detected: true };
}

/**
 * Moves each side onto the actual boundary, at the photograph's own resolution.
 *
 * The silhouette sits a little proud of the painting. Texture is measured by
 * comparing a pixel against a blurred copy of its surroundings, and the rim of
 * the painting is a step, which answers loudly on both sides of itself; the
 * mask therefore reaches out into the wall, and at detection scale a few
 * pixels of reach is a few tens of them in the photograph.
 *
 * So the rough sides only say where to look. Across each of them the colour
 * runs from wall to painting, and the boundary is where it crosses the halfway
 * mark, a position that owes nothing to any blur and is read off the full-size
 * pixels. Where a side is too near the wall in colour to give a reading the
 * samples are dropped, and a side that loses too many keeps its rough fit.
 */
function sharpen(source: Raster, rough: Edges, region: Region, scale: number, wall: Wall): Edges {
  const band = Math.max(12, Math.round(Math.min(source.width, source.height) * REFINE_BAND));
  const inset = (low: number, high: number) => {
    const margin = (high - low) * EDGE_MARGIN;
    return [(low + margin) * scale, (high - margin) * scale] as const;
  };
  const [top, bottom] = inset(region.minY, region.maxY);
  const [left, right] = inset(region.minX, region.maxX);

  return {
    left: alongSide(source, wall, rough.left, top, bottom, band, true, -1) ?? rough.left,
    right: alongSide(source, wall, rough.right, top, bottom, band, true, 1) ?? rough.right,
    top: alongSide(source, wall, rough.top, left, right, band, false, -1) ?? rough.top,
    bottom: alongSide(source, wall, rough.bottom, left, right, band, false, 1) ?? rough.bottom,
  };
}

/** Walks across one side at many places along it, and refits it to where the wall stops. */
function alongSide(
  source: Raster,
  wall: Wall,
  rough: Fit,
  from: number,
  to: number,
  band: number,
  upright: boolean,
  outward: number
): Fit | null {
  const step = Math.max(1, Math.round((to - from) / REFINE_SAMPLES));
  const points: Point[] = [];
  let tried = 0;

  for (let along = from; along <= to; along += step) {
    tried++;
    const across = rough.slope * along + rough.intercept;
    const found = boundaryAcross(source, wall, along, across, band, upright, outward);
    if (found === null) continue;
    points.push(upright ? { x: found, y: along } : { x: along, y: found });
  }

  if (!tried || points.length < tried * MIN_REFINED_SHARE) return null;
  return fitLine(points, upright);
}

/**
 * Where, along one crossing of a side, the wall gives way to the painting.
 *
 * Reads from outside inwards, takes the settled level at each end, and returns
 * the first place the reading passes halfway between them.
 */
function boundaryAcross(
  source: Raster,
  wall: Wall,
  along: number,
  across: number,
  band: number,
  upright: boolean,
  outward: number
): number | null {
  const count = band * 2 + 1;
  const readings = new Float64Array(count);
  for (let k = 0; k < count; k++) {
    const at = across + outward * (band - k);
    readings[k] = distanceAt(source, wall, upright ? at : along, upright ? along : at);
  }

  const quarter = Math.max(2, count >> 2);
  const outside = middleOf(readings, 0, quarter);
  const inside = middleOf(readings, count - quarter, count);
  if (inside - outside < MIN_EDGE_STEP) return null;

  const halfway = (outside + inside) / 2;
  for (let k = 0; k < count; k++) {
    if (readings[k] >= halfway) return across + outward * (band - k);
  }
  return null;
}

function distanceAt(source: Raster, wall: Wall, x: number, y: number): number {
  const px = Math.min(source.width - 1, Math.max(0, Math.round(x)));
  const py = Math.min(source.height - 1, Math.max(0, Math.round(y)));
  const i = (py * source.width + px) * 4;
  return colourDistance(source.data[i], source.data[i + 1], source.data[i + 2], wall);
}

function middleOf(values: Float64Array, from: number, to: number): number {
  const slice = Array.from(values.slice(from, to)).sort((a, b) => a - b);
  return slice[slice.length >> 1];
}

/** The detection copy's sides, restated in the photograph's own pixels. */
function enlarge(edges: Edges, scale: number): Edges {
  const grow = ({ slope, intercept }: Fit): Fit => ({ slope, intercept: intercept * scale });
  return {
    left: grow(edges.left),
    right: grow(edges.right),
    top: grow(edges.top),
    bottom: grow(edges.bottom),
  };
}

function cornersFrom(edges: Edges): Quad | null {
  const corners = [
    meet(edges.left, edges.top),
    meet(edges.right, edges.top),
    meet(edges.right, edges.bottom),
    meet(edges.left, edges.bottom),
  ].filter((corner): corner is Point => corner !== null);

  return corners.length === 4 ? orderCorners(corners) : null;
}

/** Everything that is not the wall: a different colour from it, or carrying any detail at all. */
function silhouette(raster: Raster, wall: Wall): Uint8Array {
  const { width, height, data } = raster;
  const detail = activity(raster);

  const wallDistances: number[] = [];
  const wallDetail: number[] = [];
  eachBorderPixel(width, height, (p) => {
    const i = p * 4;
    wallDistances.push(colourDistance(data[i], data[i + 1], data[i + 2], wall));
    wallDetail.push(detail[p]);
  });

  const colourCut = Math.max(MIN_COLOUR_DISTANCE, COLOUR_SPREAD_MULTIPLE * median(wallDistances));
  const detailCut = Math.max(MIN_ACTIVITY, ACTIVITY_SPREAD_MULTIPLE * median(wallDetail));

  const mask = new Uint8Array(width * height);
  for (let p = 0; p < mask.length; p++) {
    const i = p * 4;
    const unlike = colourDistance(data[i], data[i + 1], data[i + 2], wall) > colourCut;
    mask[p] = unlike || detail[p] > detailCut ? 1 : 0;
  }
  return mask;
}

/**
 * The colour of the wall, read from a band around the edge of the photograph.
 *
 * The median rather than the average, so whatever else falls in that band — a
 * corner of the painting, a shadow, a socket — cannot drag it.
 */
function wallColour({ width, height, data }: Raster): Wall {
  const reds: number[] = [];
  const greens: number[] = [];
  const blues: number[] = [];
  eachBorderPixel(width, height, (p) => {
    const i = p * 4;
    reds.push(data[i]);
    greens.push(data[i + 1]);
    blues.push(data[i + 2]);
  });
  return [median(reds), median(greens), median(blues)];
}

function eachBorderPixel(width: number, height: number, visit: (p: number) => void): void {
  const band = Math.max(2, Math.round(Math.min(width, height) * WALL_BAND));
  for (let y = 0; y < height; y++) {
    const withinBand = y < band || y >= height - band;
    for (let x = 0; x < width; x++) {
      if (withinBand || x < band || x >= width - band) visit(y * width + x);
    }
  }
}

function colourDistance(r: number, g: number, b: number, wall: Wall): number {
  return Math.abs(r - wall[0]) + Math.abs(g - wall[1]) + Math.abs(b - wall[2]);
}

/**
 * How much detail sits at each pixel: the picture, less a blurred copy of itself.
 *
 * Pooled only just enough to survive a smooth patch of paint. Pooling wider
 * would be steadier, but the painting's own rim is a step edge and answers
 * loudly, so every pixel of blur carries that answer out into the wall and
 * moves the silhouette outwards by the same amount.
 */
function activity(raster: Raster): Float32Array {
  const { width, height } = raster;
  const gray = toLuminance(raster);
  const smooth = blur(gray, width, height, 2);
  const detail = new Float32Array(gray.length);
  for (let p = 0; p < gray.length; p++) detail[p] = Math.abs(gray[p] - smooth[p]);
  return blur(detail, width, height, ACTIVITY_POOL);
}

interface Region {
  /** Holes closed, so a flat passage of paint counts as inside the painting. */
  mask: Uint8Array;
  count: number;
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

/** The largest connected patch of not-wall, with the gaps inside it closed. */
function largestRegion(mask: Uint8Array, width: number, height: number): Region | null {
  const seen = new Uint8Array(mask.length);
  let best: number[] | null = null;

  for (let start = 0; start < mask.length; start++) {
    if (!mask[start] || seen[start]) continue;

    const pixels: number[] = [];
    const stack = [start];
    seen[start] = 1;
    while (stack.length) {
      const p = stack.pop() as number;
      pixels.push(p);
      const x = p % width;
      const y = (p / width) | 0;
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
    if (!best || pixels.length > best.length) best = pixels;
  }
  if (!best) return null;

  const solid = new Uint8Array(mask.length);
  for (const p of best) solid[p] = 1;
  fillHoles(solid, width, height);

  let count = 0;
  let minX = width;
  let maxX = -1;
  let minY = height;
  let maxY = -1;
  for (let p = 0; p < solid.length; p++) {
    if (!solid[p]) continue;
    count++;
    const x = p % width;
    const y = (p / width) | 0;
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  return maxX < 0 ? null : { mask: solid, count, minX, maxX, minY, maxY };
}

/**
 * Closes the gaps inside the silhouette, leaving its outline alone.
 *
 * A broad flat passage of paint registers as neither a different colour from
 * the wall nor as textured, so it comes through as a hole. Filling by spanning
 * each row between its extremes would close those, but it also joins anything
 * else the row happens to touch: a shadow along the side of the painting that
 * runs a little past its top corner turns every row above the painting into
 * one solid bar, and the top edge is then found at the top of the frame.
 *
 * So the outside is flooded from the border instead, and whatever the flood
 * never reaches was enclosed and is filled. Nothing that opens onto the wall
 * can be closed by that, however it is shaped.
 */
function fillHoles(mask: Uint8Array, width: number, height: number): void {
  const outside = new Uint8Array(mask.length);
  const stack: number[] = [];

  const open = (p: number) => {
    if (mask[p] || outside[p]) return;
    outside[p] = 1;
    stack.push(p);
  };

  for (let x = 0; x < width; x++) {
    open(x);
    open((height - 1) * width + x);
  }
  for (let y = 0; y < height; y++) {
    open(y * width);
    open(y * width + width - 1);
  }

  while (stack.length) {
    const p = stack.pop() as number;
    const x = p % width;
    const y = (p / width) | 0;
    if (x > 0) open(p - 1);
    if (x < width - 1) open(p + 1);
    if (y > 0) open(p - width);
    if (y < height - 1) open(p + width);
  }

  for (let p = 0; p < mask.length; p++) {
    if (!mask[p] && !outside[p]) mask[p] = 1;
  }
}

/** Fits a straight line to each of the four sides of the silhouette. */
function edgesOf(region: Region, width: number, height: number): Edges | null {
  const { mask, minX, maxX, minY, maxY } = region;
  const rowInset = Math.round((maxY - minY) * EDGE_MARGIN);
  const columnInset = Math.round((maxX - minX) * EDGE_MARGIN);

  const left: Point[] = [];
  const right: Point[] = [];
  for (let y = minY + rowInset; y <= maxY - rowInset; y++) {
    const span = spanOf(mask, width, y * width, 1, width);
    if (!span) continue;
    left.push({ x: span[0], y });
    right.push({ x: span[1], y });
  }

  const top: Point[] = [];
  const bottom: Point[] = [];
  for (let x = minX + columnInset; x <= maxX - columnInset; x++) {
    const span = spanOf(mask, width, x, width, height);
    if (!span) continue;
    top.push({ x, y: span[0] });
    bottom.push({ x, y: span[1] });
  }

  // x as a function of y for the upright pair and y of x for the level pair,
  // so each stays well conditioned however far the painting leans.
  const leftFit = fitLine(left, true);
  const rightFit = fitLine(right, true);
  const topFit = fitLine(top, false);
  const bottomFit = fitLine(bottom, false);
  if (!leftFit || !rightFit || !topFit || !bottomFit) return null;

  return { left: leftFit, right: rightFit, top: topFit, bottom: bottomFit };
}

/** First and last set pixel along one row or column of the mask. */
function spanOf(
  mask: Uint8Array,
  width: number,
  start: number,
  step: number,
  count: number
): [number, number] | null {
  let first = -1;
  let last = -1;
  for (let n = 0; n < count; n++) {
    if (mask[start + n * step]) {
      if (first < 0) first = n;
      last = n;
    }
  }
  return first < 0 ? null : [first, last];
}

/**
 * The line the most points agree with, then least squares over just those.
 *
 * Not a fit over everything, however it is weighted. A painting laid on the
 * ground has moss or a shadow against part of its rim, and those stretches are
 * not a scattering of stray points that averaging can absorb — they can be a
 * fifth of one side, all pushed the same way, which drags any fit that counts
 * them at all and inflates the spread that would have identified them.
 *
 * So candidate lines are drawn through widely separated pairs of points, each
 * is scored by how many of the rest fall near it, and the winner is refitted on
 * its supporters alone. A run of moss loses because the clean four fifths of
 * the side outvote it.
 */
function fitLine(points: Point[], upright: boolean): Fit | null {
  if (points.length < MIN_EDGE_POINTS) return null;

  const along = (p: Point) => (upright ? p.y : p.x);
  const across = (p: Point) => (upright ? p.x : p.y);

  const extent = Math.abs(along(points[points.length - 1]) - along(points[0]));
  const tolerance = Math.max(MIN_CONSENSUS_TOLERANCE, extent * CONSENSUS_TOLERANCE);

  const half = points.length >> 1;
  const stride = Math.max(1, Math.floor(half / CONSENSUS_TRIES));
  let best: Point[] | null = null;

  for (let i = 0; i + half < points.length; i += stride) {
    const candidate = through(points[i], points[i + half], along, across);
    if (!candidate) continue;

    const agree = points.filter(
      (p) => Math.abs(across(p) - candidate.slope * along(p) - candidate.intercept) <= tolerance
    );
    if (!best || agree.length > best.length) best = agree;
  }

  const supporters = best && best.length >= MIN_EDGE_POINTS ? best : points;
  return leastSquares(supporters, along, across);
}

/** The line through two points, in whichever parameterisation the caller is using. */
function through(
  a: Point,
  b: Point,
  along: (p: Point) => number,
  across: (p: Point) => number
): Fit | null {
  const run = along(b) - along(a);
  if (Math.abs(run) < 1e-9) return null;

  const slope = (across(b) - across(a)) / run;
  return { slope, intercept: across(a) - slope * along(a) };
}

function leastSquares(
  points: Point[],
  along: (p: Point) => number,
  across: (p: Point) => number
): Fit | null {
  const n = points.length;
  let sumAlong = 0;
  let sumAcross = 0;
  let sumAlongSquared = 0;
  let sumProduct = 0;
  for (const point of points) {
    const a = along(point);
    const b = across(point);
    sumAlong += a;
    sumAcross += b;
    sumAlongSquared += a * a;
    sumProduct += a * b;
  }

  const denominator = n * sumAlongSquared - sumAlong * sumAlong;
  if (Math.abs(denominator) < 1e-9) return null;

  const slope = (n * sumProduct - sumAlong * sumAcross) / denominator;
  return { slope, intercept: (sumAcross - slope * sumAlong) / n };
}

/** Where an upright side, x = f(y), crosses a level one, y = g(x). */
function meet(upright: Fit, level: Fit): Point | null {
  const denominator = 1 - level.slope * upright.slope;
  if (Math.abs(denominator) < 1e-9) return null;

  const y = (level.slope * upright.intercept + level.intercept) / denominator;
  return { x: upright.slope * y + upright.intercept, y };
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

function median(values: number[]): number {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[sorted.length >> 1];
}
