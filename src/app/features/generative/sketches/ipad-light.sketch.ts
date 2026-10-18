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

/**
 * How much bigger than a cover fit the painting is drawn.
 *
 * A plain cover fit puts the bottom edge of the canvas exactly along the
 * bottom of the window, and the painted edge of a canvas, seen end-on, reads
 * as a crop rather than as an edge. Five per cent is enough to carry it out of
 * the frame and not enough to cost anything at the top.
 */
const GROWS = 1.05;

/** Where the screen is in the painting, as a share of the frame. */
const SCREEN = { x: 0.52, y: 0.88, radius: 0.52 };

/**
 * The colour of the paint the screen lights: #DBDBDB, his pick.
 *
 * The tablet is under her chin and what it reaches, he paints as that pale
 * neutral grey — the forehead, the cheek, the collar, the lit side of the
 * coat. Keying on it finds exactly those and leaves the dusk alone.
 */
const SCREEN_GREY = { red: 0xdb, green: 0xdb, blue: 0xdb };

/**
 * How far from that grey a pixel may be and still count, in RGB distance.
 *
 * Measured rather than guessed: at 110 it catches only the two brightest
 * planes of the face, at 145 the whole of the face and the collar, and at 170
 * her shoulder, the lit side of the coat, the near hand and the goose's head
 * as well — everything in front of her, and still nothing of the blue shirt
 * behind.
 */
const NEAR = 170;

/** The colour added back when the screen brightens: a cold white. */
const SCREEN_LIGHT = '#cfe4ff';

/**
 * How much of the light a pixel has to take to count towards its depth.
 *
 * The mask reaches her face, her coat, the near hand and the goose, and those
 * are not all the same distance away, so an average over the whole of it rides
 * at a depth nothing is actually at: measured in Chrome, her face travelled 43
 * pixels and the light following that average travelled 20, which is the light
 * sliding off her face as the pointer crosses. Taken over the part of the mask
 * the light actually lands on, the depth is her face's, and the two travel
 * together.
 */
const STRONGEST = 0.6;

/**
 * "Ipad light" — *Reflejo de luz de iPad* (2025), moving.
 *
 * Three things happen at once, and all three come out of the painting itself
 * rather than being laid over it.
 *
 * **It has depth.** The atelier measured how far away each part of the canvas
 * is, and the page cuts the painting into bands by that and shifts each by how
 * near it is. Behind them sits the painting again, whole and unmoved, so what
 * a shifted band reveals is his paint in the colour it already was. Every
 * pixel that moves is a pixel he painted: there is no model here inventing
 * anything, and nothing filled in by one either.
 *
 * **It drifts on its own.** A painting that moves only when touched is a still
 * painting most of the time, and on a phone there is no pointer at all. So the
 * scene breathes slowly by itself and the pointer takes over when there is one.
 *
 * **The screen changes.** The face at the bottom is lit from below by a tablet,
 * and the paint that light reaches is found once, at load, by how near it is to
 * the grey he picked. It is then dimmed and brightened over time — dark enough
 * to read as a screen gone to sleep, bright enough to blow the cheek out — with
 * a level held while something is read, a step when something else is opened,
 * and a drift in between.
 *
 * And it snows, which is the one thing that is not in the painting.
 */
export class IpadLightSketch implements Sketch {
  private width = 0;
  private height = 0;

  private painting?: HTMLImageElement;

  /** One canvas per depth band, and the parallax that moves it. */
  private bands: { layer: HTMLCanvasElement; parallax: Parallax }[] = [];
  /** The screen's light and its absence, each alone on transparency. */
  private lit?: HTMLCanvasElement;
  private unlit?: HTMLCanvasElement;
  /**
   * And the parallax that carries them, at the depth of the paint they fall
   * on. Without it the light stays put while her face slides out from under
   * it, which reads as a stain on the glass rather than as her being lit.
   */
  private glowParallax?: Parallax;

