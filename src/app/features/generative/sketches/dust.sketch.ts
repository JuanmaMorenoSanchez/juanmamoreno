import { BeatClock } from '@domain/generative/beat-clock';
import { FrameTimeline, Keyframe } from '@domain/generative/frame-timeline';
import { clamp, rand } from '@domain/generative/math';
import { Parallax } from '@domain/generative/parallax';
import { DustField } from '@domain/generative/particles/dust-field';
import { Frame, loadImages, Sketch } from './sketch';

const IMAGES_ROUTE = 'assets/images/canvases/';
const TWO_PI = Math.PI * 2;
// Near-black with a faint cool cast, so warm motes read as suspended light.
const BASE_COLOR = '#070a0f';
// A wash of that same tone every frame: motes leave a soft, short-lived trail
// as they drift instead of hard points, which is what sells "floating in air".
const FADE_COLOR = 'rgba(7, 10, 15, 0.22)';
// Warm pale gold — dust catching a low, warm light.
const MOTE_COLOR = '255, 244, 214';
// Overall mote opacity — lower is fainter and more delicate.
const MOTE_OPACITY = 0.5;

// The head fills most of the frame, centred (a little headroom is left for the
// breathing scale-up so it never clips the edges).
const HEAD_SIZE_FACTOR = 0.84;

// --- Blink (escondete1..3 = image indices 0..2) -------------------------------
//   0 = escondete1 (eyes open — the resting pose, shown between blinks)
//   1 = escondete2 (eyes closed)
//   2 = escondete3 (eyes half-open)
// One blink is a quick dip half → closed → half; the eyes-open rest between
// blinks lasts a random 3-8s so the blinking never falls into a metronome.
const BLINK_MOTION: Keyframe[] = [
  { index: 2, ms: 90 },
  { index: 1, ms: 130 },
  { index: 2, ms: 90 },
];
const BLINK_MIN_GAP = 3; // seconds
const BLINK_MAX_GAP = 8;

// --- Stage lights -------------------------------------------------------------
// Two coloured washes that sweep and pulse on a slow beat, like overhead
// concert lights. This is the ONLY thing the beat drives — the head and dust
// deliberately do not react to it. Additive and low-alpha so the lights tint
// the haze without flattening it.
const BPM = 172;
const STAGE_PALETTE = ['255, 45, 149', '45, 160, 255', '150, 90, 255', '255, 120, 40'];
const STAGE_ALPHA = 0.12;

// --- Head motion (all autonomous — no beat) -----------------------------------
// Slow organic drift so it stays alive with no pointer (two sines per axis for a
// non-repeating wander). Amplitude is a fraction of the head size.
const FLOAT_AMP = 0.02;
// Slow breathing scale.
const BREATH_FREQ = 1.2; // rad/s (~5s per breath)
const BREATH_AMP = 0.02;
// Constant lazy tilt sway.
const ROT_SWAY_FREQ = 0.5;
const ROT_SWAY_AMP = 0.05; // radians

/**
 * "Dust" — a watercolour head suspended in a field of fine motes drifting on
 * faint air currents. It stays alive even idle: a slow autonomous drift,
 * breathing and tilt sway, with the eyes blinking at random 3-8s intervals.
 * Overhead coloured stage-lights sweep and pulse across the haze for a little
 * concert atmosphere — but the head and dust themselves stay calm, untouched by
 * that pulse. Moving the pointer stirs a local draft; a tap sends a gust out.
 *
 * The timing/simulation is pure @domain/generative (DustField, FrameTimeline,
 * BeatClock, Parallax); this class only loads the frames and renders.
 */
export class DustSketch implements Sketch {
  private width = 0;
  private height = 0;
  private field!: DustField;

  private frames: HTMLImageElement[] = [];
  // Drives only the stage lights (see drawStageLights).
  private readonly beat = new BeatClock(BPM);

  // Blink schedule: eyes rest open until `nextBlinkAt`, then a short blink plays
  // from `blinkStartT`; `blinkMotion` owns the half → closed → half timing.
  private readonly blinkMotion = new FrameTimeline(BLINK_MOTION);
  private nextBlinkAt = 0;
  private blinkStartT = -1;

