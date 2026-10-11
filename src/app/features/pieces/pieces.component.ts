import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { SketchPreviewComponent } from '@features/atelier/sketch-preview.component';
import { KeptService, type KeptPiece } from '@features/atelier/kept.service';
import { SKETCHES } from '@features/generative/sketches/registry';

/**
 * The generative pieces that have been written and not published.
 *
 * A piece written in the atelier could only be seen inside the atelier, in
 * the frame that ran it once, on the machine that wrote it. Closing the tab
 * lost it. This is where one can be looked at again, at an address, from
 * anywhere — which is what deciding about a piece actually needs.
 *
 * **Kept is not published.** A piece becomes a page at `/generative/<id>`
 * only when somebody adds a line to `sketches/registry.ts`, by hand, and
 * deploys. That was made deliberate after an earlier version resolved any id
 * at all, so every save put a page on the public site that nobody had chosen
 * to put there. This page says which of the two a piece is, and does not blur
 * the line: there is no button here that publishes anything.
 *
 * It is also where a mint queue would hang, if generative pieces are ever
 * put on chain. Nothing here does that yet.
 */
@Component({
  selector: 'app-pieces',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SketchPreviewComponent],
  templateUrl: './pieces.component.html',
  styleUrl: './pieces.component.scss',
})
export class PiecesComponent {
  private readonly kept = inject(KeptService);

  /** The piece being run, as code. */
  protected readonly running = signal<{ code: string; name: string } | null>(null);
  protected readonly fetching = signal<string | null>(null);
  protected readonly trouble = signal<string | null>(null);

  protected readonly pieces = computed(() =>
    this.kept.pieces().filter((piece) => piece.media === 'text/javascript')
  );

  /** True once the list has been asked for, so "none" can be told from "not yet". */
  protected readonly asked = signal(false);

  constructor() {
    void this.kept.ensure().finally(() => this.asked.set(true));

    // The bytes of each piece, fetched with the credential. A piece is a few
    // kilobytes, so all of them together is less than one layer.
    effect(() => {
      for (const piece of this.pieces()) void this.kept.show(piece.id);
    });
  }

  /**
   * The pieces that are pages, read from the registry itself.
   *
   * Listed beside the kept ones rather than matched against them. There is
   * no link between a kept piece and a published one to match *on*: a piece
   * is published by somebody copying its code into a `.sketch.ts` file and
   * naming it, and nothing carries an id across that. Pretending otherwise
   * would mean a label comparison that silently always said "not published",
   * which is worse than two honest lists.
   */
  protected readonly published = Object.entries(SKETCHES).map(([id, entry]) => ({
    id,
    label: entry.label,
  }));

  protected when(piece: KeptPiece): string {
    return piece.created ? piece.created.slice(0, 10) : '';
  }

  /** Reads the code back and runs it, in a frame with no network. */
  protected async run(piece: KeptPiece): Promise<void> {
    this.fetching.set(piece.id);
    this.trouble.set(null);
    try {
      const url = this.kept.urls()[piece.id];
      if (!url) throw new Error('not fetched');
      // A blob url, so this reads from memory rather than asking again.
      const code = await fetch(url).then((answer) => answer.text());
      this.running.set({ code, name: piece.name });
    } catch {
      this.trouble.set('That piece could not be read.');
    } finally {
      this.fetching.set(null);
    }
  }

  protected async forget(piece: KeptPiece): Promise<void> {
    try {
      await this.kept.forget(piece.id);
    } catch {
      this.trouble.set('It could not be forgotten.');
    }
  }
}
