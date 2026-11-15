import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import {
  boxOf,
  bringToFront,
  change,
  placeOn,
  topAt,
  withinReach,
  type Placed,
  type Sized,
} from '@domain/composition/composition';
import { KeptService, type KeptPiece } from '@features/atelier/kept.service';
import { LazyLoadDirective } from '@shared/directives/lazy-load.directive';

/** The three shapes a composition is made in, and the pixels each is saved at. */
const GROUNDS: { id: string; label: string; size: Sized }[] = [
  { id: 'landscape', label: '3:2', size: { width: 1800, height: 1200 } },
  { id: 'square', label: '1:1', size: { width: 1500, height: 1500 } },
  { id: 'portrait', label: '4:5', size: { width: 1200, height: 1500 } },
];

/** What is behind the pieces. Transparent is first because a cut is a cut-out. */
const PAPERS = [
  { id: 'none', label: 'Transparent', paint: null },
  { id: 'paper', label: 'Paper', paint: '#edece8' },
  { id: 'ink', label: 'Ink', paint: '#141414' },
];

/** What the node carries: which ground, what behind, and every piece placed. */
export interface Arrangement {
  ground: string;
  paper: string;
  pieces: Placed[];
}

export const NOTHING_ARRANGED: Arrangement = { ground: 'landscape', paper: 'none', pieces: [] };

/**
 * The arrangement off a node, defensively.
 *
 * It arrives as json on a saved graph, and a graph outlives the engine that
 * drew it — so anything unreadable is an empty ground rather than a page that
 * will not open.
 */
export function readArrangement(raw: unknown): Arrangement {
  if (!raw) return NOTHING_ARRANGED;
  try {
    const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
    const pieces = Array.isArray(parsed?.pieces) ? parsed.pieces : [];
    return {
      ground: typeof parsed?.ground === 'string' ? parsed.ground : NOTHING_ARRANGED.ground,
      paper: typeof parsed?.paper === 'string' ? parsed.paper : NOTHING_ARRANGED.paper,
      pieces: pieces
        .filter((one: Placed) => one && typeof one.id === 'string')
        .map((one: Placed) => ({
          id: one.id,
          x: Number(one.x) || 0,
          y: Number(one.y) || 0,
          scale: Number(one.scale) || 1,
        })),
    };
  } catch {
    return NOTHING_ARRANGED;
  }
}

/** How many pieces a node has on it, for the label on its button. */
export function countArranged(raw: unknown): number {
  return readArrangement(raw).pieces.length;
}

/**
 * Putting cut pieces from different paintings on one ground.
 *
 * The nights cut all 192 paintings into the separate things in them, and the
 * shelf holds hundreds of transparent layers — a figure, a tree, a van. The
 * only thing that could be done with one was look at it, or hand it to the
 * atelier as the start of a single piece of work. This is the other thing a
 * shelf of cut-outs is for: three of them, from three paintings, on one
 * canvas.
 *
 * **It is a box on the canvas rather than a page of its own.** The arranging
 * is done here, with a pointer, because the shelf is here and because placing
 * a figure by typing its coordinates is not placing it; what the engine gets
 * is the picture this made, in the same way and by the same route as the
 * painting itself. The arrangement rides back on the node as json, like the
 * brush's marks, so a graph is still one thing that can be saved and reloaded.
 *
 * **What it makes belongs to no painting.** A composition came out of three
 * of them, and the assets page files a piece under the painting it was cut
 * from — so one filed under any of the three would be a lie about two.
 *
 * Where a piece lands, which one the pointer is on and what order they are
 * drawn in are in `@domain/composition`, tested there without a canvas. What
 * is here is the pixels and the pointer.
 */
@Component({
  selector: 'app-compose-overlay',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LazyLoadDirective],
  templateUrl: './compose-overlay.component.html',
  styleUrls: ['./compose-overlay.component.scss'],
})
export class ComposeOverlayComponent implements OnInit {
  protected readonly kept = inject(KeptService);

  /** What the node already has on it, as json. */
  readonly arrangement = input<string>('');
  /** The arrangement to store, and the picture the run will be given. */
  readonly saved = output<{ arrangement: string; picture: Blob }>();
  readonly dismissed = output<void>();

  protected readonly grounds = GROUNDS;
  protected readonly papers = PAPERS;

  protected readonly ground = signal(GROUNDS[0]);
  protected readonly paper = signal(PAPERS[0]);
  protected readonly name = signal('Composition');

  /** The arrangement. Last in the list is nearest the viewer. */
  protected readonly order = signal<Placed[]>([]);
  protected readonly selected = signal<string | null>(null);

  /**
   * The decoded pieces, by id.
   *
   * A signal rather than a plain map because the canvas is redrawn by an
   * effect: an image that finishes decoding has to be a change the effect can
   * see, or the piece is in the arrangement and not on the canvas until
   * something else happens to redraw it.
   */
  private readonly decoded = signal<Record<string, HTMLImageElement>>({});

