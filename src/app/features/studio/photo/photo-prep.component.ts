import { DecimalPipe } from '@angular/common';
import { Component, computed, effect, ElementRef, signal, viewChild } from '@angular/core';
import { detectQuad } from '@domain/image/detect-corners';
import { copyrightNotice, withRights, type Rights } from '@domain/image/jpeg-rights';
import {
  preparePhoto,
  type PhotoStage,
  type PreparePhotoReport,
} from '@domain/image/prepare-photo';
import { applyAdjustments, isUnchanged, type Adjustments } from '@domain/image/adjustments';
import {
  createSelection,
  clearSelection,
  hasSelection,
  paintDab,
  type Selection,
} from '@domain/image/selection';
import { solveHomography } from '@domain/image/perspective';
import { inject } from '@angular/core';
import { StudioHandoffService } from '../studio-handoff.service';

import {
  correctedSize,
  EDGE_CORNERS,
  distance,
  fullFrame,
  straightBows,
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
const DETECTION_LONG_SIDE = 720;
/**
 * JPEG quality for the saved file. As high as the format goes.
 *
 * It was 0.95, which sounds close to lossless and is not. Measured against the
 * straightened pixels on a real painting, ninety-five strayed by 1.53 levels on
 * average and 19 at the worst pixel, and turned a 2.35 MB photograph into 0.50
 * MB. At maximum the same image is 2.09 MB and strays 0.48 on average, 4 at
 * worst — below what an eye can find on a flat area.
 *
 * Most of that difference is chroma subsampling rather than the quality number:
 * at 0.95 the encoder throws away half the colour resolution, which on a
 * painting is exactly the wrong economy. A canvas gives no way to ask for 4:4:4
 * directly, but encoders stop subsampling at the top of the scale, which is the
 * other reason to be here rather than a step below it.
 */
const JPEG_QUALITY = 1;

/** Where the last size typed in is kept, so the next painting needs no typing. */
const REMEMBERED_SIZE = 'juanmamoreno.paintingSize';

const STAGE_LABELS: Record<PhotoStage, string> = {
  straightening: 'Straightening the perspective',
  adjusting: 'Applying the adjustments',
  focus: 'Checking the focus',
};

const CORNER_NAMES = ['top left', 'top right', 'bottom right', 'bottom left'];

/**
 * How wide a corner handle is drawn, in pixels of the page.
 *
 * Large by default, and adjustable, because the handle is what the pointer is
 * on while the corner underneath it is what has to be judged: a small circle
 * puts the cursor exactly where the eye needs to be. A wide ring is grabbed
 * anywhere along its edge, so the hand can stay clear of the point it is
 * setting. The cross keeps marking the exact pixel however wide the ring gets.
 */
const ARTIST_KEY = 'juanmamoreno.studio.artist';
const NOTICE_KEY = 'juanmamoreno.studio.notice';
const STATEMENT_KEY = 'juanmamoreno.studio.webStatement';

/**
 * What the rights fields say before anybody types in them.
 *
 * These were placeholders, which meant the answer was right there on screen and
 * still had to be typed out every time — and a photograph left the studio
 * unattributed if it was not. They are the same every time, so they are the
 * values now.
 *
 * The notice is among them too, and its year is worked out when the page loads
 * rather than written into the source. Left alone it is never stored, so it
 * still says the right year next January instead of the one it first appeared
 * in.
 */
const DEFAULT_ARTIST = 'Juanma Moreno Sánchez';
const DEFAULT_STATEMENT = 'https://www.juanmamoreno.com/terms';

/**
 * The notice, written out rather than derived.
 *
 * Worked out when the page loads rather than written into the source, so the
 * year is this year. It is only ever stored if it is typed in, so a field left
 * alone goes on saying the right year next January instead of the one it was
 * first shown in.
 */
function defaultNotice(): string {
  return `© ${new Date().getFullYear()} ${DEFAULT_ARTIST}`;
}

/**
 * What was typed here last time, or the default when nothing ever was.
 *
 * Absent and empty are kept apart: `getItem` answers null for a key that was
 * never written and '' for one deliberately cleared. Treating them alike would
 * mean a field could not be emptied — it would fill itself in again on the next
 * visit, which is its own kind of wrong.
 */
function remembered(key: string, fallback = ''): string {
  try {
    return window.localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}

function remember(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Storage off. The field holds for this session, which is enough.
  }
}

const BRUSH_RADIUS_KEY = 'juanmamoreno.studio.brushRadius';
const BRUSH_SOFTNESS_KEY = 'juanmamoreno.studio.brushSoftness';

/** A remembered number, or the default when there is none or it is nonsense. */
function rememberedNumber(key: string, fallback: number): number {
  try {
    const stored = Number(window.localStorage.getItem(key));
    return Number.isFinite(stored) && stored > 0 ? stored : fallback;
  } catch {
    return fallback;
  }
}

const HANDLE_SIZE_KEY = 'juanmamoreno.studio.handleSize';
const DEFAULT_HANDLE_SIZE = 46;
const MIN_HANDLE_SIZE = 20;
const MAX_HANDLE_SIZE = 110;

function rememberedHandleSize(): number {
  try {
    const stored = Number(window.localStorage.getItem(HANDLE_SIZE_KEY));
    if (!Number.isFinite(stored) || !stored) return DEFAULT_HANDLE_SIZE;
    return Math.min(MAX_HANDLE_SIZE, Math.max(MIN_HANDLE_SIZE, stored));
  } catch {
    return DEFAULT_HANDLE_SIZE;
  }
}

@Component({
  selector: 'app-photo-prep',
  imports: [DecimalPipe],
  templateUrl: './photo-prep.component.html',
  styleUrl: './photo-prep.component.scss',
})
export class PhotoPrepComponent {
  private readonly stage = viewChild<ElementRef<HTMLElement>>('stage');
  private readonly previewCanvas = viewChild<ElementRef<HTMLCanvasElement>>('preview');

  private readonly photo = signal<ImageBitmap | null>(null);
  /** Either a corner by index, or one control point of one side. */
  private dragging: number | { edge: EdgeName; index: 0 | 1 } | null = null;
  /** How far the point being dragged sat from the pointer when it was taken hold of. */
  private grabbedAt: Point = { x: 0, y: 0 };

  constructor() {
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
      const adjustments = this.adjustments();
      const selection = this.previewSelection();
      const showing = this.selecting() || this.hasArea();
      if (!canvas || !photo) return;
      this.repaint(canvas, adjustments, selection, showing);
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
  protected readonly artist = signal(remembered(ARTIST_KEY, DEFAULT_ARTIST));
  protected readonly notice = signal(remembered(NOTICE_KEY, defaultNotice()));
  protected readonly webStatement = signal(remembered(STATEMENT_KEY, DEFAULT_STATEMENT));

  protected readonly noticePreview = computed(() =>
    this.artist().trim() ? copyrightNotice(this.rights() as Rights) : ''
  );

  protected readonly rights = computed<Rights | null>(() => {
    const artist = this.artist().trim();
    if (!artist) return null;
    return {
      artist,
      notice: this.notice().trim() || undefined,
      webStatement: this.webStatement().trim() || undefined,
    };
  });

  protected setArtist(event: Event): void {
    this.artist.set(textIn(event));
    remember(ARTIST_KEY, this.artist());
  }

  protected setNotice(event: Event): void {
    this.notice.set(textIn(event));
    remember(NOTICE_KEY, this.notice());
  }

  protected setWebStatement(event: Event): void {
    this.webStatement.set(textIn(event));
    remember(STATEMENT_KEY, this.webStatement());
  }

  protected readonly minHandleSize = MIN_HANDLE_SIZE;
  protected readonly maxHandleSize = MAX_HANDLE_SIZE;
  protected readonly handleSize = signal(rememberedHandleSize());

  protected setHandleSize(event: Event): void {
    const size = Math.min(
      MAX_HANDLE_SIZE,
      Math.max(MIN_HANDLE_SIZE, numberIn(event) ?? DEFAULT_HANDLE_SIZE)
    );
    this.handleSize.set(size);
    try {
      window.localStorage.setItem(HANDLE_SIZE_KEY, String(size));
    } catch {
      // Storage off. The size holds for this session, which is enough.
    }
  }

  protected readonly fileName = signal('');
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
  protected readonly realWidth = signal<number | null>(null);
  protected readonly realHeight = signal<number | null>(null);
  /**
   * The three sliders, each nought at the photograph as it arrived.
   *
   * These replaced five checkboxes that measured the photograph and decided for
   * themselves. Each was trying to answer a question it could not — whether a
   * dark corner is a lamp that fell off or paint that is dark — and was kept
   * deliberately too weak because of the doubt. The person looking at the
   * painting knows, so they say.
   */
  protected readonly brightness = signal(0);
  protected readonly temperature = signal(0);
  protected readonly range = signal(0);

  protected readonly adjustments = computed<Adjustments>(() => ({
    brightness: this.brightness(),
    temperature: this.temperature(),
    range: this.range(),
  }));

  protected readonly anyAdjustment = computed(() => !isUnchanged(this.adjustments()));

  /** Where the sliders apply. Empty means everywhere, which is the usual case. */
  protected readonly selection = signal<Selection | null>(null);
  protected readonly selecting = signal(false);
  protected readonly brushRadius = signal(rememberedNumber(BRUSH_RADIUS_KEY, 22));
  protected readonly brushSoftness = signal(rememberedNumber(BRUSH_SOFTNESS_KEY, 80));
  protected readonly hasArea = computed(() => this.selectionVersion() > 0 && hasSelection(this.selection()));
  /** Bumped on every dab, since a Float32Array mutated in place is not a new value. */
  private readonly selectionVersion = signal(0);
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
      const [c0, c1] = bows[edge];
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

    return this.edgeNames.flatMap((edge) =>
      ([0, 1] as const).map((index) => {
        const point = bows[edge][index];
        const anchor = corners[EDGE_CORNERS[edge][index]];
        return {
          edge,
          index,
          left: `${(point.x / size.width) * 100}%`,
          top: `${(point.y / size.height) * 100}%`,
          tether: `M ${anchor.x} ${anchor.y} L ${point.x} ${point.y}`,
        };
      })
    );
  });

  protected straightenSides(): void {
    const corners = this.corners();
    if (corners) this.bows.set(straightBows(corners));
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
    this.realWidth.set(numberIn(event));
    this.remember();
  }

  protected setHeight(event: Event): void {
    this.realHeight.set(numberIn(event));
    this.remember();
  }

  /**
   * Fills the size in so the next painting needs no typing at all.
   *
   * The last size given is offered back, since paintings come in series and
   * the one before this was very often the same. Failing that — the first time
   * the studio is opened — the proportions are taken from the photograph, which
   * keeps the button live and the result true to what was shot. Both are only a
   * starting point, and the note under the boxes says so.
   */
  private prefillSize(quad: Quad): void {
    const remembered = this.rememberedSize();
    if (remembered) {
      this.realWidth.set(remembered.width);
      this.realHeight.set(remembered.height);
      return;
    }

    const [tl, tr, br, bl] = quad;
    const across = Math.max(distance(tl, tr), distance(bl, br));
    const down = Math.max(distance(tl, bl), distance(tr, br));
    if (!across || !down) return;

    const longest = Math.max(across, down);
    this.realWidth.set(Math.round((across / longest) * 100));
    this.realHeight.set(Math.round((down / longest) * 100));
  }

  private rememberedSize(): { width: number; height: number } | null {
    try {
      const stored = JSON.parse(window.localStorage.getItem(REMEMBERED_SIZE) ?? 'null');
      const width = Number(stored?.width);
      const height = Number(stored?.height);
      return width > 0 && height > 0 ? { width, height } : null;
    } catch {
      return null;
    }
  }

  private remember(): void {
    const width = this.realWidth();
    const height = this.realHeight();
    if (!width || !height) return;
    try {
      window.localStorage.setItem(REMEMBERED_SIZE, JSON.stringify({ width, height }));
    } catch {
      // Private browsing. The size lasts as long as the tab, which is fair.
    }
  }

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

    let photo: ImageBitmap;
    try {
      // Phone cameras record which way up they were held rather than rotating
      // the pixels, so without this a portrait painting arrives on its side.
      photo = await createImageBitmap(file, { imageOrientation: 'from-image' });
    } catch {
      this.problem.set('That file could not be read as an image.');
      return;
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
    this.bows.set(straightBows(quad));
    this.prefillSize(quad);
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
    const at = this.pointIn(event);
    const corner = this.corners()?.[index];
    this.grabbedAt = at && corner ? { x: corner.x - at.x, y: corner.y - at.y } : { x: 0, y: 0 };
    this.dragging = index;
    (event.target as Element).setPointerCapture(event.pointerId);
    event.preventDefault();
  }

  protected grabBow(edge: EdgeName, index: 0 | 1, event: PointerEvent): void {
    const at = this.pointIn(event);
    const handle = this.bows()?.[edge][index];
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
      const pair = [...bows[edge]] as [Point, Point];
      pair[index] = clamped;
      this.bows.set({ ...bows, [edge]: pair });
      return;
    }

    const index = this.dragging;
    const moved = [...corners] as Quad;
    moved[index] = clamped;
    this.corners.set(moved);

    // A corner takes its own two control points with it, so a side that has
    // been bent keeps its bend when the corner it hangs from is repositioned.
    // Recomputing them from the new chord instead would undo the bow the moment
    // the corner beside it was nudged.
    const shift = { x: clamped.x - corners[index].x, y: clamped.y - corners[index].y };
    const bows = this.bows();
    if (!bows) return;
    const next = { ...bows };
    for (const edge of this.edgeNames) {
      const [from, to] = EDGE_CORNERS[edge];
      const pair = [...bows[edge]] as [Point, Point];
      if (from === index) pair[0] = { x: pair[0].x + shift.x, y: pair[0].y + shift.y };
      if (to === index) pair[1] = { x: pair[1].x + shift.x, y: pair[1].y + shift.y };
      next[edge] = pair;
    }
    this.bows.set(next);
  }

  protected release(): void {
    this.dragging = null;
    this.brushing = false;
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
  private readonly previewSelection = computed<Selection | null>(() => {
    this.selectionVersion();
    const selection = this.selection();
    const corners = this.corners();
    const size = this.size();
    const realWidth = this.realWidth();
    const realHeight = this.realHeight();
    if (!selection || !corners || !size || !realWidth || !realHeight) return null;
    if (!hasSelection(selection)) return null;

    const target = correctedSize(corners, realWidth, realHeight);
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
  });

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
    adjustments: Adjustments,
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

    applyAdjustments(raster, adjustments, selection);
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
  }

  protected setTemperature(event: Event): void {
    this.temperature.set(sliderValue(event));
  }

  protected setRange(event: Event): void {
    this.range.set(sliderValue(event));
  }

  protected resetAdjustments(): void {
    this.brightness.set(0);
    this.temperature.set(0);
    this.range.set(0);
  }

  // --- the brush ---------------------------------------------------------

  /** True while the pointer is down and painting rather than moving a corner. */
  private brushing = false;

  /**
   * Where the brush is and how wide, in percentages of the stage.
   *
   * Shown as a ring under the pointer, because the size slider is a number and
   * a number does not say how much of this painting it covers. Null when the
   * pointer is not over the stage, so no ring is left behind when it leaves.
   */
  protected readonly brushCursor = signal<{ x: number; y: number; size: number } | null>(null);

  protected trackBrush(event: PointerEvent): void {
    if (!this.selecting()) {
      this.brushCursor.set(null);
      return;
    }
    const stage = this.stage()?.nativeElement;
    if (!stage) return;
    const box = stage.getBoundingClientRect();
    if (!box.width || !box.height) return;

    // The radius is a share of the picture's long side, and the stage is the
    // picture, so the same share of the stage's long side draws it true.
    const longSide = Math.max(box.width, box.height);
    this.brushCursor.set({
      x: ((event.clientX - box.left) / box.width) * 100,
      y: ((event.clientY - box.top) / box.height) * 100,
      size: ((this.brushRadius() / 100) * longSide * 2) / box.width * 100,
    });
  }

  protected leaveBrush(): void {
    this.brushCursor.set(null);
  }

  protected toggleSelecting(): void {
    this.selecting.update((on) => !on);
  }

  protected setBrushRadius(event: Event): void {
    const value = Math.min(60, Math.max(4, Number((event.target as HTMLInputElement).value)));
    this.brushRadius.set(value);
    remember(BRUSH_RADIUS_KEY, String(value));
  }

  protected setBrushSoftness(event: Event): void {
    const value = Math.min(100, Math.max(0, Number((event.target as HTMLInputElement).value)));
    this.brushSoftness.set(value);
    remember(BRUSH_SOFTNESS_KEY, String(value));
  }

  protected clearArea(): void {
    const selection = this.selection();
    if (!selection) return;
    clearSelection(selection);
    this.selectionVersion.update((n) => n + 1);
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
  protected brush(event: PointerEvent, erase = false): void {
    const at = this.pointIn(event);
    if (at) this.brushAt(at, erase);
  }

  /** The same, from a position in the photograph rather than from a pointer. */
  protected brushAt(at: Point, erase = false): void {
    const corners = this.corners();
    const size = this.size();
    const realWidth = this.realWidth();
    const realHeight = this.realHeight();
    if (!at || !corners || !size || !realWidth || !realHeight) return;

    const target = correctedSize(corners, realWidth, realHeight);
    let selection = this.selection();
    if (!selection || selection.width < 2) {
      selection = createSelection(target.width, target.height);
      this.selection.set(selection);
    }

    const rectangle: Quad = [
      { x: 0, y: 0 },
      { x: target.width, y: 0 },
      { x: target.width, y: target.height },
      { x: 0, y: target.height },
    ];
    const mapped = mapThrough(solveHomography(corners, rectangle), at);

    // The radius is given as a percentage of the picture, so a brush set on one
    // photograph means the same thing on the next whatever size it came in.
    const radius = (this.brushRadius() / 100) * Math.max(target.width, target.height);
    paintDab(selection, target, {
      x: mapped.x,
      y: mapped.y,
      radius,
      softness: this.brushSoftness() / 100,
      erase,
    });
    this.selectionVersion.update((n) => n + 1);
  }

  protected startBrush(event: PointerEvent): void {
    if (!this.selecting()) return;
    this.brushing = true;
    this.brush(event, event.shiftKey || event.button === 2);
  }

  protected brushMove(event: PointerEvent): void {
    if (!this.brushing) return;
    this.brush(event, event.shiftKey);
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
    if (!corners || !realWidth || !realHeight || !this.photo()) return;

    this.problem.set('');
    this.releaseResult();

    try {
      const { image, report } = await preparePhoto(this.rasterAt(), {
        quad: corners,
        bows: this.bows() ?? undefined,
        realWidth,
        realHeight,
        adjustments: this.adjustments(),
        selection: this.hasArea() ? this.selection() : null,
        onStage: async (stage) => {
          this.busy.set(stage);
          await breathe();
        },
      });

      this.report.set(report);
      const blob = await toJpegBlob(image, this.rights());
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
  }

  private releaseResult(): void {
    const url = this.resultUrl();
    if (url) URL.revokeObjectURL(url);
    this.resultUrl.set(null);
    this.report.set(null);
  }
}

function textIn(event: Event): string {
  return (event.target as HTMLInputElement).value;
}

function numberIn(event: Event): number | null {
  const value = Number.parseFloat((event.target as HTMLInputElement).value);
  return Number.isFinite(value) && value > 0 ? value : null;
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
      context.fillRect(Math.round(x * cellW), Math.round(y * cellH), Math.max(2, cellW), Math.max(2, cellH));
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

async function toJpegBlob(image: Raster, rights: Rights | null): Promise<Blob> {
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  context.putImageData(new ImageData(image.data, image.width, image.height), 0, 0);

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, 'image/jpeg', JPEG_QUALITY)
  );
  if (!blob) throw new Error('The corrected image could not be encoded');
  if (!rights) return blob;

  // Header segments only, ahead of the compressed image, so nothing that was
  // just corrected is touched to add them.
  const stamped = withRights(new Uint8Array(await blob.arrayBuffer()), rights);
  return new Blob([stamped.buffer as ArrayBuffer], { type: 'image/jpeg' });
}
