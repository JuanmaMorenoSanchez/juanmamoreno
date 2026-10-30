import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { ARTWORK_PORT } from '@domain/artwork/artwork.token';
import { KeptService, type KeptPiece } from '@features/atelier/kept.service';
import { LazyLoadDirective } from '@shared/directives/lazy-load.directive';

/** A painting and the parts cut out of it. */
export interface Cut {
  tokenId: string;
  name: string;
  parts: KeptPiece[];
}

/**
 * Groups the kept pictures under the paintings they came out of.
 *
 * In the catalogue's own order, and every painting is here whether or not
 * anything has been cut from it — which is what makes this the answer to
 * "what is left" as well as "what is there". A piece with no painting is left
 * out rather than gathered under a heading: those are the atelier's own
 * experiments, and this page is about the catalogue.
 *
 * Exported for its own test: it is the whole idea of the page and the only
 * part of it that can be wrong without anybody noticing.
 */
export function cutsFrom(
  catalogue: { tokenId: string; name?: string | null }[],
  kept: KeptPiece[]
): Cut[] {
  const byPainting = new Map<string, KeptPiece[]>();
  for (const piece of kept) {
    if (!piece.tokenId) continue;
    // Clips and sketches are not parts of a painting. A reel filmed from one
    // carries its token and would otherwise appear here as a cut of it.
    if (piece.media && piece.media !== 'image/png') continue;
    byPainting.set(piece.tokenId, [...(byPainting.get(piece.tokenId) ?? []), piece]);
  }

  return catalogue.map((painting) => ({
    tokenId: painting.tokenId,
    // The piece carries the painting's name too, and it is the better one
    // when the catalogue has none: it was read at the moment of cutting.
    name: painting.name ?? byPainting.get(painting.tokenId)?.[0]?.name ?? painting.tokenId,
    parts: byPainting.get(painting.tokenId) ?? [],
  }));
}

/**
 * What the night cut out of the catalogue.
 *
 * Every painting is cut into the separate things in it and each is kept as its
 * own asset, so that months later there is a library of parts rather than a
 * hundred and ninety-two flat pictures. They used to land on the atelier's own
 * shelf, which is where this session's work goes — hundreds of layers buried
 * what the atelier was for, and nothing could answer *which parts does this
 * painting have*.
 *
 * **It is also where the work left is visible.** The ledger that knows what
 * has been cut lives on his laptop, in a file the site cannot read and that a
 * reinstall would take with it. This says the same thing from the other side:
 * it is derived from what actually reached the bucket, so it is true even when
 * the ledger is not.
 *
 * Nothing here publishes anything. These are private, like everything else
 * behind the door.
 */
@Component({
  selector: 'app-assets',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LazyLoadDirective, MatIconModule, MatTooltipModule, RouterLink],
  templateUrl: './assets.component.html',
  styleUrl: './assets.component.scss',
})
export class AssetsComponent {
  private readonly artworks = inject(ARTWORK_PORT);
  protected readonly kept = inject(KeptService);

  private readonly catalogue = signal<{ tokenId: string; name?: string | null }[]>([]);

  /** True once both have been asked for, so "none" can be told from "not yet". */
  protected readonly asked = signal(false);

  /** Which painting's parts are open. One at a time: this is a long list. */
  protected readonly open = signal<string | null>(null);

  /** The piece being renamed, and what it is being renamed to. */
  protected readonly renaming = signal<string | null>(null);
  protected readonly trouble = signal<string | null>(null);

  protected readonly cuts = computed(() => cutsFrom(this.catalogue(), this.kept.pieces()));

  /** How far through the catalogue the nights have got. */
  protected readonly done = computed(() => this.cuts().filter((one) => one.parts.length).length);

  constructor() {
    this.artworks
      .getArtPiecesObservable()
      .pipe(takeUntilDestroyed(inject(DestroyRef)))
      .subscribe((all) => this.catalogue.set(all.map((nft) => ({ ...nft }))));

    void this.kept.ensure().finally(() => this.asked.set(true));
  }

  protected show(tokenId: string): void {
    this.open.update((already) => (already === tokenId ? null : tokenId));
  }

  /** Forgets one, after asking. Nothing here is undoable. */
  protected async forget(piece: KeptPiece): Promise<void> {
    if (!confirm(`Forget this ${piece.kind}, cut from "${piece.name}"?`)) return;
    this.trouble.set(null);
    try {
      await this.kept.forget(piece.id);
    } catch {
      this.trouble.set('it could not be forgotten; the sign-in may have lapsed');
    }
  }

  protected async rename(piece: KeptPiece, kind: string): Promise<void> {
    const wanted = kind.trim();
    if (!wanted || wanted === piece.kind) {
      this.renaming.set(null);
      return;
    }
    this.trouble.set(null);
    try {
      await this.kept.rename(piece.id, wanted);
      this.renaming.set(null);
    } catch {
      this.trouble.set('it could not be renamed; the sign-in may have lapsed');
    }
  }
}
