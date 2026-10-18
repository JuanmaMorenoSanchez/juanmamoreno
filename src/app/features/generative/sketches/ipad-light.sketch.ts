import { IdleDrift } from '@domain/generative/idle-drift';
import { clamp } from '@domain/generative/math';
import { Parallax } from '@domain/generative/parallax';
import { Cast, ScreenGlow } from '@domain/generative/screen-glow';
import { Snowfall } from '@domain/generative/snowfall';
import { Frame, loadImages, Sketch } from './sketch';

const IMAGES_ROUTE = 'assets/images/canvases/';

/**
 * The four cuts the painting comes apart into, farthest first, and how near
 * each one is.
 *
 * These are his cuts, made in the atelier: each one is the painting with
 * everything outside it made transparent, and no model has invented a pixel
 * of any of them. The alternative was slicing the canvas by a depth map,
 * which puts the seams wherever the arithmetic falls — through an arm, along
 * a fold — and makes every one of them show when the slice moves. A cut that
 * follows what is in the painting moves the way the thing in it would.
 *
 * Only the cut is kept as a file: a cut is one channel, so these are masks,
 * and the colour comes from the painting at load.
 */
const CUTS = [
  { name: 'ground', depth: 0.1 },
  { name: 'limbs', depth: 0.45 },
  { name: 'shirt', depth: 0.72 },
  { name: 'girl', depth: 1 },
] as const;

/**
 * How far the nearest cut moves, in pixels at a thousand-pixel frame.
 *
 * Twice what the depth slices could take. A slice came apart at its edges
 * past about twenty, because its edges were nowhere in particular; a cut that
 * is a figure can be moved as far as a figure in front of a landscape moves,
 * and under twenty you could barely see it move at all.
 */
const SHIFT = 34;

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

/**
 * "Ipad light" — *Reflejo de luz de iPad* (2025), moving.
 *
 * Three things happen at once, and all three come out of the painting itself
 * rather than being laid over it.
 *
 * **It has depth.** The painting comes apart into four cuts he made in the
 * atelier — the girl, the blue shirt, the limbs, the ground behind them — and
 * each moves by how near it is. Behind them sits the painting again, whole and
 * unmoved and dimmed into the black, so what a shifted cut reveals is his
 * paint in the colour it already was, in shadow. Every pixel that moves is a
 * pixel he painted: there is no model here inventing anything, and nothing
 * filled in by one either.
 *
 * **It drifts on its own.** A painting that moves only when touched is a still
 * painting most of the time, and on a phone there is no pointer at all. So the
 * scene turns slowly by itself, at a steady rate rather than swinging to a
 * stop at each end, and the pointer takes over when there is one.
 *
 * **The screen changes.** The paint the tablet lights is found once, at load,
 * by how near it is to the grey he picked. It is then dimmed and brightened
 * over time — dark enough to read as a screen gone to sleep, bright enough to
 * blow the cheek out — and it takes a cast as it changes, half the time the
 * plain cold white and the rest a third of the way towards a red, a blue, a
 * yellow. It rides on the girl's own cut, so the light travels with the face
 * it is falling on.
 *
 * And it snows, which is the one thing that is not in the painting.
 */
export class IpadLightSketch implements Sketch {
  private width = 0;
  private height = 0;

  private painting?: HTMLImageElement;

  /** One canvas per cut, and the parallax that moves it. */
  private layers: { sprite: HTMLCanvasElement; parallax: Parallax }[] = [];
  /** The screen's light and its absence, each alone on transparency. */
  private lit?: HTMLCanvasElement;
  private unlit?: HTMLCanvasElement;
  /** A scratch the size of the window, where the light is given its colour. */
  private tinted?: HTMLCanvasElement;

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

    const wanted: Record<string, string> = { painting: `${IMAGES_ROUTE}ipad-light.jpg` };
    for (const each of CUTS) wanted[each.name] = `${IMAGES_ROUTE}ipad-light-${each.name}.png`;

    const images = await loadImages(wanted);
    this.painting = images['painting'];

    this.layers = CUTS.map((each) => ({
      sprite: cut(images['painting'], images[each.name]),
      parallax: new Parallax(each.depth, SHIFT, 0.06),
    }));

    const screen = screenLit(images['painting']);
    this.lit = screen?.lit;
    this.unlit = screen?.unlit;
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

    // The painting itself first, whole and unmoved, so a cut sliding off
    // reveals paint rather than a hole — and dimmed into the black, because
    // the cuts between them cover nearly all of it and the only place it ever
    // shows is what one of them uncovers. At full strength that sliver is the
    // same contour drawn twice; dimmed, it is the shadow a near thing casts
    // on what is behind it.
    ctx.save();
    ctx.globalAlpha = 0.45;
    ctx.drawImage(this.painting, x, y, width, height);
    ctx.restore();

