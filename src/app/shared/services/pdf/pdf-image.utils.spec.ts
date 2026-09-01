import { fitToPrintBox } from './pdf-image.utils';

/**
 * The page an artwork is printed on: the square 210mm catalogue format, 24mm
 * margins, and 16mm kept back at the foot for the title and technical line.
 * Written out rather than imported so a change to the page has to be made
 * deliberately in both places instead of quietly agreeing with itself.
 */
const CONTENT_WIDTH_MM = 210 - 2 * 24;
const MAX_IMAGE_HEIGHT_MM = 210 - 2 * 24 - 16;

const MM_PER_INCH = 25.4;
const dpi = (pixels: number, millimetres: number) => (pixels / millimetres) * MM_PER_INCH;

const fit = (width: number, height: number) =>
  fitToPrintBox({ width, height }, CONTENT_WIDTH_MM, MAX_IMAGE_HEIGHT_MM);

describe('fitting an artwork to the printed page', () => {
  /**
   * The fault, in one number.
   *
   * The density was 4 pixels per millimetre — 101.6 dpi, a screen figure — so
   * a square painting, drawn 146mm across, was 584 pixels wide out of a source
   * 3000 pixels square, and printed as mush. Anything under 300 dpi is a
   * technical sheet nobody can submit.
   */
  it('draws a large painting at print density, not screen density', () => {
    // Square: the height of the block is what binds, so that is what is asked.
    const square = fit(3000, 3000);
    expect(Math.round(dpi(square.height, MAX_IMAGE_HEIGHT_MM))).toBe(300);

    // Wide: the width between the margins binds instead.
    const wide = fit(4000, 2000);
    expect(Math.round(dpi(wide.width, CONTENT_WIDTH_MM))).toBe(300);
  });

  // What the old density actually produced, named so the regression is
  // recognisable rather than merely absent.
  it('is nowhere near the 584 pixels a square painting used to get', () => {
    expect(fit(3000, 3000).width).toBeGreaterThan(1700);
  });

  it('keeps the painting the shape it was photographed', () => {
    const { width, height } = fit(3000, 2000);

    expect(width / height).toBeCloseTo(1.5, 5);
  });

  // A tall painting runs out of page before it runs out of width.
  it('lets the height of the block decide for an upright painting', () => {
    const { width, height } = fit(2000, 4000);

    expect(Math.round(dpi(height, MAX_IMAGE_HEIGHT_MM))).toBe(300);
    expect(dpi(width, CONTENT_WIDTH_MM)).toBeLessThan(300);
    expect(width / height).toBeCloseTo(0.5, 5);
  });

  /**
   * Some of the older paintings were photographed small — the same ones the
   * reel threshold turns away. Blowing one up to 1724 pixels would make the
   * file larger and the picture no sharper, only softer.
   */
  it('never invents pixels a small photograph does not have', () => {
    const { width, height } = fit(400, 300);

    expect(width).toBe(400);
    expect(height).toBe(300);
  });
});
