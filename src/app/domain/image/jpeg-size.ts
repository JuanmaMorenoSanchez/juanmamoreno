/**
 * How big a JPEG is, read out of the file rather than decoded.
 *
 * A JPEG carries its own dimensions in the header of its frame, so finding them
 * is a walk along the markers and four bytes — no canvas, no `Image`, nothing
 * asynchronous. Which is the whole point: it gives an answer during a
 * prerender, in Node, where there is no browser to decode anything, so the
 * shape of a painting's frame can be written into the served html instead of
 * being discovered a second later in the reader's browser.
 *
 * Every certificate carries a two-kilobyte thumbnail of its painting, so the
 * catalogue already holds a file of exactly the right proportions for every
 * artwork. It is the photograph's own shape, which the artwork's measurements
 * are not: a canvas measured 130 x 130 is photographed 80 x 82.
 */

/** Frame headers: SOF0 through SOF15, less the three that are not frames. */
const IS_FRAME = (marker: number) =>
  marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;

export interface PixelSize {
  width: number;
  height: number;
}

/** The dimensions in a JPEG's bytes, or null if they are not to be found. */
export function jpegSize(bytes: Uint8Array): PixelSize | null {
  // Start of image. Anything else is not a JPEG and is not guessed at.
  if (bytes.length < 4 || bytes[0] !== 0xff || bytes[1] !== 0xd8) return null;

  let at = 2;
  while (at < bytes.length - 9) {
    if (bytes[at] !== 0xff) {
      at += 1;
      continue;
    }
    const marker = bytes[at + 1];
    if (IS_FRAME(marker)) {
      // Two bytes of length, one of precision, then height and then width.
      const height = (bytes[at + 5] << 8) | bytes[at + 6];
      const width = (bytes[at + 7] << 8) | bytes[at + 8];
      return width > 0 && height > 0 ? { width, height } : null;
    }
    const length = (bytes[at + 2] << 8) | bytes[at + 3];
    // A segment claiming no length would leave this walking on the spot.
    if (length < 2) return null;
    at += 2 + length;
  }

  return null;
}

/**
 * The bytes inside a `data:` uri, or null for anything else.
 *
 * Only base64 is read. A percent-encoded data uri is legal and is not what
 * anything here produces, and guessing at one would be inventing a decoder for
 * a case that does not arise.
 */
export function bytesInDataUri(uri: string): Uint8Array | null {
  const comma = uri.indexOf(',');
  if (!uri.startsWith('data:') || comma < 0) return null;
  if (!uri.slice(0, comma).includes(';base64')) return null;

  try {
    const binary = atob(uri.slice(comma + 1));
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
    return bytes;
  } catch {
    // Truncated or not base64 after all.
    return null;
  }
}

/** Width over height of a `data:` uri holding a JPEG, or null. */
export function ratioOfDataUri(uri: string | undefined): number | null {
  if (!uri) return null;
  const bytes = bytesInDataUri(uri);
  if (!bytes) return null;
  const size = jpegSize(bytes);
  return size ? size.width / size.height : null;
}
