import { BeatClock } from '@domain/generative/beat-clock';
import { FrameTimeline, Keyframe } from '@domain/generative/frame-timeline';
import { clamp, rand } from '@domain/generative/math';
import { Parallax } from '@domain/generative/parallax';
import { DustField } from '@domain/generative/particles/dust-field';
import { BeamSample, SweepBeam } from '@domain/generative/sweep-beam';
import { Watcher, WatcherField } from '@domain/generative/watchers';
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

// --- Hidden watchers ("hide") -------------------------------------------------
// Pairs of eyes that surface from the dust in the periphery, watch the head,
// then hide back into it. Same warm light as the motes, so they read as the
// dust briefly resolving into a gaze. They never encroach on the head (kept
// outside WATCHER_SAFE * head size) and are drawn under it, so it stays clear.
const WATCHER_COUNT = 5;
const WATCHER_EYE_BASE = 0.02; // eye radius as a fraction of the min dimension
const WATCHER_SAFE = 0.55; // exclusion radius around the head, × head size
const WATCHER_COLOR = '255, 236, 200';

// --- Sweeping beam (the "night") ----------------------------------------------
// A directional shaft of light that scans the dark once in a while, like a
// distant searchlight hunting for who's hiding, then fades away again. It sweeps
// behind the head (which always stays in front), lighting the dusty air.
const BEAM_GAP_MIN = 14; // seconds dormant between sweeps
const BEAM_GAP_MAX = 34;
const BEAM_DURATION = 5.5; // seconds per slow sweep
const BEAM_ARC = 1.15; // radians the beam swings through
const BEAM_WIDTH = 0.18; // shaft cross-width, × min dimension
const BEAM_REACH = 0.7; // shaft length, × max dimension
const BEAM_ALPHA = 0.5; // peak brightness
const BEAM_COLOR = '#bcd2ff'; // pale cool searchlight

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
 * "Hide until everybody is dead" — a watercolour head suspended in a field of
 * fine motes. Hidden onlookers surface from the dust around it, watch for a
 * moment, then hide back into it, so something is always quietly hiding at the
 * edges while the head — the piece's anchor — stays in full view throughout.
 * It stays alive even idle: a slow autonomous drift, breathing and tilt sway,
 * with the eyes blinking at random intervals. Once in a while a directional
 * beam of light sweeps across the dark, like a distant searchlight scanning for
 * who is hiding, then fades. Overhead coloured stage-lights pulse gently for a
 * little atmosphere. Moving the pointer stirs a local draft; a tap sends a gust.
 *
 * The timing/simulation is pure @domain/generative (DustField, WatcherField,
 * SweepBeam, FrameTimeline, BeatClock, Parallax); this only loads and renders.
 */
export class DustSketch implements Sketch {
  private width = 0;
  private height = 0;
  private field!: DustField;
  private watchers!: WatcherField;

  private frames: HTMLImageElement[] = [];
  // Drives only the stage lights (see drawStageLights).
  private readonly beat = new BeatClock(BPM);

  // Occasional searchlight sweep. `beamBuffer` holds the soft shaft shape; the
  // per-sweep path (origin side, swing direction) is re-rolled when the beam's
  // id changes.
  private readonly beam = new SweepBeam(BEAM_GAP_MIN, BEAM_GAP_MAX, BEAM_DURATION);
  private readonly beamBuffer = document.createElement('canvas');
  private beamId = -1;
  private beamOriginX = 0.5;
  private beamDir = 1;

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
    this.watchers = new WatcherField(width, height, WATCHER_COUNT);
    this.buildBeamBuffer();

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
    this.watchers.resize(width, height);
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
    const headSize = Math.min(width, height) * HEAD_SIZE_FACTOR;
    this.watchers.update(frame.t, headSize * WATCHER_SAFE);

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

    // The searchlight sweeps through the dusty air, behind the head.
    const beamSample = this.beam.sample(frame.t);
    if (beamSample) this.drawBeam(ctx, beamSample);

