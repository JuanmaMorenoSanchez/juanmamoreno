import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';

/** One mark, in the painting's own pixels rather than the screen's. */
export interface Mark {
  x: number;
  y: number;
}

/** What a Brush node holds: what to keep, and what to leave out. */
export interface Marks {
  keep: Mark[];
  drop: Mark[];
}

export const NO_MARKS: Marks = { keep: [], drop: [] };

/** Reads whatever is on the node, however old or mangled. */
export function readMarks(raw: unknown): Marks {
  const parsed =
    typeof raw === 'string' ? safely(raw) : typeof raw === 'object' && raw !== null ? raw : null;
  const kept = (parsed as Marks | null)?.keep;
  const dropped = (parsed as Marks | null)?.drop;
  return {
    keep: Array.isArray(kept) ? kept.filter(isMark) : [],
    drop: Array.isArray(dropped) ? dropped.filter(isMark) : [],
  };
}

function safely(raw: string): unknown {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

const isMark = (m: unknown): m is Mark =>
  typeof m === 'object' && m !== null && typeof (m as Mark).x === 'number';

/**
 * Putting marks on the painting by hand.
 *
 * The answer to a word that will not land. Naming works when a thing has a
 * name the model knows and fails on everything else — a particular fold, one
 * of two similar figures — and on painting 6 "the yellow jumper" found a strip
 * behind her shoulder. A mark has no such problem, because it points.
 *
 * Marks are kept in the painting's own pixels, not the screen's, so they stay
 * put when the window is resized and still mean something when the same graph
 * is run against the full-resolution original.
 */
@Component({
  selector: 'app-brush-overlay',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // Escape closes it. The overlay covers the page, so there is nowhere else
  // for the key to usefully go.
  host: { '(document:keydown.escape)': 'dismissed.emit()' },
  templateUrl: './brush-overlay.component.html',
  styleUrl: './brush-overlay.component.scss',
})
export class BrushOverlayComponent {
  /** The painting to draw on, as an object url. */
  readonly source = input.required<string>();
  readonly marks = input.required<Marks>();
  readonly saved = output<Marks>();
  readonly dismissed = output<void>();

  protected readonly working = signal<Marks>(NO_MARKS);
  /** The painting's real size, learned when it loads. */
  protected readonly natural = signal<{ width: number; height: number } | null>(null);

  protected readonly count = computed(() => {
    const now = this.working();
    return { keep: now.keep.length, drop: now.drop.length };
  });

  constructor() {
    // Copied in rather than edited in place: Cancel has to mean something.
    queueMicrotask(() => this.working.set(structuredCloneish(this.marks())));
  }

  protected measured(event: Event): void {
    const img = event.target as HTMLImageElement;
    this.natural.set({ width: img.naturalWidth, height: img.naturalHeight });
  }

  /**
   * A click keeps, a shift-click (or right button) leaves out.
   *
   * Converted to the painting's pixels on the way in: the overlay is whatever
   * size the window allows, and a mark recorded in screen pixels would mean
   * something different on a laptop than on a monitor.
   */
  protected mark(event: MouseEvent): void {
    event.preventDefault();
    const size = this.natural();
    if (!size) return;

    const shown = (event.currentTarget as HTMLElement).getBoundingClientRect();
    if (!shown.width || !shown.height) return;

    const at: Mark = {
      x: Math.round(((event.clientX - shown.left) / shown.width) * size.width),
      y: Math.round(((event.clientY - shown.top) / shown.height) * size.height),
    };

    const excluding = event.shiftKey || event.button === 2;
    const now = this.working();
    this.working.set(
      excluding
        ? { keep: now.keep, drop: [...now.drop, at] }
        : { keep: [...now.keep, at], drop: now.drop }
    );
  }

  /** Where a mark sits on screen, as a percentage, so it survives resizing. */
  protected at(mark: Mark): { left: string; top: string } {
    const size = this.natural();
    if (!size) return { left: '0%', top: '0%' };
    return {
      left: `${(mark.x / size.width) * 100}%`,
      top: `${(mark.y / size.height) * 100}%`,
    };
  }

  protected undo(): void {
    const now = this.working();
    // Whichever was put down last. Tracked by nothing more than which list is
    // longer would be wrong, so the drop list wins ties — it is the one added
    // deliberately, and the one more often regretted.
    if (now.drop.length) {
      this.working.set({ keep: now.keep, drop: now.drop.slice(0, -1) });
    } else if (now.keep.length) {
      this.working.set({ keep: now.keep.slice(0, -1), drop: now.drop });
    }
  }

  protected clear(): void {
    this.working.set(NO_MARKS);
  }

  protected keep(): void {
    this.saved.emit(this.working());
  }
}

function structuredCloneish(marks: Marks): Marks {
  return { keep: [...marks.keep], drop: [...marks.drop] };
}
