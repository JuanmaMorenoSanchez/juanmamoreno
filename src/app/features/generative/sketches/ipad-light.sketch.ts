import { IdleDrift } from '@domain/generative/idle-drift';
import { FocusPull } from '@domain/generative/focus-pull';
import { Glitch } from '@domain/generative/glitch';
import { clamp } from '@domain/generative/math';
import { Parallax } from '@domain/generative/parallax';
import { Cast, ScreenGlow } from '@domain/generative/screen-glow';
import { Snowfall } from '@domain/generative/snowfall';
import { SteadyGaze } from '@domain/generative/steady-gaze';
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
  { name: 'limbs', depth: 0.45 },
  { name: 'shirt', depth: 0.72 },
  { name: 'girl', depth: 1 },
] as const;

/** How near the ground is. Far, and it is the only thing drawn whole. */
const GROUND = 0.12;

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
 * How bright the light is allowed to get, at the very top of its range.
 *
 * It can be most of the way now, because the light is screened over the paint
 * rather than added to it: adding runs out of room and flattens the cheek to
 * white, screening cannot go past white at all and keeps the paint's own
 * modelling all the way up.
 */
const MOST_LIGHT = 0.9;

/** The colour of the light itself, which is the cold white of a screen. */
const SCREEN_LIGHT: Cast = { red: 0xc4, green: 0xd4, blue: 0xec };

/**
 * How far a cast is carried into the paint, at its strongest.
 *
 * The colour is a pass of its own, blended so that it takes the hue and the
 * saturation of the cast and the brightness of the paint under it — which is
 * the only way a coloured light shows on a lit face at all, and which cannot
 * make anything darker than it already was. Under a half, so it is her face
 * in a red light and not a red face.
 */
const SO_MUCH = 0.7;

/**
 * How much of the way a layer goes towards its mark each frame.
 *
 * Only to round the corner when the gaze changes direction — the gaze in
 * front of it already moves at one speed, so there is nothing here for the
 * easing to rescue, and a slower one would only make every layer lag behind
 * the drift by a different amount, which is a wobble rather than depth.
 */
const EASE = 0.12;

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

/** Where the tablet itself is, as a share of the frame. */
const TABLET = { x: 0.526, y: 0.95 };

/**
 * The shafts the tablet throws up into the snow, as lobes of a fan.
 *
 * An angle in radians measured from the tablet, with `-PI/2` straight up, how
 * wide the lobe is, and how strong. Uneven on purpose: evenly spaced rays of
 * equal width are a sunburst clip-art, and what makes this read as light
 * through falling snow is that some of it is blocked and some is not.
 */
const LOBES = [
  { turn: -2.62, width: 0.15, strength: 0.9 },
  { turn: -2.15, width: 0.08, strength: 0.6 },
  { turn: -1.75, width: 0.18, strength: 1 },
  { turn: -1.3, width: 0.09, strength: 0.7 },
  { turn: -0.9, width: 0.17, strength: 0.9 },
  { turn: -0.48, width: 0.08, strength: 0.5 },
] as const;

/** How strong the shafts are against the light that makes them. */
const SHAFTS = 0.38;

/** How wide the fan is drawn, against the frame. */
const FAN = 1.9;

/**
 * The eyes that catch the screen, and which cut each sits on.
 *
 * Found in the paint rather than guessed: the goose beside her is inside the
 * girl's cut and moves with her, and the bird behind it belongs to no figure
 * and so moves with the ground. A highlight on the wrong one of those would
 * swim across the eye it is supposed to be in.
 */
const EYES = [
  { x: 0.677, y: 0.891, size: 0.0042, rides: 'girl' },
  { x: 0.893, y: 0.843, size: 0.0062, rides: 'ground' },
] as const;

/**
 * How far out of focus a layer goes, and how far in depth that takes.
 *
 * The blur is made once at load at half the size, because a soft thing does
 * not need the resolution, and faded in over the sharp copy rather than
 * computed per frame: `filter` on a canvas this size, four times a frame, is
 * not something a laptop should be asked to do sixty times a second.
 */
const SOFTENS = 2.2;

