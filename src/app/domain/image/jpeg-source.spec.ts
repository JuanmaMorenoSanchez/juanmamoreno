import { readFileSync } from 'node:fs';
import { qualityFor, readJpegSource } from './jpeg-source';

/**
 * Read from real files rather than hand-built bytes: the point of this is that
 * it agrees with what encoders actually write, and a fixture I wrote myself
 * would only prove it agrees with me.
 */
const read = (path: string) => readJpegSource(new Uint8Array(readFileSync(path)));

describe('what a jpeg says about how it was written', () => {
  const fixtures = 'src/app/domain/image/fixtures';

  it('recovers a high quality closely, which is the range that matters', () => {
    // Photographs of paintings arrive at 90 and above, and that is where the
    // answer decides how the file is written. Measured: 95 reads as 94, 97 as
    // 97, 100 as 99.
    expect(read(`${fixtures}/q95-444.jpg`).quality).toBeGreaterThanOrEqual(93);
    expect(read(`${fixtures}/q95-444.jpg`).quality).toBeLessThanOrEqual(96);
  });

  it('is looser lower down, and is not relied on there', () => {
    // The scale is not linear and encoders round their tables, so 75 reads as
    // 71. Close enough to tell a web copy from a master, which is all that is
    // asked of it below 90.
    const low = read(`${fixtures}/q75-420.jpg`).quality;

    expect(low).toBeGreaterThanOrEqual(68);
    expect(low).toBeLessThanOrEqual(80);
  });

  it('tells a full-colour file from one that halved its colour', () => {
    // The difference that mattered: a photograph of paint shows it at every
    // edge between two flat areas.
    expect(read(`${fixtures}/q95-444.jpg`).fullColour).toBe(true);
    expect(read(`${fixtures}/q75-420.jpg`).fullColour).toBe(false);
  });

  it('says it does not know rather than guessing at something that is not a jpeg', () => {
    const notAJpeg = new Uint8Array([0xff, 0xd8, 0x00, 0x01, 0x02, 0x03]);

    expect(readJpegSource(notAJpeg).quality).toBeNull();
  });

  it('reads only the header, however large the photograph is', () => {
    // Stops at the start of scan, so this is a few hundred bytes of work.
    const file = new Uint8Array(readFileSync(`${fixtures}/q95-444.jpg`));
    const started = performance.now();
    readJpegSource(file);

    expect(performance.now() - started).toBeLessThan(50);
  });

  describe('how the corrected photograph is written back', () => {
    it('writes a full-colour photograph at the top, because nothing else keeps it', () => {
      // Chrome gives 4:2:0 at every setting below 0.995, which is the loss this
      // whole rule exists to avoid.
      expect(qualityFor({ quality: 98, fullColour: true })).toBe(1);
      expect(qualityFor({ quality: 80, fullColour: true })).toBe(1);
    });

    it('does not inflate one whose colour was already halved', () => {
      // Nothing left to protect, so it comes back about the size it went in.
      expect(qualityFor({ quality: 93, fullColour: false })).toBeCloseTo(0.93);
      expect(qualityFor({ quality: 95, fullColour: false })).toBeCloseTo(0.95);
    });

    it('keeps a floor under a badly compressed file', () => {
      // A web copy handed in by mistake should still come back as a usable
      // master rather than being faithfully preserved as rubble.
      expect(qualityFor({ quality: 40, fullColour: false })).toBeCloseTo(0.9);
      expect(qualityFor({ quality: 85, fullColour: false })).toBeCloseTo(0.9);
    });

    it('writes a raw file at the top of the scale', () => {
      // A raw has no quality of its own to match: the number would belong to
      // the JPEG the camera embedded in it, not to the sensor. Measured on a
      // real NEF, that embedded frame is the full 6016 × 4000.
      expect(qualityFor({ quality: null, fullColour: true })).toBe(1);
    });

    it('errs upwards when it cannot tell', () => {
      expect(qualityFor({ quality: null, fullColour: false })).toBeGreaterThanOrEqual(0.99);
    });
  });
});
