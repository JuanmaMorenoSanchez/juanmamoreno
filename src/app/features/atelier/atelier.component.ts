import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  OnDestroy,
  OnInit,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { firstValueFrom } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { Nft } from '@domain/artwork/artwork.entity';
import { ARTWORK_PORT } from '@domain/artwork/artwork.token';
import { Parallax } from '@domain/generative/parallax';
import { AdminAuthService } from '@shared/services/admin-auth.service';
import { AtelierService, Piece } from './atelier.service';
import { CostComponent } from './cost.component';
import {
  cutLayer,
  depthFor,
  layerFile,
  placeMask,
  scriptedPointer,
  slug,
  workingSize,
} from './cutting';

/** One layer as it is being worked on, before it is a line in a manifest. */
interface Draft {
  label: string;
  depth: number;
  /** The mask at full size, which the brush paints into. */
  mask: HTMLCanvasElement;
  /** The painting cut by that mask: what gets saved and drawn. */
  cut: HTMLCanvasElement;
  /** Set once it has been uploaded, so a second save does not resend it. */
  saved: boolean;
}

/** One variant made by asking in words — a frame, once it is kept. */
interface Variant {
  instruction: string;
  image: HTMLImageElement;
  kept: boolean;
}

/** How long a recorded reel runs, in seconds. */
const REEL_SECONDS = 12;

/** The reel frame: Instagram's, which is what these are made for. */
const REEL_WIDTH = 1080;
const REEL_HEIGHT = 1920;

/**
 * The asset factory.
 *
 * One painting at a time, by hand, with the cost of every press written on the
 * button that makes it. There is no bulk anything here on purpose: the whole
 * value of the tool is the thirty seconds of correction after the model's two,
 * and a queue of two hundred would be two hundred corrections nobody makes.
 *
 * The painting itself never leaves the browser. What goes out is a downscaled
 * working copy; what comes back is a mask, scaled up here and used to cut the
 * original at full size. The model is billed for a small picture and the layer
 * is not small.
 */
