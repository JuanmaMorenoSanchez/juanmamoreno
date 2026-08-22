/**
 * The medium download: at least 2500 px, at most 5 MB.
 *
 * The minimum is applied to the *shorter* side, so both dimensions clear it
 * whichever way the requirement was meant.
 */
export const MEDIUM_MIN_SIDE = 2500;

/** 5 MB as 5,000,000 bytes, the stricter of the two readings. */
export const MEDIUM_MAX_BYTES = 5_000_000;

export interface ImageSize {
  width: number;
  height: number;
}

/**
 * Never enlarges: inventing pixels would meet the number and not the
 * requirement behind it. Rounds up, so no side can land on 2499.
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

/** Of the two limits the pixel floor is the harder one: a small file at 2499 px is rejected. */
export function meetsMediumRequirements(bytes: number, size: ImageSize): boolean {
  return bytes <= MEDIUM_MAX_BYTES && Math.min(size.width, size.height) >= MEDIUM_MIN_SIDE;
}