    const scale = Math.max(width, height) / 1000;
    for (const layer of this.layers) {
      layer.parallax.update(looking.x, looking.y);
      ctx.drawImage(
        layer.sprite,
        x + layer.parallax.x * scale,
        y + layer.parallax.y * scale,
        width,
        height
      );
    }

    this.drawScreen(ctx, frame.t, scale);
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
   * Both ride on the girl's cut, which is the paint they fall on, so the
   * light travels with her rather than staying put while she moves out from
   * under it and reading as a stain on the glass.
   */
  private drawScreen(ctx: CanvasRenderingContext2D, t: number, scale: number): void {
    const { width, height } = this.frame;
    const level = this.glow.at(t);

    const rides = this.layers[this.layers.length - 1]?.parallax;
    const x = this.frame.x + (rides?.x ?? 0) * scale;
    const y = this.frame.y + (rides?.y ?? 0) * scale;

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

    const bright = clamp((level - middle) / span, 0, 1);
    const coloured = bright > 0 ? this.colour(this.glow.tint(t), x, y) : undefined;
    if (coloured) {
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.globalAlpha = bright;
      ctx.drawImage(coloured, 0, 0);
      ctx.restore();
    }
  }

  /**
   * The light's shape, given the colour it is this second.
   *
   * On a scratch the size of the window rather than by keeping a copy of the
   * mask per colour: the colour moves every couple of seconds and eases while
   * it moves, so there is no fixed set of them to keep. `source-in` throws
   * away what the mask was painted in and keeps only its shape.
   */
  private colour(tint: Cast, x: number, y: number): HTMLCanvasElement | undefined {
    if (!this.lit || !this.tinted) return undefined;
    const onto = this.tinted.getContext('2d');
    if (!onto) return undefined;

    onto.clearRect(0, 0, this.width, this.height);
    onto.drawImage(this.lit, x, y, this.frame.width, this.frame.height);
    onto.globalCompositeOperation = 'source-in';
    onto.fillStyle = `rgb(${Math.round(tint.red)} ${Math.round(tint.green)} ${Math.round(tint.blue)})`;
    onto.fillRect(0, 0, this.width, this.height);
    onto.globalCompositeOperation = 'source-over';
    return this.tinted;
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
    if (!this.tinted) this.tinted = document.createElement('canvas');
    this.tinted.width = this.width;
    this.tinted.height = this.height;

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
 * One cut: the painting, with everything outside the mask made transparent.
 *
 * The mask is a grey image and carries the cut alone, because the colour is
 * already in the painting and keeping four copies of it would be four copies
 * of the same paint. Done once at load: a pass over a megapixel per cut.
 */
function cut(painting: HTMLImageElement, mask: HTMLImageElement): HTMLCanvasElement {
  const wide = painting.naturalWidth;
  const high = painting.naturalHeight;

  const sprite = document.createElement('canvas');
  sprite.width = wide;
  sprite.height = high;

  const read = document.createElement('canvas');
  read.width = wide;
  read.height = high;
  const reading = read.getContext('2d', { willReadFrequently: true });
  const onto = sprite.getContext('2d');
  if (!reading || !onto) return sprite;

  reading.drawImage(painting, 0, 0);
  const paint = reading.getImageData(0, 0, wide, high);

  reading.clearRect(0, 0, wide, high);
  reading.drawImage(mask, 0, 0, wide, high);
  const shape = reading.getImageData(0, 0, wide, high);

  for (let at = 0; at < paint.data.length; at += 4) paint.data[at + 3] = shape.data[at];
  onto.putImageData(paint, 0, 0);
  return sprite;
}

/**
 * The screen's light and its absence, as two masks.
 *
 * One shape, drawn twice in different colours. A pixel belongs to it by how
 * near its paint is to `SCREEN_GREY` and how near it is to the screen, and
 * both of those are soft, so the mask has no edge to see. `lit` is that shape
 * in white, to be given a colour and added; `unlit` is the same shape in
 * near-black, to be laid over. Done once at load, and the results are images
 * like any other.
 */
function screenLit(
  painting: HTMLImageElement
): { lit: HTMLCanvasElement; unlit: HTMLCanvasElement } | undefined {
  const wide = painting.naturalWidth;
  const high = painting.naturalHeight;

  const read = document.createElement('canvas');
  read.width = wide;
  read.height = high;
  const reading = read.getContext('2d', { willReadFrequently: true });
  if (!reading) return undefined;

  reading.drawImage(painting, 0, 0);
  const { data } = reading.getImageData(0, 0, wide, high);

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

    shape[at + 3] = Math.round(255 * like * reach);
  }

  return {
    lit: paint(shape, wide, high, '#ffffff'),
    unlit: paint(shape, wide, high, '#05060a'),
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