  private readonly canvas = viewChild<ElementRef<HTMLCanvasElement>>('canvas');

  /** Everything on the shelf that can be drawn: the clips cannot. */
  protected readonly shelf = computed(() =>
    this.kept.pieces().filter((piece) => !piece.media || piece.media === 'image/png')
  );

  protected readonly placedCount = computed(() => this.order().length);

  protected readonly chosen = computed(() => {
    const id = this.selected();
    return id ? (this.order().find((placed) => placed.id === id) ?? null) : null;
  });

  protected readonly saying = signal<string | null>(null);

  constructor() {
    void this.kept.ensure();

    // One effect, reading everything the picture is made of. A canvas is not
    // declarative, so this is where the two meet: anything the drawing depends
    // on is read here, and nothing else has to remember to redraw.
    effect(() => this.draw(this.order(), this.decoded(), this.ground().size, this.paper().paint));
  }

  /**
   * Put back what the node was holding.
   *
   * In `ngOnInit` rather than the constructor because an input is not set
   * until after one. Without it the box would forget its arrangement every
   * time it was closed, which is the one thing storing it on the node is for.
   */
  ngOnInit(): void {
    void this.restore(readArrangement(this.arrangement()));
  }

  private async restore(held: Arrangement): Promise<void> {
    this.ground.set(GROUNDS.find((one) => one.id === held.ground) ?? GROUNDS[0]);
    this.paper.set(PAPERS.find((one) => one.id === held.paper) ?? PAPERS[0]);
    if (!held.pieces.length) return;

    await this.kept.ensure();
    const back: Placed[] = [];
    for (const placed of held.pieces) {
      const image = await this.pixels(placed.id);
      // A piece taken off the shelf since is simply not in the picture any
      // more. Losing one is better than refusing to open the box.
      if (image) back.push(placed);
    }
    this.order.set(back);
    if (back.length < held.pieces.length) {
      this.saying.set('Some pieces are no longer on the shelf and have been left out.');
    }
  }

  /** The full-size bytes of a shelf piece, decoded and remembered. */
  private async pixels(id: string): Promise<HTMLImageElement | null> {
    const already = this.decoded()[id];
    if (already) return already;
    try {
      await this.kept.show(id);
      const url = this.kept.urls()[id];
      if (!url) return null;
      const image = await decode(url);
      this.decoded.update((all) => ({ ...all, [id]: image }));
      return image;
    } catch {
      return null;
    }
  }

  private sizeOf = (id: string): Sized | undefined => this.decoded()[id];

  /** Adds a shelf piece to the canvas, fetching its full-size bytes first. */
  protected async add(piece: KeptPiece): Promise<void> {
    this.saying.set(null);
    const image = await this.pixels(piece.id);
    if (!image) {
      this.saying.set(this.kept.trouble()[piece.id] ?? 'that piece could not be read back');
      return;
    }
    this.order.update((order) => [
      ...order,
      { id: piece.id, ...placeOn(this.ground().size, image, order.length) },
    ]);
    this.selected.set(piece.id);
  }

  protected remove(id: string): void {
    this.order.update((order) => order.filter((placed) => placed.id !== id));
    if (this.selected() === id) this.selected.set(null);
  }

  protected front(id: string): void {
    this.order.update((order) => bringToFront(order, id));
  }

  protected resize(id: string, scale: number): void {
    this.order.update((order) => change(order, id, { scale }));
  }

  /**
   * Changes the shape of the ground, keeping what is on it reachable.
   *
   * Going from the 3:2 to the 4:5 takes six hundred pixels off the width, and
   * anything standing in them would be off the canvas with no way back.
   */
  protected setGround(ground: (typeof GROUNDS)[number]): void {
    this.ground.set(ground);
    this.order.update((order) => order.map((placed) => withinReach(ground.size, placed)));
  }

  protected setPaper(paper: (typeof PAPERS)[number]): void {
    this.paper.set(paper);
  }

  protected clear(): void {
    this.order.set([]);
    this.selected.set(null);
  }

  // ——— the pointer ———

  /** Which piece is being dragged, and where in it the pointer took hold. */
  private held: { id: string; dx: number; dy: number } | null = null;

  protected press(event: PointerEvent): void {
    const point = this.at(event);
    if (!point) return;
    const id = topAt(point, this.order(), this.sizeOf);
    this.selected.set(id);
    if (!id) return;

    // Taken hold of where it was pressed, not by its centre: a piece that
    // jumped under the pointer the moment it was touched would be a piece
    // nobody could place.
    const placed = this.order().find((one) => one.id === id)!;
    this.held = { id, dx: placed.x - point.x, dy: placed.y - point.y };
    this.front(id);
    (event.target as Element).setPointerCapture?.(event.pointerId);
  }

