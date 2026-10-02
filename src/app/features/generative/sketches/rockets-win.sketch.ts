import { FrameTimeline, Keyframe } from '@domain/generative/frame-timeline';
import { emberLook, Embers } from '@domain/generative/particles/embers';
import { Frame, loadImages, Sketch } from './sketch';

/**
 * Rockets win — a launch, in four paintings.
 *
 * He painted the same canvas four times, and between them is a firing
 * sequence: loaded and quiet, the ignition bloom at the mouth of the tube, the
 * rocket away with its trail, and the climb. Shown in order and held for the
 * right lengths, four still paintings are a launch.
 *
 * Three of the four were made in the atelier from the fourth, which is why
 * they are fetched rather than committed: they are assets of the piece
 * `rockets-win-i`, and they live where that piece lives.
 *
 * The particles are not a fifth painting. They are what the paint cannot do —
 * the burst is different every time it fires, and it carries on into the next
 * frame rather than stopping with it, which is what makes four stills read as
 * one continuous thing.
 */

/** Where the four pictures live. The three variants are the atelier's. */
const ATELIER = 'https://storage.googleapis.com/juanmamoreno-atelier/atelier/rockets-win-i';
const SOURCES: Record<string, string> = {
  // Loaded. Tubes full, nothing happening yet.
  loaded: `${ATELIER}/variant-0.png`,
  // Ignition: the bloom at the mouth, rocket barely clear.
  ignition: `${ATELIER}/variant-1.png`,
  // Away: climbing, the trail behind it, one tube dark.
  away: `${ATELIER}/variant-2.png`,
  // The painting itself, on the web-sized copy rather than the original — the
  // original is thirteen megabytes and nothing here shows it at that size.
  climb: 'https://arweave.net/CwI44eqTk8G6KWgoczU7WFdsj9ZCTx6_xGSI1s0e8N4',
};
const ORDER = ['loaded', 'ignition', 'away', 'climb'] as const;

/**
 * The launch, in milliseconds.
 *
 * The long wait is most of it: a launch is mostly not happening, and the two
 * frames in the middle are over before you can look at them, which is what
 * makes them read as fast rather than as a slideshow.
 */
const LAUNCH: Keyframe[] = [
  { index: 0, ms: 1800 }, // loaded, waiting
  { index: 1, ms: 130 }, // ignition
  { index: 2, ms: 220 }, // away
  { index: 3, ms: 900 }, // the climb
];

/** A phone, which is the shape this is made for. */
const PHONE_RATIO = 9 / 16;

/**
 * How long each frame takes to arrive, as a share of its own step.
 *
 * Ignition does not fade: a rocket lighting is a cut, and softening it is the
 * one thing that would make the whole sequence look like a slideshow. The
 * others overlap, which reads as the thing moving rather than being replaced.
 */
const FADE: number[] = [0.35, 0, 0.25, 0.3];

/** Where the tube mouth is, as a share of the frame. Measured off the paintings. */
const MOUTH_X = 0.56;
const MOUTH_Y = 0.42;
/** The exhaust goes up and to the right, along the tube. */
const EXHAUST_AIM = -Math.PI / 2.35;
const EXHAUST_SPREAD = 0.55;

/** Sparks thrown at ignition, and the trickle that follows while it climbs. */
const IGNITION_SPARKS = 90;
const TRAIL_SPARKS = 4;

/**
 * How far up the exhaust has travelled by the end of the climb, as a share of
 * the frame.
 *
 * The rocket is not at the tube any more in the last two paintings — it is up
 * and to the right, trailing. Emitting from the mouth the whole way left the
 * climb with nothing visible on it at all: the burst had burnt out and the
 * trickle was arriving where the rocket no longer was.
 */
const TRAIL_TRAVEL = 0.42;

export class RocketsWinSketch implements Sketch {
  private images: Record<string, HTMLImageElement> = {};
  private readonly timeline = new FrameTimeline(LAUNCH);
  private embers = new Embers(1);
  private failed = false;

  /** The step last drawn, so ignition fires once rather than every frame. */
  private lastStep = -1;
  private flash = 0;

  async setup(ctx: CanvasRenderingContext2D, width: number, height: number): Promise<void> {
    this.embers = new Embers(Math.min(width, height));
    try {
      this.images = await loadImages(SOURCES);
    } catch {
      this.failed = true;
    }
  }

  draw(ctx: CanvasRenderingContext2D, frame: Frame): void {
    ctx.clearRect(0, 0, frame.width, frame.height);
    if (this.failed) return;

    const phone = phoneBox(frame.width, frame.height);
    const step = this.timeline.at(frame.t);

    // Everything outside the phone is not part of the piece.
    ctx.save();
    ctx.beginPath();
    ctx.rect(phone.x, phone.y, phone.width, phone.height);
    ctx.clip();

    this.paintFrames(ctx, phone, step);
    this.fireAndDrift(ctx, phone, step, frame.dt);

    ctx.restore();
  }

  resize(ctx: CanvasRenderingContext2D, width: number, height: number): void {
    this.embers.rescale(Math.min(width, height));
  }

  dispose(): void {
    this.embers.clear();
    this.images = {};
  }

