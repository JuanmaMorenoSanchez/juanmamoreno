import { blur, downscale, toLuminance, type Raster } from './raster';

/** Focus is judged on a copy this size. Softness is a broad thing; it needs no more. */
const FOCUS_LONG_SIDE = 640;
const TILES_ACROSS = 6;
const TILES_DOWN = 4;
/** The two scales compared. Fine detail against coarse detail. */
const FINE_BLUR = 1;
const COARSE_BLUR = 3;
/** A tile with less coarse detail than this is flat paint, and says nothing about focus. */
const MIN_JUDGEABLE = 0.6;
/** A tile holding this much less fine detail than the rest of the painting is soft. */
const SOFT_BELOW = 0.6;
/** With fewer judgeable tiles than this, the painting is too flat to say anything at all. */
const MIN_JUDGED_TILES = 6;

export interface FocusReport {
  /** False when the painting is too flat anywhere to tell focus from smooth paint. */
  judged: boolean;
  /** Named areas that came back soft, in reading order. Empty when all is sharp. */
  soft: string[];
}

/** Named coarsely on purpose: four adjacent tiles are one soft corner, not four faults. */
const COLUMN_NAMES = ['left', 'left', 'middle', 'middle', 'right', 'right'];
const ROW_NAMES = ['top', 'middle', 'middle', 'bottom'];

/**
 * Says whether part of the painting came out soft.
 *
 * Not by asking how much detail a patch holds — a flat passage of paint holds
 * none and is perfectly in focus. What separates blur from flatness is the
 * *ratio* of fine detail to coarse: blurring takes the fine away and leaves the
 * coarse, so a soft patch of canvas weave still has its broad modelling while
 * having lost its threads. Patches with no coarse detail either are not judged,
 * because there is nothing in them to have been lost.
 */
export function checkFocus(raster: Raster): FocusReport {
  const small = downscale(raster, FOCUS_LONG_SIDE);
  const { width, height } = small;
  const gray = toLuminance(small);
  const fine = blur(gray, width, height, FINE_BLUR);
  const coarse = blur(gray, width, height, COARSE_BLUR);

  const tiles: { ratio: number; column: number; row: number }[] = [];
  const tileWidth = Math.floor(width / TILES_ACROSS);
  const tileHeight = Math.floor(height / TILES_DOWN);
  if (tileWidth < 4 || tileHeight < 4) return { judged: false, soft: [] };

  for (let row = 0; row < TILES_DOWN; row++) {
    for (let column = 0; column < TILES_ACROSS; column++) {
      let fineEnergy = 0;
      let coarseEnergy = 0;
      let count = 0;
      for (let y = row * tileHeight; y < (row + 1) * tileHeight; y++) {
        for (let x = column * tileWidth; x < (column + 1) * tileWidth; x++) {
          const p = y * width + x;
          fineEnergy += Math.abs(gray[p] - fine[p]);
          coarseEnergy += Math.abs(fine[p] - coarse[p]);
          count++;
        }
      }
      const coarseMean = coarseEnergy / count;
      if (coarseMean < MIN_JUDGEABLE) continue;
      tiles.push({ ratio: fineEnergy / count / coarseMean, column, row });
    }
  }

  if (tiles.length < MIN_JUDGED_TILES) return { judged: false, soft: [] };

  const sorted = tiles.map((tile) => tile.ratio).sort((a, b) => a - b);
  const typical = sorted[sorted.length >> 1];
  const blurred = tiles
    .filter((tile) => tile.ratio < typical * SOFT_BELOW)
    .sort((a, b) => a.row - b.row || a.column - b.column);

  return { judged: true, soft: name(blurred) };
}

/**
 * What to call the soft part, in as few words as it takes.
 *
 * A lens that missed focus on one side leaves a whole column of tiles soft, and
 * reciting each of them as its own fault reads like four problems instead of
 * the one it is. A side that has gone entirely is named as a side; anything
 * else is named on a coarse three by three, with repeats dropped.
 */
function name(blurred: { column: number; row: number }[]): string[] {
  if (!blurred.length) return [];

  const columns = blurred.map((tile) => tile.column);
  const rows = blurred.map((tile) => tile.row);
  if (Math.min(...columns) >= TILES_ACROSS - 2) return ['right-hand side'];
  if (Math.max(...columns) <= 1) return ['left-hand side'];
  if (Math.min(...rows) >= TILES_DOWN - 1) return ['bottom edge'];
  if (Math.max(...rows) === 0) return ['top edge'];

  return [...new Set(blurred.map((t) => `${ROW_NAMES[t.row]} ${COLUMN_NAMES[t.column]}`))];
}
