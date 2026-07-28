// Canvas 2D sketch contract. A sketch is pure drawing logic: the host component
// owns the <canvas>, the animation loop, sizing (devicePixelRatio) and input,
// and calls into these hooks. No rendering library — everything maps to the
// native CanvasRenderingContext2D.

export interface Pointer {
  /** Position in CSS pixels, relative to the canvas. */
  x: number;
  y: number;
  /** Velocity in CSS pixels per frame (decays when the pointer is still). */
  vx: number;
  vy: number;
  /** True while a button/touch is held. */
  down: boolean;
  /** Whether the pointer has ever been over the canvas this session. */
  active: boolean;
}

export interface Frame {
  /** Seconds since the sketch started. */
  t: number;
  /** Seconds since the previous frame. */
  dt: number;
  /** Canvas size in CSS pixels. */
  width: number;
  height: number;
  pointer: Pointer;
}

export interface Sketch {
  /** One-time setup (e.g. load images, seed state). May be async. */
  setup(ctx: CanvasRenderingContext2D, width: number, height: number): void | Promise<void>;
  /** Called once per animation frame. */
  draw(ctx: CanvasRenderingContext2D, frame: Frame): void;
  /** The canvas was resized (CSS pixels); ctx is ready for a base repaint. */
  resize?(ctx: CanvasRenderingContext2D, width: number, height: number): void;
  /** A press/tap happened at the given CSS-pixel position. */
  pointerDown?(x: number, y: number): void;
  /** Free any resources. */
  dispose?(): void;
}

export type SketchFactory = () => Sketch;

// Pure numeric helpers live in @domain/generative/math. This module keeps only
// the browser-dependent bits (the Sketch contract and image loading).

// A transient failure — a dev-server rebuild mid-request, a flaky or aborted
// fetch — can fire `onerror` on an asset that is actually fine, which is why the
// same sketch loads most of the time and occasionally throws. Retry a couple of
// times with a short backoff (cache-busting so an aborted attempt isn't reused)
// before giving up.
const MAX_IMAGE_RETRIES = 3;

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    let attempt = 0;
    const start = (): void => {
      img.src = attempt === 0 ? src : `${src}?retry=${attempt}`;
    };
    img.onload = () => resolve(img);
    img.onerror = () => {
      if (attempt < MAX_IMAGE_RETRIES) {
        attempt++;
        setTimeout(start, 200 * attempt);
      } else {
        reject(new Error(`Failed to load image: ${src}`));
      }
    };
    start();
  });
}

/** Loads a set of images and resolves once all are decoded, keyed by name. */
export async function loadImages(
  sources: Record<string, string>
): Promise<Record<string, HTMLImageElement>> {
  const entries = Object.entries(sources);
  const images = await Promise.all(entries.map(([, src]) => loadImage(src)));
  return Object.fromEntries(entries.map(([key], index) => [key, images[index]]));
}
