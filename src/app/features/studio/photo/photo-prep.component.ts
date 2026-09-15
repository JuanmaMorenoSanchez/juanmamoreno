import { DecimalPipe } from '@angular/common';
import {
  Component,
  computed,
  effect,
  ElementRef,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { detectQuad } from '@domain/image/detect-corners';
import { withRights, type Rights } from '@domain/image/jpeg-rights';
import {
  preparePhoto,
  type PhotoStage,
  type PreparePhotoReport,
  type PhotoEdit,
} from '@domain/image/prepare-photo';
import {
  applyAdjustments,
  isUnchanged,
  NO_ADJUSTMENTS,
  type Adjustments,
} from '@domain/image/adjustments';
import { qualityFor, readJpegSource, type JpegSource } from '@domain/image/jpeg-source';
import { isRawPhotograph, largestEmbeddedJpeg } from '@domain/image/raw-preview';
import { measurementAsTyped, measurementValue } from '@domain/artwork/mint-vocabulary';
import { PhotoBrush } from './photo-brush';
import { PhotoRights } from './photo-rights';
import {
  createSelection,
  hasSelection,
  turnSelection,
  type Selection,
} from '@domain/image/selection';
import { solveHomography, warpPerspective } from '@domain/image/perspective';
import { inject } from '@angular/core';
import { StudioHandoffService } from '../studio-handoff.service';

import {
  bowControls,
  bowOffset,
  correctedSize,
  EDGE_CORNERS,
  fullFrame,
  squaringMismatch,
  straightBows,
  turnClockwise,
  type EdgeBows,
  type EdgeName,
  type Point,
  type Quad,
} from '@domain/image/quad';
import { sampleBilinear, type Raster } from '@domain/image/raster';

/** A slider's position, as a fraction from -1 to 1. */
function sliderValue(event: Event): number {
  const raw = Number((event.target as HTMLInputElement).value);
  if (!Number.isFinite(raw)) return 0;
  return Math.min(1, Math.max(-1, raw / 100));
}

/**
 * A point put through a homography.
 *
 * The solver returns eight numbers, not nine: the ninth is fixed at one, which
 * is what makes the other eight solvable at all. Reading a `h[8]` that is not
 * there gives undefined, and every point then maps to NaN — which is not a
 * visible failure but a silent one, because a dab at NaN simply paints nothing.
 * `warpPerspective` writes the same `+ 1` a few lines away.
 */
function mapThrough(h: Float64Array, point: { x: number; y: number }): { x: number; y: number } {
  const w = h[6] * point.x + h[7] * point.y + 1;
  const safe = w === 0 ? 1e-9 : w;
  return {
    x: (h[0] * point.x + h[1] * point.y + h[2]) / safe,
    y: (h[3] * point.x + h[4] * point.y + h[5]) / safe,
  };
}

/**
 * The photograph is shown no larger than this. Corners are kept in its own
 * pixels regardless, so this is about how precisely one can be placed by hand:
 * a corner dropped a pixel out on a two thousand pixel preview is three pixels
 * out on a six thousand pixel photograph, and nine on a nine hundred one.
 */
const PREVIEW_LONG_SIDE = 2000;
/** Corner finding works on a copy this size, which is all the detail an outline needs. */
/** Large enough to fingerprint from, small enough to warp instantly. */
const SAMPLE_LONG_SIDE = 96;

const DETECTION_LONG_SIDE = 720;
/**
 * How the corrected photograph is written back out.
 *
 * Straightening moves every pixel, so the picture must be encoded again and one
 * generation of loss is unavoidable. What is avoidable is making that
 * generation worse than it needs to be, or the file larger than it needs to be,
 * and those pull in opposite directions — so the answer is taken from the file
 * that arrived rather than fixed here.
 *
 * Measured in the browser this runs in: `canvas.toBlob` writes 4:2:0 at every
 * quality up to 0.99 and 4:4:4 only from 0.995. There is no setting in between.
 * So a photograph that arrived in full colour can only keep it at the top of the
 * scale, which is larger than the original — maximum quality faithfully records
 * the grain and the original's own compression, and neither is extra detail.
 * One whose colour was already halved has nothing left to protect and comes back
 * at the quality it came in at, about the size it was.
 *
 * See `domain/image/jpeg-source.ts`, which reads both facts out of the header.
 */

const STAGE_LABELS: Record<PhotoStage, string> = {
  straightening: 'Straightening the perspective',
  adjusting: 'Applying the adjustments',
  focus: 'Checking the focus',
};

const CORNER_NAMES = ['top left', 'top right', 'bottom right', 'bottom left'];

/**
 * How wide a corner handle is drawn, in pixels of the page.
 *
 * Wide, because the handle is what the pointer is on while the corner
 * underneath it is what has to be judged: a small circle puts the cursor
 * exactly where the eye needs to be, and a wide ring is grabbed anywhere along
 * its edge. The cross marks the exact pixel either way.
 *
 * It was adjustable, on a slider, and the artist never moved it — zooming is
 * what the width was standing in for, and the ring already holds its size on
 * screen as the picture grows under it. One number, not a setting.
 */
const HANDLE_SIZE = 46;

/**
 * How far into the photograph one can go.
 *
 * The stage shows the whole photograph at once, which is right for judging it
 * and wrong for placing a corner: a corner dropped a pixel out on a stage a
 * thousand pixels wide is six pixels out on the photograph. Zooming the whole
 * browser was the way round that, and it takes the controls with it. Four is
 * as far as it is worth going — beyond that the preview itself, capped at two
 * thousand pixels, has no more detail to show.
 */
const MAX_ZOOM = 4;

/**
 * Where the sliders were last left.
 *
 * A studio is one room with one set of lights, so the correction a photograph
 * taken in it needs is very nearly the correction the next one needs. Starting
 * every picture at nought meant finding the same numbers again each time.
 *
 * Read fresh rather than kept, so a second tab does not hand back what it
 * happened to be holding when it opened.
 */
const ADJUSTMENTS_KEY = 'juanmamoreno.studio.adjustments';

function rememberedAdjustments(): Adjustments {
  const within = (value: unknown): number =>
    typeof value === 'number' && Number.isFinite(value) ? Math.min(1, Math.max(-1, value)) : 0;

  try {
    const stored = JSON.parse(
      window.localStorage.getItem(ADJUSTMENTS_KEY) ?? 'null'
    ) as Partial<Adjustments> | null;
    if (!stored) return NO_ADJUSTMENTS;

    return {
      brightness: within(stored.brightness),
      temperature: within(stored.temperature),
      whites: within(stored.whites),
      darks: within(stored.darks),
      saturation: within(stored.saturation),
    };
  } catch {
    // Storage off, or something else's data under our key. Nought is always a
    // safe place to start: it is the photograph as it arrived.
    return NO_ADJUSTMENTS;
  }
}

function rememberAdjustments(adjustments: Adjustments): void {
  try {
    window.localStorage.setItem(ADJUSTMENTS_KEY, JSON.stringify(adjustments));
  } catch {
    // A browser that refuses to remember is not a reason to stop working.
  }
}

@Component({
  selector: 'app-photo-prep',
  imports: [DecimalPipe],
  // Listened for on the document, because the space bar is pressed wherever the
  // hand happens to have left the focus — on a corner handle just dragged, on
  // the button that turned the picture — and a key that only worked after
  // clicking the right nothing would not be the tool it is imitating.
  host: {
    '(document:keydown)': 'takeSpace($event)',
    '(document:keyup)': 'releaseSpace($event)',
    '(window:blur)': 'stopPanning()',
  },
  templateUrl: './photo-prep.component.html',
  styleUrl: './photo-prep.component.scss',
})
export class PhotoPrepComponent {
  private readonly stage = viewChild<ElementRef<HTMLElement>>('stage');
  /** The box the stage is scrolled inside, which is what panning moves. */
  private readonly viewport = viewChild<ElementRef<HTMLElement>>('viewport');
  private readonly previewCanvas = viewChild<ElementRef<HTMLCanvasElement>>('preview');

  private readonly photo = signal<ImageBitmap | null>(null);
  /** Either a corner by index, or one control point of one side. */
  private dragging: number | { edge: EdgeName; index: 0 | 1 } | null = null;
  /** How far the point being dragged sat from the pointer when it was taken hold of. */
  private grabbedAt: Point = { x: 0, y: 0 };

  constructor() {
    // What the form below needs to know before anything is rendered: whether
    // there is a photograph it could have, and what size it would be. Published
    // as they change, so its buttons can be offered straight away.
    effect(() => {
      this.handoff.canProduce.set(this.canProcess());
      const height = this.heightText();
      const width = this.widthText();
      this.handoff.size.set(height && width ? { height, width } : null);
    });

    // A small straightened copy, for the form to compare against the
    // collection. Settled on a timer rather than recomputed under a dragging
    // corner: it is wanted once the picture has stopped moving, not forty times
    // a second while it is.
    effect(() => {
      const ready = this.canProcess();
      const corners = this.corners();
      this.adjustments();
      if (this.sampleTimer) clearTimeout(this.sampleTimer);
      if (!ready || !corners) {
        this.handoff.sample.set(null);
        return;
      }
      this.sampleTimer = setTimeout(() => untracked(() => this.publishSample()), 500);
    });

    // The form has asked for the photograph. This is the only thing that starts
    // the expensive work now — warping forty megapixels is not something to do
    // on the chance that it will be wanted.
    effect(() => {
      if (!this.handoff.asksForPhotograph()) return;
      void this.process();
    });

    // Cleared from below. Saving or signing a certificate finishes with this
    // photograph, and what should be on screen afterwards is an empty studio
    // ready for the next painting — not the last one still straightened on the
    // stage with its file name above it.
    effect(() => {
      if (!this.handoff.startsAgain()) return;
      untracked(() => this.reset());
    });

    // The canvas is inside the block that `size` reveals, so at the moment the
    // photograph is opened it does not exist yet and drawing into it draws into
    // nothing. Waiting on the view child instead means the paint happens once
    // the stage is actually on the page.
    effect(() => {
      const canvas = this.previewCanvas()?.nativeElement;
      const photo = this.photo();
      if (canvas && photo) drawInto(canvas, photo);
      this.pristine = null;
    });

    // The preview shows what the sliders are doing, as they are moved. Reading
    // them here is what subscribes this to them: a control whose effect can only
    // be seen by pressing the button and waiting is one you cannot judge.
    effect(() => {
      const canvas = this.previewCanvas()?.nativeElement;
      const photo = this.photo();
      const edits = this.previewEdits();
      const selection = this.previewSelection();
      const showing = this.selecting() || this.hasArea();
      if (!canvas || !photo) return;
      this.repaint(canvas, edits, selection, showing);
    });
  }

  protected readonly cornerNames = CORNER_NAMES;
  /**
   * Who made the painting, written into the file itself.
   *
   * A canvas encodes a jpeg with no author, no rights and no colour profile, so
   * every corrected painting used to leave the studio anonymous — and a
   * reproduction of a painting is exactly the kind of image that travels and
   * arrives somewhere with nobody attached to it. Remembered between sessions,
   * because it is the same answer every time.
   */
  private readonly rightsPanel = new PhotoRights();

  protected readonly artist = this.rightsPanel.artist;
  protected readonly notice = this.rightsPanel.notice;
  protected readonly webStatement = this.rightsPanel.webStatement;
  protected readonly noticePreview = this.rightsPanel.noticePreview;
  protected readonly rights = this.rightsPanel.rights;

  protected setArtist(event: Event): void {
    this.rightsPanel.setArtist(textIn(event));
  }

  protected setNotice(event: Event): void {
    this.rightsPanel.setNotice(textIn(event));
  }

  protected setWebStatement(event: Event): void {
    this.rightsPanel.setWebStatement(textIn(event));
  }

  protected readonly handleSize = HANDLE_SIZE;

  protected readonly maxZoom = MAX_ZOOM;

  /** How far the stage is magnified. One is the whole photograph, as before. */
  protected readonly zoom = signal(1);

  protected setZoom(event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);
    this.zoom.set(Number.isFinite(value) ? Math.min(MAX_ZOOM, Math.max(1, value)) : 1);
    if (this.zoom() <= 1) this.stopPanning();
  }

  /**
   * Whether the pointer is moving the view rather than the picture.
   *
   * The hand tool, and held down rather than switched on for the same reason it
   * is in every other program: panning happens in the middle of placing a
   * corner, and a mode you have to leave and come back to is a mode you forget
   * you are in.
   */
  protected readonly panning = signal(false);

  /** Where the pointer was and where the view was, at the moment of the grab. */
  private panFrom: { x: number; y: number; left: number; top: number } | null = null;

  /**
   * Claims the space bar, but only where it is worth claiming.
   *
   * Space does something already: it types, it ticks a checkbox, it presses the
   * button that has the focus. So it is taken only when there is a photograph
   * on the stage that is magnified — which is the only time there is anywhere
   * to pan to — and never while something is being typed into. Buttons and the
   * sliders give it up in that case, which is the one real cost; Enter still
   * presses a button.
   */
  protected takeSpace(event: KeyboardEvent): void {
    if (event.code !== 'Space' || !this.size() || this.zoom() <= 1) return;
    if (isTypingInto(event.target)) return;
    // Otherwise the page jumps a screenful down under the picture being panned.
    event.preventDefault();
    this.panning.set(true);
  }

  protected releaseSpace(event: KeyboardEvent): void {
    if (event.code === 'Space') this.stopPanning();
  }

  /** Also on losing the window, where no keyup is ever going to arrive. */
  protected stopPanning(): void {
    this.panning.set(false);
    this.panFrom = null;
  }

  private startPan(event: PointerEvent): void {
    const viewport = this.viewport()?.nativeElement;
    if (!viewport) return;
    this.panFrom = {
      x: event.clientX,
      y: event.clientY,
      left: viewport.scrollLeft,
      top: viewport.scrollTop,
    };
    (event.target as Element).setPointerCapture?.(event.pointerId);
    event.preventDefault();
  }

  /**
   * Moves the view under the hand, the opposite way to a scrollbar.
   *
   * The picture follows the pointer exactly, which is what makes this more
   * intuitive than the scrollbars it replaces: the distance dragged is the
   * distance the painting moves, in the direction it was dragged.
   */
  protected pan(event: PointerEvent): void {
    const from = this.panFrom;
    const viewport = this.viewport()?.nativeElement;
    if (!from || !viewport) return;
    viewport.scrollLeft = from.left - (event.clientX - from.x);
    viewport.scrollTop = from.top - (event.clientY - from.y);
  }

  protected readonly fileName = signal('');

  /** How the chosen photograph was written, which decides how it is written back. */
  protected readonly source = signal<JpegSource | null>(null);

  /** Said plainly under the file, because a bigger file than the original is a surprise. */
  /** The number handed to the encoder, taken from what arrived. */
  protected readonly encodeQuality = computed(() => {
    const source = this.source();
    return source ? qualityFor(source) : 1;
  });

  protected readonly sourceNote = computed(() => {
    const source = this.source();
    if (!source) return '';
    const colour = source.fullColour ? 'full colour' : 'half colour';
    const quality = source.quality ? `quality ${source.quality}` : 'quality unknown';
    return source.fullColour
      ? `${quality}, ${colour} — saved back at the top of the scale, the only setting that keeps it`
      : `${quality}, ${colour} — saved back at the same quality it arrived`;
  });
  protected readonly size = signal<{ width: number; height: number } | null>(null);
  protected readonly corners = signal<Quad | null>(null);
  /**
   * How each side bends between its corners.
   *
   * Four corners describe a painting seen at an angle, and nothing more: a lens
   * bows the long sides, and a stretcher that has taken a bow bows them for
   * real. Left straight, these change nothing whatsoever — the correction takes
   * the same path it always did — so the cost of offering them is only what
   * they are worth on the photographs that need them.
   */
  protected readonly bows = signal<EdgeBows | null>(null);
  protected readonly edgeNames = Object.keys(EDGE_CORNERS) as EdgeName[];
  protected readonly foundEdges = signal(true);
  /** In centimetres, though only the ratio between them is ever read. */
  /**
   * Whether the picture is squared up to the measurements typed below it.
   *
   * On, because it is right for a photograph of a whole canvas, which is nearly
   * all of them. Off for a detail or a canvas caught half-finished: the
   * measurements still describe the painting, but the photograph is not of the
   * whole of it, and squaring one to the other stretches what is there.
   *
   * Not remembered between photographs. The exception should have to be asked
   * for each time, because a stretched painting is easy to leave switched on and
   * hard to notice afterwards.
   */
  protected readonly adaptToSize = signal(true);

  /**
   * The measurements as typed, and what they are worth.
   *
   * Held as text because that is what is being written: the boxes were number
   * inputs stepping in tenths, which refused a comma outright and called two
   * decimal places invalid. The collection writes "140,5", so the box should
   * take "140,5".
   */
  protected readonly widthText = signal('');
  protected readonly heightText = signal('');

  protected readonly realWidth = computed(() => measurementValue(this.widthText()));
  protected readonly realHeight = computed(() => measurementValue(this.heightText()));
  /**
   * The three sliders, each nought at the photograph as it arrived.
   *
   * These replaced five checkboxes that measured the photograph and decided for
   * themselves. Each was trying to answer a question it could not — whether a
   * dark corner is a lamp that fell off or paint that is dark — and was kept
   * deliberately too weak because of the doubt. The person looking at the
   * painting knows, so they say.
   */
  private readonly lastLeftAt = rememberedAdjustments();

  protected readonly brightness = signal(this.lastLeftAt.brightness);
  protected readonly temperature = signal(this.lastLeftAt.temperature);
  /**
   * The two ends of the scale, each on its own slider.
   *
   * They were one — "range" — which stretched both ends away from mid grey
   * together. A canvas photographed against a lit wall usually needs one of
   * them and not the other, and moving both was a choice of which to get wrong.
   */
  protected readonly whites = signal(this.lastLeftAt.whites);
  protected readonly darks = signal(this.lastLeftAt.darks);
  /** How strong the colour is, which nothing else here can answer. */
  protected readonly saturation = signal(this.lastLeftAt.saturation);

  protected readonly adjustments = computed<Adjustments>(() => ({
    brightness: this.brightness(),
    temperature: this.temperature(),
    whites: this.whites(),
    darks: this.darks(),
    saturation: this.saturation(),
  }));

  /**
   * The changes already made and kept, oldest first.
   *
   * The sliders describe one change to whatever is selected now. That alone
   * meant a correction followed the brush: brighten one corner, select another,
   * and the brightening moved with the selection and left the first corner as
   * it was. So a change is committed here the moment the selection is about to
   * differ, and the sliders start again from nothing.
   */
  private readonly edits = signal<PhotoEdit[]>([]);

  /** How many changes are already kept, so the page can say so. */
  protected readonly keptCount = computed(() => this.edits().length);

  protected readonly anyAdjustment = computed(
    () => this.edits().length > 0 || !isUnchanged(this.adjustments())
  );

  /**
   * Everything done so far, with whatever the sliders are showing last.
   *
   * The pending one is not committed until the selection changes, so that
   * moving a slider back and forth refines it rather than piling up a change
   * for every pixel of travel.
   */
  private readonly allEdits = computed<PhotoEdit[]>(() => {
    const pending = this.adjustments();
    const kept = this.edits();
    if (isUnchanged(pending)) return kept;
    return [...kept, { adjustments: pending, selection: this.hasArea() ? this.selection() : null }];
  });

  /**
   * Keeps what the sliders currently say, and starts them again.
   *
   * Called just before the selection changes — nothing is committed while a
   * stroke is still being drawn, so extending a selection in one movement goes
   * on refining the same change rather than splitting it in two.
   */
  private commitPending(): void {
    if (isUnchanged(this.adjustments())) return;
    const selection = this.hasArea() ? this.selection() : null;
    this.edits.update((kept) => [
      ...kept,
      {
        adjustments: this.adjustments(),
        // Copied, because the brush goes on painting into the live one.
        selection: selection
          ? {
              values: new Float32Array(selection.values),
              width: selection.width,
              height: selection.height,
            }
          : null,
      },
    ]);
    this.zeroSliders();
  }

  /**
   * Everything about selecting an area, kept in one object of its own.
   *
   * The component still owns the geometry, because the brush is used on the
   * photograph while the adjustment lands on the straightened rectangle: each
   * dab is mapped through the same homography as the pixels before it is
   * painted. What is left here is that mapping and the pointer; the mask, the
   * settings and the tool live in PhotoBrush.
   */
  protected readonly brushTool = new PhotoBrush();

  protected readonly selecting = this.brushTool.selecting;
  protected readonly brushMode = this.brushTool.mode;
  protected readonly brushRadius = this.brushTool.radius;
  protected readonly brushSoftness = this.brushTool.softness;
  protected readonly brushCursor = this.brushTool.cursor;

  /** Where the sliders apply. Empty means everywhere, which is the usual case. */
  protected readonly selection = this.brushTool.selection;
  protected readonly hasArea = this.brushTool.hasArea;
  protected readonly busy = signal<PhotoStage | null>(null);
  protected readonly report = signal<PreparePhotoReport | null>(null);
  protected readonly resultUrl = signal<string | null>(null);
  /** Kept as well as the url, so the result can be handed on without a round trip through disk. */
  private readonly resultBlob = signal<Blob | null>(null);
  private readonly handoff = inject(StudioHandoffService);
  protected readonly handedOver = signal(false);
  protected readonly problem = signal('');

  protected readonly busyLabel = computed(() => {
    const stage = this.busy();
    return stage ? STAGE_LABELS[stage] : '';
  });

  protected readonly measured = computed(() => {
    const width = this.realWidth();
    const height = this.realHeight();
    return !!width && !!height && width > 0 && height > 0;
  });

  protected readonly canProcess = computed(
    () => !!this.corners() && this.measured() && !this.busy()
  );

  /**
   * Whether squaring the picture up to the typed size would pull it out of true.
   *
   * The corners describe a shape and the measurements describe a shape, and on
   * a painting photographed square-on those are the same shape. When they are
   * not, it is the picture that gives — silently, because the numbers are what
   * it is squared to.
   *
   * A word and never a refusal: the artist may have the tape measure in hand
   * and know better than the photograph. Only while the squaring is switched
   * on, since with it off the picture keeps its own shape and there is nothing
   * to warn about.
   */
  protected readonly squaring = computed(() => {
    const corners = this.corners();
    const width = this.realWidth();
    const height = this.realHeight();
    if (!corners || !width || !height || !this.adaptToSize()) return null;
    return squaringMismatch(corners, width, height);
  });

  /** A measurement written the way the collection writes one. */
  protected asMeasured(centimetres: number): string {
    return centimetres.toFixed(1).replace('.', ',').replace(/,0$/, '');
  }

  protected readonly stretchedBy = computed(() => {
    const off = this.squaring();
    return off ? Math.round(off.stretch * 100) : 0;
  });

  /**
   * The outline as a path rather than a polygon, so a bowed side is drawn as
   * the curve it is. What is being judged is whether the line drawn follows the
   * edge of the painting, and a straight line between bent corners cannot show
   * that it does not.
   */
  protected readonly outline = computed(() => {
    const corners = this.corners();
    const bows = this.bows();
    if (!corners) return '';
    if (!bows) {
      return `M ${corners.map((c) => `${c.x} ${c.y}`).join(' L ')} Z`;
    }
    const curve = (edge: EdgeName, reverse = false) => {
      const [from, to] = EDGE_CORNERS[edge];
      const [c0, c1] = bowControls(corners, bows, edge);
      const end = reverse ? corners[from] : corners[to];
      const first = reverse ? c1 : c0;
      const second = reverse ? c0 : c1;
      return `C ${first.x} ${first.y} ${second.x} ${second.y} ${end.x} ${end.y}`;
    };
    return [
      `M ${corners[0].x} ${corners[0].y}`,
      curve('top'),
      curve('right'),
      curve('bottom', true),
      curve('left', true),
      'Z',
    ].join(' ');
  });

  /**
   * The control points, placed like the corner handles. Each is drawn joined to
   * the corner it belongs to, so it reads as a pull on that corner's side
   * rather than a loose dot in the middle of the picture.
   */
  protected readonly bowHandles = computed(() => {
    const size = this.size();
    const corners = this.corners();
    const bows = this.bows();
    if (!size || !corners || !bows) return [];

    return this.edgeNames.flatMap((edge) => {
      const controls = bowControls(corners, bows, edge);
      return ([0, 1] as const).map((index) => {
        const point = controls[index];
        const anchor = corners[EDGE_CORNERS[edge][index]];
        return {
          edge,
          index,
          left: `${(point.x / size.width) * 100}%`,
          top: `${(point.y / size.height) * 100}%`,
          tether: `M ${anchor.x} ${anchor.y} L ${point.x} ${point.y}`,
        };
      });
    });
  });

  /**
   * Stands the photograph up, a quarter turn at a time.
   *
   * The pixels themselves are turned rather than the picture being displayed
   * rotated, so everything downstream — the corner finding, the warp, the
   * brush, the fingerprint — goes on working in one set of coordinates. What it
   * costs is one draw of the full photograph, once, when the button is pressed.
   *
   * The corners and the brushed area come round with it. Leaving them would
   * give a certificate of a painting on its side squeezed into the shape of an
   * upright one, and an adjustment on the wrong corner.
   */
  protected async turn(): Promise<void> {
    const photo = this.photo();
    const corners = this.corners();
    const bows = this.bows();
    const size = this.size();
    if (!photo || !corners || !bows || !size || this.busy()) return;

    const canvas = document.createElement('canvas');
    canvas.width = size.height;
    canvas.height = size.width;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;
    context.translate(canvas.width, 0);
    context.rotate(Math.PI / 2);
    context.drawImage(photo, 0, 0);

    const turned = await createImageBitmap(canvas);
    const geometry = turnClockwise(corners, bows, size);

    photo.close();
    this.photo.set(turned);
    this.size.set({ width: canvas.width, height: canvas.height });
    this.corners.set(geometry.quad);
    this.bows.set(geometry.bows);
    this.turnSelections();
  }

  /** Every mask there is, brought round with the picture it was painted on. */
  private turnSelections(): void {
    const selection = this.brushTool.selection();
    if (selection) {
      this.brushTool.selection.set(turnSelection(selection));
      this.brushTool.version.update((n) => n + 1);
    }
    this.edits.update((kept) =>
      kept.map((edit) => ({
        adjustments: edit.adjustments,
        selection: edit.selection ? turnSelection(edit.selection) : null,
      }))
    );
  }

  protected straightenSides(): void {
    if (this.corners()) this.bows.set(straightBows());
  }

  /** Placed as a share of the frame, so a handle stays the same size however the photo is scaled. */
  protected readonly handles = computed(() => {
    const size = this.size();
    const corners = this.corners();
    if (!size || !corners) return [];
    return corners.map((corner) => ({
      left: `${(corner.x / size.width) * 100}%`,
      top: `${(corner.y / size.height) * 100}%`,
    }));
  });

  protected readonly downloadName = computed(() => {
    const name = this.fileName().replace(/\.[^.]+$/, '') || 'painting';
    return `${name}-flat.jpg`;
  });

  /** "the left", or "the left and the right", or "the left, the top and the right". */
  protected borderList(borders: string[]): string {
    const named = borders.map((border) => `the ${border}`);
    if (named.length < 2) return named.join('');
    return `${named.slice(0, -1).join(', ')} and ${named[named.length - 1]}`;
  }

  protected setWidth(event: Event): void {
    this.widthText.set(typedInto(event));
  }

  protected setHeight(event: Event): void {
    this.heightText.set(typedInto(event));
  }

  /**
   * Nothing is filled in for the artist.
   *
   * The boxes used to offer the last size given, or failing that the
   * proportions of the photograph itself. Both were only ever a starting point,
   * and a starting point that is already in the box is a measurement nobody
   * reads before pressing on — the wrong size on a certificate looks exactly
   * like the right one. They are empty now, and required: the painting cannot
   * be squared up without them, so nothing renders until they are given.
   */

  protected async onFile(event: Event): Promise<void> {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) await this.open(file);
  }

  protected async onDrop(event: DragEvent): Promise<void> {
    event.preventDefault();
    const file = event.dataTransfer?.files?.[0];
    if (file) await this.open(file);
  }

  protected allowDrop(event: DragEvent): void {
    event.preventDefault();
  }

  private async open(file: File): Promise<void> {
    this.reset();
    this.fileName.set(file.name);

    const bytes = new Uint8Array(await file.arrayBuffer());
    const raw = isRawPhotograph(file.name);

    // A browser cannot develop a raw, but every raw carries the JPEG the camera
    // made at the moment of the shot — on this one, the full 6016 × 4000 frame.
    // That is the picture, and it is what the camera would have written had the
    // shot been taken as a JPEG.
    const readable = raw ? largestEmbeddedJpeg(bytes) : bytes;
    if (raw && !readable) {
      this.problem.set(
        'No photograph could be found inside that raw file. Export a JPEG from it and use that.'
      );
      return;
    }

    let photo: ImageBitmap;
    try {
      // Phone cameras record which way up they were held rather than rotating
      // the pixels, so without this a portrait painting arrives on its side.
      photo = await createImageBitmap(
        raw ? new Blob([readable as Uint8Array<ArrayBuffer>], { type: 'image/jpeg' }) : file,
        { imageOrientation: 'from-image' }
      );
    } catch {
      this.problem.set(
        raw
          ? 'The photograph inside that raw file could not be read.'
          : 'That file could not be read as an image.'
      );
      return;
    }

    // What arrived, so what leaves can match it. A raw has no quality of its
    // own to match — the number belongs to the JPEG a camera embedded in it,
    // not to the sensor — so it is written back at the top of the scale.
    try {
      this.source.set(raw ? { quality: null, fullColour: true } : readJpegSource(bytes));
    } catch {
      this.source.set(null);
    }

    const { width, height } = photo;
    this.photo.set(photo);
    this.size.set({ width, height });

    const small = this.rasterAt(DETECTION_LONG_SIDE);
    const found = detectQuad(small);
    const scale = width / small.width;
    this.foundEdges.set(found.detected);
    const quad = found.detected
      ? (found.quad.map((corner) => ({ x: corner.x * scale, y: corner.y * scale })) as Quad)
      : fullFrame({ width, height });
    this.corners.set(quad);
    // Straight to begin with: corner finding fits four sides, so a bow is
    // always something the artist adds after looking.
    this.bows.set(straightBows());
  }

  private sampleTimer: ReturnType<typeof setTimeout> | null = null;

  /**
   * A small straightened copy of what is on the stage.
   *
   * Small on purpose: what it is for is a sixty-four bit fingerprint, and the
   * collection it will be compared against is held as two-kilobyte thumbnails.
   * Warping ninety-six pixels costs nothing next to warping forty megapixels.
   */
  private publishSample(): void {
    const corners = this.corners();
    const realWidth = this.realWidth();
    const realHeight = this.realHeight();
    if (!corners || !realWidth || !realHeight || !this.photo()) {
      this.handoff.sample.set(null);
      return;
    }

    try {
      const source = this.rasterAt(SAMPLE_LONG_SIDE);
      const scale = source.width / (this.size()?.width ?? source.width);
      const scaled = corners.map((corner) => ({
        x: corner.x * scale,
        y: corner.y * scale,
      })) as Quad;
      const target = correctedSize(scaled, realWidth, realHeight, this.adaptToSize());
      const small = warpPerspective(source, scaled, target);
      applyAdjustments(small, this.adjustments(), null);
      this.handoff.sample.set(small);
    } catch {
      // Only a warning depends on this; the certificate does not.
      this.handoff.sample.set(null);
    }
  }

  /** Draws the photograph into a scratch canvas to read its pixels back out. */
  private rasterAt(longSide?: number): Raster {
    const photo = this.photo() as ImageBitmap;
    const longest = Math.max(photo.width, photo.height);
    const scale = longSide ? Math.min(1, longSide / longest) : 1;
    const width = Math.max(1, Math.round(photo.width * scale));
    const height = Math.max(1, Math.round(photo.height * scale));

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d', {
      willReadFrequently: true,
    }) as CanvasRenderingContext2D;
    context.drawImage(photo, 0, 0, width, height);
    return { width, height, data: context.getImageData(0, 0, width, height).data };
  }

  /**
   * Takes hold of a corner without moving it.
   *
   * The offset between the pointer and the corner is kept and added back on
   * every move, so the corner travels exactly as far as the hand does. Setting
   * it to the pointer instead would snap it under the cursor the instant it was
   * touched, which throws away the placing already made and puts the point
   * being aimed at underneath the finger doing the aiming.
   */
  protected grab(index: number, event: PointerEvent): void {
    // The hand is panning, so the handle under it is only scenery. Left to
    // run, this would drag the corner across the painting instead.
    if (this.panning()) return;
    const at = this.pointIn(event);
    const corner = this.corners()?.[index];
    this.grabbedAt = at && corner ? { x: corner.x - at.x, y: corner.y - at.y } : { x: 0, y: 0 };
    this.dragging = index;
    (event.target as Element).setPointerCapture(event.pointerId);
    event.preventDefault();
  }

  protected grabBow(edge: EdgeName, index: 0 | 1, event: PointerEvent): void {
    if (this.panning()) return;
    const at = this.pointIn(event);
    const corners = this.corners();
    const bows = this.bows();
    const handle = corners && bows ? bowControls(corners, bows, edge)[index] : null;
    this.grabbedAt = at && handle ? { x: handle.x - at.x, y: handle.y - at.y } : { x: 0, y: 0 };
    this.dragging = { edge, index };
    (event.target as Element).setPointerCapture(event.pointerId);
    event.preventDefault();
  }

  protected drag(event: PointerEvent): void {
    if (this.dragging === null) return;

    const at = this.pointIn(event);
    const size = this.size();
    const corners = this.corners();
    if (!at || !size || !corners) return;

    // The offset the handle was taken hold of at, added back, so the point
    // travels exactly as far as the hand does and stays where it was set.
    const clamped = {
      x: Math.min(size.width, Math.max(0, at.x + this.grabbedAt.x)),
      y: Math.min(size.height, Math.max(0, at.y + this.grabbedAt.y)),
    };

    if (typeof this.dragging !== 'number') {
      const bows = this.bows();
      if (!bows) return;
      const { edge, index } = this.dragging;
      // Only the part of the drag square to the side is kept. The rest — the
      // part along it — would not bend the side at all: it would change how
      // fast the side is travelled, stretching one stretch of the painting and
      // squeezing another, which is not a thing a photograph of a painting is
      // ever improved by.
      const pair = [...bows[edge]] as [number, number];
      pair[index] = bowOffset(corners, edge, clamped);
      this.bows.set({ ...bows, [edge]: pair });
      return;
    }

    const index = this.dragging;
    const moved = [...corners] as Quad;
    moved[index] = clamped;
    this.corners.set(moved);
    // The control points need no attention: they are held as distances from
    // their own chord, so they follow the corner that moved on their own. They
    // used to be absolute points, and had to be dragged along by hand here.
  }

  protected release(): void {
    this.dragging = null;
    this.brushing = false;
    this.panFrom = null;
  }

  // --- showing what the controls are doing -------------------------------

  /** The preview as it came off the photograph, kept so each repaint starts clean. */
  private pristine: ImageData | null = null;

  /**
   * The selection, mapped back into the photograph's own coordinates.
   *
   * The mask is kept in the straightened rectangle's space, because that is
   * where the adjustment is finally applied. The preview shows the photograph
   * before it is straightened, so to tint the right pixels the mask has to come
   * back the other way — through the inverse of the same homography.
   */
  /**
   * A selection painted on the straightened rectangle, drawn where it belongs on
   * the photograph.
   *
   * The brush paints into the rectangle the photograph becomes, because that is
   * where the adjustment lands. The preview shows the photograph itself, so the
   * mask has to come back through the same homography to be drawn on it.
   */
  private inPhotoSpace(selection: Selection | null): Selection | null {
    const corners = this.corners();
    const size = this.size();
    const realWidth = this.realWidth();
    const realHeight = this.realHeight();
    if (!selection || !corners || !size || !realWidth || !realHeight) return null;
    if (!hasSelection(selection)) return null;

    const target = correctedSize(corners, realWidth, realHeight, this.adaptToSize());
    const rectangle: Quad = [
      { x: 0, y: 0 },
      { x: target.width, y: 0 },
      { x: target.width, y: target.height },
      { x: 0, y: target.height },
    ];
    const toRectangle = solveHomography(corners, rectangle);

    const inPhoto = createSelection(size.width, size.height);
    for (let y = 0; y < inPhoto.height; y += 1) {
      for (let x = 0; x < inPhoto.width; x += 1) {
        const here = {
          x: ((x + 0.5) / inPhoto.width) * size.width,
          y: ((y + 0.5) / inPhoto.height) * size.height,
        };
        const there = mapThrough(toRectangle, here);
        const u = (there.x / target.width) * selection.width - 0.5;
        const v = (there.y / target.height) * selection.height - 0.5;
        if (u < -1 || v < -1 || u > selection.width || v > selection.height) continue;
        inPhoto.values[y * inPhoto.width + x] = sampleBilinear(
          selection.values,
          selection.width,
          selection.height,
          u,
          v
        );
      }
    }
    return inPhoto;
  }

  /** The current selection, ready to be drawn on the preview. */
  private readonly previewSelection = computed<Selection | null>(() => {
    this.brushTool.version();
    return this.inPhotoSpace(this.selection());
  });

  /**
   * Every change so far, with each one's selection put back where it belongs on
   * the photograph, so the preview can show them stacked as the file will.
   */
  private readonly previewEdits = computed<PhotoEdit[]>(() =>
    this.allEdits().map((edit) => ({
      adjustments: edit.adjustments,
      selection: this.inPhotoSpace(edit.selection),
    }))
  );

  /**
   * Redraws the preview with the sliders applied, and the selection shown.
   *
   * The selection is tinted rather than outlined: a soft brush has no outline to
   * draw, and how strongly an area is selected is the thing that needs to be
   * seen — an edge would say it is either in or out, which is exactly what it is
   * not.
   */
  private repaint(
    canvas: HTMLCanvasElement,
    edits: PhotoEdit[],
    selection: Selection | null,
    showSelection: boolean
  ): void {
    const context = canvas.getContext('2d', { willReadFrequently: true });
    if (!context || !canvas.width || !canvas.height) return;

    this.pristine ??= context.getImageData(0, 0, canvas.width, canvas.height);
    const frame = new ImageData(
      new Uint8ClampedArray(this.pristine.data),
      this.pristine.width,
      this.pristine.height
    );
    const raster: Raster = { width: frame.width, height: frame.height, data: frame.data };

    // Every change so far, in order, each onto the result of the last — so the
    // preview shows what the finished file will show rather than only the
    // change being made at this moment.
    for (const edit of edits) applyAdjustments(raster, edit.adjustments, edit.selection);
    context.putImageData(frame, 0, 0);

    // Drawn on top of the pixels rather than into them, so the next repaint
    // starts from a photograph with no marquee baked into it.
    if (showSelection && selection) {
      outlineSelection(context, selection, canvas.width, canvas.height);
    }
  }

  // --- the sliders -------------------------------------------------------

  protected setBrightness(event: Event): void {
    this.brightness.set(sliderValue(event));
    this.rememberSliders();
  }

  protected setTemperature(event: Event): void {
    this.temperature.set(sliderValue(event));
    this.rememberSliders();
  }

  protected setWhites(event: Event): void {
    this.whites.set(sliderValue(event));
    this.rememberSliders();
  }

  protected setDarks(event: Event): void {
    this.darks.set(sliderValue(event));
    this.rememberSliders();
  }

  protected setSaturation(event: Event): void {
    this.saturation.set(sliderValue(event));
    this.rememberSliders();
  }

  /**
   * Written down whenever the artist moves one, and never when the component
   * moves them itself.
   *
   * The sliders are zeroed as part of keeping a change where it was made, and
   * that is bookkeeping rather than an opinion about where they belong — saving
   * it would throw away the settings the moment a brush was picked up.
   */
  private rememberSliders(): void {
    rememberAdjustments(this.adjustments());
  }

  /**
   * Back to the photograph as it arrived.
   *
   * Everything, not only the sliders as they stand: changes are kept as the
   * selection moves, so a button promising the photograph as shot has to
   * discard those too or it would be promising something it does not do.
   */
  protected resetAdjustments(): void {
    this.edits.set([]);
    this.zeroSliders();
    // Remembered like any other placing of the sliders: "this one needed
    // nothing" is as much a statement about the room as "+20 brightness" is.
    this.rememberSliders();
  }

  /** Back to wherever they were last left, which is where a new photograph starts. */
  private recallSliders(): void {
    const remembered = rememberedAdjustments();
    this.brightness.set(remembered.brightness);
    this.temperature.set(remembered.temperature);
    this.whites.set(remembered.whites);
    this.darks.set(remembered.darks);
    this.saturation.set(remembered.saturation);
  }

  private zeroSliders(): void {
    this.brightness.set(0);
    this.temperature.set(0);
    this.whites.set(0);
    this.darks.set(0);
    this.saturation.set(0);
  }

  // --- the brush ---------------------------------------------------------

  /** True while the pointer is down and painting rather than moving a corner. */
  private brushing = false;

  protected trackBrush(event: PointerEvent): void {
    if (!this.selecting()) {
      this.brushTool.cursor.set(null);
      return;
    }
    const stage = this.stage()?.nativeElement;
    if (!stage) return;
    const box = stage.getBoundingClientRect();
    if (!box.width || !box.height) return;

    // The radius is a share of the picture's long side, and the stage is the
    // picture, so the same share of the stage's long side draws it true.
    const longSide = Math.max(box.width, box.height);
    this.brushTool.cursor.set({
      x: ((event.clientX - box.left) / box.width) * 100,
      y: ((event.clientY - box.top) / box.height) * 100,
      size: (((this.brushRadius() / 100) * longSide * 2) / box.width) * 100,
    });
  }

  protected leaveBrush(): void {
    this.brushTool.cursor.set(null);
  }

  protected toggleAdaptToSize(): void {
    this.adaptToSize.update((on) => !on);
  }

  protected toggleSelecting(): void {
    this.brushTool.toggle();
  }

  protected useBrush(mode: 'add' | 'erase'): void {
    this.brushTool.use(mode);
  }

  protected setBrushRadius(event: Event): void {
    this.brushTool.setRadius(Number((event.target as HTMLInputElement).value));
  }

  protected setBrushSoftness(event: Event): void {
    this.brushTool.setSoftness(Number((event.target as HTMLInputElement).value));
  }

  protected clearArea(): void {
    this.commitPending();
    this.brushTool.clear();
  }

  protected brush(event: PointerEvent, erase = false): void {
    const at = this.pointIn(event);
    if (at) this.brushAt(at, erase);
  }

  /**
   * Paints where the pointer is, in the straightened picture's coordinates.
   *
   * The brush is used on the photograph, but the adjustment lands on the
   * rectangle the photograph becomes. A mask painted in the photograph's own
   * coordinates would sit crooked on the result — worst at the corners, which
   * is exactly where a brush is usually wanted — so each dab is mapped through
   * the same homography the pixels go through.
   */
  protected brushAt(at: Point, erase = false): void {
    const corners = this.corners();
    const size = this.size();
    const realWidth = this.realWidth();
    const realHeight = this.realHeight();
    if (!at || !corners || !size || !realWidth || !realHeight) return;

    const target = correctedSize(corners, realWidth, realHeight, this.adaptToSize());
    const rectangle: Quad = [
      { x: 0, y: 0 },
      { x: target.width, y: 0 },
      { x: target.width, y: target.height },
      { x: 0, y: target.height },
    ];

    this.brushTool.dab(mapThrough(solveHomography(corners, rectangle), at), target, erase);
  }

  protected startBrush(event: PointerEvent): void {
    if (this.panning()) {
      this.startPan(event);
      return;
    }
    if (!this.selecting()) return;
    // The selection is about to differ, so whatever the sliders say belongs to
    // the selection as it is now, not as it is about to become.
    this.commitPending();
    this.brushing = true;
    this.brush(event, this.brushTool.erases(event.shiftKey || event.button === 2));
  }

  protected brushMove(event: PointerEvent): void {
    if (!this.brushing) return;
    this.brush(event, this.brushTool.erases(event.shiftKey));
  }

  /** Turns a pointer position into a position in the photograph's own pixels. */
  private pointIn(event: PointerEvent): Point | null {
    const stage = this.stage()?.nativeElement;
    const size = this.size();
    if (!stage || !size) return null;

    const box = stage.getBoundingClientRect();
    if (!box.width || !box.height) return null;
    return {
      x: ((event.clientX - box.left) / box.width) * size.width,
      y: ((event.clientY - box.top) / box.height) * size.height,
    };
  }

  protected async process(): Promise<void> {
    const corners = this.corners();
    const realWidth = this.realWidth();
    const realHeight = this.realHeight();
    if (!corners || !realWidth || !realHeight || !this.photo()) {
      // Answered rather than ignored: something may be waiting on this.
      this.handoff.couldNot();
      return;
    }

    this.problem.set('');
    this.releaseResult();

    try {
      const { image, report } = await preparePhoto(this.rasterAt(), {
        quad: corners,
        bows: this.bows() ?? undefined,
        realWidth,
        realHeight,
        adaptToSize: this.adaptToSize(),
        edits: this.allEdits(),
        onStage: async (stage) => {
          this.busy.set(stage);
          await breathe();
        },
      });

      this.report.set(report);
      const blob = await toJpegBlob(image, this.rights(), this.encodeQuality());
      this.resultBlob.set(blob);
      this.resultUrl.set(URL.createObjectURL(blob));
      // Straight into the form below, in the same press. Two buttons meant the
      // second was the one easily forgotten, and forgetting it meant going back
      // through a download and a file picker for a file already in hand.
      this.useBelow();
    } catch {
      this.problem.set(
        'The photograph was too large for this browser to hold. Try a smaller copy.'
      );
      this.handoff.couldNot();
    } finally {
      this.busy.set(null);
    }
  }

  /**
   * Hands the finished photograph to the form below, with the size it was given.
   *
   * The alternative was downloading a JPEG and choosing it again from disk: the
   * same file out of the browser and back into it, and a second chance to type
   * the dimensions differently from the ones the straightening already used.
   */
  protected useBelow(): void {
    const blob = this.resultBlob();
    const height = this.realHeight();
    const width = this.realWidth();
    if (!blob || !height || !width) return;

    this.handoff.handOver({
      file: new File([blob], this.downloadName(), { type: 'image/jpeg' }),
      // Written the way the collection writes a measurement, comma and all,
      // so the form receives it in the notation it expects rather than one it
      // has to correct.
      height: String(height).replace('.', ','),
      width: String(width).replace('.', ','),
    });
    this.handedOver.set(true);
  }

  protected reset(): void {
    this.releaseResult();
    this.photo()?.close();
    this.photo.set(null);
    this.fileName.set('');
    this.size.set(null);
    this.corners.set(null);
    this.problem.set('');
    this.busy.set(null);
    this.source.set(null);
    this.adaptToSize.set(true);
    this.zoom.set(1);
    this.stopPanning();
    this.handedOver.set(false);
    // Changes belong to the photograph they were made to, and the brush's mask
    // is measured in that photograph's straightened rectangle. Carried into the
    // next one they would land somewhere arbitrary. The sliders are the
    // exception: where they were left is where the next photograph starts,
    // since the next photograph was almost certainly taken in the same room.
    this.edits.set([]);
    this.recallSliders();
    this.brushTool.clear();
  }

  private releaseResult(): void {
    const url = this.resultUrl();
    if (url) URL.revokeObjectURL(url);
    this.resultUrl.set(null);
    this.report.set(null);
  }
}

