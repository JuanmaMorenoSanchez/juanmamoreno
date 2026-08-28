import { DecimalPipe } from '@angular/common';
import { Component, computed, effect, ElementRef, signal, viewChild } from '@angular/core';
import { detectQuad } from '@domain/image/detect-corners';
import { copyrightNotice, withRights, type Rights } from '@domain/image/jpeg-rights';
import {
  preparePhoto,
  type PhotoStage,
  type PreparePhotoReport,
} from '@domain/image/prepare-photo';
import {
  EDGE_CORNERS,
  distance,
  fullFrame,
  straightBows,
  type EdgeBows,
  type EdgeName,
  type Point,
  type Quad,
} from '@domain/image/quad';
import type { Raster } from '@domain/image/raster';

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
 * JPEG quality for the saved file.
 *
 * The photograph arrived as a camera JPEG and has already been through this
 * once; at ninety-five the second pass throws away far less than the first did,
 * which is the sense in which nothing is lost against the original. PNG would
 * be exactly lossless but writes a couple of hundred megabytes for a forty
 * megapixel painting, and preserves a fidelity the source never had.
 */
const JPEG_QUALITY = 0.95;

/** Where the last size typed in is kept, so the next painting needs no typing. */
const REMEMBERED_SIZE = 'juanmamoreno.paintingSize';

const STAGE_LABELS: Record<PhotoStage, string> = {
  straightening: 'Straightening the perspective',
  lighting: 'Evening out the lighting',
  glare: 'Taking out the glare',
  borders: 'Checking the edges',
  colour: 'Checking the colour',
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

function remembered(key: string): string {
  try {
    return window.localStorage.getItem(key) ?? '';
  } catch {
    return '';
  }
}

function remember(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Storage off. The field holds for this session, which is enough.
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
  protected readonly artist = signal(remembered(ARTIST_KEY));
  protected readonly notice = signal(remembered(NOTICE_KEY));
  protected readonly webStatement = signal(remembered(STATEMENT_KEY));

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
  protected readonly evenLighting = signal(true);
  protected readonly takeOutGlare = signal(true);
  protected readonly evenBorders = signal(true);
  protected readonly correctCast = signal(true);
  protected readonly openTones = signal(true);
  protected readonly busy = signal<PhotoStage | null>(null);
  protected readonly report = signal<PreparePhotoReport | null>(null);
  protected readonly resultUrl = signal<string | null>(null);
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
        equalizeLighting: this.evenLighting(),
        removeGlare: this.takeOutGlare(),
        evenBorders: this.evenBorders(),
        correctCast: this.correctCast(),
        openTones: this.openTones(),
        onStage: async (stage) => {
          this.busy.set(stage);
          await breathe();
        },
      });

      this.report.set(report);
      this.resultUrl.set(await toJpegUrl(image, this.rights()));
    } catch {
      this.problem.set(
        'The photograph was too large for this browser to hold. Try a smaller copy.'
      );
    } finally {
      this.busy.set(null);
    }
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

async function toJpegUrl(image: Raster, rights: Rights | null): Promise<string> {
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  context.putImageData(new ImageData(image.data, image.width, image.height), 0, 0);

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, 'image/jpeg', JPEG_QUALITY)
  );
  if (!blob) throw new Error('The corrected image could not be encoded');
  if (!rights) return URL.createObjectURL(blob);

  // Header segments only, ahead of the compressed image, so nothing that was
  // just corrected is touched to add them.
  const stamped = withRights(new Uint8Array(await blob.arrayBuffer()), rights);
  return URL.createObjectURL(new Blob([stamped.buffer as ArrayBuffer], { type: 'image/jpeg' }));
}
