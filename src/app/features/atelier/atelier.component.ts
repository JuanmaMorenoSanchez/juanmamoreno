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
  coverage,
  cutLayer,
  depthFor,
  fillsItsBox,
  outlineArea,
  stencilFromPoints,
  layerFile,
  scriptedPointer,
  slug,
  workingSize,
} from './cutting';

/** One layer as it is being worked on, before it is a line in a manifest. */
interface Draft {
  label: string;
  depth: number;
  /**
   * The outline the model gave, kept as it arrived.
   *
   * Numbers over the whole picture, so it survives a reload, a resize and a
   * different copy of the painting — and so a layer can be cut again later
   * without asking the model anything a second time. It is a couple of hundred
   * numbers; the mask it draws is a megabyte.
   *
   * Absent on a layer that was never cut from one — what was painted in behind
   * another layer is a whole picture, and has no outline to keep.
   */
  points?: [number, number][];
  /** The mask at full size, which the brush paints into. */
  mask: HTMLCanvasElement;
  /** The painting cut by that mask: what gets saved and drawn. */
  cut: HTMLCanvasElement;
  /** Set once it has been uploaded, so a second save does not resend it. */
  saved: boolean;
}

/** One variant made by asking in words — a frame, once it is kept. */
/**
 * One picture on the bench, and whatever has been cut from it.
 *
 * The page used to have `painting` and a side-list of variants that nothing
 * else could see, so every operation acted on the original whether that was
 * what you meant or not. There is no "the painting" now — there is a bench with
 * pictures on it, one of them selected, and segment, fill, variant and cut all
 * act on the selected one.
 *
 * A stack is parked here rather than held once for the page, so clicking
 * between pictures cannot destroy layers that were paid for.
 */
interface Bench {
  id: string;
  /** 'the painting', or the sentence that made this one. */
  label: string;
  kind: 'painting' | 'variant';
  image: HTMLImageElement;
  /** The variant's instruction, kept for naming a download. */
  instruction?: string;
  /** Which picture on the bench this was made from — the lineage. */
  from?: string;
  /** Variants only: whether it goes into the piece as a frame. */
  kept: boolean;
  /** The layers cut from *this* picture. Parked, not shared. */
  layers: Draft[];
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
  /** Everything on the bench. The painting is first; variants follow it. */
  readonly bench = signal<Bench[]>([]);
  /** Which one every operation acts on. */
  readonly onBench = signal(0);

  private readonly current = computed(() => this.bench()[this.onBench()]);

  /**
   * The picture being worked on.
   *
   * A computed over the bench rather than a signal of its own, so that every
   * place that already asked for "the painting" asks for the selected picture
   * instead without being rewritten — which is also the point: there was never
   * a good reason for those to mean different things.
   */
  readonly painting = computed(() => this.current()?.image);
  readonly title = signal('');
  readonly source = signal('');
  readonly labels = signal('the figure, the background');

  /** The stack cut from whatever is selected. Parked on it, not on the page. */
  readonly layers = computed(() => this.current()?.layers ?? []);
  /** The pictures a sentence made, in the order they were made. */
  readonly variants = computed(() => this.bench().filter((item) => item.kind === 'variant'));
  readonly instruction = signal('close her eyes, keep everything else exactly as it is');

  /** Which layer the brush is working on; nothing means the parallax preview. */
  readonly refining = signal<number | undefined>(undefined);
  readonly brushSize = signal(40);
  readonly erasing = signal(false);

  readonly busy = signal(false);
  readonly stage = signal('');

  /**
   * Which button is waiting, so the spinner appears on the one that was
   * pressed.
   *
   * Every press here is a call to a model and several of them take most of a
   * minute. Disabling the buttons says something is happening and not which, so
   * the one that was pressed carries the turning mark and the rest only go
   * quiet. `fillBehind` is keyed by its layer, because there is one of those
   * buttons per layer and only one of them is working.
   */
  readonly workingOn = signal('');

  protected waiting(what: string): boolean {
    return this.busy() && this.workingOn() === what;
  }
  readonly problem = signal('');
  readonly saved = signal('');
  readonly recorded = signal<string | undefined>(undefined);