  // Twice the default snow, bigger and more solid: at a hundred small faint
  // flakes it was weather you had to be told about.
  private readonly snow = new Snowfall(180, 28);
  private readonly glow = new ScreenGlow();
  private readonly drift = new IdleDrift();

  /** Where the painting is drawn: cover-fit, grown, anchored to the bottom. */
  private frame = { x: 0, y: 0, width: 0, height: 0 };

  async setup(ctx: CanvasRenderingContext2D, width: number, height: number): Promise<void> {
    this.width = width;
    this.height = height;

    const images = await loadImages({
      painting: `${IMAGES_ROUTE}ipad-light.jpg`,
      depth: `${IMAGES_ROUTE}ipad-light-depth.png`,
    });
    this.painting = images['painting'];

    this.bands = band(images['painting'], images['depth']);
    const screen = screenLit(images['painting'], images['depth']);
    this.lit = screen?.lit;
    this.unlit = screen?.unlit;
    if (screen) this.glowParallax = new Parallax(screen.depthOf, SHIFT, 0.045);
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

    // The painting itself first, whole and unmoved, so a band sliding off
    // reveals paint rather than a hole — and dimmed into the black, because
    // the bands between them cover every pixel of it and the only place it
    // ever shows is the sliver a shifted band uncovers. At full strength that
    // sliver is the same contour drawn twice, a hairline tracing her shoulder;
    // dimmed, it is the shadow a near thing casts on what is behind it.
    ctx.save();
    ctx.globalAlpha = 0.45;
    ctx.drawImage(this.painting, x, y, width, height);
    ctx.restore();

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

    this.drawScreen(ctx, frame.t, looking, scale);
    this.drawSnow(ctx, frame.dt);
  }

