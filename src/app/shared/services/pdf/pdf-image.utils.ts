// Pure image helpers for PDF generation: loading with CORS, canvas
// compression and the black & white zoomed cover treatment. No Angular here.

// Rough print density: canvas pixels rendered per output millimeter
const PX_PER_MM = 4;

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

// Downscales to the box (in mm) and re-encodes as JPEG for a lighter PDF
export function compressImage(
  img: HTMLImageElement,
  maxWidthMm: number,
  maxHeightMm: number
): string {
  const aspectRatio = img.width / img.height;
  let width = Math.min(img.width, maxWidthMm * PX_PER_MM);
  let height = width / aspectRatio;
  if (height > maxHeightMm * PX_PER_MM) {
    height = maxHeightMm * PX_PER_MM;
    width = height * aspectRatio;
  }
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
