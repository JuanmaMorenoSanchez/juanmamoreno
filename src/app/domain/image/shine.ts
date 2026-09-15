import type { Raster } from './raster';

/**
 * The little lights varnish and oil leave all over a photographed painting.
 *
 * A gloss surface returns the lamp as well as the paint, and on a canvas with
 * any texture to it that comes back as hundreds of tiny white glints — 2,235 of
 * them on one 2006 canvas, covering a third of a per cent of the picture and
 * making the whole of it read as though it were behind glass.
 *
 * Two questions, and they have different answers.
 *
 * WHERE. What is measured is the least of the three channels, because what is
 * being reflected is the lamp rather than the paint: white light lands on all
 * three at once and lifts the smallest of them, where a colour does not. What
 * that is compared against is not one local baseline but the best of four
 * openings, taken along the horizontal, the vertical and both diagonals. This
 * is the whole of how a glint is told from brushwork: a stroke, however fine,
 * is long in one direction, so it survives the opening that runs along it and
 * registers as nothing at all. A glint is small in every direction, survives
 * none of them, and stands clear of all four.
 *
 * Measured against a single square opening instead — the obvious way — this
 * found a quarter of the picture and took the fine strokes out of a splash of
 * wine with it.
 *
 * WHAT to put back. The paint around it — strictly, the average of the
 * neighbours that are not themselves glare. Two earlier answers were wrong in
 * instructive ways. Subtracting the height of the detection put the middle of
 * every glint below the paint it sat on, since an opening's baseline is the
 * darkest thing nearby rather than the usual thing, and left a dark ring round
 * each one. Averaging the whole box around a glint gave back mostly the glint,
 * and on a small picture — where the box can be narrower than the glint — gave
 * back nothing but the glint, so the mend restored what it was mending.
 *
 * And the mask has to be grown and softened before it is used, because a glint
 * does not end where it is detected: mend only the core and the bright rim
 * stays exactly where it was, which reads worse than the glint did.
 */

/** A glint on this canvas was six pixels across in a 2,705 pixel picture. */
const GLINT_IN = 676;
const MIN_RADIUS = 3;
const MAX_RADIUS = 16;

/** How far out the paint is looked for, as multiples of the glint's own size. */
const LOOK_OUT = 2;
/** Enough neighbours to average without one loud one deciding it. */
const ENOUGH = 8;

/**
 * How far above its surroundings a pixel must stand to be glare at all, and
 * where it is certainly glare. Canvas weave alone reaches about thirteen.
 */
const FROM = 18;
const TO = 45;

/** The rim, and the softening that keeps the mend from having an edge. */
const GROW = 2;
const FEATHER = 2;

const lower = (a: number, b: number) => a >= b;
const higher = (a: number, b: number) => a <= b;

/**
 * The sizes a glint is looked for at, taken from the picture itself.
 *
 * A glint is a fact about the varnish rather than about the file, so it is the
 * same size on the canvas and a different number of pixels in every photograph
 * of it. Fixed at what suited one picture, this found nothing at all in a photo
 * twice the size.
 */
export function shineScale(longSide: number): { radius: number } {
  const radius = Math.min(MAX_RADIUS, Math.max(MIN_RADIUS, Math.round(longSide / GLINT_IN)));
  return { radius };
}

/** Sliding-window extremum along one run of pixels, in time that ignores the radius. */
function slide(
  values: Float32Array,
  length: number,
  radius: number,
  keep: (a: number, b: number) => boolean,
  out: Float32Array
): void {
  const deque = new Int32Array(length);
  let head = 0;
  let tail = 0;
  let next = 0;

  for (let i = 0; i < length; i += 1) {
    const until = Math.min(length - 1, i + radius);
    while (next <= until) {
      const value = values[next];
      while (tail > head && keep(values[deque[tail - 1]], value)) tail -= 1;
      deque[tail] = next;
      tail += 1;
      next += 1;
    }
    while (deque[head] < i - radius) head += 1;
    out[i] = values[deque[head]];
  }
}

