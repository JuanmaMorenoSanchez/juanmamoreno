import type { Size } from './raster';

export interface Point {
  x: number;
  y: number;
}

/** The painting's four corners, always clockwise from the top left. */
export type Quad = [Point, Point, Point, Point];

/**
 * How far each side departs from the straight line between its corners.
 *
 * A painting is a rectangle and its corners settle where they should, but the
 * sides between them are not always straight in the photograph: a lens bends
 * them, most visibly along the long side of a big canvas, and a stretcher that
 * has taken a little bow bends them for real. Four corners cannot describe
 * that, so each side also carries the two control points of a cubic Bézier
 * running between its corners.
 *
 * Sides run the way the corners do — top left→right, right top→bottom, bottom
 * left→right, left top→bottom — so the two horizontal sides are parameterised
 * in the same direction as each other, and so are the two vertical ones.
 */
export interface EdgeBows {
  top: [Point, Point];
  right: [Point, Point];
  bottom: [Point, Point];
  left: [Point, Point];
}

export const EDGE_CORNERS = {
  top: [0, 1],
  right: [1, 2],
  bottom: [3, 2],
  left: [0, 3],
} as const;

export type EdgeName = keyof typeof EDGE_CORNERS;

const along = (a: Point, b: Point, t: number): Point => ({
  x: a.x + (b.x - a.x) * t,
  y: a.y + (b.y - a.y) * t,
});

/** Control points sitting on the straight line, which is a side with no bow. */
export function straightBows(quad: Quad): EdgeBows {
  const make = (edge: EdgeName): [Point, Point] => {
    const [from, to] = EDGE_CORNERS[edge];
    return [along(quad[from], quad[to], 1 / 3), along(quad[from], quad[to], 2 / 3)];
  };
  return { top: make('top'), right: make('right'), bottom: make('bottom'), left: make('left') };
}

/** A point on the cubic Bézier of one side. */
export function bezierAt(p0: Point, c0: Point, c1: Point, p1: Point, t: number): Point {
  const s = 1 - t;
  const a = s * s * s;
  const b = 3 * s * s * t;
  const c = 3 * s * t * t;
  const d = t * t * t;
  return {
    x: a * p0.x + b * c0.x + c * c1.x + d * p1.x,
    y: a * p0.y + b * c0.y + c * c1.y + d * p1.y,
  };
}

/**
 * Whether every side is straight to within a pixel, in which case the bows have
 * nothing to say and the plain perspective correction is the whole answer.
 */
export function bowsAreStraight(quad: Quad, bows: EdgeBows, tolerance = 0.5): boolean {
  const flat = straightBows(quad);
  return (Object.keys(EDGE_CORNERS) as EdgeName[]).every((edge) =>
    bows[edge].every(
      (point, i) => distance(point, flat[edge][i]) <= tolerance
    )
  );
}

export function distance(a: Point, b: Point): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

/**
 * Puts four unordered points into top-left, top-right, bottom-right,
 * bottom-left order.
 *
 * Sorting by angle around the centre gives a clockwise ring — screen
 * coordinates run downwards, so an ascending angle turns the way a clock
 * does — and the corner nearest the origin is the one to start it at.
 */
export function orderCorners(points: Point[]): Quad {
  const cx = points.reduce((sum, p) => sum + p.x, 0) / points.length;
  const cy = points.reduce((sum, p) => sum + p.y, 0) / points.length;

  const ring = [...points].sort(
    (a, b) => Math.atan2(a.y - cy, a.x - cx) - Math.atan2(b.y - cy, b.x - cx)
  );

  let start = 0;
  for (let i = 1; i < ring.length; i++) {
    if (ring[i].x + ring[i].y < ring[start].x + ring[start].y) start = i;
  }

  return [
    ring[start % 4],
    ring[(start + 1) % 4],
    ring[(start + 2) % 4],
    ring[(start + 3) % 4],
  ] as Quad;
}

/** Shoelace. Sign is discarded: the winding is settled by {@link orderCorners}. */
export function quadArea(quad: Quad): number {
  let area = 0;
  for (let i = 0; i < 4; i++) {
    const a = quad[i];
    const b = quad[(i + 1) % 4];
    area += a.x * b.y - b.x * a.y;
  }
  return Math.abs(area) / 2;
}

/** A bow-tie or a dented quad cannot be a photograph of a rectangle. */
export function isConvex(quad: Quad): boolean {
  let sign = 0;
  for (let i = 0; i < 4; i++) {
    const a = quad[i];
    const b = quad[(i + 1) % 4];
    const c = quad[(i + 2) % 4];
    const cross = (b.x - a.x) * (c.y - b.y) - (b.y - a.y) * (c.x - b.x);
    if (cross === 0) continue;
    const current = Math.sign(cross);
    if (sign === 0) sign = current;
    else if (current !== sign) return false;
  }
  return sign !== 0;
}

export function scaleQuad(quad: Quad, factor: number): Quad {
  return quad.map((p) => ({ x: p.x * factor, y: p.y * factor })) as Quad;
}

/** The whole frame, which is what to fall back on when no painting edges stand out. */
export function fullFrame({ width, height }: Size): Quad {
  return [
    { x: 0, y: 0 },
    { x: width, y: 0 },
    { x: width, y: height },
    { x: 0, y: height },
  ];
}

/**
 * How large the corrected image can be without inventing a single pixel.
 *
 * The photographed edges give the most detail the source actually holds along
 * each axis. The real painting gives the only ratio the result is allowed to
 * have. So take the largest rectangle of that ratio that fits inside what was
 * photographed: one axis lands exactly on its measured length and the other
 * comes in under, which loses the least while enlarging nothing.
 */
export function correctedSize(quad: Quad, realWidth: number, realHeight: number): Size {
  const [tl, tr, br, bl] = quad;
  const widest = Math.max(distance(tl, tr), distance(bl, br));
  const tallest = Math.max(distance(tl, bl), distance(tr, br));
  const ratio = realWidth / realHeight;

  const width = Math.min(widest, tallest * ratio);
  return {
    width: Math.max(1, Math.round(width)),
    height: Math.max(1, Math.round(width / ratio)),
  };
}