  /**
   * The screen brightening and dimming, over the paint it lights.
   *
   * Both ways, because one way is not visible. Added light alone reads as a
   * faint bloom on paint that is already pale; taken away first, the same
   * swing is a face going dark and then lighting up again, which is what a
   * screen does to a face. Dimming is drawn over, brightening is drawn
   * additively, and between them the cheek travels most of its range.
   *
   * Both move with the paint, at the depth of the paint they were found on.
   */
  private drawScreen(
    ctx: CanvasRenderingContext2D,
    t: number,
    looking: { x: number; y: number },
    scale: number
  ): void {
    const { width, height } = this.frame;
    const level = this.glow.at(t);

    this.glowParallax?.update(looking.x, looking.y);
    const x = this.frame.x + (this.glowParallax?.x ?? 0) * scale;
    const y = this.frame.y + (this.glowParallax?.y ?? 0) * scale;

    // Where the two cross, and how far each side reaches. The glow runs 0.45
    // to 1.15, and the span is the longer half of that, so brightening is at
    // full strength only at the very top of its range: a shorter span holds
    // there instead, and a forehead that stays white has stopped being a
    // screen and become a lamp.
    const middle = 0.78;
    const span = 0.37;

    if (this.unlit) {
      const dim = clamp((middle - level) / span, 0, 1) * 0.82;
      if (dim > 0) {
        ctx.save();
        ctx.globalAlpha = dim;
        ctx.drawImage(this.unlit, x, y, width, height);
        ctx.restore();
      }
    }

    if (this.lit) {
      const bright = clamp((level - middle) / span, 0, 1);
      if (bright > 0) {
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        ctx.globalAlpha = bright;
        ctx.drawImage(this.lit, x, y, width, height);
        ctx.restore();
      }
    }
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
   * Cover-fit, grown by `GROWS`, anchored so the growth leaves at the bottom.
   *
   * The painting's shape is the painting's and is not negotiable, so a window
   * of another shape loses some of the canvas rather than stretching it. What
   * it loses is the top: the sky and the skyline are the part that repeats,
   * and the face and the screen at the bottom are the part this is about. The
   * extra five per cent is spent entirely below the window, which is where the
   * painted edge of the canvas was showing.
   */
  private measure(): void {
    if (!this.painting) return;
    const cover = Math.max(
      this.width / this.painting.naturalWidth,
      this.height / this.painting.naturalHeight
    );
    const width = this.painting.naturalWidth * cover * GROWS;
    const height = this.painting.naturalHeight * cover * GROWS;

    // The top stays where a plain cover fit would have put it, so everything
    // the growth adds falls past the bottom edge of the window.
    const spare = height - this.painting.naturalHeight * cover;
    this.frame = {
      x: (this.width - width) / 2,
      y: this.height - height + spare,
      width,
      height,
    };
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
 * The screen's light and its absence, as two masks.
 *
 * One shape, drawn twice in different colours. A pixel belongs to it by how
 * near its paint is to `SCREEN_GREY` and how near it is to the screen, and
 * both of those are soft, so the mask has no edge to see. `lit` is that shape
 * in cold white, to be added; `unlit` is the same shape in near-black, to be
 * laid over. Done once at load, and the results are images like any other.
 *
 * `depthOf` comes back with them: the average depth of the paint the mask
 * fell on, weighted by how much of each pixel it took. It is what lets the
 * light travel with the face rather than sit still while the face moves.
 */
function screenLit(
  painting: HTMLImageElement,
  depth: HTMLImageElement
): { lit: HTMLCanvasElement; unlit: HTMLCanvasElement; depthOf: number } | undefined {
  const wide = painting.naturalWidth;
  const high = painting.naturalHeight;

  const read = document.createElement('canvas');
  read.width = wide;
  read.height = high;
  const reading = read.getContext('2d', { willReadFrequently: true });
  if (!reading) return undefined;

  reading.drawImage(painting, 0, 0);
  const { data } = reading.getImageData(0, 0, wide, high);

  reading.clearRect(0, 0, wide, high);
  reading.drawImage(depth, 0, 0, wide, high);
  const near = reading.getImageData(0, 0, wide, high);

  let deep = 0;
  let weight = 0;

  const shape = new Uint8ClampedArray(wide * high * 4);
  for (let at = 0; at < data.length; at += 4) {
    const pixel = at / 4;
    const x = (pixel % wide) / wide;
    const y = Math.floor(pixel / wide) / high;

    // How far this pixel is from the screen, as a share of the frame, with
    // the falloff squared so the edge of the pool is soft.
    const away = Math.hypot((x - SCREEN.x) * 1.1, y - SCREEN.y) / SCREEN.radius;
    const reach = 1 - Math.min(1, away) ** 2;

    // And how near its paint is to the grey the screen leaves on her.
    const red = data[at] - SCREEN_GREY.red;
    const green = data[at + 1] - SCREEN_GREY.green;
    const blue = data[at + 2] - SCREEN_GREY.blue;
    const like = 1 - Math.min(1, Math.sqrt(red * red + green * green + blue * blue) / NEAR);

    const how = like * reach;
    shape[at + 3] = Math.round(255 * how);
    if (how > STRONGEST) {
      deep += near.data[at] / 255;
      weight += 1;
    }
  }

  return {
    lit: paint(shape, wide, high, SCREEN_LIGHT),
    unlit: paint(shape, wide, high, '#05060a'),
    // If nothing matched there is nothing to move, and the nearest band is
    // as good a guess as any.
    depthOf: weight > 0 ? deep / weight : 1,
  };
}

/** The mask's shape filled with one colour, keeping its alpha. */
function paint(
  shape: Uint8ClampedArray,
  wide: number,
  high: number,
  colour: string
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = wide;
  canvas.height = high;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  ctx.putImageData(new ImageData(new Uint8ClampedArray(shape), wide, high), 0, 0);
  // Colour in only where the mask already is: `source-in` keeps the alpha it
  // was given and replaces everything else about it.
  ctx.globalCompositeOperation = 'source-in';
  ctx.fillStyle = colour;
  ctx.fillRect(0, 0, wide, high);
  return canvas;
}
