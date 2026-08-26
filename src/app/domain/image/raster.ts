/**
 * Pixels as a canvas hands them over: RGBA, four bytes each, row major.
 *
 * The buffer is pinned to a plain ArrayBuffer rather than left open, because
 * an ImageData can only be built over one of those, and building an ImageData
 * is how the finished picture gets back onto a canvas to be saved.
 */
export interface Raster {
  width: number;
  height: number;
  data: Uint8ClampedArray<ArrayBuffer>;
}

export interface Size {
  width: number;
  height: number;
}

export function createRaster(width: number, height: number): Raster {
  return { width, height, data: new Uint8ClampedArray(width * height * 4) };
}

/** Rec. 709, the weighting that matches how bright a colour actually looks. */
export function luminance(r: number, g: number, b: number): number {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Averages whole blocks of source pixels rather than picking one of them.
 *
 * Detection runs on a small copy of the photo, and dropping pixels to make it
 * would alias the canvas weave and the brushwork into edges that are not
 * there — which is exactly what the corner finder is looking for.
 */
export function downscale(source: Raster, maxSide: number): Raster {
  const scale = Math.min(1, maxSide / Math.max(source.width, source.height));
  if (scale >= 1) return source;

  const width = Math.max(1, Math.round(source.width * scale));
  const height = Math.max(1, Math.round(source.height * scale));
  const out = createRaster(width, height);
  const xRatio = source.width / width;
  const yRatio = source.height / height;

  for (let y = 0; y < height; y++) {
    const y0 = Math.floor(y * yRatio);
    const y1 = Math.max(y0 + 1, Math.floor((y + 1) * yRatio));
    for (let x = 0; x < width; x++) {
      const x0 = Math.floor(x * xRatio);
      const x1 = Math.max(x0 + 1, Math.floor((x + 1) * xRatio));
      let r = 0;
      let g = 0;
      let b = 0;
      let n = 0;
      for (let sy = y0; sy < y1 && sy < source.height; sy++) {
        for (let sx = x0; sx < x1 && sx < source.width; sx++) {
          const i = (sy * source.width + sx) * 4;
          r += source.data[i];
          g += source.data[i + 1];
          b += source.data[i + 2];
          n++;
        }
      }
      const o = (y * width + x) * 4;
      out.data[o] = r / n;
      out.data[o + 1] = g / n;
      out.data[o + 2] = b / n;
      out.data[o + 3] = 255;
    }
  }
  return out;
}

export function toLuminance(source: Raster): Float32Array {
  const out = new Float32Array(source.width * source.height);
  for (let p = 0; p < out.length; p++) {
    const i = p * 4;
    out[p] = luminance(source.data[i], source.data[i + 1], source.data[i + 2]);
  }
  return out;
}

/**
 * Separable Gaussian over a single float plane.
 *
 * Only ever used on the small planes — the detection copy and the illumination
 * estimate — so the cost of a true Gaussian is affordable and there is no
 * reason to approximate it with repeated box passes.
 */
export function blur(
  plane: Float32Array,
  width: number,
  height: number,
  sigma: number
): Float32Array {
  if (sigma <= 0) return plane;

  const radius = Math.max(1, Math.ceil(sigma * 3));
  const kernel = new Float32Array(radius * 2 + 1);
  let sum = 0;
  for (let k = -radius; k <= radius; k++) {
    const weight = Math.exp(-(k * k) / (2 * sigma * sigma));
    kernel[k + radius] = weight;
    sum += weight;
  }
  for (let k = 0; k < kernel.length; k++) kernel[k] /= sum;

  const horizontal = new Float32Array(plane.length);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let value = 0;
      for (let k = -radius; k <= radius; k++) {
        const sx = Math.min(width - 1, Math.max(0, x + k));
        value += plane[y * width + sx] * kernel[k + radius];
      }
      horizontal[y * width + x] = value;
    }
  }

  const out = new Float32Array(plane.length);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let value = 0;
      for (let k = -radius; k <= radius; k++) {
        const sy = Math.min(height - 1, Math.max(0, y + k));
        value += horizontal[sy * width + x] * kernel[k + radius];
      }
      out[y * width + x] = value;
    }
  }
  return out;
}

/** Reads a small plane at full-image coordinates, for fields estimated on a shrunken copy. */
export function sampleBilinear(
  plane: Float32Array,
  width: number,
  height: number,
  x: number,
  y: number
): number {
  const cx = Math.min(width - 1, Math.max(0, x));
  const cy = Math.min(height - 1, Math.max(0, y));
  const x0 = Math.floor(cx);
  const y0 = Math.floor(cy);
  const x1 = Math.min(width - 1, x0 + 1);
  const y1 = Math.min(height - 1, y0 + 1);
  const fx = cx - x0;
  const fy = cy - y0;

  const top = plane[y0 * width + x0] * (1 - fx) + plane[y0 * width + x1] * fx;
  const bottom = plane[y1 * width + x0] * (1 - fx) + plane[y1 * width + x1] * fx;
  return top * (1 - fy) + bottom * fy;
}
