// Pure image helpers for PDF generation: loading with CORS, canvas
// compression and the black & white zoomed cover treatment. No Angular here.

/**
 * Print density of the artwork images, in dots per inch.
 *
 * This was 4 pixels per millimetre, which is 101.6 dpi — a screen figure — on
 * a page meant to be printed or read at full size. The page is 210mm square
 * with 24mm margins, so a square painting is drawn 146mm across: at the old
 * density that was 584 pixels taken from a source 3000 pixels square, and the
 * weave of the canvas turned to mush. 300 dpi is what a printer asks for and
 * what a gallery submission expects; over the same 146mm that is about 1724
 * pixels, which every source in the catalogue can supply.
 */
const PRINT_DPI = 300;
const MM_PER_INCH = 25.4;
const PX_PER_MM = PRINT_DPI / MM_PER_INCH;

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Could not load image: ${src}`));
  });
}

// Walks a best-quality-first candidate list until one source loads
// (e.g. IPFS originals may be blocked by firewalls)
export async function loadFirstAvailableImage(urls: string[]): Promise<HTMLImageElement> {
  for (const url of urls) {
    try {
      return await loadImage(url);
    } catch {
      // Source unreachable: try the next best quality
    }
  }
  throw new Error('No image source could be loaded.');
}

/**
 * How many pixels to draw for a box measured in millimetres on the page.
 *
 * Separated from the drawing so it can be checked without a canvas, since the
 * arithmetic is the whole of what went wrong: the box is in page units and the
 * answer is in pixels, and the constant between them decides whether a printed
 * painting shows its weave or its pixels.
 *
 * Never upscales. A source smaller than the box is drawn at its own size
 * rather than interpolated up to a sharpness it does not have.
 */
export function fitToPrintBox(
  source: { width: number; height: number },
  maxWidthMm: number,
  maxHeightMm: number
): { width: number; height: number } {
  const aspectRatio = source.width / source.height;
  let width = Math.min(source.width, maxWidthMm * PX_PER_MM);
  let height = width / aspectRatio;
  if (height > maxHeightMm * PX_PER_MM) {
    height = maxHeightMm * PX_PER_MM;
    width = height * aspectRatio;
  }
  return { width, height };
}

// Fits the image to the box (in mm) at print density and re-encodes as JPEG.
export function compressImage(
  img: HTMLImageElement,
  maxWidthMm: number,
  maxHeightMm: number
): string {
  const { width, height } = fitToPrintBox(img, maxWidthMm, maxHeightMm);
  const canvas = drawToCanvas(img, width, height);
  return canvas.toDataURL('image/jpeg', 0.8);
}

// Cover treatment: random square crop (zoomed into the artwork) converted
// to black & white.
export function grayscaleZoomedSquare(img: HTMLImageElement, sizePx = 1200, zoom = 2.2): string {
  const cropSize = Math.min(img.width, img.height) / zoom;
  const sx = (img.width - cropSize) * Math.random();
  const sy = (img.height - cropSize) * Math.random();

  const canvas = document.createElement('canvas');
  canvas.width = sizePx;
  canvas.height = sizePx;
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(img, sx, sy, cropSize, cropSize, 0, 0, sizePx, sizePx);

  const imageData = ctx.getImageData(0, 0, sizePx, sizePx);
  const pixels = imageData.data;
  for (let i = 0; i < pixels.length; i += 4) {
    const luminance = 0.299 * pixels[i] + 0.587 * pixels[i + 1] + 0.114 * pixels[i + 2];
    pixels[i] = pixels[i + 1] = pixels[i + 2] = luminance;
  }
  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL('image/jpeg', 0.82);
}

function drawToCanvas(img: HTMLImageElement, width: number, height: number): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  canvas.getContext('2d')!.drawImage(img, 0, 0, width, height);
  return canvas;
}