interface Run {
  sx: number;
  sy: number;
  n: number;
}

/**
 * Every run of pixels in one direction.
 *
 * Four directions is enough to save a stroke at any angle: one off the axis
 * still lies along the nearest of them for most of its length.
 */
function runs(width: number, height: number, dx: number, dy: number): Run[] {
  const starts: [number, number][] = [];
  if (dx === 1 && dy === 0) for (let y = 0; y < height; y += 1) starts.push([0, y]);
  else if (dx === 0 && dy === 1) for (let x = 0; x < width; x += 1) starts.push([x, 0]);
  else if (dx === 1 && dy === 1) {
    for (let y = height - 1; y >= 0; y -= 1) starts.push([0, y]);
    for (let x = 1; x < width; x += 1) starts.push([x, 0]);
  } else {
    for (let y = 0; y < height; y += 1) starts.push([0, y]);
    for (let x = 1; x < width; x += 1) starts.push([x, height - 1]);
  }

  return starts.map(([sx, sy]) => {
    let n = 0;
    let x = sx;
    let y = sy;
    while (x >= 0 && x < width && y >= 0 && y < height) {
      n += 1;
      x += dx;
      y += dy;
    }
    return { sx, sy, n };
  });
}

/** Erode then dilate along one direction: what survives is what is long in it. */
function openAlong(
  plane: Float32Array,
  width: number,
  height: number,
  radius: number,
  dx: number,
  dy: number
): Float32Array {
  const out = new Float32Array(width * height);
  const size = Math.max(width, height) + 2;
  const line = new Float32Array(size);
  const eroded = new Float32Array(size);
  const opened = new Float32Array(size);

  for (const { sx, sy, n } of runs(width, height, dx, dy)) {
    for (let i = 0, x = sx, y = sy; i < n; i += 1, x += dx, y += dy) line[i] = plane[y * width + x];
    slide(line, n, radius, lower, eroded);
    slide(eroded, n, radius, higher, opened);
    for (let i = 0, x = sx, y = sy; i < n; i += 1, x += dx, y += dy) {
      out[y * width + x] = opened[i];
    }
  }
  return out;
}

const DIRECTIONS: [number, number][] = [
  [1, 0],
  [0, 1],
  [1, 1],
  [1, -1],
];

/** Widens the mask over the glint's rim, then takes the edge off it. */
function spread(
  mask: Float32Array,
  width: number,
  height: number,
  grow: number,
  feather: number
): Float32Array {
  const count = width * height;
  const size = Math.max(width, height) + 2;
  const line = new Float32Array(size);
  const done = new Float32Array(size);

  const along = (from: Float32Array, to: Float32Array, dx: number, dy: number) => {
    for (const { sx, sy, n } of runs(width, height, dx, dy)) {
      for (let i = 0, x = sx, y = sy; i < n; i += 1, x += dx, y += dy)
        line[i] = from[y * width + x];
      slide(line, n, grow, higher, done);
      for (let i = 0, x = sx, y = sy; i < n; i += 1, x += dx, y += dy) to[y * width + x] = done[i];
    }
  };

  const once = new Float32Array(count);
  const wide = new Float32Array(count);
  along(mask, once, 1, 0);
  along(once, wide, 0, 1);

  const box = (from: Float32Array, to: Float32Array, horizontal: boolean) => {
    const outer = horizontal ? height : width;
    const inner = horizontal ? width : height;
    const span = feather * 2 + 1;
    for (let o = 0; o < outer; o += 1) {
      const at = (i: number) => {
        const k = Math.min(inner - 1, Math.max(0, i));
        return horizontal ? o * width + k : k * width + o;
      };
      let sum = 0;
      for (let i = -feather; i <= feather; i += 1) sum += from[at(i)];
      for (let i = 0; i < inner; i += 1) {
        to[at(i)] = sum / span;
        sum += from[at(i + feather + 1)] - from[at(i - feather)];
      }
    }
  };

  const half = new Float32Array(count);
  const soft = new Float32Array(count);
  box(wide, half, true);
  box(half, soft, false);
  for (let i = 0; i < count; i += 1) if (soft[i] > 1) soft[i] = 1;
  return soft;
}

