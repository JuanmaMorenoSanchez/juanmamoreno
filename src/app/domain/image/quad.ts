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
 * Two numbers per side, not two points: how far each control point stands off
 * the chord, square to it. A control point free to move in two dimensions can
 * also slide *along* the chord, and sliding along it does not bend the side at
 * all — it changes how fast the side is travelled, which stretches one part of
 * the painting and squeezes another. That is a distortion nobody photographing
 * a painting ever wants, and it was invisible in the outline: the line still
 * ran through the corners and still looked like the edge of the canvas, while
 * the picture inside it came out wrong. Held as distances, it cannot be
 * expressed.
 *
 * Sides run the way the corners do — top left→right, right top→bottom, bottom
 * left→right, left top→bottom — so the two horizontal sides are parameterised
 * in the same direction as each other, and so are the two vertical ones. Each
 * side's distances are measured against its own direction, a quarter turn from
 * it, and therefore mean "outwards" on the top and the right and "inwards" on
 * the other two. Nothing reads them that way: a handle sets one by where it is
 * put, and the warp adds it back in the same direction it was measured.
 */
export interface EdgeBows {
  top: [number, number];
  right: [number, number];
  bottom: [number, number];
  left: [number, number];
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

/** No departure at all, which is four straight sides. */
export function straightBows(): EdgeBows {
  return { top: [0, 0], right: [0, 0], bottom: [0, 0], left: [0, 0] };
}

/**
 * The one direction a side's control points may move in: square to its chord.
 *
 * Everything about a bow is measured along this and nothing is measured across
 * it, which is what makes the stretch along a side impossible rather than
 * merely discouraged.
 */
export function edgeNormal(quad: Quad, edge: EdgeName): Point {
  const [from, to] = EDGE_CORNERS[edge];
  const dx = quad[to].x - quad[from].x;
  const dy = quad[to].y - quad[from].y;
  const length = Math.hypot(dx, dy) || 1;
  return { x: dy / length, y: -dx / length };
}

/** Where a side's two control points actually sit, for drawing and for grabbing. */
export function bowControls(quad: Quad, bows: EdgeBows, edge: EdgeName): [Point, Point] {
  const [from, to] = EDGE_CORNERS[edge];
  const normal = edgeNormal(quad, edge);
  const at = (t: number, off: number): Point => {
    const on = along(quad[from], quad[to], t);
    return { x: on.x + normal.x * off, y: on.y + normal.y * off };
  };
  return [at(1 / 3, bows[edge][0]), at(2 / 3, bows[edge][1])];
}

/**
 * What a point dragged to `at` sets the control point to.
 *
 * Only the part square to the chord survives. Everything along it is dropped
 * here, once, which is why no other code has to remember not to do it.
 */
export function bowOffset(quad: Quad, edge: EdgeName, at: Point): number {
  const [from] = EDGE_CORNERS[edge];
  const normal = edgeNormal(quad, edge);
  return (at.x - quad[from].x) * normal.x + (at.y - quad[from].y) * normal.y;
}

/**
 * How far the bowed side stands off its chord at t, as a distance along the
 * side's normal.
 *
 * The cubic's two middle terms, which is all that is left once the control
 * points can only leave the chord sideways: the other two terms are the chord
 * itself and cancel exactly. It used to be worked out by evaluating two whole
 * Béziers per side per pixel and subtracting them.
 */
export function bowAmount(bows: EdgeBows, edge: EdgeName, t: number): number {
  const [first, second] = bows[edge];
  const s = 1 - t;
  return 3 * s * s * t * first + 3 * s * t * t * second;
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
export function bowsAreStraight(bows: EdgeBows, tolerance = 0.5): boolean {
  return (Object.keys(EDGE_CORNERS) as EdgeName[]).every((edge) =>
    bows[edge].every((off) => Math.abs(off) <= tolerance)
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
/**
 * The shape the four corners describe, as width over height.
 *
 * The longest of each pair of opposite sides, because a photograph taken at an
 * angle foreshortens the far one and the near one is the better record of what
 * was there. This is what the correction falls back on when it is told not to
 * square the picture up, and what {@link squaringMismatch} compares the typed
 * measurements against.
 */
export function cornerShape(quad: Quad): number {
  const [tl, tr, br, bl] = quad;
  const widest = Math.max(distance(tl, tr), distance(bl, br));
  const tallest = Math.max(distance(tl, bl), distance(tr, br));
  return widest / tallest;
}

/** What the corners say, set beside what was typed, when the two disagree. */
export interface SquaringMismatch {
  /** How far out, as a fraction: 0.12 is the picture stretched by a twelfth. */
  stretch: number;
  /** The height the corners imply, taking the typed width to be right. */
  heightIfWidthIsRight: number;
  /** And the width, taking the typed height to be right. */
  widthIfHeightIsRight: number;
}

/**
 * Whether squaring this photograph up to these measurements would stretch it.
 *
 * The corners describe a shape and the measurements describe a shape, and when
 * a painting is photographed square-on those two are the same shape. When they
 * are not, squaring one to the other pulls the picture out of true — and it is
 * the picture that gives, silently, because the numbers are what the
 * certificate is squared to.
 *
 * This is the fault that made it worth writing: a 23 × 30,7 cm canvas typed in
 * as 27,33 × 23. The corners were on the canvas, the correction did exactly
 * what it was asked, and the painting came out an eighth too wide with nothing
 * said. A certificate cannot be corrected once it is frozen.
 *
 * Null when they agree, or when there is nothing to compare. A photograph taken
 * at an angle foreshortens one axis, so the tolerance is wide enough to sit out
 * the ordinary case and narrow enough to catch a measurement that is simply
 * wrong.
 */
export function squaringMismatch(
  quad: Quad,
  realWidth: number,
  realHeight: number,
  tolerance = 0.06
): SquaringMismatch | null {
  const shape = cornerShape(quad);
  const asked = realWidth / realHeight;
  if (!Number.isFinite(shape) || !Number.isFinite(asked) || shape <= 0 || asked <= 0) return null;

  // Measured as the factor the picture is pulled by, taken the way round that
  // is greater than one. Read as `asked / shape - 1` it came out as a different
  // number for the same painting depending on which way up it stood, since
  // pulling a thing to 1.12 of itself and to 0.89 of itself are one stretch.
  const factor = asked / shape;
  const stretch = (factor > 1 ? factor : 1 / factor) - 1;
  if (stretch <= tolerance) return null;

  return {
    stretch,
    heightIfWidthIsRight: realWidth / shape,
    widthIfHeightIsRight: realHeight * shape,
  };
}

export function correctedSize(
  quad: Quad,
  realWidth: number,
  realHeight: number,
  /**
   * Whether the result should take the painting's own proportions.
   *
   * Usually it should: a photograph of a canvas is a photograph of a rectangle
   * whose shape is known, and squaring it up to that shape is most of what
   * straightening is for.
   *
   * Not always, though. A detail, or a canvas photographed half-finished, is not
   * the whole painting — the measurements belong to the work and not to what was
   * photographed, and forcing the picture into them stretches it. Then the four
   * corners are still squared up, but the result keeps the shape they describe.
   */
  adapt = true
): Size {
  const [tl, tr, br, bl] = quad;
  const widest = Math.max(distance(tl, tr), distance(bl, br));
  const tallest = Math.max(distance(tl, bl), distance(tr, br));
  const ratio = adapt ? realWidth / realHeight : cornerShape(quad);

  const width = Math.min(widest, tallest * ratio);
  return {
    width: Math.max(1, Math.round(width)),
    height: Math.max(1, Math.round(width / ratio)),
  };
}

/**
 * How far to move a point, for a position across the corrected rectangle.
 *
 * Each side contributes what it departs from its own chord at the matching
 * parameter, weighted by how near that side is. The corner terms a Coons patch
 * would subtract are not needed: a departure is zero at both ends of every
 * side, so the four contributions already vanish at the corners.
 *
 * Every contribution is a distance multiplied by its own side's normal, which
 * is the whole of why a bow cannot stretch the painting along the side it bends.
 * Not nearly zero along it, and not corrected to zero afterwards: a scalar times
 * a perpendicular vector has no component along that side to begin with, at any
 * point in the picture and for any bow. `edge-bows.spec.ts` measures it.
 *
 * The four directions are settled once, before the caller starts its loop.
 */
export function bowShift(quad: Quad, bows: EdgeBows): (u: number, v: number) => Point {
  const normals = {
    top: edgeNormal(quad, 'top'),
    right: edgeNormal(quad, 'right'),
    bottom: edgeNormal(quad, 'bottom'),
    left: edgeNormal(quad, 'left'),
  };

  return (u, v) => {
    const top = bowAmount(bows, 'top', u) * (1 - v);
    const bottom = bowAmount(bows, 'bottom', u) * v;
    const left = bowAmount(bows, 'left', v) * (1 - u);
    const right = bowAmount(bows, 'right', v) * u;
    return {
      x:
        top * normals.top.x +
        bottom * normals.bottom.x +
        left * normals.left.x +
        right * normals.right.x,
      y:
        top * normals.top.y +
        bottom * normals.bottom.y +
        left * normals.left.y +
        right * normals.right.y,
    };
  };
}

/** The direction a side runs in, which is the one direction its bow never moves anything. */
export function edgeTangent(quad: Quad, edge: EdgeName): Point {
  const [from, to] = EDGE_CORNERS[edge];
  const dx = quad[to].x - quad[from].x;
  const dy = quad[to].y - quad[from].y;
  const length = Math.hypot(dx, dy) || 1;
  return { x: dx / length, y: dy / length };
}

/**
 * The same photograph, turned a quarter turn clockwise.
 *
 * A camera that recorded nothing about which way up it was held hands over a
 * painting lying on its side, and the corners found in it are the corners of a
 * sideways painting: straightening squares them to the measurements typed
 * below, so the certificate comes out rotated and stretched into the wrong
 * shape. Turning the picture has to turn the corners with it or it is only a
 * different way of looking at the same mistake.
 *
 * The four corners keep their places on the painting and change their names:
 * what was the bottom left is now the top left, because that is where it has
 * arrived. Each side likewise becomes the next one round — and two of them run
 * the other way afterwards, since the sides are parameterised in pairs and a
 * quarter turn swaps which pair a side belongs to.
 *
 * `height` is the photograph's height *before* the turn, which is the new width.
 */
export function turnClockwise(
  quad: Quad,
  bows: EdgeBows,
  { height }: Size
): { quad: Quad; bows: EdgeBows } {
  const turn = (point: Point): Point => ({ x: height - point.y, y: point.x });
  const [tl, tr, br, bl] = quad;
  // A side that comes round pointing the other way has its two distances
  // swapped end for end, and negated with the normal they were measured
  // against. The other two are carried over untouched: the turn rotates their
  // normals exactly as it rotates them.
  // Nought stays nought rather than becoming minus nought, which is the same
  // number and not the same value to anything comparing two sets of bows.
  const flip = (off: number) => (off === 0 ? 0 : -off);
  const reversed = ([first, second]: [number, number]): [number, number] => [
    flip(second),
    flip(first),
  ];

  return {
    quad: [turn(bl), turn(tl), turn(tr), turn(br)],
    bows: {
      top: reversed(bows.left),
      right: [...bows.top],
      bottom: reversed(bows.right),
      left: [...bows.bottom],
    },
  };
}
