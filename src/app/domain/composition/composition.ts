/**
 * Arranging cut pieces on one canvas.
 *
 * The nights cut every painting into the separate things in it, and the shelf
 * has hundreds of them. Until now the only thing that could be done with a cut
 * was look at it: this is the arithmetic for putting several of them — a figure
 * from one painting, a tree from another — on a single ground.
 *
 * Pure, and in the domain layer, because all of it is answerable without a
 * canvas: where a piece lands, which one the pointer is on, what order they
 * are drawn in. The feature component owns the pixels and the pointer; this
 * owns what the arrangement *is*. Everything here is in canvas units, never
 * screen pixels — the canvas is drawn at whatever size the window allows and
 * saved at its own, and a model that knew the difference would be wrong at one
 * of them.
 */

/** Anything with a pixel size: the canvas, a cut piece. */
export interface Sized {
  readonly width: number;
  readonly height: number;
}

/**
 * One piece on the canvas.
 *
 * `x` and `y` are its *centre*, not its corner. A piece is resized far more
 * often than it is moved, and growing a piece about its centre leaves it where
 * it was put; growing it from its corner walks it across the canvas.
 */
export interface Placed {
  readonly id: string;
  readonly x: number;
  readonly y: number;
  readonly scale: number;
}

/** The rectangle a placed piece covers, for drawing and for hit-testing. */
export function boxOf(placed: Placed, piece: Sized) {
  const width = piece.width * placed.scale;
  const height = piece.height * placed.scale;
  return { left: placed.x - width / 2, top: placed.y - height / 2, width, height };
}

/** How much of the canvas a newly added piece is given. */
const SHARE = 0.55;

/** How far each new piece is set down from the one before, as a share of the canvas. */
const STEP = 0.07;

/**
 * Where a piece lands when it is added.
 *
 * Big enough to see and small enough to move: it is fitted into a little over
 * half the canvas, and never drawn larger than its own pixels — a cut blown up
 * past its own resolution is a soft cut, and the whole reason the night spends
 * the graphics card is that these are sharp.
 *
 * Set down a step along the diagonal from the last one rather than dead centre,
 * so adding three pieces gives three pieces rather than one with two hidden
 * underneath it.
 */
export function placeOn(canvas: Sized, piece: Sized, alreadyThere: number): Omit<Placed, 'id'> {
  const scale = Math.min(
    1,
    (canvas.width * SHARE) / piece.width,
    (canvas.height * SHARE) / piece.height
  );
  // Wrapped at five, which is where the diagonal reaches the far corner.
  const step = (alreadyThere % 5) * STEP;
  return {
    x: canvas.width * (0.5 - 2 * STEP + step),
    y: canvas.height * (0.5 - 2 * STEP + step),
    scale,
  };
}

/**
 * Which piece the pointer is on, or null.
 *
 * Read from the top down, because the one drawn last is the one on top and the
 * one a person believes they are pointing at.
 *
 * shortcut: the rectangle, not the shape. A cut is a transparent png and most
 * of its box is nothing, so pressing on the empty corner of a figure picks the
 * figure rather than the tree behind it. Upgrade when that is actually in the
 * way: it needs the pixels, which means reading the alpha out of an offscreen
 * canvas per piece and keeping it.
 */
export function topAt(
  point: { x: number; y: number },
  order: readonly Placed[],
  sizeOf: (id: string) => Sized | undefined
): string | null {
  for (let i = order.length - 1; i >= 0; i--) {
    const piece = sizeOf(order[i].id);
    if (!piece) continue;
    const box = boxOf(order[i], piece);
    if (
      point.x >= box.left &&
      point.x <= box.left + box.width &&
      point.y >= box.top &&
      point.y <= box.top + box.height
    ) {
      return order[i].id;
    }
  }
  return null;
}

/**
 * The same arrangement with one piece moved to the end of it.
 *
 * Order is depth here — there is no separate z — so bringing a piece to the
 * front is moving it to the end of the list, which is also the order it is
 * drawn in. One idea, not two that can disagree.
 */
export function bringToFront(order: readonly Placed[], id: string): Placed[] {
  const moved = order.find((placed) => placed.id === id);
  if (!moved) return [...order];
  return [...order.filter((placed) => placed.id !== id), moved];
}

/** The same arrangement with one piece changed. */
export function change(order: readonly Placed[], id: string, to: Partial<Placed>): Placed[] {
  return order.map((placed) => (placed.id === id ? { ...placed, ...to } : placed));
}

/**
 * A piece kept within reach of the canvas.
 *
 * Not kept wholly inside it: a composition made of cut-out figures usually
 * wants one of them running off the edge, and a model that forbade it would be
 * fighting the work. What it refuses is a piece dragged entirely off the
 * canvas, which cannot be seen and therefore cannot be dragged back.
 */
export function withinReach(canvas: Sized, placed: Placed): Placed {
  const margin = Math.min(canvas.width, canvas.height) * 0.08;
  return {
    ...placed,
    x: Math.min(Math.max(placed.x, margin), canvas.width - margin),
    y: Math.min(Math.max(placed.y, margin), canvas.height - margin),
  };
}