  readonly prices = this.atelier.prices;
  readonly pieces = signal<Piece[] | undefined>(undefined);

  readonly pieceId = computed(() => slug(this.title() || this.source()));
  /**
   * Something to keep, and a name to keep it under.
   *
   * Either layers or kept variants will do. Cutting a painting into layers was
   * the only way through this page, which forced a parallax on somebody who
   * wanted one picture changed by a sentence.
   */
  readonly hasSomething = computed(
    () => this.layers().length > 0 || this.variants().some((variant) => variant.kept)
  );

  /** Which picture the stack about to be saved was cut from. */
  readonly cutFrom = computed(() => (this.layers().length ? this.current()?.label : undefined));
  readonly canSave = computed(
    () => this.hasSomething() && this.title().trim().length > 0 && !this.busy()
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

  /**
   * Puts a picture on the bench and selects it.
   *
   * A new painting clears the bench: the variants and stacks on it were made
   * from a different picture and mean nothing beside this one.
   */
  private putOnBench(image: HTMLImageElement, label: string): void {
    this.bench.set([{ id: 'painting', label, kind: 'painting', image, kept: false, layers: [] }]);
    this.onBench.set(0);
    this.restack();
  }

  /** Writes a stack onto the picture it was cut from, and nowhere else. */
  private setLayers(drafts: Draft[]): void {
    const at = this.onBench();
    this.bench.set(
      this.bench().map((item, index) => (index === at ? { ...item, layers: drafts } : item))
    );
    // The brush was working on a layer of the old stack, which no longer
    // exists. Left pointing at it the stage draws neither the correction nor
    // the preview, which is a black rectangle that ignores the mouse.
    this.refining.set(undefined);
    this.restack();
  }

  /** Switches which picture everything acts on. Its stack comes with it. */
  select(index: number): void {
    if (index < 0 || index >= this.bench().length) return;

    this.onBench.set(index);
    this.refining.set(undefined);
    this.problem.set('');
    this.restack();
  }

  /** How many pixels across the selected picture is, for the strip to say. */
  widthOf(item: Bench): number {
    return item.image.naturalWidth;
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

    this.source.set(file.name);
    if (!this.title()) this.title.set(file.name.replace(/\.[^.]+$/, ''));
    this.putOnBench(image, 'the file');
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
    this.workingOn.set('');
    this.stage.set('');

    if (!image) {
      this.problem.set(
        `The picture for ${id} would not load. Downloading it and choosing the file works too.`
      );
      return;
    }

    this.source.set(id);
    this.title.set(nft.name ?? `painting ${id}`);
    this.putOnBench(image, nft.name ?? `painting ${id}`);
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
    this.workingOn.set('layers');
    this.problem.set('');
    this.stage.set('Looking at the painting…');

    const working = await workingCopy(painting);
    this.atelier
      .segment(working, labels, token)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(async (cuts) => {
        this.busy.set(false);
        this.workingOn.set('');
        this.stage.set('');

        if (!cuts) {
          this.problem.set('Nothing came back. The day may have reached its ceiling.');
          return;
        }

        this.atelier.spend('segment');
        const drafts: Draft[] = [];
        const empty: string[] = [];
        const squares: string[] = [];
        for (const [index, cut] of cuts.entries()) {
          // An outline so small it is a speck cuts a layer with nothing in it,
          // which joins the stack and draws nothing: the stage goes black and
          // the pointer moves layers nobody can see, so the page reads as
          // broken rather than as a pass that found nothing.
          if (outlineArea(cut.points) <= 0) {
            empty.push(cut.label);
            continue;
          }

          const draft = this.draftFrom(cut.label, cut.points, index, cuts.length);
          const kept = coverage(draft.mask);

          if (kept <= 0) {
            empty.push(cut.label);
            continue;
          }

          // An outline that fills its own box is the box, which cuts a
          // rectangle of the painting — the failure that looks most like
          // success, squares of picture sliding over each other.
          if (fillsItsBox(kept, cut.box, painting.naturalWidth, painting.naturalHeight)) {
            squares.push(cut.label);
            continue;
          }
          drafts.push(draft);
        }

        // A pass can cost its money and find nothing — a painting with no sky
        // in it, or words the model could not place. Said out loud, because the
        // stage simply going back to the whole painting looks like a button
        // that did nothing.
        if (!drafts.length) {
          // Two different things look like this, and the second is the one
          // nobody would guess: the model this runs on is the cheap tier, and
          // returning a mask is a capability rather than a matter of quality.
          // One that has had it dropped answers with no masks for every
          // painting and every word, which from here is indistinguishable from
          // a painting with no sky in it.
          this.problem.set(
            `Nothing was found for ${labels.join(', ')}. The pass was paid for either way — ` +
              `try naming what is in the painting more plainly. If every pass comes back ` +
              `empty whatever you name, it is the model rather than the paintings: ` +
              `set ATELIER_SEGMENT_MODEL=gemini-3.8-flash.`
          );
        }

        // A box is not a shape, and saying so is the whole point: this is the
        // model and never the painting, so naming other things will not help.
        if (squares.length) {
          this.problem.set(
            `The model returned a box rather than a shape for ${squares.join(', ')}, ` +
              `so cutting it would have given you a rectangle of the painting. This is the ` +
              `model and not the painting — naming something else will not change it.`
          );
        } else if (empty.length && drafts.length) {
          this.problem.set(
            `Nothing was cut for ${empty.join(', ')} — the mask came back empty. ` +
              `The other ${drafts.length === 1 ? 'layer' : 'layers'} are on the stage.`
          );
        }

        this.setLayers(drafts);
      });
  }

  /** What was behind one layer, so moving it does not reveal a hole. */
  async fillBehind(index: number): Promise<void> {
    const painting = this.painting();
    const layer = this.layers()[index];
    const token = this.auth.bearerToken();
    if (!painting || !layer || !token) return;

    this.busy.set(true);
    this.workingOn.set(`behind:${index}`);
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
        this.workingOn.set('');
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
        this.setLayers(drafts);
      });
  }

  /** One variant of the painting, asked for in words. */
  async makeVariant(): Promise<void> {
    const painting = this.painting();
    const token = this.auth.bearerToken();
    if (!painting || !token || !this.instruction().trim()) return;

    this.busy.set(true);
    this.workingOn.set('variant');
    this.problem.set('');
    this.stage.set('Asking for a variant…');

    const working = await workingCopy(painting);
    this.atelier
      .edit(working, this.instruction().trim(), token)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(async (made) => {
        this.busy.set(false);
        this.workingOn.set('');
        this.stage.set('');

        if (!made) {
          this.problem.set('Nothing came back. The day may have reached its ceiling.');
          return;
        }

        this.atelier.spend('edit');
        const image = await loadImage(made.image);
        if (!image) return;

        // Onto the bench rather than into a side-list, so it can be cut, filled
        // and asked for another variant of in turn. `from` records which
        // picture it was made of, which is what makes a chain of them readable
        // afterwards — "eyes closed", then "and smiling" of that.
        const instruction = this.instruction().trim();
        const made_from = this.current()?.id ?? 'painting';
        const next: Bench = {
          id: `v${this.bench().length}`,
          label: instruction,
          kind: 'variant',
          image,
          instruction,
          from: made_from,
          kept: false,
          layers: [],
        };

        this.bench.set([...this.bench(), next]);
        // Selected, because asking for a variant is asking to look at it.
        this.onBench.set(this.bench().length - 1);
        this.restack();
      });
  }

  /**
   * What a variant is called once it is on his disk.
   *
   * Named after the painting and the sentence that made it, because a folder of
   * `variant-0.png` is a folder nobody can read a week later — and the reason
   * to download one rather than keep it in the piece is to use it somewhere
   * else, where the filename is all the description it has.
   */
  variantName(variant: Bench): string {
    return `${slug(this.source() || 'painting')}-${slug(variant.instruction ?? '', 'variant')}.png`;
  }

  /** Addressed by id rather than by position: the strip holds the painting too. */
  keep(variant: Bench): void {
    this.bench.set(
      this.bench().map((item) => (item.id === variant.id ? { ...item, kept: !item.kept } : item))
    );
  }

  /**
   * Throws a variant off the bench, and anything made from it with it.
   *
   * A variant of a discarded variant has nothing left to be a variant of, and
   * leaving it would leave a picture whose lineage names something that is not
   * there. Selection falls back to the painting, which is always first.
   */
  discardVariant(variant: Bench): void {
    const gone = new Set([variant.id]);
    let grew = true;
    while (grew) {
      grew = false;
      for (const item of this.bench()) {
        if (item.from && gone.has(item.from) && !gone.has(item.id)) {
          gone.add(item.id);
          grew = true;
        }
      }
    }

    // Read before the bench changes. Asked afterwards, `current()` is already
    // whatever has slid into that position — or nothing — so the selection
    // stayed pointing at a picture that had gone.
    const wasOn = this.current()?.id ?? '';

    this.bench.set(this.bench().filter((item) => !gone.has(item.id)));
    if (gone.has(wasOn)) this.onBench.set(0);
    this.restack();
  }

  /** Moves a layer forward or back, which is the one thing no model can tell. */
  move(index: number, by: number): void {
    const drafts = [...this.layers()];
    const to = index + by;
    if (to < 0 || to >= drafts.length) return;

    [drafts[index], drafts[to]] = [drafts[to], drafts[index]];
    this.setLayers(drafts);
  }

  remove(index: number): void {
    this.setLayers(this.layers().filter((_, at) => at !== index));
    this.refining.set(undefined);
    this.restack();
  }

  refine(index: number): void {
    this.refining.set(this.refining() === index ? undefined : index);
  }

  setDepth(index: number, value: string): void {
    const drafts = [...this.layers()];
    drafts[index] = { ...drafts[index], depth: Number(value) };
    this.setLayers(drafts);
  }

  /** Uploads every layer that has changed, then the manifest that names them. */
  async savePiece(): Promise<void> {
    const token = this.auth.bearerToken();
    const painting = this.painting();
    if (!token || !painting || !this.canSave()) return;

    this.busy.set(true);
    this.workingOn.set('save');
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
        this.workingOn.set('');
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
        this.workingOn.set('');
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
            // Kept with the piece: the png is the layer at one resolution, the
            // outline is its shape at any of them. A layer painted in behind
            // another was never cut from one and has none to keep.
            ...(draft.points ? { points: draft.points } : {}),
          })),
          frames: this.keptFrames(),
        },
        token
      )
    );

    this.busy.set(false);
    this.workingOn.set('');
    this.stage.set('');

    if (!piece) {
      this.problem.set('The layers are saved but the piece was not. Try saving again.');
      return;
    }

    this.setLayers(drafts.map((draft) => ({ ...draft, saved: true })));
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
    this.workingOn.set('record');
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
      this.workingOn.set('');
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
    this.workingOn.set('');
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

    // The painting itself, whenever it has not been cut up yet.
    //
    // Without this the stage cleared and drew the layers — of which there were
    // none — so choosing a picture showed a dark rectangle, and a pass that
    // found nothing left it dark. The first thing anybody does here is choose a
    // painting, so it was the first thing anybody saw.
    if (!drafts.length) {
      context.drawImage(painting, fit.x, fit.y, fit.width, fit.height);
      return;
    }

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
    this.setLayers(drafts);
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
    points: [number, number][],
    index: number,
    total: number
  ): Draft {
    const painting = this.painting()!;
    const width = painting.naturalWidth;
    const height = painting.naturalHeight;
    // Filled straight onto the full-size painting: the outline is normalised,
    // so there is no mask to scale up and nothing blurs from scaling one.
    const placed = stencilFromPoints(points, width, height);

    return {
      label,
      depth: depthFor(index, total),
      points,
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

    return [{ label: 'variants', files: kept.map((_, index) => variantFile(index)) }];
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