/** How much of each pixel is the lamp rather than the painting, from nought to one. */
export function findShine(raster: Raster, radius?: number): Float32Array {
  const { width, height, data } = raster;
  const count = width * height;
  const reach = radius ?? shineScale(Math.max(width, height)).radius;

  const least = new Float32Array(count);
  for (let i = 0, p = 0; i < count; i += 1, p += 4) {
    least[i] = Math.min(data[p], data[p + 1], data[p + 2]);
  }

  const baseline = new Float32Array(count);
  for (const [dx, dy] of DIRECTIONS) {
    const opened = openAlong(least, width, height, reach, dx, dy);
    for (let i = 0; i < count; i += 1) if (opened[i] > baseline[i]) baseline[i] = opened[i];
  }

  const core = new Float32Array(count);
  for (let i = 0; i < count; i += 1) {
    const excess = least[i] - baseline[i];
    if (excess <= FROM) continue;
    const t = Math.min(1, (excess - FROM) / (TO - FROM));
    core[i] = t * t * (3 - 2 * t);
  }

  return spread(core, width, height, GROW, FEATHER);
}

/** Whether anything was found worth taking off. */
export function anyShine(shine: Float32Array): boolean {
  for (let i = 0; i < shine.length; i += 1) if (shine[i] > 0.5) return true;
  return false;
}

/**
 * Puts the paint back where the lamp was, in place.
 *
 * What is put back is the average of the neighbours that are *not* glare. That
 * exclusion is the whole of it: a plain average over the box around a glint is
 * mostly the glint, and on a small picture — where the box can be narrower than
 * the glint itself — it is nothing but the glint, so the mend puts back exactly
 * what it was mending. Skipping what is masked means the answer is paint
 * whatever the sizes work out to.
 *
 * Only under the mask, which is a third of a per cent of the picture. Filtering
 * the whole of it to use a thousandth of the answer is the expensive way round.
 */
export function takeOffShine(raster: Raster, shine: Float32Array, radius?: number): void {
  const { width, height, data } = raster;
  const reach = (radius ?? shineScale(Math.max(width, height)).radius) * LOOK_OUT;
  // A wide box on a large photograph is a great many samples for an average
  // that is broad by nature, so it is sampled rather than counted.
  const step = Math.max(1, Math.floor(reach / 7));
  const original = new Uint8ClampedArray(data);

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const i = y * width + x;
      const much = shine[i];
      if (much <= 0) continue;

      let taken = 0;
      let r = 0;
      let g = 0;
      let b = 0;
      for (let out = reach; out <= reach * 3 && taken < ENOUGH; out += reach) {
        taken = 0;
        r = 0;
        g = 0;
        b = 0;
        const fromY = Math.max(0, y - out);
        const toY = Math.min(height - 1, y + out);
        const fromX = Math.max(0, x - out);
        const toX = Math.min(width - 1, x + out);
        for (let sy = fromY; sy <= toY; sy += step) {
          for (let sx = fromX; sx <= toX; sx += step) {
            const k = sy * width + sx;
            // The paint only. A neighbour that is itself glare has nothing to
            // say about what is underneath this one.
            if (shine[k] > 0) continue;
            const p = k * 4;
            r += original[p];
            g += original[p + 1];
            b += original[p + 2];
            taken += 1;
          }
        }
      }
      if (!taken) continue;

      const p = i * 4;
      data[p] = original[p] * (1 - much) + (r / taken) * much;
      data[p + 1] = original[p + 1] * (1 - much) + (g / taken) * much;
      data[p + 2] = original[p + 2] * (1 - much) + (b / taken) * much;
    }
  }
}
