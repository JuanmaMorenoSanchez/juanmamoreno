import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  effect,
  inject,
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

/**
 * Putting cut pieces from different paintings on one ground.
 *
 * The nights cut all 192 paintings into the separate things in them, and the
 * shelf holds hundreds of transparent layers — a figure, a tree, a van. The
 * only thing that could be done with one until now was look at it, or hand it
 * to the atelier as the start of a single piece of work. This is the other
 * thing a shelf of cut-outs is for: three of them, from three paintings,
 * arranged on one canvas.
 *
 * **It publishes nothing.** What it makes is saved back onto the same shelf as
 * another kept piece, with no painting against it — the same door every other
 * saved piece goes through, and a saved piece is still not a page until
 * somebody adds a line to the sketch registry. Private, guarded and noindex
 * like the rest of the studio.
 *
 * The arrangement itself — where a piece lands, which one the pointer is on,
 * what order they are drawn in — is in `@domain/composition`, and tested
 * there without a canvas. What is here is the pixels and the pointer.
 */
@Component({
  selector: 'app-compose',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LazyLoadDirective],
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.scss'],
})
export class ComposeComponent {
  protected readonly kept = inject(KeptService);

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

  private sizeOf = (id: string): Sized | undefined => this.decoded()[id];

  /** Adds a shelf piece to the canvas, fetching its full-size bytes first. */
  protected async add(piece: KeptPiece): Promise<void> {
    this.saying.set(null);
    try {
      await this.kept.show(piece.id);
      const url = this.kept.urls()[piece.id];
      if (!url) {
        this.saying.set(this.kept.trouble()[piece.id] ?? 'that piece could not be read back');
        return;
      }
      const image = await decode(url);
      this.decoded.update((all) => ({ ...all, [piece.id]: image }));
      this.order.update((order) => [
        ...order,
        { id: piece.id, ...placeOn(this.ground().size, image, order.length) },
      ]);
      this.selected.set(piece.id);
    } catch {
      this.saying.set('that piece could not be decoded');
    }
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
    if (!brush) return;

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

  /**
   * Keeps the picture, on the same shelf everything else is kept on.
   *
   * No painting against it. A composition came out of three of them and
   * belongs to none, and the assets page files a piece under the painting it
   * was cut from — so one filed under any of the three would be a lie about
   * two of them.
   */
  protected async save(): Promise<void> {
    const element = this.canvas()?.nativeElement;
    if (!element || !this.order().length) return;
    this.saying.set(null);

    const blob = await new Promise<Blob | null>((done) => element.toBlob(done, 'image/png'));
    if (!blob) {
      this.saying.set('the canvas could not be read back');
      return;
    }

    try {
      await this.kept.keep(blob, {
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