    // Lights first, then the watchers on top of them, so the eyes keep their
    // warm colour instead of being tinted and muddied by the coloured wash.
    this.drawStageLights(ctx, frame);
    this.drawWatchers(ctx);
    this.drawHead(ctx, frame);
  }

  // Draws the current sweep of the searchlight: a soft shaft from a source above
  // the top edge, its angle swinging across the scene as the sweep progresses.
  private drawBeam(ctx: CanvasRenderingContext2D, sample: BeamSample): void {
    if (sample.id !== this.beamId) {
      this.beamId = sample.id; // new sweep — re-roll its path
      this.beamOriginX = rand(0.2, 0.8);
      this.beamDir = Math.random() < 0.5 ? -1 : 1;
    }

    const { width, height } = this;
    const originX = width * this.beamOriginX;
    const originY = -height * 0.15; // just above the top edge
    // Swing the beam through BEAM_ARC around straight-down, direction randomised.
    const swept = this.beamDir >= 0 ? sample.sweep : 1 - sample.sweep;
    const angle = Math.PI / 2 + (swept - 0.5) * BEAM_ARC;
    const reach = Math.max(width, height) * BEAM_REACH;
    const crossW = Math.min(width, height) * BEAM_WIDTH;

    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = sample.intensity * BEAM_ALPHA;
    ctx.translate(originX, originY);
    ctx.rotate(angle);
    // Buffer's +x runs along the beam; centre it across the shaft width.
    ctx.drawImage(this.beamBuffer, 0, -crossW / 2, reach, crossW);
    ctx.restore();
  }

  // Bakes the soft shaft once: a coloured rectangle masked to a bell across its
  // width and a fade along its length (brightest at the source), so the beam has
  // soft edges and attenuates with distance. Resolution-independent — the draw
  // stretches it to the beam's reach and width.
  private buildBeamBuffer(): void {
    const w = 1024;
    const h = 256;
    this.beamBuffer.width = w;
    this.beamBuffer.height = h;
    const b = this.beamBuffer.getContext('2d');
    if (!b) return;

    b.clearRect(0, 0, w, h);
    b.globalCompositeOperation = 'source-over';
    b.fillStyle = BEAM_COLOR;
    b.fillRect(0, 0, w, h);

    // Cross-width bell: transparent edges, opaque core → soft-edged shaft.
    b.globalCompositeOperation = 'destination-in';
    const cross = b.createLinearGradient(0, 0, 0, h);
    cross.addColorStop(0, 'rgba(0, 0, 0, 0)');
    cross.addColorStop(0.5, 'rgba(0, 0, 0, 1)');
    cross.addColorStop(1, 'rgba(0, 0, 0, 0)');
    b.fillStyle = cross;
    b.fillRect(0, 0, w, h);

    // Length fade: bright at the source (x=0), gone by the far end (multiplies
    // the alpha already set by the cross bell).
    const along = b.createLinearGradient(0, 0, w, 0);
    along.addColorStop(0, 'rgba(0, 0, 0, 0.9)');
    along.addColorStop(0.55, 'rgba(0, 0, 0, 0.5)');
    along.addColorStop(1, 'rgba(0, 0, 0, 0)');
    b.fillStyle = along;
    b.fillRect(0, 0, w, h);

    b.globalCompositeOperation = 'source-over';
  }

  // Hidden onlookers: pairs of eyes coalescing from the dust and dissolving
  // back, drawn additively in the same warm light as the motes.
  private drawWatchers(ctx: CanvasRenderingContext2D): void {
    const base = Math.min(this.width, this.height) * WATCHER_EYE_BASE;
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    for (const w of this.watchers.list) {
      if (w.openness > 0.02) this.drawEyes(ctx, w, base);
    }
    ctx.restore();
  }

  private drawEyes(ctx: CanvasRenderingContext2D, w: Watcher, base: number): void {
    const eyeW = base * w.scale;
    const eyeH = eyeW * 0.62;
    const gap = eyeW * 1.5;
    // The iris glint leans toward the head, so the gaze reads as watching it.
    const gazeX = Math.sign(this.width / 2 - w.x) * eyeW * 0.22;
    const gazeY = Math.sign(this.height / 2 - w.y) * eyeH * 0.2;

    ctx.save();
    ctx.translate(w.x, w.y);
    ctx.rotate(w.tilt);
    for (const dir of [-1, 1]) {
      ctx.save();
      ctx.translate(dir * gap, 0);
      ctx.scale(1, w.openness); // eyelid: the almond squashes shut as it hides
      ctx.beginPath();
      ctx.ellipse(0, 0, eyeW, eyeH, 0, 0, TWO_PI);
      ctx.clip();
      // A glowing iris ring around a dark pupil (the transparent centre reads as
      // the pupil under additive blending, which can only add light).
      const g = ctx.createRadialGradient(gazeX, gazeY, 0, gazeX, gazeY, eyeW);
      g.addColorStop(0, `rgba(${WATCHER_COLOR}, 0)`);
      g.addColorStop(0.42, `rgba(${WATCHER_COLOR}, ${0.95 * w.openness})`);
      g.addColorStop(1, `rgba(${WATCHER_COLOR}, 0)`);
      ctx.fillStyle = g;
      ctx.fillRect(-eyeW, -eyeH, eyeW * 2, eyeH * 2);
      ctx.restore();
    }
    ctx.restore();
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
