/**
 * Which part of the photograph an adjustment applies to.
 *
 * A mask of coverage from nought to one, painted by hand. Nothing selected is
 * not an empty selection but the absence of one: the adjustments then apply
 * everywhere, because a photograph that is too warm is usually too warm all
 * over and having to paint over the whole of it first would be a chore with no
 * purpose.
 *
 * Kept small and sampled smoothly for the same reason the light was: what is
 * being corrected — a lamp's falloff, a corner in shadow — is broad and soft,
 * and a correction with an edge in it shows that edge on a flat wall of colour.
 */

/** The mask's long side. Broad by nature, so it needs no more than this. */
export const MASK_LONG_SIDE = 128;

export interface Selection {
  values: Float32Array;
  width: number;
  height: number;
}

/**
 * One dab of the brush, in the photograph's own coordinates.
 *
 * `radius` is where the dab stops entirely. `softness` is how much of that
 * radius is spent fading out — 0 is a hard disc, 1 fades from the very centre.
 * `erase` takes coverage away instead of adding it, which is how a selection
 * that went too far is pulled back without starting again.
 */
export interface BrushDab {
  x: number;
  y: number;
  radius: number;
  softness: number;
  erase?: boolean;
}

export function createSelection(photoWidth: number, photoHeight: number): Selection {
  const scale = MASK_LONG_SIDE / Math.max(photoWidth, photoHeight);
  const width = Math.max(2, Math.round(photoWidth * scale));
  const height = Math.max(2, Math.round(photoHeight * scale));
  return { values: new Float32Array(width * height), width, height };
}

/** Whether anything at all has been selected. */
export function hasSelection(selection: Selection | null): boolean {
  if (!selection) return false;
  for (const value of selection.values) if (value > 0) return true;
  return false;
}

export function clearSelection(selection: Selection): void {
  selection.values.fill(0);
}

/**
 * Adds one dab to the selection, or takes one away.
 *
 * Coverage accumulates the way paint does — going over the same place twice
 * makes it more selected, up to fully — and the falloff is smoothstep rather
 * than linear. A linear edge leaves a visible ring where the gradient turns a
 * corner, which on an area of even colour is exactly the artefact this is
 * meant to avoid.
 */
export function paintDab(
  selection: Selection,
  photo: { width: number; height: number },
  dab: BrushDab
): void {
  const scale = selection.width / photo.width;
  const cx = dab.x * scale;
  const cy = dab.y * scale;
  // The mask is 128 across however large the photograph is, so a fine brush can
  // be smaller than one of its cells — and a dab that falls between four cell
  // centres then reaches none of them and paints nothing at all, silently. Any
  // point is within half a diagonal (0.708) of a centre, so a floor just above
  // that always reaches one. It only bites on a brush finer than the mask can
  // hold, which is the case that would otherwise do nothing.
  const radius = Math.max(0.75, dab.radius * scale);
  const softness = Math.min(1, Math.max(0, dab.softness));
  const solid = radius * (1 - softness);

  const fromY = Math.max(0, Math.floor(cy - radius));
  const toY = Math.min(selection.height - 1, Math.ceil(cy + radius));
  const fromX = Math.max(0, Math.floor(cx - radius));
  const toX = Math.min(selection.width - 1, Math.ceil(cx + radius));

  for (let y = fromY; y <= toY; y += 1) {
    for (let x = fromX; x <= toX; x += 1) {
      const distance = Math.hypot(x - cx, y - cy);
      if (distance >= radius) continue;

      let weight = 1;
      if (distance > solid) {
        const t = (distance - solid) / Math.max(1e-6, radius - solid);
        weight = 1 - t * t * (3 - 2 * t);
      }

      const at = y * selection.width + x;
      const next = dab.erase ? selection.values[at] - weight : selection.values[at] + weight;
      selection.values[at] = next < 0 ? 0 : next > 1 ? 1 : next;
    }
  }
}
