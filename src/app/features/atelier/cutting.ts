/**
 * Cutting a painting into layers: the parts that are arithmetic rather than
 * interface.
 *
 * Here rather than in the component because every one of them has a rule that
 * can be got wrong silently — a name the bucket will refuse, a mask scaled to
 * the wrong size, an edge left hard enough to read as a cut-out — and none of
 * them needs a page to be tested.
 */

/**
 * The longest side of the copy that is sent to a model.
 *
 * The model is billed by what it is given and segmentation models work at
 * about this size natively, so a larger copy costs more and finds nothing
 * extra. The mask comes back at this size and is scaled up over the original,
 * which never leaves the browser.
 */
export const WORKING_MAX_SIDE = 1024;

/** Softness of a layer's edge, in pixels of the finished cut. */
export const FEATHER_PX = 1.5;

/** Lower-case, dashed, and nothing that could climb out of a folder. */
export function slug(text: string, fallback = 'piece'): string {
  const made = text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
    .replace(/-+$/g, '');

  return made || fallback;
}

/**
 * What one layer's file is called.
 *
 * The index is in the name because two layers can honestly be called the same
 * thing — a painting with two figures in it — and a bucket write is a replace.
 */
export function layerFile(label: string, index: number): string {
  return `${index}-${slug(label, 'layer')}.png`;
}

/** The size a working copy comes out at, keeping the shape of the original. */
export function workingSize(
  width: number,
  height: number,
  maxSide = WORKING_MAX_SIDE
): { width: number; height: number } {
  const longest = Math.max(width, height);
  if (longest <= maxSide) return { width, height };

  const scale = maxSide / longest;
  return { width: Math.round(width * scale), height: Math.round(height * scale) };
}

/**
 * Depth for a layer at a given place in the stack.
 *
 * The one thing no model can tell from a painting is which layer is in front,
 * so this is only a first guess — the order he drags them into, spread across
 * the range `Parallax` reads. Nearest moves most.
 */
export function depthFor(order: number, total: number): number {
  if (total <= 1) return 1;
  return Math.round((1 - order / (total - 1)) * 100) / 100;
}

/**
 * Cuts one layer out of the painting with a mask.
 *
 * The mask arrives at working size and the painting is whatever size it
 * really is, so the mask is drawn scaled up — which is also what softens it:
 * an upscaled mask has no hard pixel edge left, and the small blur on top
 * finishes the job. A hard edge is what makes layers read as a paper collage
 * rather than as depth.
 */
export function cutLayer(
  painting: CanvasImageSource,
  mask: CanvasImageSource,
  width: number,
  height: number,
  feather = FEATHER_PX
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext('2d');
  if (!context) return canvas;

  // The mask first, softened, then the painting kept only where the mask is.
  context.filter = feather > 0 ? `blur(${feather}px)` : 'none';
  context.drawImage(mask, 0, 0, width, height);
  context.filter = 'none';

  context.globalCompositeOperation = 'source-in';
  context.drawImage(painting, 0, 0, width, height);
  context.globalCompositeOperation = 'source-over';

  return canvas;
}

/**
 * The side of the small copy a layer's coverage is measured on.
 *
 * Measuring the real thing is not an option: a layer of a forty-megapixel
 * painting is 160 MB of pixel data to answer a yes-or-no question. Drawn down
 * to this and averaged, anything big enough to be a layer still registers.
 */
export const COVERAGE_SIDE = 64;

/**
 * How much of a stencil actually keeps anything, from 0 to 1.
 *
 * This exists because an empty layer is indistinguishable from a layer. A mask
 * that survives the threshold nowhere cuts a fully transparent layer, which
 * joins the stack, draws nothing, and leaves the stage black — with the pointer
 * moving layers nobody can see. The page then looks broken rather than
 * unsuccessful, and the two want opposite responses from whoever is looking.
 *
 * Measured on the stencil and never on the cut: the cut holds the painting,
 * which may have come from the bucket cross-origin, and reading pixels back out
 * of a canvas it has touched throws rather than answering.
 */
export function coverage(stencilCanvas: CanvasImageSource, side = COVERAGE_SIDE): number {
  const small = document.createElement('canvas');
  small.width = side;
  small.height = side;

  const context = small.getContext('2d');
  if (!context) return 0;

  context.drawImage(stencilCanvas, 0, 0, side, side);

  let kept = 0;
  const { data } = context.getImageData(0, 0, side, side);
  for (let at = 3; at < data.length; at += 4) {
    if (data[at] > 0) kept++;
  }

  return kept / (side * side);
}

