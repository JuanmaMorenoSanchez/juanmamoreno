/**
 * What a jpeg says about how it was written.
 *
 * A jpeg carries the quantisation tables it was encoded with, and those tables
 * are the standard ones scaled by the quality number — so the number can be read
 * back out. It also carries how much colour detail was kept.
 *
 * This exists because re-saving a photograph is not free: straightening moves
 * every pixel, so the file must be encoded again, and encoding it better than it
 * arrived only makes it bigger. Knowing what arrived is what makes it possible
 * to give back something the same size rather than twice it.
 */
export interface JpegSource {
  /** Roughly what it was encoded at, 1–100, or null when it cannot be read. */
  quality: number | null;
  /** Whether the full colour detail is there, or half of it was thrown away. */
  fullColour: boolean;
}

/**
 * The standard luminance quantisation table.
 *
 * Encoders scale this by the quality asked for, so comparing a file's table
 * against it recovers roughly what that quality was.
 */
const STANDARD = [
  16, 11, 10, 16, 24, 40, 51, 61, 12, 12, 14, 19, 26, 58, 60, 55, 14, 13, 16, 24, 40, 57, 69, 56,
  14, 17, 22, 29, 51, 87, 80, 62, 18, 22, 37, 56, 68, 109, 103, 77, 24, 35, 55, 64, 81, 104, 113,
  92, 49, 64, 78, 87, 103, 121, 120, 101, 72, 92, 95, 98, 112, 100, 103, 99,
];

/** Markers that carry no length of their own and cannot be skipped over. */
const STANDALONE = (marker: number): boolean =>
  marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7);

/** The frame headers, which say how each colour channel was sampled. */
const FRAME = new Set([
  0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf,
]);

/**
 * Reads the two things worth knowing, without decoding the picture.
 *
 * Stops at the first frame header, which is well before the image data, so this
 * is a few hundred bytes of work however large the photograph is.
 */
export function readJpegSource(bytes: Uint8Array): JpegSource {
  let quality: number | null = null;
  let fullColour = true;
  let at = 2;

  while (at < bytes.length - 3) {
    if (bytes[at] !== 0xff) {
      at += 1;
      continue;
    }
    const marker = bytes[at + 1];
    if (STANDALONE(marker)) {
      at += 2;
      continue;
    }
    // Start of scan: the picture itself begins, and everything wanted is behind.
    if (marker === 0xda) break;

    const length = (bytes[at + 2] << 8) | bytes[at + 3];
    if (length < 2) break;

    if (marker === 0xdb && quality === null) quality = qualityFrom(bytes, at + 4);
    if (FRAME.has(marker)) {
      fullColour = isFullColour(bytes, at + 4);
      break;
    }
    at += 2 + length;
  }

  return { quality, fullColour };
}

/**
 * The quality the table implies.
 *
 * The scale is averaged across the whole table rather than taken from one entry:
 * encoders round each entry to a whole number, and a single one of them — the
 * first especially, which is small — is a poor witness on its own.
 */
function qualityFrom(bytes: Uint8Array, start: number): number | null {
  const sixteenBit = (bytes[start] ?? 0) >> 4;
  let at = start + 1;
  let total = 0;

  for (let index = 0; index < 64; index += 1) {
    const value = sixteenBit ? ((bytes[at] ?? 0) << 8) | (bytes[at + 1] ?? 0) : (bytes[at] ?? 0);
    if (!value) return null;
    total += (value * 100) / STANDARD[index];
    at += sixteenBit ? 2 : 1;
  }

  const scale = total / 64;
  const quality = scale <= 100 ? 100 - scale / 2 : 5000 / scale;
  return Math.min(100, Math.max(1, Math.round(quality)));
}

/**
 * Whether every pixel kept its own colour.
 *
 * The first component is the brightness and the rest are the colour. When the
 * brightness is sampled more often than the colour is, the colour has been
 * halved in each direction — which is invisible on a photograph of a face and
 * very visible on the edge between two flat areas of paint.
 */
function isFullColour(bytes: Uint8Array, start: number): boolean {
  const components = bytes[start + 5] ?? 0;
  if (components < 3) return true;

  const sampling = bytes[start + 7] ?? 0x11;
  return sampling >> 4 === 1 && (sampling & 0x0f) === 1;
}

/**
 * Chrome keeps every pixel's colour only at the very top of the scale.
 *
 * Measured in the browser this actually runs in: `canvas.toBlob` writes 4:2:0 —
 * half the colour detail in each direction — at every quality up to and
 * including 0.99, and 4:4:4 only from 0.995. There is no middle setting. So a
 * photograph that arrived with its full colour can only keep it by being written
 * at the top, whatever that costs in bytes.
 */
export const FULL_COLOUR_FLOOR = 0.995;

/** Never below this, however poor the file that arrived. */
const LOWEST = 0.9;

/**
 * How to write the corrected photograph back out.
 *
 * Straightening moves every pixel, so the picture has to be encoded again and
 * one generation of loss is unavoidable. This decides how big that generation
 * is, and the rule is to give back what arrived rather than an opinion about it:
 *
 * - a photograph with its full colour is written at the top of the scale, since
 *   that is the only setting that keeps it. It is larger than the original —
 *   maximum quality faithfully records the grain and the original's own
 *   compression, which are expensive — and that size is not extra detail.
 * - one whose colour was already halved has nothing left to protect, so it is
 *   written at the quality it came in at and stays about the size it was.
 */
export function qualityFor(source: JpegSource): number {
  if (source.fullColour) return 1;
  if (source.quality === null) return FULL_COLOUR_FLOOR;
  return Math.min(0.99, Math.max(LOWEST, source.quality / 100));
}
