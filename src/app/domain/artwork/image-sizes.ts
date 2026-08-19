/**
 * The medium-resolution download: at least 2500 px, at most 5 MB.
 *
 * "At least 2500 px" is read as the *shorter* side, so both dimensions clear
 * 2500 whichever way the requirement was meant. The catalogue's originals are
 * around 3000-4500 px on the short side, so this is a genuine downscale rather
 * than a wish.
 */
export const MEDIUM_MIN_SIDE = 2500;

/** 5 MB counted as 5,000,000 bytes, the smaller of the two readings. */
export const MEDIUM_MAX_BYTES = 5_000_000;

export interface ImageSize {
  width: number;
  height: number;
}

/**
 * The size a medium download should be drawn at.
 *
 * Never enlarges: an original already below the minimum is handed over as it
 * is, because inventing pixels would meet the number and not the requirement
 * behind it. Rounds up, so a rounding error cannot land a side on 2499.
 */
export function mediumImageSize({ width, height }: ImageSize): ImageSize & { resized: boolean } {
  if (width <= 0 || height <= 0) return { width, height, resized: false };

  const shortest = Math.min(width, height);
  if (shortest <= MEDIUM_MIN_SIDE) {
    return { width, height, resized: false };
  }

  const scale = MEDIUM_MIN_SIDE / shortest;
  return {
    width: Math.ceil(width * scale),
    height: Math.ceil(height * scale),
    resized: true,
  };
}

/**
 * Whether a produced file still needs another pass.
 *
 * Below the minimum the size cap is dropped rather than shrinking the picture
 * further: the requirement asks for 2500 px and 5 MB, and of the two, silently
 * failing the pixel floor is the one that would get the image rejected.
 */
export function meetsMediumRequirements(bytes: number, size: ImageSize): boolean {
  return bytes <= MEDIUM_MAX_BYTES && Math.min(size.width, size.height) >= MEDIUM_MIN_SIDE;
}
