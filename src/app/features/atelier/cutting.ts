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
