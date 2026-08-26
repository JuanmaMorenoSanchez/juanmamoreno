import type { Size } from './raster';

export interface Point {
  x: number;
  y: number;
}

/** The painting's four corners, always clockwise from the top left. */
export type Quad = [Point, Point, Point, Point];

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