/**
 * Whether a key belongs to what has the focus rather than to the page.
 *
 * Only where the space bar already means something: a box being written in, a
 * list being chosen from, a box being ticked. A range slider and a button do
 * nothing with it that Enter cannot also do.
 */
function isTypingInto(target: EventTarget | null): boolean {
  const element = target as HTMLElement | null;
  if (!element) return false;
  if (element.isContentEditable) return true;

  const tag = element.tagName;
  if (tag === 'TEXTAREA' || tag === 'SELECT') return true;
  if (tag !== 'INPUT') return false;

  const type = (element as HTMLInputElement).type;
  return type !== 'range' && type !== 'button' && type !== 'submit';
}

function textIn(event: Event): string {
  return (event.target as HTMLInputElement).value;
}

/**
 * What is in the box, tidied only as far as typing allows.
 *
 * Written straight back into the box so what is shown is what is held, and a
 * key that could never belong in a measurement simply does not appear.
 */
function typedInto(event: Event): string {
  const input = event.target as HTMLInputElement;
  const tidied = measurementAsTyped(input.value);
  input.value = tidied;
  return tidied;
}

/**
 * Marks the edge of the selection, rather than colouring what is inside it.
 *
 * A wash over the selected area said clearly enough where it was, and made the
 * one thing being judged — how the colours look — impossible to judge under it.
 * So the area is left exactly as it is and only its boundary is drawn.
 *
 * The boundary is where coverage passes a half. A soft brush has no edge of its
 * own, so this is a contour rather than an outline, and it is dashed both
 * because a broken line reads as a marquee rather than as part of the painting,
 * and because alternating light and dark keeps it visible on any ground.
 */
