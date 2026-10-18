import { IdleDrift } from '@domain/generative/idle-drift';
import { clamp } from '@domain/generative/math';
import { Parallax } from '@domain/generative/parallax';
import { ScreenGlow } from '@domain/generative/screen-glow';
import { Snowfall } from '@domain/generative/snowfall';
import { Frame, loadImages, Sketch } from './sketch';

const IMAGES_ROUTE = 'assets/images/canvases/';

/** How many depth bands the painting is cut into. */
const SLICES = 6;

/**
 * How far the nearest band moves, in pixels at a thousand-pixel frame.
 *
 * Small on purpose. Every pixel that moves is a pixel he painted, and past
 * about twenty the slices come apart at their edges and it reads as cardboard
 * cutouts rather than as depth.
 */
const SHIFT = 16;

/** Where the screen is in the painting, as a share of the frame. */
const SCREEN = { x: 0.52, y: 0.88, radius: 0.42 };

/**
 * How blue a pixel has to be, against its own brightness, to count as lit by
 * the screen rather than by the dusk behind.
 */
const COLD = 1.06;

/**
 * "Ipad light" — *Reflejo de luz de iPad* (2025), moving.
 *
 * Three things happen at once, and all three come out of the painting itself
 * rather than being laid over it.
 *
 * **It has depth.** The atelier measured how far away each part of the canvas
 * is, and the page cuts the painting into bands by that and shifts each by how
 * near it is. Behind them sits the same painting with the nearest figure taken
 * out and the hole filled in, so what a shifted band reveals is paint and not
 * a gap. Every pixel that moves is a pixel he painted: there is no model here
 * inventing anything.
 *
 * **It drifts on its own.** A painting that moves only when touched is a still
 * painting most of the time, and on a phone there is no pointer at all. So the
 * scene breathes slowly by itself and the pointer takes over when there is one.
 *
 * **The screen changes.** The face at the bottom is lit from below by a tablet,
 * and the pixels that light reaches are found once, at load, by how cold they
 * are against their own brightness. They are then brightened and dimmed over
 * time: a level held while something is read, a step when something else is
 * opened, a drift in between.
 *
 * And it snows, which is the one thing that is not in the painting.
 */
export class IpadLightSketch implements Sketch {
  private width = 0;
  private height = 0;

  private painting?: HTMLImageElement;
  private behind?: HTMLImageElement;

  /** One canvas per depth band, and the parallax that moves it. */
  private bands: { layer: HTMLCanvasElement; parallax: Parallax }[] = [];
  /** The screen-lit pixels, alone on transparency, drawn back additively. */
  private lit?: HTMLCanvasElement;

  private readonly snow = new Snowfall();
  private readonly glow = new ScreenGlow();
  private readonly drift = new IdleDrift();

  /** Where the painting is drawn: cover-fit, anchored to the bottom. */
  private frame = { x: 0, y: 0, width: 0, height: 0 };

  async setup(ctx: CanvasRenderingContext2D, width: number, height: number): Promise<void> {
    this.width = width;
    this.height = height;

    const images = await loadImages({
      painting: `${IMAGES_ROUTE}ipad-light.jpg`,
      behind: `${IMAGES_ROUTE}ipad-light-behind.jpg`,
      depth: `${IMAGES_ROUTE}ipad-light-depth.png`,
    });
    this.painting = images['painting'];
    this.behind = images['behind'];

    this.bands = band(images['painting'], images['depth']);
    this.lit = screenLit(images['painting']);
    this.snow.seed();
    this.measure();
  }

  resize(_ctx: CanvasRenderingContext2D, width: number, height: number): void {
    this.width = width;
    this.height = height;
    this.measure();
  }

  draw(ctx: CanvasRenderingContext2D, frame: Frame): void {
    if (!this.painting) return;
    const { x, y, width, height } = this.frame;

    // Where it is looking: the pointer while there is one, the drift
    // otherwise, and the drift again as soon as the pointer leaves.
    const looking = frame.pointer.active
      ? {
          x: clamp((frame.pointer.x / this.width) * 2 - 1, -1, 1),
          y: clamp((frame.pointer.y / this.height) * 2 - 1, -1, 1),
        }
      : this.drift.at(frame.t);

    // Black, not the page's background: the painting is cover-fitted and what
    // shows past it at an extreme window is the edge of the canvas, which
    // should read as a dark room rather than as a missing tile.
    ctx.fillStyle = '#07080b';
    ctx.fillRect(0, 0, this.width, this.height);

    // The filled background first and unmoved, so a band sliding off reveals
    // paint rather than a hole.
    if (this.behind) ctx.drawImage(this.behind, x, y, width, height);

    const scale = Math.max(width, height) / 1000;
    for (const slice of this.bands) {
      slice.parallax.update(looking.x, looking.y);
      ctx.drawImage(
        slice.layer,
        x + slice.parallax.x * scale,
        y + slice.parallax.y * scale,
        width,
        height
      );
    }

    this.drawScreen(ctx, frame.t);
    this.drawSnow(ctx, frame.dt);
  }

  /**
   * The screen brightening and dimming, over the pixels it lights.
   *
   * `lighter` rather than a wash: the light is added back to paint that is
   * already there, so the brightest parts of the face bloom and the shadows
   * it never reached stay where they were. A rectangle of translucent blue
   * would grey the whole corner instead.
   */
  private drawScreen(ctx: CanvasRenderingContext2D, t: number): void {
    if (!this.lit) return;
    const { x, y, width, height } = this.frame;

    const level = this.glow.at(t);
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    // Half of the level, because the paint already carries the light: this
    // is the change in it, not the whole of it.
    ctx.globalAlpha = clamp((level - 0.45) * 0.5, 0, 1);
    ctx.drawImage(this.lit, x, y, width, height);
    ctx.restore();
  }