  /**
   * The outgoing painting, then the incoming one over it.
   *
   * Both are drawn to fill the phone rather than fit it: the paintings are
   * four fifths as wide as they are tall and a phone is nearer a half, so
   * fitting them would leave more empty screen than painting.
   */
  private paintFrames(
    ctx: CanvasRenderingContext2D,
    phone: Box,
    step: { index: number; previous: number; through: number }
  ): void {
    const fade = FADE[step.index] ?? 0;
    const arriving = fade > 0 ? Math.min(1, step.through / fade) : 1;

    if (arriving < 1) {
      const leaving = this.images[ORDER[step.previous]];
      if (leaving) coverDraw(ctx, leaving, phone);
    }

    const current = this.images[ORDER[step.index]];
    if (!current) return;

    ctx.globalAlpha = arriving;
    coverDraw(ctx, current, phone);
    ctx.globalAlpha = 1;
  }

  /**
   * The burst, which belongs to the moment rather than to the painting.
   *
   * It is thrown once when ignition arrives — not every frame of it, or it
   * would be a hose — and then fed a trickle for as long as the rocket is
   * still climbing, which is what a trail is.
   */
  private fireAndDrift(
    ctx: CanvasRenderingContext2D,
    phone: Box,
    step: { index: number; through: number },
    dt: number
  ): void {
    const mouth = {
      x: phone.x + phone.width * MOUTH_X,
      y: phone.y + phone.height * MOUTH_Y,
    };

    if (step.index !== this.lastStep) {
      // Back to the beginning: the air clears before it fires again.
      if (step.index === 0) this.embers.clear();
      if (step.index === 1) {
        this.embers.burst(mouth.x, mouth.y, EXHAUST_AIM, EXHAUST_SPREAD, IGNITION_SPARKS);
        this.flash = 1;
      }
      this.lastStep = step.index;
    }

    // The trail leaves from wherever the rocket has got to, which by the last
    // painting is most of the way up the frame.
    if (step.index === 2 || step.index === 3) {
      const climbed =
        (step.index === 2 ? step.through * 0.4 : 0.4 + step.through * 0.6) *
        TRAIL_TRAVEL *
        Math.min(phone.width, phone.height);
      this.embers.burst(
        // Along the aim, which is up and to the right — the way the painted
        // rocket goes. Negated, it climbed up and to the left instead, away
        // from the rocket it is supposed to be coming out of.
        mouth.x + Math.cos(EXHAUST_AIM) * climbed,
        mouth.y + Math.sin(EXHAUST_AIM) * climbed,
        // Downward, behind it: exhaust goes the way the rocket came from.
        EXHAUST_AIM + Math.PI,
        EXHAUST_SPREAD * 0.8,
        TRAIL_SPARKS
      );
    }

    this.embers.update(dt);
    this.drawEmbers(ctx);
    this.drawFlash(ctx, mouth, Math.min(phone.width, phone.height), dt);
  }

  private drawEmbers(ctx: CanvasRenderingContext2D): void {
    // Added rather than painted over: fire is light, and light on top of paint
    // brightens it instead of hiding it. Smoke is the exception and is drawn
    // the ordinary way, because smoke is the one thing here that does hide.
    for (const ember of this.embers.particles) {
      const look = emberLook(ember);
      ctx.globalCompositeOperation = ember.kind === 'spark' ? 'lighter' : 'source-over';

      if (ember.kind === 'smoke') {
        ctx.fillStyle = `rgba(${look.color}, ${look.alpha})`;
        ctx.beginPath();
        ctx.arc(ember.x, ember.y, ember.radius, 0, Math.PI * 2);
        ctx.fill();
        continue;
      }

      // A spark is drawn along the way it is going rather than as a dot. Round
      // dots read as confetti however small they are; a streak the length of
      // the distance it covers in a frame reads as something burning and
      // moving, which is what it is.
      ctx.strokeStyle = `rgba(${look.color}, ${look.alpha})`;
      ctx.lineWidth = ember.radius * 2;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(ember.x, ember.y);
      ctx.lineTo(ember.x - ember.vx * 0.03, ember.y - ember.vy * 0.03);
      ctx.stroke();
    }
    ctx.globalCompositeOperation = 'source-over';
  }

  /** The light the ignition throws, which dies faster than the sparks do. */
  private drawFlash(
    ctx: CanvasRenderingContext2D,
    mouth: { x: number; y: number },
    scale: number,
    dt: number
  ): void {
    if (this.flash <= 0.01) return;

    const radius = scale * 0.42 * (1.4 - this.flash * 0.4);
    const glow = ctx.createRadialGradient(mouth.x, mouth.y, 0, mouth.x, mouth.y, radius);
    glow.addColorStop(0, `rgba(255, 240, 205, ${this.flash * 0.75})`);
    glow.addColorStop(0.35, `rgba(255, 150, 60, ${this.flash * 0.35})`);
    glow.addColorStop(1, 'rgba(255, 110, 40, 0)');

    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(mouth.x, mouth.y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';

    this.flash = Math.max(0, this.flash - dt * 4.5);
  }
}

interface Box {
  x: number;
  y: number;
  width: number;
  height: number;
}

/** The largest phone-shaped rectangle that fits, centred. */
export function phoneBox(width: number, height: number, ratio = PHONE_RATIO): Box {
  const byHeight = height * ratio;
  const w = Math.min(width, byHeight);
  const h = w / ratio;

  return { x: (width - w) / 2, y: (height - h) / 2, width: w, height: h };
}

/** Fills the box with the picture, cropping what will not fit. */
function coverDraw(ctx: CanvasRenderingContext2D, image: HTMLImageElement, box: Box): void {
  const scale = Math.max(box.width / image.naturalWidth, box.height / image.naturalHeight);
  const w = image.naturalWidth * scale;
  const h = image.naturalHeight * scale;

  ctx.drawImage(image, box.x + (box.width - w) / 2, box.y + (box.height - h) / 2, w, h);
}
