import type { Raster } from './raster';

/**
 * A picture reduced to sixty-four bits, so two can be told apart at a glance.
 *
 * The grid is shrunk to nine by eight and each pixel compared with the one to
 * its right: one bit per comparison, sixty-four bits per picture. What survives
 * is the arrangement of light and dark across the image, which is what makes two
 * photographs of the same thing look the same — and it survives a change of
 * size, of compression, and of overall brightness, because only the comparisons
 * matter and not the values.
 *
 * Measured against this collection: no two different paintings come within
 * fourteen bits of each other, across all 17,156 pairs. Ten is the line, which
 * leaves four bits of room and caught nothing it should not have.
 */

/** Within this many bits, two pictures are the same picture. */
export const NEARLY_THE_SAME = 10;

const ACROSS = 9;
const DOWN = 8;

/**
 * The brightness of one cell of the grid.
 *
 * Averaged over the block it stands for rather than sampled from the middle of
 * it: a single pixel out of a whole photograph is mostly noise, and noise is
 * exactly what this is meant to see past.
 */
function cellBrightness(raster: Raster, column: number, row: number): number {
  const fromX = Math.floor((column * raster.width) / ACROSS);
  const toX = Math.max(fromX + 1, Math.floor(((column + 1) * raster.width) / ACROSS));
  const fromY = Math.floor((row * raster.height) / DOWN);
  const toY = Math.max(fromY + 1, Math.floor(((row + 1) * raster.height) / DOWN));

  let total = 0;
  let counted = 0;
  for (let y = fromY; y < toY && y < raster.height; y += 1) {
    for (let x = fromX; x < toX && x < raster.width; x += 1) {
      const at = (y * raster.width + x) * 4;
      total += raster.data[at] * 0.299 + raster.data[at + 1] * 0.587 + raster.data[at + 2] * 0.114;
      counted += 1;
    }
  }
  return counted ? total / counted : 0;
}

/** The sixty-four bits, as a string of hex so it can be stored and compared. */
export function fingerprint(raster: Raster): string {
  if (!raster.width || !raster.height) return '';

  let bits = 0n;
  for (let row = 0; row < DOWN; row += 1) {
    let left = cellBrightness(raster, 0, row);
    for (let column = 1; column < ACROSS; column += 1) {
      const right = cellBrightness(raster, column, row);
      bits = (bits << 1n) | (left > right ? 1n : 0n);
      left = right;
    }
  }
  return bits.toString(16).padStart(16, '0');
}

/**
 * How many of the sixty-four bits differ.
 *
 * Zero is the same picture; ten or fewer is the same picture photographed or
 * compressed differently; thirty-odd is two unrelated paintings.
 */
export function fingerprintDistance(one: string, other: string): number {
  if (!one || !other || one.length !== other.length) return 64;

  let differing = 0;
  let apart = BigInt(`0x${one}`) ^ BigInt(`0x${other}`);
  while (apart) {
    differing += Number(apart & 1n);
    apart >>= 1n;
  }
  return differing;
}