  private drawSnow(ctx: CanvasRenderingContext2D, dt: number): void {
    this.snow.update(dt);
    const scale = Math.max(this.width, this.height) / 1000;

    ctx.save();
    ctx.fillStyle = '#e8eef6';
    for (const flake of this.snow.specks) {
      ctx.globalAlpha = flake.alpha;
      ctx.beginPath();
      ctx.arc(
        this.snow.across(flake) * this.width,
        flake.y * this.height,
        flake.size * scale,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
    ctx.restore();
  }

  /**
   * Cover-fit, anchored to the bottom.
   *
   * The painting's shape is the painting's and is not negotiable, so a window
   * of another shape loses some of the canvas rather than stretching it. What
   * it loses is the top: the sky and the skyline are the part that repeats,
   * and the face and the screen at the bottom are the part this is about.
   */
  private measure(): void {
    if (!this.painting) return;
    const scale = Math.max(
      this.width / this.painting.naturalWidth,
      this.height / this.painting.naturalHeight
    );
    const width = this.painting.naturalWidth * scale;
    const height = this.painting.naturalHeight * scale;

    this.frame = { x: (this.width - width) / 2, y: this.height - height, width, height };
  }
}

/**
 * The painting cut into bands by depth, nearest last.
 *
 * Each band is the whole frame with everything outside its depth range made
 * transparent, so they can be drawn one over another and shifted
 * independently. Done once at load: it is six passes over a megapixel.
 */
function band(
  painting: HTMLImageElement,
  depth: HTMLImageElement
): { layer: HTMLCanvasElement; parallax: Parallax }[] {
  const wide = painting.naturalWidth;
  const high = painting.naturalHeight;

  const read = document.createElement('canvas');
  read.width = wide;
  read.height = high;
  const reading = read.getContext('2d', { willReadFrequently: true });
  if (!reading) return [];

  reading.drawImage(painting, 0, 0);
  const paint = reading.getImageData(0, 0, wide, high);

  // The depth map is half the size of the painting and that is deliberate:
  // it is smooth, and the bytes are better spent on the paint.
  reading.clearRect(0, 0, wide, high);
  reading.drawImage(depth, 0, 0, wide, high);
  const near = reading.getImageData(0, 0, wide, high);

  const bands: { layer: HTMLCanvasElement; parallax: Parallax }[] = [];
  for (let at = 0; at < SLICES; at++) {
    const from = (at / SLICES) * 255;
    const to = ((at + 1) / SLICES) * 255;

    const layer = document.createElement('canvas');
    layer.width = wide;
    layer.height = high;
    const onto = layer.getContext('2d');
    if (!onto) continue;

    const cut = new ImageData(new Uint8ClampedArray(paint.data), wide, high);
    for (let pixel = 0; pixel < near.data.length; pixel += 4) {
      const howNear = near.data[pixel];
      // A pixel belongs to exactly one band, and the edges overlap by a
      // little so a slice does not leave a hairline of background behind it.
      if (howNear < from - 6 || howNear >= to + 6) cut.data[pixel + 3] = 0;
    }
    onto.putImageData(cut, 0, 0);

    // Nearer bands move further. The far sky barely moves, which is what
    // makes the near face read as near.
    const depthOf = (at + 1) / SLICES;
    bands.push({ layer, parallax: new Parallax(depthOf, SHIFT, 0.045) });
  }
  return bands;
}

/**
 * The pixels the screen lights, alone on transparency.
 *
 * Found by colour rather than by hand: the tablet is the only cold light in a
 * painting lit otherwise by a dusk sky, so a pixel whose blue runs ahead of
 * its own average brightness, in the lower middle of the canvas, is lit by it.
 * Everything else is cleared.
 *
 * Done once at load, and the result is an image like any other.
 */
function screenLit(painting: HTMLImageElement): HTMLCanvasElement | undefined {
  const wide = painting.naturalWidth;
  const high = painting.naturalHeight;

  const canvas = document.createElement('canvas');
  canvas.width = wide;
  canvas.height = high;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return undefined;

  ctx.drawImage(painting, 0, 0);
  const pixels = ctx.getImageData(0, 0, wide, high);
  const { data } = pixels;

  for (let at = 0; at < data.length; at += 4) {
    const pixel = at / 4;
    const x = (pixel % wide) / wide;
    const y = Math.floor(pixel / wide) / high;

    // How far this pixel is from the screen, as a share of the frame, with
    // the falloff squared so the edge of the pool is soft.
    const away = Math.hypot((x - SCREEN.x) * 1.1, y - SCREEN.y) / SCREEN.radius;
    const reach = 1 - Math.min(1, away) ** 2;

    const red = data[at];
    const green = data[at + 1];
    const blue = data[at + 2];
    const average = (red + green + blue) / 3;
    // Cold: more blue than the pixel's own brightness, by a margin.
    const cold = average > 0 ? blue / average : 0;
    const how = cold < COLD ? 0 : Math.min(1, (cold - COLD) * 3);

    data[at + 3] = Math.round(255 * how * reach);
  }

  ctx.putImageData(pixels, 0, 0);
  return canvas;
}
