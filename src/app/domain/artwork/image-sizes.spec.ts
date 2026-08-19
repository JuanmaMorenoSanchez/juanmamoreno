import {
  MEDIUM_MAX_BYTES,
  MEDIUM_MIN_SIDE,
  mediumImageSize,
  meetsMediumRequirements,
} from './image-sizes';

// The medium download exists to satisfy a submission requirement — at least
// 2500 px, at most 5 MB — so these are the numbers someone will check the file
// against, not a matter of taste.
describe('mediumImageSize', () => {
  // Real dimensions from the catalogue.
  const catalogue = [
    { name: 'Secuestro en la rave', width: 3690, height: 3795 },
    { name: 'Stalker', width: 3000, height: 3783 },
    { name: 'Rockets win I', width: 3652, height: 4533 },
  ];

  catalogue.forEach(({ name, width, height }) => {
    it(`brings "${name}" down with both sides still at or above the minimum`, () => {
      const size = mediumImageSize({ width, height });

      expect(size.resized).toBe(true);
      expect(Math.min(size.width, size.height)).toBeGreaterThanOrEqual(MEDIUM_MIN_SIDE);
      expect(size.width).toBeLessThan(width);
      expect(size.height).toBeLessThan(height);
    });
  });

  it('puts the shorter side exactly on the minimum', () => {
    expect(mediumImageSize({ width: 5000, height: 4000 }).height).toBe(MEDIUM_MIN_SIDE);
    expect(mediumImageSize({ width: 4000, height: 5000 }).width).toBe(MEDIUM_MIN_SIDE);
  });

  it('keeps the proportions of the original', () => {
    const size = mediumImageSize({ width: 3652, height: 4533 });
    // Within a pixel: the sides are rounded up independently.
    expect(size.width / size.height).toBeCloseTo(3652 / 4533, 2);
  });

  // Enlarging would satisfy the number and betray the requirement behind it.
  it('never enlarges an original that is already smaller', () => {
    const small = mediumImageSize({ width: 1800, height: 1200 });

    expect(small.resized).toBe(false);
    expect(small).toMatchObject({ width: 1800, height: 1200 });
  });

  it('leaves an image sitting exactly on the minimum alone', () => {
    const exact = mediumImageSize({ width: MEDIUM_MIN_SIDE, height: 4000 });

    expect(exact.resized).toBe(false);
    expect(exact.width).toBe(MEDIUM_MIN_SIDE);
  });

  // Rounding down could land a side on 2499 and fail the requirement by a pixel.
  it('rounds up, so no side ever lands just below the minimum', () => {
    for (const width of [3001, 3333, 4097, 5001]) {
      for (const height of [3001, 3777, 4999]) {
        const size = mediumImageSize({ width, height });
        expect(Math.min(size.width, size.height)).toBeGreaterThanOrEqual(MEDIUM_MIN_SIDE);
      }
    }
  });

  it('does not fall over on a degenerate size', () => {
    expect(mediumImageSize({ width: 0, height: 0 }).resized).toBe(false);
  });
});

describe('meetsMediumRequirements', () => {
  const big = { width: 2500, height: 3103 };

  it('accepts a file within both limits', () => {
    expect(meetsMediumRequirements(4_900_000, big)).toBe(true);
  });

  it('rejects a file over the size cap', () => {
    expect(meetsMediumRequirements(MEDIUM_MAX_BYTES + 1, big)).toBe(false);
  });

  it('rejects an image under the pixel floor however small the file', () => {
    expect(meetsMediumRequirements(100_000, { width: 2499, height: 4000 })).toBe(false);
  });

  it('treats 5 MB as five million bytes, the stricter reading', () => {
    expect(MEDIUM_MAX_BYTES).toBe(5_000_000);
    expect(meetsMediumRequirements(5_000_000, big)).toBe(true);
    expect(meetsMediumRequirements(5_242_880, big)).toBe(false);
  });
});