/**
 * Whether a stencil is just its own bounding box, filled.
 *
 * A mask with no shape in it keeps everything inside the box and nothing
 * outside, which cuts a rectangle of the painting. That is not a layer, and it
 * is the failure that looks most like success: squares of picture sliding over
 * each other read as a cut that went wrong rather than as a model that returned
 * no shape at all.
 *
 * It is the model and never the painting. Asked for a mask, a chat model spells
 * one out as base64 — and what comes back is a PNG header it cannot fill, so it
 * is either undecodable or one flat colour. Both tiers tried did this.
 *
 * Compared against what the box itself covers, because a big subject and a
 * small box look identical to a count of kept pixels alone.
 */
export function fillsItsBox(
  kept: number,
  box: readonly [number, number, number, number],
  width: number,
  height: number,
  margin = 0.98
): boolean {
  const at = boxToPixels(box, width, height);
  const share = (at.width * at.height) / (width * height);
  if (share <= 0) return false;

  return kept >= share * margin;
}

/**
 * Where a scripted pointer is at a moment, for recording without a hand on
 * the mouse.
 *
 * Two circles at different rates rather than one, so the path never repeats
 * exactly within a short recording and never pauses at an end the way a
 * back-and-forth sweep does. Each axis stays inside [-1, 1], which is the
 * range `Parallax` expects.
 */
export function scriptedPointer(seconds: number): { x: number; y: number } {
  return {
    x: Math.sin(seconds * 0.7) * 0.8,
    y: Math.cos(seconds * 0.43) * 0.55,
  };
}

/**
 * The model's outline, drawn as a full-size stencil.
 *
 * The points are `[x, y]`, each 0–1000 of the whole picture, so the shape found
 * on a small copy is filled straight onto the full-size painting: nothing is
 * scaled up, and nothing blurs from scaling. That is the whole reason for
 * asking in numbers rather than for an image.
 *
 * Drawn with a path rather than pixel by pixel, so the browser's own
 * antialiasing gives the edge — which is what the feather used to be for.
 */
export function stencilFromPoints(
  points: readonly (readonly [number, number])[],
  width: number,
  height: number
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext('2d');
  if (!context || points.length < 3) return canvas;

  context.beginPath();
  points.forEach(([x, y], at) => {
    const across = (x / 1000) * width;
    const down = (y / 1000) * height;
    if (at === 0) context.moveTo(across, down);
    else context.lineTo(across, down);
  });
  context.closePath();

  context.fillStyle = '#ffffff';
  context.fill();

  return canvas;
}

/**
 * Whether an outline is worth cutting with.
 *
 * A polygon can arrive technically well-formed and still be no shape at all —
 * the cheap model answers with thirty points that cross over one another and
 * follow nothing. What cannot be allowed is a shape so small it is a speck, so
 * this asks only the question `coverage` asks of a stencil, before anything is
 * drawn.
 */
export function outlineArea(points: readonly (readonly [number, number])[]): number {
  if (points.length < 3) return 0;

  let twice = 0;
  for (let at = 0; at < points.length; at++) {
    const [x1, y1] = points[at];
    const [x2, y2] = points[(at + 1) % points.length];
    twice += x1 * y2 - x2 * y1;
  }

  // Of the whole picture, which is 1000 by 1000 in these coordinates.
  return Math.abs(twice / 2) / 1_000_000;
}

/**
 * `[y0, x0, y1, x1]` in thousandths → a rectangle in pixels.
 *
 * Clamped to the picture, because a model that says 1001 should cost a pixel of
 * accuracy rather than a thrown exception on `getImageData`.
 */
export function boxToPixels(
  box: readonly [number, number, number, number],
  width: number,
  height: number
): { x: number; y: number; width: number; height: number } {
  const [y0, x0, y1, x1] = box;
  const left = clamp(Math.round((x0 / 1000) * width), 0, width);
  const top = clamp(Math.round((y0 / 1000) * height), 0, height);
  const right = clamp(Math.round((x1 / 1000) * width), left, width);
  const bottom = clamp(Math.round((y1 / 1000) * height), top, height);

  return { x: left, y: top, width: right - left, height: bottom - top };
}

function clamp(value: number, low: number, high: number): number {
  return Math.min(Math.max(value, low), high);
}