@Component({
  selector: 'app-atelier',
  standalone: true,
  imports: [CommonModule, MatIconModule, CostComponent],
  templateUrl: './atelier.component.html',
  styleUrl: './atelier.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AtelierComponent implements OnInit, AfterViewInit, OnDestroy {
  private atelier = inject(AtelierService);
  private auth = inject(AdminAuthService);
  private artworks = inject(ARTWORK_PORT);
  private destroyRef = inject(DestroyRef);

  private readonly canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('stage');

  /**
   * The whole catalogue, which is how a token id becomes a picture.
   *
   * Already in the session by the time this page opens — every other page
   * reads the same signal — so naming a painting costs no request.
   */
  private readonly catalogue = toSignal(this.artworks.getArtPiecesObservable(), {
    initialValue: [] as Nft[],
  });

  /** The painting being worked on, at whatever size it really is. */
  readonly painting = signal<HTMLImageElement | undefined>(undefined);
  readonly title = signal('');
  readonly source = signal('');
  readonly labels = signal('the figure, the background');

  readonly layers = signal<Draft[]>([]);
  readonly variants = signal<Variant[]>([]);
  readonly instruction = signal('close her eyes, keep everything else exactly as it is');

  /** Which layer the brush is working on; nothing means the parallax preview. */
  readonly refining = signal<number | undefined>(undefined);
  readonly brushSize = signal(40);
  readonly erasing = signal(false);

  readonly busy = signal(false);
  readonly stage = signal('');
  readonly problem = signal('');
  readonly saved = signal('');
  readonly recorded = signal<string | undefined>(undefined);

  readonly prices = this.atelier.prices;
  readonly pieces = signal<Piece[] | undefined>(undefined);

  readonly pieceId = computed(() => slug(this.title() || this.source()));
  readonly canSave = computed(
    () => this.layers().length > 0 && this.title().trim().length > 0 && !this.busy()
  );

  /** Enough of the day's allowance left for another of these. */
  readonly affordable = computed(() => (this.prices()?.left ?? 0) > 0);

  private parallax: Parallax[] = [];
  private pointer = { x: 0, y: 0 };
  private frame = 0;
  private started = 0;
  private scripted = false;
  private painter?: (event: PointerEvent) => void;

  ngOnInit(): void {
    const token = this.auth.bearerToken();
    if (!token) return;

    this.atelier.loadPrices(token).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
    this.atelier
      .pieces(token)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((pieces) => this.pieces.set(pieces));
  }

  ngAfterViewInit(): void {
    this.started = performance.now();
    this.loop();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.frame);
  }

  /** A file from the laptop. Always works, and never touches anyone's CORS. */
  async choose(event: Event): Promise<void> {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    this.problem.set('');
    const image = await loadImage(URL.createObjectURL(file));
    if (!image) {
      this.problem.set('That file would not open as a picture.');
      return;
    }

    this.painting.set(image);
    this.source.set(file.name);
    if (!this.title()) this.title.set(file.name.replace(/\.[^.]+$/, ''));
    this.layers.set([]);
    this.variants.set([]);
  }

  /**
   * A painting from the catalogue, by the number on its certificate.
   *
   * The address is not typed because it is not his to remember: the catalogue
   * already knows where every painting's picture is, and `getNftQualityUrl`
   * already knows which of them is the best one. Typing an address would be
   * copying out something the page is holding.
   *
   * The original is what loads — several megabytes of it — because the layers
   * cut from it are saved at full size. Only the copy sent to a model is small.
   */
  async fetchByToken(tokenId: string): Promise<void> {
    const id = tokenId.trim().replace(/^#/, '');
    if (!id) return;

    this.problem.set('');
    const nft = this.artworks.getNftById(id, this.catalogue());
    if (!nft) {
      this.problem.set(
        this.catalogue().length
          ? `There is no painting ${id} in the catalogue.`
          : 'The catalogue has not arrived yet. Try again in a moment.'
      );
      return;
    }

    const url = this.artworks.getNftQualityUrl(nft.image);
    if (!url) {
      this.problem.set(`Painting ${id} has no picture on file.`);
      return;
    }

    this.busy.set(true);
    this.stage.set(`Fetching ${nft.name ?? id}…`);
    const image = await loadImage(url, true);
    this.busy.set(false);
    this.stage.set('');

    if (!image) {
      this.problem.set(
        `The picture for ${id} would not load. Downloading it and choosing the file works too.`
      );
      return;
    }

    this.painting.set(image);
    this.source.set(id);
    this.title.set(nft.name ?? `painting ${id}`);
    this.layers.set([]);
    this.variants.set([]);
  }

  /** One pass over the painting, finding everything he named. */
  async findLayers(): Promise<void> {
    const painting = this.painting();
    const token = this.auth.bearerToken();
    if (!painting || !token) return;

    const labels = this.labels()
      .split(',')
      .map((label) => label.trim())
      .filter(Boolean);
    if (!labels.length) {
      this.problem.set('Name at least one thing to find.');
      return;
    }

    this.busy.set(true);
    this.problem.set('');
    this.stage.set('Looking at the painting…');

    const working = await workingCopy(painting);
    this.atelier
      .segment(working, labels, token)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(async (cuts) => {
        this.busy.set(false);
        this.stage.set('');

        if (!cuts) {
          this.problem.set('Nothing came back. The day may have reached its ceiling.');
          return;
        }

        this.atelier.spend('segment');
        const drafts: Draft[] = [];
        for (const [index, cut] of cuts.entries()) {
          const mask = await loadImage(cut.mask);
          if (!mask) continue;
          drafts.push(this.draftFrom(cut.label, mask, cut.box, index, cuts.length));
        }
        this.layers.set(drafts);
        this.restack();
      });
  }

  /** What was behind one layer, so moving it does not reveal a hole. */
  async fillBehind(index: number): Promise<void> {
    const painting = this.painting();
    const layer = this.layers()[index];
    const token = this.auth.bearerToken();
    if (!painting || !layer || !token) return;

    this.busy.set(true);
    this.problem.set('');
    this.stage.set('Painting in what was behind it…');

    const working = await workingCopy(painting);
    const mask = await canvasBlob(layer.mask);

    this.atelier
      .inpaint(
        working,
        mask,
        `continue the surrounding painting, same brushwork and palette`,
        token
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(async (made) => {
        this.busy.set(false);
        this.stage.set('');

        if (!made) {
          this.problem.set('Nothing came back. The day may have reached its ceiling.');
          return;
        }

        this.atelier.spend('inpaint');
        const filled = await loadImage(made.image);
        if (!filled) return;

        // The filled picture becomes the hindmost layer: everything that was
        // behind, with the hole painted over.
        const full = fullCanvas(filled, painting.naturalWidth, painting.naturalHeight);
        const drafts = [...this.layers()];
        drafts.push({
          label: `${layer.label} — behind`,
          depth: 0,
          mask: full,
          cut: full,
          saved: false,
        });
        this.layers.set(drafts);
        this.restack();
      });
  }

  /** One variant of the painting, asked for in words. */
  async makeVariant(): Promise<void> {
    const painting = this.painting();
    const token = this.auth.bearerToken();
    if (!painting || !token || !this.instruction().trim()) return;

    this.busy.set(true);
    this.problem.set('');
    this.stage.set('Asking for a variant…');

    const working = await workingCopy(painting);
    this.atelier
      .edit(working, this.instruction().trim(), token)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(async (made) => {
        this.busy.set(false);
        this.stage.set('');

        if (!made) {
          this.problem.set('Nothing came back. The day may have reached its ceiling.');
          return;
        }

        this.atelier.spend('edit');
        const image = await loadImage(made.image);
        if (!image) return;

        this.variants.set([
          ...this.variants(),
          { instruction: this.instruction().trim(), image, kept: false },
        ]);
      });
  }

  keep(index: number): void {
    const variants = [...this.variants()];
    variants[index] = { ...variants[index], kept: !variants[index].kept };
    this.variants.set(variants);
  }

  discardVariant(index: number): void {
    this.variants.set(this.variants().filter((_, at) => at !== index));
  }

  /** Moves a layer forward or back, which is the one thing no model can tell. */
  move(index: number, by: number): void {
    const drafts = [...this.layers()];
    const to = index + by;
    if (to < 0 || to >= drafts.length) return;

    [drafts[index], drafts[to]] = [drafts[to], drafts[index]];
    this.layers.set(drafts);
    this.restack();
  }

  remove(index: number): void {
    this.layers.set(this.layers().filter((_, at) => at !== index));
    this.refining.set(undefined);
    this.restack();
  }

  refine(index: number): void {
    this.refining.set(this.refining() === index ? undefined : index);
  }

  setDepth(index: number, value: string): void {
    const drafts = [...this.layers()];
    drafts[index] = { ...drafts[index], depth: Number(value) };
    this.layers.set(drafts);
    this.restack();
  }

  /** Uploads every layer that has changed, then the manifest that names them. */
  async savePiece(): Promise<void> {
    const token = this.auth.bearerToken();
    const painting = this.painting();
    if (!token || !painting || !this.canSave()) return;

    this.busy.set(true);
    this.problem.set('');
    this.saved.set('');

    const id = this.pieceId();
    const drafts = this.layers();

    for (const [index, draft] of drafts.entries()) {
      if (draft.saved) continue;
      this.stage.set(`Saving ${draft.label}…`);

      const file = layerFile(draft.label, index);
      const blob = await canvasBlob(draft.cut);
      const written = await firstValueFrom(this.atelier.saveFile(id, file, blob, token));
      if (!written) {
        this.busy.set(false);
        this.stage.set('');
        this.problem.set(`${draft.label} would not save. Nothing else was written.`);
        return;
      }
    }

    // The kept variants, which the manifest is about to name. Without this the
    // frames would be a list of filenames nothing had ever written, and the
    // piece would look saved while a sketch reading it got nothing.
    const kept = this.variants().filter((variant) => variant.kept);
    for (const [index, variant] of kept.entries()) {
      this.stage.set(`Saving ${variantFile(index)}…`);

      const blob = await canvasBlob(
        fullCanvas(variant.image, variant.image.naturalWidth, variant.image.naturalHeight)
      );
      const written = await firstValueFrom(
        this.atelier.saveFile(id, variantFile(index), blob, token)
      );
      if (!written) {
        this.busy.set(false);
        this.stage.set('');
        this.problem.set(`${variantFile(index)} would not save. The piece was not written.`);
        return;
      }
    }

    this.stage.set('Saving the piece…');
    const piece = await firstValueFrom(
      this.atelier.save(
        {
          id,
          source: this.source() || id,
          title: this.title(),
          layers: drafts.map((draft, index) => ({
            file: layerFile(draft.label, index),
            label: draft.label,
            depth: draft.depth,
            order: index,
          })),
          frames: this.keptFrames(),
        },
        token
      )
    );

    this.busy.set(false);
    this.stage.set('');

    if (!piece) {
      this.problem.set('The layers are saved but the piece was not. Try saving again.');
      return;
    }

    this.layers.set(drafts.map((draft) => ({ ...draft, saved: true })));
    this.saved.set(`Saved as ${piece.id}.`);
    this.atelier
      .pieces(token)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((pieces) => this.pieces.set(pieces));
  }

  /**
   * Records the preview as a reel.
   *
   * In the browser rather than on the server, which is the whole trick: the
   * sketch is already running here, the container has no room for a headless
   * browser beside ffmpeg, and the hand on the mouse is replaced by a scripted
   * path — the interactivity becomes the camera move.
   */
  async record(): Promise<void> {
    const canvas = this.canvasRef()?.nativeElement;
    if (!canvas) return;
    if (!this.layers().length || this.busy()) return;

    this.busy.set(true);
    this.problem.set('');
    this.recorded.set(undefined);
    this.stage.set(`Recording ${REEL_SECONDS} seconds…`);
    this.refining.set(undefined);

    const stream = canvas.captureStream(30);
    const type = ['video/webm;codecs=vp9', 'video/webm'].find((candidate) =>
      MediaRecorder.isTypeSupported(candidate)
    );
    if (!type) {
      this.busy.set(false);
      this.stage.set('');
      this.problem.set('This browser will not record a canvas.');
      return;
    }

    const recorder = new MediaRecorder(stream, { mimeType: type, videoBitsPerSecond: 8_000_000 });
    const parts: Blob[] = [];
    recorder.ondataavailable = (event) => parts.push(event.data);

    const done = new Promise<void>((resolve) => {
      recorder.onstop = () => resolve();
    });

    this.scripted = true;
    this.started = performance.now();
    recorder.start();
    await pause(REEL_SECONDS * 1000);
    recorder.stop();
    await done;
    this.scripted = false;

    this.busy.set(false);
    this.stage.set('');
    this.recorded.set(URL.createObjectURL(new Blob(parts, { type })));
  }

  // --- drawing ---------------------------------------------------------------

  /**
   * One canvas, two jobs: the parallax preview, and the still view a layer is
   * brushed on. Two canvases would mean two sizings and two pointer handlers
   * for what is, from the page's side, the same rectangle.
   */
  private loop = (): void => {
    this.frame = requestAnimationFrame(this.loop);

    const canvas = this.canvasRef()?.nativeElement;
    const painting = this.painting();
    if (!canvas || !painting) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const refining = this.refining();
    context.clearRect(0, 0, canvas.width, canvas.height);

    if (refining !== undefined) {
      this.drawRefining(context, canvas, painting, refining);
      return;
    }
    this.drawParallax(context, canvas, painting);
  };

  private drawParallax(
    context: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    painting: HTMLImageElement
  ): void {
    const seconds = (performance.now() - this.started) / 1000;
    const reference = this.scripted ? scriptedPointer(seconds) : this.pointer;

    const fit = contain(painting, canvas.width, canvas.height);
    const drafts = this.layers();

    // Back to front, so the nearest layer is painted last and sits on top.
    for (let index = drafts.length - 1; index >= 0; index--) {
      const parallax = this.parallax[index];
      if (!parallax) continue;

      parallax.update(reference.x, reference.y);
      context.drawImage(
        drafts[index].cut,
        fit.x + parallax.x,
        fit.y + parallax.y,
        fit.width,
        fit.height
      );
    }
  }

  private drawRefining(
    context: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    painting: HTMLImageElement,
    index: number
  ): void {
    const fit = contain(painting, canvas.width, canvas.height);
    const draft = this.layers()[index];
    if (!draft) return;

    context.globalAlpha = 0.45;
    context.drawImage(painting, fit.x, fit.y, fit.width, fit.height);
    context.globalAlpha = 1;
    context.drawImage(draft.cut, fit.x, fit.y, fit.width, fit.height);
  }

  /** Follows the mouse when previewing; paints into a mask when refining. */
  onPointerMove(event: PointerEvent): void {
    const canvas = this.canvasRef()?.nativeElement;
    if (!canvas) return;
    const box = canvas.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width;
    const y = (event.clientY - box.top) / box.height;

    this.pointer = { x: (x - 0.5) * 2, y: (y - 0.5) * 2 };
    if (this.painter) this.painter(event);
  }

  onPointerDown(event: PointerEvent): void {
    const index = this.refining();
    if (index === undefined) return;

    const canvas = this.canvasRef()?.nativeElement;
    if (!canvas) return;
    canvas.setPointerCapture(event.pointerId);
    this.painter = (moved) => this.paint(moved, index);
    this.painter(event);
  }

  onPointerUp(event: PointerEvent): void {
    const index = this.refining();
    this.painter = undefined;
    this.canvasRef()?.nativeElement.releasePointerCapture?.(event.pointerId);

    // Re-cut once, at the end of the stroke, rather than on every move: the
    // cut is a full-size composite and doing it per pointer event drops frames
    // on a large painting.
    if (index !== undefined) this.recut(index);
  }

  private paint(event: PointerEvent, index: number): void {
    const painting = this.painting();
    const draft = this.layers()[index];
    const canvas = this.canvasRef()?.nativeElement;
    if (!canvas) return;
    if (!painting || !draft) return;

    const box = canvas.getBoundingClientRect();
    const fit = contain(painting, canvas.width, canvas.height);

    // Screen → canvas → the painting's own pixels, which is what the mask is in.
    const onCanvasX = ((event.clientX - box.left) / box.width) * canvas.width;
    const onCanvasY = ((event.clientY - box.top) / box.height) * canvas.height;
    const scale = painting.naturalWidth / fit.width;
    const x = (onCanvasX - fit.x) * scale;
    const y = (onCanvasY - fit.y) * scale;

    const context = draft.mask.getContext('2d');
    if (!context) return;

    context.globalCompositeOperation = this.erasing() ? 'destination-out' : 'source-over';
    context.fillStyle = '#fff';
    context.beginPath();
    context.arc(x, y, this.brushSize() * scale, 0, Math.PI * 2);
    context.fill();
    context.globalCompositeOperation = 'source-over';
  }

  private recut(index: number): void {
    const painting = this.painting();
    const drafts = [...this.layers()];
    const draft = drafts[index];
    if (!painting || !draft) return;

    drafts[index] = {
      ...draft,
      cut: cutLayer(painting, draft.mask, painting.naturalWidth, painting.naturalHeight),
      saved: false,
    };
    this.layers.set(drafts);
  }

  /**
   * One layer from one of the model's masks.
   *
   * The mask covers a box and is a probability map, so it is placed and
   * thresholded into a full-frame stencil before anything is cut with it. That
   * stencil is also what the brush paints into, so a correction and a model's
   * answer are the same kind of thing from here on.
   */
  private draftFrom(
    label: string,
    mask: HTMLImageElement,
    box: [number, number, number, number],
    index: number,
    total: number
  ): Draft {
    const painting = this.painting()!;
    const width = painting.naturalWidth;
    const height = painting.naturalHeight;
    const placed = placeMask(mask, box, width, height);

    return {
      label,
      depth: depthFor(index, total),
      mask: placed,
      cut: cutLayer(painting, placed, width, height),
      saved: false,
    };
  }

  /** One `Parallax` per layer, rebuilt whenever the stack changes. */
  private restack(): void {
    const canvas = this.canvasRef()?.nativeElement;
    const reach = canvas ? canvas.width * 0.04 : 40;

    this.parallax = this.layers().map((draft) => new Parallax(draft.depth, reach, 0.08));
  }

  private keptFrames(): { label: string; files: string[] }[] | undefined {
    const kept = this.variants().filter((variant) => variant.kept);
    if (!kept.length) return undefined;

    return [{ label: 'variants', files: kept.map((variant, index) => variantFile(index)) }];
  }

  /** What a recorded reel is for: the frame Instagram wants. */
  readonly reelSize = `${REEL_WIDTH}×${REEL_HEIGHT}`;
  readonly reelSeconds = REEL_SECONDS;
}

// --- helpers -----------------------------------------------------------------

function loadImage(src: string, crossOrigin = false): Promise<HTMLImageElement | undefined> {
  return new Promise((resolve) => {
    const image = new Image();
    if (crossOrigin) image.crossOrigin = 'anonymous';
    image.onload = () => resolve(image);
    image.onerror = () => resolve(undefined);
    image.src = src;
  });
}

/** The copy that is sent out to be looked at, and billed for. */
async function workingCopy(painting: HTMLImageElement): Promise<Blob> {
  const size = workingSize(painting.naturalWidth, painting.naturalHeight);
  const canvas = document.createElement('canvas');
  canvas.width = size.width;
  canvas.height = size.height;
  canvas.getContext('2d')?.drawImage(painting, 0, 0, size.width, size.height);

  return canvasBlob(canvas, 'image/jpeg', 0.85);
}

function canvasBlob(
  canvas: HTMLCanvasElement,
  type = 'image/png',
  quality?: number
): Promise<Blob> {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob ?? new Blob()), type, quality);
  });
}

function fullCanvas(image: CanvasImageSource, width: number, height: number): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  canvas.getContext('2d')?.drawImage(image, 0, 0, width, height);
  return canvas;
}

/** The largest the painting can be drawn inside the canvas without cropping. */
function contain(
  painting: HTMLImageElement,
  width: number,
  height: number
): { x: number; y: number; width: number; height: number } {
  const scale = Math.min(width / painting.naturalWidth, height / painting.naturalHeight);
  const drawn = { width: painting.naturalWidth * scale, height: painting.naturalHeight * scale };

  return {
    x: (width - drawn.width) / 2,
    y: (height - drawn.height) / 2,
    ...drawn,
  };
}

/**
 * What a kept variant is called. One function, because the upload and the
 * manifest both have to say the same thing — a mismatch is a piece that lists
 * a frame nothing ever wrote.
 */
function variantFile(index: number): string {
  return `variant-${index}.png`;
}

function pause(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