/** How many torn strips a change is made of. */
const STRIPS = 9;

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
  /** The landscape, whole: his paint runs on under where the figures were. */
  private ground?: HTMLImageElement;
  private groundParallax?: Parallax;
  /** Every layer again, soft, for the focus to fade towards. */
  private blurredGround?: HTMLCanvasElement;
  /** And the whole painting again, in daylight, for it to break into. */
  private day?: HTMLImageElement;
  private blurredDay?: HTMLCanvasElement;
  /** The shafts, as one shape, built once and turned a little each frame. */
  private fanned?: HTMLCanvasElement;

  /** One canvas per cut, and the parallax that moves it. */
  private layers: {
    sprite: HTMLCanvasElement;
    /** The same cut of the other state of the painting. */
    other: HTMLCanvasElement;
    soft: HTMLCanvasElement;
    otherSoft: HTMLCanvasElement;
    parallax: Parallax;
    depth: number;
  }[] = [];
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
  private readonly gaze = new SteadyGaze();
  private readonly focus = new FocusPull();
  /**
   * The painting changing over to its other state, and back.
   *
   * Two of them, on different clocks and with different numbers, so the
   * landscape and the girl are often in different states at once. One clock
   * would be a slideshow; two is a thing with a fault in it.
   */
  private readonly behind = new Glitch(9, 0.55);
  private readonly her = new Glitch(13, 0.45, 41);

  /** Where the painting is drawn: cover-fit, grown, anchored to the bottom. */
  private frame = { x: 0, y: 0, width: 0, height: 0 };

  async setup(ctx: CanvasRenderingContext2D, width: number, height: number): Promise<void> {
    this.width = width;
    this.height = height;

    const wanted: Record<string, string> = {
      painting: `${IMAGES_ROUTE}ipad-light.jpg`,
      ground: `${IMAGES_ROUTE}ipad-light-ground.jpg`,
      day: `${IMAGES_ROUTE}ipad-light-day.jpg`,
    };
    for (const each of CUTS) wanted[each.name] = `${IMAGES_ROUTE}ipad-light-${each.name}.png`;

    const images = await loadImages(wanted);
    this.painting = images['painting'];
    this.ground = images['ground'];
    this.day = images['day'];
    this.groundParallax = new Parallax(GROUND, SHIFT, EASE);

    this.layers = CUTS.map((each) => {
      const sprite = cut(images['painting'], images[each.name]);
      // The same cut of the other state: one extra picture serves all three
      // figures, because the two states were painted on the same canvas and
      // the cuts fit both to within a pixel.
      const other = cut(images['day'], images[each.name]);
      return {
        sprite,
        other,
        soft: softened(sprite),
        otherSoft: softened(other),
        parallax: new Parallax(each.depth, SHIFT, EASE),
        depth: each.depth,
      };
    });
    this.blurredGround = softened(images['ground']);
    this.blurredDay = softened(images['day']);
    this.fanned = fan(1200);

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

    // Where it is being told to look: the pointer while there is one, the
    // drift otherwise, and the drift again as soon as the pointer leaves.
    const told = frame.pointer.active
      ? {
          x: clamp((frame.pointer.x / this.width) * 2 - 1, -1, 1),
          y: clamp((frame.pointer.y / this.height) * 2 - 1, -1, 1),
        }
      : this.drift.at(frame.t);

    // And where it is actually looking, which gets there at one speed. A
    // pointer thrown across the window moves the scene no faster than the
    // drift does; all a flick buys is a longer journey.
    const looking = this.gaze.toward(told.x, told.y, frame.dt);

    // Black, not the page's background: the painting is cover-fitted and what
    // shows past it at an extreme window is the edge of the canvas, which
    // should read as a dark room rather than as a missing tile.
    ctx.fillStyle = '#07080b';
    ctx.fillRect(0, 0, this.width, this.height);

    const scale = Math.max(width, height) / 1000;
    // The focus stays on her; what travels is how much is in focus with her.
    const spread = this.focus.at(frame.t);

    // The landscape first, whole and at its own depth. What a figure in
    // front of it uncovers is paint rather than a hole or a shadow: his own
    // paint, pushed in from the rim of each hole where the figures were cut
    // out, so the sky goes on being this painting's sky.
    if (this.ground && this.groundParallax) {
      this.groundParallax.update(looking.x, looking.y);
      this.lay(
        ctx,
        this.ground,
        this.day,
        this.blurredGround,
        this.blurredDay,
        GROUND,
        spread,
        this.behind,
        frame.t,
        x + this.groundParallax.x * scale,
        y + this.groundParallax.y * scale
      );
    }
    for (const layer of this.layers) {
      layer.parallax.update(looking.x, looking.y);
      this.lay(
        ctx,
        layer.sprite,
        layer.other,
        layer.soft,
        layer.otherSoft,
        layer.depth,
        spread,
        layer.depth === 1 ? this.her : this.behind,
        frame.t,
        x + layer.parallax.x * scale,
        y + layer.parallax.y * scale
      );
    }

    this.drawScreen(ctx, frame.t, scale);
    this.drawSnow(ctx, frame.dt, frame.t);
  }

  /**
   * One layer, as sharp or as soft as the focus leaves it.
   *
   * The focus is on her, always — `depth` of 1 is her cut and it is never
   * softened — and everything behind her goes soft in proportion to how far
   * behind her it is and how shallow the field is this second.
   *
   * The soft copy is faded in over the sharp one rather than a blur being
   * computed: a tenth of the way out of focus is a tenth of the soft copy,
   * which is not what a lens does but is what the eye reads, and it costs one
   * more draw instead of a filter pass per layer per frame.
   */
  private lay(
    ctx: CanvasRenderingContext2D,
    sharp: CanvasImageSource,
    other: CanvasImageSource | undefined,
    soft: CanvasImageSource | undefined,
    otherSoft: CanvasImageSource | undefined,
    depth: number,
    spread: number,
    glitch: Glitch,
    t: number,
    x: number,
    y: number
  ): void {
    const { width, height } = this.frame;
    const broken = glitch.at(t);
    const up = broken.shows === 1 && other;

    ctx.drawImage(up ? (other as CanvasImageSource) : sharp, x, y, width, height);
    if (broken.tearing > 0.01 && other) {
      this.tear(ctx, sharp, other, glitch, broken.tearing, t, x, y);
    }

    // The soft copy has to be of whichever state is up, or going out of
    // focus fades the other painting in underneath.
    const blurred = up ? otherSoft : soft;
    const away = Math.min(1, (1 - depth) / spread);
    if (!blurred || away < 0.02) return;
    ctx.save();
    ctx.globalAlpha = away;
    ctx.drawImage(blurred, x, y, width, height);
    ctx.restore();
  }

  /**
   * The moment of changing over, in torn strips.
   *
   * Strips of each state, laid over whichever one is up and shoved sideways
   * by how broken it is, with a ghost of each a few pixels off so the edges
   * double the way a bad signal doubles. The strips jump twelve times a
   * second rather than every frame: a tear that slides is a wipe.
   */
  private tear(
    ctx: CanvasRenderingContext2D,
    sharp: CanvasImageSource,
    other: CanvasImageSource,
    glitch: Glitch,
    tearing: number,
    t: number,
    x: number,
    y: number
  ): void {
    const { width, height } = this.frame;
    const from = { width: sourceWide(sharp), height: sourceHigh(sharp) };
    if (!from.width || !from.height) return;

    ctx.save();
    for (let which = 0; which < STRIPS; which++) {
      const band = glitch.band(t, which);
      const high = Math.min(band.high, 1 - band.top);
      if (high <= 0) continue;

      const strip = band.from === 1 ? other : sharp;
      const shove = band.shove * width * tearing;
      ctx.drawImage(
        strip,
        0,
        band.top * from.height,
        from.width,
        high * from.height,
        x + shove,
        y + band.top * height,
        width,
        high * height
      );

      // The ghost: the same strip again, a little further over and added, so
      // the edges inside it smear rather than simply moving.
      if (which % 3 === 0) {
        ctx.globalCompositeOperation = 'screen';
        ctx.globalAlpha = 0.45 * tearing;
        ctx.drawImage(
          strip,
          0,
          band.top * from.height,
          from.width,
          high * from.height,
          x + shove * 2.2,
          y + band.top * height,
          width,
          high * height
        );
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 1;
      }
    }
    ctx.restore();
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
      const dim = clamp((middle - level) / span, 0, 1) * 0.75;
      if (dim > 0) {
        ctx.save();
        ctx.globalAlpha = dim;
        ctx.drawImage(this.unlit, x, y, width, height);
        ctx.restore();
      }
    }

    const bright = clamp((level - middle) / span, 0, 1) * MOST_LIGHT;
    if (bright <= 0) return;
    const how = this.glow.colouring(t) * bright * SO_MUCH;
    const tint = this.glow.tint(t);

    // The shafts first, so the light in the air is behind the light on her.
    // Tinted towards the cast rather than cast with the blend the paint gets:
    // this is light in the air, so it is added, and added light cannot make
    // anything darker than it found it.
    const air = this.painted(
      (onto) => this.drawFan(onto, x, y, t),
      rgb(mix(SCREEN_LIGHT, tint, Math.min(0.3, how)))
    );
    if (air) {
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.globalAlpha = bright * SHAFTS;
      ctx.drawImage(air, 0, 0);
      ctx.restore();
    }

    // Then the light itself, in its own cold white. Screened, not added:
    // added light has nothing above 255 to work with, so the brightest paint
    // flattens into a white patch; screened, it approaches white without
    // arriving and the cheek keeps its shape.
    const white = this.painted(
      (onto) => onto.drawImage(this.lit as CanvasImageSource, x, y, width, height),
      rgb(SCREEN_LIGHT)
    );
    if (white) {
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.globalAlpha = bright;
      ctx.drawImage(white, 0, 0);
      ctx.restore();
    }

    // Then the cast, if this interval has one. A pass of its own, because a
    // coloured light that is pale enough to be a screen is white by the time
    // it has been screened onto a lit face: the two things the eye reads —
    // how bright it is and what colour it is — have to be laid on separately
    // or the second is lost in the first. `color` takes the hue and the
    // saturation from the cast and leaves the brightness exactly as the paint
    // had it, so a cast can never be a dimming.
    const cast =
      how > 0.01
        ? this.painted(
            (onto) => onto.drawImage(this.lit as CanvasImageSource, x, y, width, height),
            rgb(tint)
          )
        : undefined;
    if (cast) {
      ctx.save();
      ctx.globalCompositeOperation = 'color';
      ctx.globalAlpha = how;
      ctx.drawImage(cast, 0, 0);
      ctx.restore();
    }

    this.drawEyes(ctx, scale, bright, tint, how);
  }

  /**
   * The shafts, into whatever is being coloured.
   *
   * One shape, built at load and turned a little: the fan drifts a few
   * degrees over a minute, which is enough that it is never the same picture
   * twice and not enough to look like something swinging.
   */
  private drawFan(onto: CanvasRenderingContext2D, x: number, y: number, t: number): void {
    if (!this.fanned) return;
    const { width, height } = this.frame;
    const wide = width * FAN;

    onto.save();
    onto.translate(x + width * TABLET.x, y + height * TABLET.y);
    onto.rotate(Math.sin(t * 0.047) * 0.12 + Math.sin(t * 0.0131 + 2) * 0.05);
    onto.drawImage(this.fanned, -wide / 2, -wide, wide, wide);
    onto.restore();
  }

  /**
   * The screen, in the eyes that are facing it.
   *
   * Two of them, and each has to ride on the cut its eye is painted on or the
   * highlight swims about inside the eye as the scene moves. It is the
   * smallest thing on the page and the one that makes the light read as a
   * thing in the room rather than a wash over it.
   */
  private drawEyes(
    ctx: CanvasRenderingContext2D,
    scale: number,
    bright: number,
    tint: Cast,
    how: number
  ): void {
    const { width, height } = this.frame;
    const girl = this.layers[this.layers.length - 1]?.parallax;

    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    for (const eye of EYES) {
      const parallax = eye.rides === 'girl' ? girl : this.groundParallax;
      const at = {
        x: this.frame.x + (parallax?.x ?? 0) * scale + width * eye.x,
        y: this.frame.y + (parallax?.y ?? 0) * scale + height * eye.y,
      };
      const size = width * eye.size;

      // A hard little centre in a soft halo, which is what a specular
      // highlight is: the halo is the eye's own wetness around it.
      const lit = mix(SCREEN_LIGHT, tint, Math.min(0.6, how * 1.6));
      const pool = ctx.createRadialGradient(at.x, at.y, 0, at.x, at.y, size * 3.4);
      pool.addColorStop(0, `rgb(${rounded(lit)} / ${bright})`);
      pool.addColorStop(0.3, `rgb(${rounded(lit)} / ${bright * 0.35})`);
      pool.addColorStop(1, `rgb(${rounded(lit)} / 0)`);
      ctx.fillStyle = pool;
      ctx.beginPath();
      ctx.arc(at.x, at.y, size * 3.4, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalAlpha = bright;
      ctx.fillStyle = `rgb(${rounded(lit)})`;
      ctx.beginPath();
      ctx.arc(at.x - size * 0.2, at.y - size * 0.2, size, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
    ctx.restore();
  }

  /**
   * Whatever is drawn into the scratch, in one colour.
   *
   * On a scratch the size of the window rather than by keeping a copy per
   * colour: the colour moves every couple of seconds and eases while it
   * moves, so there is no fixed set of them to keep. `source-in` throws away
   * what was drawn and keeps only its shape.
   */
  private painted(
    draw: (onto: CanvasRenderingContext2D) => void,
    colour: string
  ): HTMLCanvasElement | undefined {
    if (!this.lit || !this.tinted) return undefined;
    const onto = this.tinted.getContext('2d');
    if (!onto) return undefined;

    onto.clearRect(0, 0, this.width, this.height);
    onto.globalCompositeOperation = 'source-over';
    draw(onto);
    onto.globalCompositeOperation = 'source-in';
    onto.fillStyle = colour;
    onto.fillRect(0, 0, this.width, this.height);
    onto.globalCompositeOperation = 'source-over';
    return this.tinted;
  }

  /**
   * The snow, and what the screen does to the flakes it reaches.
   *
   * A flake near the tablet is lit from below like everything else near it:
   * brighter, the colour of whatever is on the screen, and with a halo,
   * because a lit speck against a dark painting has one. Everything further
   * off falls as it did. It is the cheapest thing here — the snow already
   * exists and this is a term in its alpha — and it is what ties the weather
   * to the light instead of leaving them two effects on one page.
   */
  private drawSnow(ctx: CanvasRenderingContext2D, dt: number, t: number): void {
    this.snow.update(dt);
    const scale = Math.max(this.width, this.height) / 1000;

    const level = this.glow.at(t);
    const bright = clamp((level - 0.78) / 0.37, 0, 1) * MOST_LIGHT;
    const tint = this.glow.tint(t);
    const how = this.glow.colouring(t);
    const lit = rounded(mix(SCREEN_LIGHT, tint, Math.min(0.45, how)));

    // Where the tablet is on the canvas, so a flake can be asked how near it
    // is to the light rather than how near it is to her.
    const girl = this.layers[this.layers.length - 1]?.parallax;
    const lamp = {
      x: this.frame.x + (girl?.x ?? 0) * scale + this.frame.width * TABLET.x,
      y: this.frame.y + (girl?.y ?? 0) * scale + this.frame.height * TABLET.y,
    };
    const reach = this.frame.width * 0.34;

    ctx.save();
    for (const flake of this.snow.specks) {
      const at = {
        x: this.snow.across(flake) * this.width,
        y: flake.y * this.height,
      };
      const size = flake.size * scale;
      const caught = clamp(1 - Math.hypot(at.x - lamp.x, at.y - lamp.y) / reach, 0, 1) * bright;

      if (caught > 0.04) {
        // The halo first, which is the flake seen through the air it is in.
        ctx.globalCompositeOperation = 'screen';
        ctx.globalAlpha = caught * 0.3;
        ctx.fillStyle = `rgb(${lit})`;
        ctx.beginPath();
        ctx.arc(at.x, at.y, size * 3, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = Math.min(1, flake.alpha + caught * 0.5);
      ctx.fillStyle = caught > 0.04 ? `rgb(${lit})` : '#e8eef6';
      ctx.beginPath();
      ctx.arc(at.x, at.y, size * (1 + caught * 0.5), 0, Math.PI * 2);
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

/**
 * A soft copy of a layer, made once.
 *
 * At half the size, because a blurred thing does not need the resolution and
 * four full-size copies is forty megabytes to hold something nobody can see
 * the detail of. Scaling it back up on the way out softens it a little
 * further, which is free and in the right direction.
 */
function softened(sharp: CanvasImageSource): HTMLCanvasElement {
  const wide = Math.round(Number((sharp as { width?: number }).width ?? 0) / 2) || 512;
  const high = Math.round(Number((sharp as { height?: number }).height ?? 0) / 2) || 512;

  const canvas = document.createElement('canvas');
  canvas.width = wide;
  canvas.height = high;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  ctx.filter = `blur(${SOFTENS}px)`;
  ctx.drawImage(sharp, 0, 0, wide, high);
  ctx.filter = 'none';
  return canvas;
}

/**
 * The shafts, as one shape with the tablet at the bottom of it.
 *
 * Built once, per pixel, and then only ever turned and faded: a fan computed
 * every frame is a megapixel of trigonometry sixty times a second for
 * something that barely changes. The lobes are a hand-written table rather
 * than an even sweep, because light through falling snow is interrupted and
 * an even sweep is a sunburst.
 */
function fan(size: number): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  const shape = new ImageData(size, size);
  const from = { x: size / 2, y: size };

  for (let down = 0; down < size; down++) {
    for (let across = 0; across < size; across++) {
      const toX = across - from.x;
      const toY = down - from.y;
      const turn = Math.atan2(toY, toX);

      let beam = 0;
      for (const lobe of LOBES) {
        beam += lobe.strength * Math.exp(-(((turn - lobe.turn) / lobe.width) ** 2));
      }

      // Only upwards, and thinning out with distance.
      const up = Math.min(1, Math.max(0, -toY / (size * 0.12))) ** 0.5;
      const away = Math.hypot(toX, toY) / (size * 0.58);
      // The floor is what makes them shafts: without it the lobes blend into
      // one another near the source and the whole thing is a glow.
      const lit = Math.max(0, Math.min(1, beam) - 0.2) * 1.25 * up * Math.exp(-away * 1.1);

      const at = (down * size + across) * 4;
      shape.data[at] = 255;
      shape.data[at + 1] = 255;
      shape.data[at + 2] = 255;
      shape.data[at + 3] = Math.round(255 * Math.min(1, lit));
    }
  }

  ctx.putImageData(shape, 0, 0);
  return canvas;
}

/** `how` of the way from one colour to another. */
function mix(from: Cast, to: Cast, how: number): Cast {
  return {
    red: from.red + (to.red - from.red) * how,
    green: from.green + (to.green - from.green) * how,
    blue: from.blue + (to.blue - from.blue) * how,
  };
}

/** The three bytes, rounded, for a css colour. */
function rounded(colour: Cast): string {
  return `${Math.round(colour.red)} ${Math.round(colour.green)} ${Math.round(colour.blue)}`;
}

/** A css colour from one. */
function rgb(colour: Cast): string {
  return `rgb(${rounded(colour)})`;
}

/** The width of whatever kind of picture this is. */
function sourceWide(image: CanvasImageSource): number {
  const sized = image as { naturalWidth?: number; width?: number };
  return sized.naturalWidth ?? Number(sized.width ?? 0);
}

/** And its height. */
function sourceHigh(image: CanvasImageSource): number {
  const sized = image as { naturalHeight?: number; height?: number };
  return sized.naturalHeight ?? Number(sized.height ?? 0);
}
