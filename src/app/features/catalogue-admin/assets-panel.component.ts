import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { Nft } from '@domain/artwork/artwork.entity';
import { KeptService, type KeptPiece } from '@features/atelier/kept.service';

/**
 * What the atelier has kept of one painting.
 *
 * Here rather than on a page of its own. This page already exists because
 * three separate lists turned out to be "the same list wearing different
 * clothes", and a fourth would be the same mistake — an asset belongs to a
 * painting, and `KeptPiece.tokenId` already says which.
 *
 * **Nothing here is public.** The page is admin-only and `noindex`, the
 * backend routes are behind the guard, and the bucket is closed to everyone
 * but the backend — so an asset has exactly one address and it is this one.
 * The public artwork page knows nothing about any of it.
 *
 * It reaches into the atelier's own service rather than copying it, which is a
 * feature importing a feature. Tolerated because it is a service and not a
 * component: the alternative is two places that both know what a kept piece is.
 */
@Component({
  selector: 'app-assets-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './assets-panel.component.html',
  styleUrl: './assets-panel.component.scss',
})
export class AssetsPanelComponent {
  readonly painting = input.required<Nft>();

  private readonly kept = inject(KeptService);

  /** Which one is being forgotten, so the press can say so and happen once. */
  protected readonly forgetting = signal<string | null>(null);
  /** Which one was asked about, because forgetting cannot be undone. */
  protected readonly asking = signal<string | null>(null);
  protected readonly trouble = signal<string | null>(null);

  constructor() {
    // Once per visit, however many rows are opened.
    void this.kept.ensure();

    // The bytes cannot be fetched by the tag itself: the route wants an
    // Authorization header and neither an img nor a video can send one.
    effect(() => {
      for (const piece of this.mine()) void this.kept.show(piece.id);
    });
  }

  protected readonly mine = computed(() => {
    const id = this.painting().tokenId;
    return this.kept.pieces().filter((piece) => piece.tokenId === id);
  });

  protected isClip(piece: KeptPiece): boolean {
    return this.kept.isClip(piece);
  }

  /** Empty until the bytes have been fetched, which is one frame later. */
  protected url(piece: KeptPiece): string {
    return this.kept.urls()[piece.id] ?? '';
  }

  /** Roughly, because the exact byte count of a clip tells nobody anything. */
  protected size(piece: KeptPiece): string {
    const mb = piece.bytes / 1_000_000;
    return mb >= 1 ? `${mb.toFixed(1)} MB` : `${Math.max(1, Math.round(piece.bytes / 1000))} KB`;
  }

  protected when(piece: KeptPiece): string {
    return piece.created ? piece.created.slice(0, 10) : '';
  }

  /**
   * Forgets one, bytes and record together, after being asked twice.
   *
   * Twice because it cannot be undone and the thing it destroys took an hour
   * of a graphics card to make.
   */
  protected async forget(piece: KeptPiece): Promise<void> {
    if (this.asking() !== piece.id) {
      this.asking.set(piece.id);
      return;
    }
    this.asking.set(null);
    this.forgetting.set(piece.id);
    this.trouble.set(null);
    try {
      await this.kept.forget(piece.id);
    } catch {
      this.trouble.set('It could not be forgotten.');
    } finally {
      this.forgetting.set(null);
    }
  }
}
