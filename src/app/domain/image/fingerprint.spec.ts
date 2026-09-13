import { createRaster, type Raster } from './raster';
import { NEARLY_THE_SAME, fingerprint, fingerprintDistance } from './fingerprint';

/** A picture built from a function of position, so it can be varied on purpose. */
const painted = (
  width: number,
  height: number,
  paint: (x: number, y: number) => [number, number, number]
): Raster => {
  const raster = createRaster(width, height);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const [r, g, b] = paint(x, y);
      const at = (y * width + x) * 4;
      raster.data[at] = r;
      raster.data[at + 1] = g;
      raster.data[at + 2] = b;
      raster.data[at + 3] = 255;
    }
  }
  return raster;
};

/**
 * A dark shape on a lit ground, with the ground shading across it.
 *
 * The shading matters. A first version of this was flat colour with hard edges
 * at exact fractions of the width, and at two sizes it disagreed with itself by
 * eighteen bits — because in a flat field almost every comparison is between two
 * identical values, and which way each tie falls depends on where the grid
 * lands. Photographs are not flat: measured on twelve real ones, the on-chain
 * thumbnail and the web copy of the same photograph, about fifty times its area,
 * come out 2 to 7 bits apart.
 */
const shape = (width: number, height: number, offset = 0) =>
  painted(width, height, (x, y) => {
    const inShape = x > width * (0.25 + offset) && x < width * 0.6 && y > height * 0.3;
    const lit = 120 + (x / width) * 90 + (y / height) * 40;
    return inShape ? [lit - 150, lit - 160, lit - 155] : [lit, lit - 10, lit - 20];
  });

describe('telling one picture from another', () => {
  it('gives the same picture the same fingerprint', () => {
    expect(fingerprint(shape(200, 150))).toBe(fingerprint(shape(200, 150)));
  });

  it('is unmoved by size, which is why a thumbnail can stand for the original', () => {
    // The collection is compared through its 2 KB thumbnails; the photograph in
    // hand is far larger. They have to agree.
    const distance = fingerprintDistance(
      fingerprint(shape(1600, 1200)),
      fingerprint(shape(96, 72))
    );

    expect(distance).toBeLessThanOrEqual(NEARLY_THE_SAME);
  });

  it('is unmoved by the whole picture being lighter or darker', () => {
    // Only the comparisons are kept, never the values, so lifting everything
    // changes nothing — which is what lets a corrected photograph still match
    // the uncorrected one already on chain.
    const original = shape(200, 150);
    const lifted = painted(200, 150, (x, y) => {
      const at = (y * 200 + x) * 4;
      return [
        Math.min(255, original.data[at] + 40),
        Math.min(255, original.data[at + 1] + 40),
        Math.min(255, original.data[at + 2] + 40),
      ];
    });

    expect(fingerprintDistance(fingerprint(original), fingerprint(lifted))).toBe(0);
  });

  it('tells two different pictures apart', () => {
    const other = painted(200, 150, (x, y) => (y > 75 ? [30, 30, 30] : [220, 220, 220]));

    expect(fingerprintDistance(fingerprint(shape(200, 150)), fingerprint(other))).toBeGreaterThan(
      NEARLY_THE_SAME
    );
  });

  it('notices a picture that has moved, rather than calling it the same', () => {
    const moved = shape(200, 150, 0.25);

    expect(fingerprintDistance(fingerprint(shape(200, 150)), fingerprint(moved))).toBeGreaterThan(
      0
    );
  });

  it('says nothing rather than guessing about an empty picture', () => {
    expect(fingerprint({ width: 0, height: 0, data: new Uint8ClampedArray(0) })).toBe('');
    expect(fingerprintDistance('', 'abcd')).toBe(64);
  });

  it('is sixty-four bits, however plain the picture', () => {
    expect(fingerprint(painted(40, 40, () => [128, 128, 128]))).toHaveLength(16);
  });
});