  protected drag(event: PointerEvent): void {
    if (!this.held) return;
    const point = this.at(event);
    if (!point) return;
    const { id, dx, dy } = this.held;
    this.order.update((order) =>
      order.map((placed) =>
        placed.id === id
          ? withinReach(this.ground().size, { ...placed, x: point.x + dx, y: point.y + dy })
          : placed
      )
    );
  }

  protected release(): void {
    this.held = null;
  }

  /**
   * The arrow keys, so the canvas is not a mouse-only control.
   *
   * Ten canvas units a press, a hundred with shift — which at 1800 wide is
   * about half a per cent and about five, the two steps a nudge is ever
   * wanted in.
   */
  protected nudge(event: KeyboardEvent): void {
    const id = this.selected();
    if (!id) return;
    const step = event.shiftKey ? 100 : 10;
    const by: Record<string, [number, number]> = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
    };
    const move = by[event.key];
    if (!move) return;
    event.preventDefault();
    this.order.update((order) =>
      order.map((placed) =>
        placed.id === id
          ? withinReach(this.ground().size, {
              ...placed,
              x: placed.x + move[0],
              y: placed.y + move[1],
            })
          : placed
      )
    );
  }

  /** A pointer event in canvas units, or nothing if the canvas is not up yet. */
  private at(event: PointerEvent): { x: number; y: number } | null {
    const element = this.canvas()?.nativeElement;
    if (!element) return null;
    const box = element.getBoundingClientRect();
    if (!box.width || !box.height) return null;
    return {
      x: ((event.clientX - box.left) * element.width) / box.width,
      y: ((event.clientY - box.top) * element.height) / box.height,
    };
  }

  // ——— the picture ———

  private draw(
    order: readonly Placed[],
    images: Record<string, HTMLImageElement>,
    size: Sized,
    paper: string | null
  ): void {
    const element = this.canvas()?.nativeElement;
    if (!element) return;
    element.width = size.width;
    element.height = size.height;
    const brush = element.getContext('2d');
    // A fake context from a neighbouring spec has reached this before: with
    // `isolate: false` a stubbed prototype outlives the file that stubbed it,
    // and guarding only against `null` sailed into it and died on clearRect.
    if (!brush || typeof brush.clearRect !== 'function') return;

    brush.clearRect(0, 0, size.width, size.height);
    if (paper) {
      brush.fillStyle = paper;
      brush.fillRect(0, 0, size.width, size.height);
    }
    for (const placed of order) {
      const image = images[placed.id];
      if (!image) continue;
      const box = boxOf(placed, image);
      brush.drawImage(image, box.left, box.top, box.width, box.height);
    }
  }

  /** The canvas as a png, which is what both of the ways out need. */
  private async picture(): Promise<Blob | null> {
    const element = this.canvas()?.nativeElement;
    if (!element || !this.order().length) return null;
    if (typeof element.toBlob !== 'function') return null;
    return new Promise<Blob | null>((done) => element.toBlob(done, 'image/png'));
  }

  /**
   * Hands the arrangement and the picture back to the node, and closes.
   *
   * The picture goes up with the next Run exactly as the painting does. It is
   * made here because the shelf is here: the engine cannot see the bucket and
   * has no business signing in to it.
   */
  protected async use(): Promise<void> {
    this.saying.set(null);
    const picture = await this.picture();
    if (!picture) {
      this.saying.set('there is nothing on the ground yet');
      return;
    }
    this.saved.emit({
      arrangement: JSON.stringify({
        ground: this.ground().id,
        paper: this.paper().id,
        pieces: this.order(),
      } satisfies Arrangement),
      picture,
    });
  }

  /**
   * Keeps the picture on the same shelf everything else is kept on.
   *
   * Beside handing it to the node rather than instead of it: a composition
   * worth running is usually one worth having, and the alternative is making
   * it twice. No painting against it, for the reason in the class comment.
   */
  protected async save(): Promise<void> {
    this.saying.set(null);
    const picture = await this.picture();
    if (!picture) {
      this.saying.set('there is nothing on the ground yet');
      return;
    }

    const element = this.canvas()!.nativeElement;
    try {
      await this.kept.keep(picture, {
        name: this.name().trim() || 'Composition',
        kind: 'composition',
        width: element.width,
        height: element.height,
        media: 'image/png',
      });
      this.saying.set('Kept. It is on the shelf, and it is not a page until it is registered.');
    } catch (error) {
      this.saying.set((error as { message?: string })?.message ?? 'it could not be kept');
    }
  }
}

/** An image element with its bytes already decoded, so the canvas can draw it. */
function decode(url: string): Promise<HTMLImageElement> {
  return new Promise((done, fail) => {
    const image = new Image();
    image.onload = () => done(image);
    image.onerror = () => fail(new Error('the piece could not be decoded'));
    image.src = url;
  });
}