function outlineSelection(
  context: CanvasRenderingContext2D,
  selection: Selection,
  width: number,
  height: number
): void {
  const cellW = width / selection.width;
  const cellH = height / selection.height;
  const at = (x: number, y: number) =>
    x < 0 || y < 0 || x >= selection.width || y >= selection.height
      ? 0
      : selection.values[y * selection.width + x];

  let step = 0;
  for (let y = 0; y < selection.height; y += 1) {
    for (let x = 0; x < selection.width; x += 1) {
      const here = at(x, y) >= 0.5;
      // Only the cells where the contour actually passes, which is where a
      // neighbour sits on the other side of a half.
      const edge =
        here !== at(x + 1, y) >= 0.5 ||
        here !== at(x, y + 1) >= 0.5 ||
        here !== at(x - 1, y) >= 0.5 ||
        here !== at(x, y - 1) >= 0.5;
      if (!edge) continue;

      step += 1;
      if (step % 5 === 0 || step % 5 === 1) continue; // the gaps in the dashes
      context.fillStyle = step % 10 < 5 ? 'rgba(0,0,0,0.85)' : 'rgba(255,255,255,0.9)';
      context.fillRect(
        Math.round(x * cellW),
        Math.round(y * cellH),
        Math.max(2, cellW),
        Math.max(2, cellH)
      );
    }
  }
}

function drawInto(canvas: HTMLCanvasElement, photo: ImageBitmap): void {
  const scale = Math.min(1, PREVIEW_LONG_SIDE / Math.max(photo.width, photo.height));
  canvas.width = Math.round(photo.width * scale);
  canvas.height = Math.round(photo.height * scale);
  canvas.getContext('2d')?.drawImage(photo, 0, 0, canvas.width, canvas.height);
}

/** Long enough for the browser to paint the stage it has just been told about. */
function breathe(): Promise<void> {
  return new Promise((resolve) => requestAnimationFrame(() => setTimeout(resolve, 0)));
}

async function toJpegBlob(image: Raster, rights: Rights | null, quality: number): Promise<Blob> {
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  context.putImageData(new ImageData(image.data, image.width, image.height), 0, 0);

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, 'image/jpeg', quality)
  );
  if (!blob) throw new Error('The corrected image could not be encoded');
  if (!rights) return blob;

  // Header segments only, ahead of the compressed image, so nothing that was
  // just corrected is touched to add them.
  const stamped = withRights(new Uint8Array(await blob.arrayBuffer()), rights);
  return new Blob([stamped.buffer as ArrayBuffer], { type: 'image/jpeg' });
}
