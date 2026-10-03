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

/**
 * Where the edge of a layer is, on a mask that is a probability map.
 *
 * The model answers in greys: 255 is certainly the figure, 0 is certainly not,
 * and the middle is where it is unsure — usually hair, an edge in shadow, or a
 * brushstroke that goes both ways. Halfway is the honest reading, and the
 * feather above softens whatever this leaves hard.
 */
export const MASK_THRESHOLD = 128;

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
 * Turns one of the model's masks into a full-frame stencil.
 *
 * Two things have to happen here, and getting either wrong produces a layer
 * that looks deliberate and is wrong — which is worse than an obvious failure.
 *
 * **It covers a box, not the picture.** The mask is only true inside `box`,
 * given as `[y0, x0, y1, x1]` in thousandths of the picture's size. Drawn over
 * the whole frame it would stretch a head across a wall.
 *
 * **It is grey, not a stencil.** `cutLayer` keeps the painting where the mask
 * is *opaque*, and a probability map is fully opaque everywhere — black included
 * — so used directly it would keep the whole box. The brightness has to become
 * the transparency.
 */
export function placeMask(
  mask: CanvasImageSource,
  box: readonly [number, number, number, number],
  width: number,
  height: number,
  threshold = MASK_THRESHOLD
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext('2d');
  if (!context) return canvas;

  const at = boxToPixels(box, width, height);
  context.drawImage(mask, at.x, at.y, at.width, at.height);

  // Brightness becomes transparency, over the box alone: reading the whole
  // frame would cost four bytes a pixel of a forty-megapixel painting to learn
  // what we already know, which is that outside the box there is nothing.
  if (at.width < 1 || at.height < 1) return canvas;

  const region = context.getImageData(at.x, at.y, at.width, at.height);
  stencil(region.data, threshold);
  context.putImageData(region, at.x, at.y);

  return canvas;
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

/**
 * Makes a probability map into a stencil, in place.
 *
 * White becomes opaque white, anything below the threshold becomes nothing at
 * all. Separate from the canvas work so the rule can be tested without one.
 */
export function stencil(data: Uint8ClampedArray, threshold = MASK_THRESHOLD): void {
  for (let at = 0; at < data.length; at += 4) {
    // Plain mean rather than a luminance weighting: these are greys, where the
    // three channels agree, and a weighting would only matter if they did not.
    const grey = (data[at] + data[at + 1] + data[at + 2]) / 3;
    const keep = grey >= threshold && data[at + 3] > 0;

    data[at] = 255;
    data[at + 1] = 255;
    data[at + 2] = 255;
    data[at + 3] = keep ? 255 : 0;
  }
}

function clamp(value: number, low: number, high: number): number {
  return Math.min(Math.max(value, low), high);
}
