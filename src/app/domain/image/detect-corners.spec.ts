import { createRaster, type Raster } from './raster';
import { detectQuad } from './detect-corners';
import type { Quad } from './quad';

/**
 * A painting whose own composition is bolder than its rim.
 *
 * Four flat quadrants meet in a cross through the middle, so the longest,
 * highest-contrast straight lines in the picture are inside the painting
 * rather than around it. Photographed at an angle and lit from one side,
 * which is the ordinary case, not a contrived one.
 */
function hardPhoto(): { raster: Raster; quad: Quad } {
  const W = 1400;
  const H = 1050;
  const corners: [number, number][] = [
    [180, 120],
    [1235, 205],
    [1180, 900],
    [230, 835],
  ];
  const [p0, p1, p2, p3] = corners;
  const dx1 = p1[0] - p2[0];
  const dx2 = p3[0] - p2[0];
  const dx3 = p0[0] - p1[0] + p2[0] - p3[0];
  const dy1 = p1[1] - p2[1];
  const dy2 = p3[1] - p2[1];
  const dy3 = p0[1] - p1[1] + p2[1] - p3[1];
  const den = dx1 * dy2 - dx2 * dy1;
  const g = (dx3 * dy2 - dx2 * dy3) / den;
  const h = (dx1 * dy3 - dx3 * dy1) / den;
  const a = p1[0] - p0[0] + g * p1[0];
  const b = p3[0] - p0[0] + h * p3[0];
  const c = p0[0];
  const d = p1[1] - p0[1] + g * p1[1];
  const e = p3[1] - p0[1] + h * p3[1];
  const f = p0[1];
  const project = (u: number, v: number): [number, number] => {
    const w = g * u + h * v + 1;
    return [(a * u + b * v + c) / w, (d * u + e * v + f) / w];
  };

  const raster = createRaster(W, H);
  for (let i = 0; i < raster.data.length; i += 4) {
    raster.data[i] = 35;
    raster.data[i + 1] = 35;
    raster.data[i + 2] = 41;
    raster.data[i + 3] = 255;
  }

  const quarters: [number, number, number][] = [
    [200, 50, 45],
    [47, 143, 69],
    [42, 79, 168],
    [216, 176, 42],
  ];
  const steps = 2400;
  for (let sy = 0; sy < steps; sy++) {
    for (let sx = 0; sx < steps; sx++) {
      const u = sx / steps;
      const v = sy / steps;
      const [x, y] = project(u, v);
      const px = Math.round(x);
      const py = Math.round(y);
      if (px < 0 || py < 0 || px >= W || py >= H) continue;
      const colour = quarters[v < 0.5 ? (u < 0.5 ? 0 : 1) : u < 0.5 ? 3 : 2];
      const i = (py * W + px) * 4;
      raster.data[i] = colour[0];
      raster.data[i + 1] = colour[1];
      raster.data[i + 2] = colour[2];
    }
  }

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const lamp = 0.72 + (0.56 * x) / W;
      const i = (y * W + x) * 4;
      raster.data[i] *= lamp;
      raster.data[i + 1] *= lamp;
      raster.data[i + 2] *= lamp;
    }
  }

  return { raster, quad: corners.map(([x, y]) => ({ x, y })) as Quad };
}

describe('detectQuad, on a painting with a strong internal cross', () => {
  it('outlines the painting rather than one of its own quadrants', () => {
    const { raster, quad } = hardPhoto();
    const found = detectQuad(raster);

    expect(found.detected).toBe(true);
    found.quad.forEach((corner, i) => {
      expect(Math.hypot(corner.x - quad[i].x, corner.y - quad[i].y)).toBeLessThan(12);
    });
  });
});
