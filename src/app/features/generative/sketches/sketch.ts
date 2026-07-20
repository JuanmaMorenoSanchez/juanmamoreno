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

/** Loads a set of images and resolves once all are decoded, keyed by name. */
export async function loadImages(
  sources: Record<string, string>
): Promise<Record<string, HTMLImageElement>> {
  const pairs = await Promise.all(
    Object.entries(sources).map(
      ([key, src]) =>
        new Promise<[string, HTMLImageElement]>((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve([key, img]);
          img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
          img.src = src;
        })
    )
  );
  return Object.fromEntries(pairs);
}
