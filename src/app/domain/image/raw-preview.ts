/**
 * The photograph inside a raw file.
 *
 * A browser cannot develop a raw: demosaicing a sensor's own readings needs the
 * camera's colour profile and a great deal of arithmetic, and none of it is
 * built in. What every raw does carry is one or more finished JPEGs the camera
 * made at the moment of the shot — the picture shown on its back screen, which
 * on a modern body is the full frame at full resolution.
 *
 * That is the picture taken here. It is the same rendering the camera would
 * have written had the shot been taken as a JPEG, and the corrector then does
 * what it always does to it.
 *
 * Found by scanning rather than by walking the file's directories. Raw formats
 * are TIFF containers whose layout differs by maker and by model, and a parser
 * for one is a parser that fails on the next camera bought. A JPEG announces
 * itself unmistakably — the two bytes FF D8 followed by another FF — and inside
 * the compressed part of a JPEG an FF is always written as FF 00, so those
 * three bytes cannot occur by accident within one.
 */

/** The markers a JPEG opens and closes with. */
const START = [0xff, 0xd8, 0xff];
const END = [0xff, 0xd9];

/**
 * Below this there is nothing worth decoding — a stray marker, not a picture.
 *
 * Deliberately not a judgement about whether the picture is big enough to use:
 * bytes are not pixels, and a flat wall photographs to a smaller file than a
 * crowded still life at the same resolution. Whether what comes out is a
 * reproduction or a thumbnail is decided after decoding it, where the
 * dimensions can actually be read.
 */
const NOT_A_PICTURE = 1024;

/**
 * Whether this is a file the browser will refuse to open by itself.
 *
 * Decided on the name alone. The first version also consulted the type the
 * operating system reports, meaning to be careful, and was the reason a NEF came
 * back as "that file could not be read as an image": Windows reports whatever is
 * in its registry, and `image/nef` — no stranger than `image/x-nikon-nef`, which
 * was allowed — was taken as a claim the browser could open it.
 *
 * The extension is the whole of the signal and needs no help. A photograph the
 * browser can open is not named .nef, and one named .nef is not a photograph the
 * browser can open, whatever any registry says about it.
 */
export function isRawPhotograph(name: string): boolean {
  return /\.(nef|nrw|cr2|cr3|arw|orf|raf|rw2|pef|dng|srw)$/i.test(name.trim());
}

/** Where each embedded JPEG begins. */
function starts(bytes: Uint8Array): number[] {
  const found: number[] = [];
  for (let at = 0; at < bytes.length - 2; at += 1) {
    if (bytes[at] === START[0] && bytes[at + 1] === START[1] && bytes[at + 2] === START[2]) {
      found.push(at);
    }
  }
  return found;
}

/** Where the JPEG beginning at `from` ends, or the end of the file. */
function endOf(bytes: Uint8Array, from: number, before: number): number {
  for (let at = before - 1; at > from; at -= 1) {
    if (bytes[at - 1] === END[0] && bytes[at] === END[1]) return at + 1;
  }
  return before;
}

/**
 * The largest photograph inside a raw file, or null when there is none.
 *
 * Largest by bytes rather than by dimensions, because dimensions cannot be read
 * without decoding and the biggest of the embedded JPEGs is in practice the
 * full-size one. The little thumbnails are skipped outright.
 */
export function largestEmbeddedJpeg(bytes: Uint8Array): Uint8Array | null {
  const openings = starts(bytes);
  if (!openings.length) return null;

  let best: Uint8Array | null = null;
  for (let index = 0; index < openings.length; index += 1) {
    const from = openings[index];
    const limit = index + 1 < openings.length ? openings[index + 1] : bytes.length;
    const to = endOf(bytes, from, limit);
    const length = to - from;
    if (length < NOT_A_PICTURE) continue;
    if (!best || length > best.length) best = bytes.subarray(from, to);
  }
  return best;
}