  // The head hangs in the same air as the dust, so it drifts gently with the
  // pointer rather than sitting locked to the centre.
  private readonly headParallax = new Parallax(1, 22, 0.04);
  // Offscreen buffer used to feather the head's square edge before compositing
  // (see drawHead), so the frames with an opaque backdrop bloom as a soft disc
  // rather than a hard-edged panel.
  private readonly headBuffer = document.createElement('canvas');

  async setup(ctx: CanvasRenderingContext2D, width: number, height: number): Promise<void> {
    this.width = width;
    this.height = height;
    this.field = DustField.forArea(width, height, 0.00016);

    const images = await loadImages({
      f1: `${IMAGES_ROUTE}escondete1.png`,
      f2: `${IMAGES_ROUTE}escondete2.png`,
      f3: `${IMAGES_ROUTE}escondete3.png`,
    });
    this.frames = [images['f1'], images['f2'], images['f3']];

    this.paintBase(ctx);
  }

  resize(ctx: CanvasRenderingContext2D, width: number, height: number): void {
    this.width = width;
    this.height = height;
    this.field.resize(width, height);
    this.paintBase(ctx);
  }

  pointerDown(x: number, y: number): void {
    this.field.puff(x, y);
  }

  draw(ctx: CanvasRenderingContext2D, frame: Frame): void {
    const { width, height } = this;

    // A moving pointer trails a soft, local draft through the field.
    const p = frame.pointer;
    if (p.active) this.field.stir(p.x, p.y, Math.hypot(p.vx, p.vy));

    this.field.update(frame.dt, frame.t);

    ctx.fillStyle = FADE_COLOR;
    ctx.fillRect(0, 0, width, height);

    // Additive blending so overlapping motes bloom into brighter grains.
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    for (const m of this.field.list) {
      const twinkle = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(frame.t * m.twinkleFreq + m.phase));
      const alpha = twinkle * (0.25 + m.depth * 0.55) * MOTE_OPACITY;
      const glow = m.radius * (2 + m.depth * 3); // glow reaches past the core
      const g = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, glow);
      g.addColorStop(0, `rgba(${MOTE_COLOR}, ${alpha})`);
      g.addColorStop(1, `rgba(${MOTE_COLOR}, 0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(m.x, m.y, glow, 0, TWO_PI);
      ctx.fill();
    }
    ctx.restore();

    this.drawStageLights(ctx, frame);
    this.drawHead(ctx, frame);
  }

  // Two coloured washes sweeping from overhead, pulsing softly on the beat.
  private drawStageLights(ctx: CanvasRenderingContext2D, frame: Frame): void {
    const env = this.beat.envelope(frame.t, 2);
    if (env < 0.03) return;
    const { width, height } = this;

    const i = this.beat.beatIndex(frame.t);
    const colorA = STAGE_PALETTE[i % STAGE_PALETTE.length];
    const colorB = STAGE_PALETTE[(i + 2) % STAGE_PALETTE.length];
    const sweep = Math.sin(frame.t * 0.7);
    const reach = Math.max(width, height) * 0.9;

    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = env * STAGE_ALPHA;
    this.washLight(ctx, width * (0.28 + 0.16 * sweep), height * 0.02, reach, colorA);
    this.washLight(ctx, width * (0.72 - 0.16 * sweep), height * 0.02, reach, colorB);
    ctx.restore();
  }

  private washLight(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    reach: number,
    rgb: string
  ): void {
    const g = ctx.createRadialGradient(x, y, 0, x, y, reach);
    g.addColorStop(0, `rgba(${rgb}, 0.9)`);
    g.addColorStop(1, `rgba(${rgb}, 0)`);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, this.width, this.height);
  }

  // Eyes open between blinks; a short blink plays at random 3-8s intervals.
  private blinkFrameIndex(t: number): number {
    if (this.nextBlinkAt === 0) this.nextBlinkAt = t + rand(BLINK_MIN_GAP, BLINK_MAX_GAP);

    if (this.blinkStartT < 0) {
      if (t < this.nextBlinkAt) return 0; // resting, eyes open
      this.blinkStartT = t; // begin a blink
    }

    const elapsed = t - this.blinkStartT;
    if (elapsed * 1000 >= this.blinkMotion.durationMs) {
      this.blinkStartT = -1; // blink finished
      this.nextBlinkAt = t + rand(BLINK_MIN_GAP, BLINK_MAX_GAP);
      return 0;
    }
    return this.blinkMotion.indexAt(elapsed);
  }

  private drawHead(ctx: CanvasRenderingContext2D, frame: Frame): void {
    const img = this.frames[this.blinkFrameIndex(frame.t)];
    if (!img) return;
    const { width, height } = this;
    const t = frame.t;

    // Pointer offset from centre, normalized to ~[-1, 1] (0 when resting).
    const p = frame.pointer;
    const refX = p.active ? clamp((p.x - width / 2) / (width / 2), -1, 1) : 0;
    const refY = p.active ? clamp((p.y - height / 2) / (height / 2), -1, 1) : 0;
    this.headParallax.update(refX, refY);

    // The escondete frames are square; fit them into a centred square box.
    const size = Math.min(width, height) * HEAD_SIZE_FACTOR;
    const masked = this.featherHead(img, size);
    if (!masked) return;

    // Autonomous idle drift (organic, non-repeating), alive with no pointer.
    const floatAmp = size * FLOAT_AMP;
    const floatX = (Math.sin(t * 0.37) + 0.5 * Math.sin(t * 0.91 + 1.3)) * floatAmp;
    const floatY = (Math.sin(t * 0.29 + 2.1) + 0.5 * Math.sin(t * 0.83)) * floatAmp;

    const scale = 1 + Math.sin(t * BREATH_FREQ) * BREATH_AMP; // slow breathing
    const rotation = Math.sin(t * ROT_SWAY_FREQ) * ROT_SWAY_AMP; // lazy tilt sway

    const cx = width / 2 + floatX + this.headParallax.x;
    const cy = height / 2 + floatY + this.headParallax.y;
    const drawn = size * scale;

    ctx.save();
    // Normal (source-over) compositing so the watercolour keeps its true
    // colours — the escondete frames' near-black backgrounds sit close to the
    // dust base and mostly vanish, and the radial feather trims what remains.
    ctx.translate(cx, cy);
    ctx.rotate(rotation);
    ctx.drawImage(masked, -drawn / 2, -drawn / 2, drawn, drawn);
    ctx.restore();
  }

  // Draws the frame into an offscreen buffer and fades its edges to nothing
  // with a radial mask, so the glow-backed frames bloom as a soft disc centred
  // on the face instead of a rectangular panel with visible sides.
  private featherHead(img: HTMLImageElement, size: number): HTMLCanvasElement | null {
    const buffer = this.headBuffer;
    const px = Math.max(1, Math.ceil(size));
    if (buffer.width !== px || buffer.height !== px) {
      buffer.width = px;
      buffer.height = px;
    }
    const bctx = buffer.getContext('2d');
    if (!bctx) return null;

    bctx.clearRect(0, 0, px, px);
    bctx.globalCompositeOperation = 'source-over';
    bctx.drawImage(img, 0, 0, px, px);

    // Keep the inscribed disc, feather out to (and past) the corners.
    const r = px / 2;
    bctx.globalCompositeOperation = 'destination-in';
    const mask = bctx.createRadialGradient(r, r, r * 0.86, r, r, r * 1.18);
    mask.addColorStop(0, 'rgba(0, 0, 0, 1)');
    mask.addColorStop(1, 'rgba(0, 0, 0, 0)');
    bctx.fillStyle = mask;
    bctx.fillRect(0, 0, px, px);
    bctx.globalCompositeOperation = 'source-over';

    return buffer;
  }

  private paintBase(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = BASE_COLOR;
    ctx.fillRect(0, 0, this.width, this.height);
  }
}
