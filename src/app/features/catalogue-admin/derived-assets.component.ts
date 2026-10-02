import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DestroyRef, signal } from '@angular/core';
import { AtelierService, DerivedPiece } from '@features/atelier/atelier.service';
import { AdminAuthService } from '@shared/services/admin-auth.service';

/**
 * What has been made out of one painting, and the way to throw it away.
 *
 * Everything the atelier writes went into a bucket and was visible nowhere: a
 * piece could be cut, saved, superseded and cut again, and the only way to know
 * what was in there was to open the bucket. A painting's own row is where
 * somebody looks for it, so this is where it goes.
 *
 * The listing is fetched once for the whole catalogue and shared, rather than
 * once per row: there are a couple of hundred rows and tens of pieces, and a
 * request per row opened would be a request to list the same thing again.
 */
@Component({
  selector: 'app-derived-assets',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './derived-assets.component.html',
  styleUrl: './derived-assets.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DerivedAssetsComponent {
  private atelier = inject(AtelierService);
  private auth = inject(AdminAuthService);
  private destroyRef = inject(DestroyRef);

  /** The painting's token id, which is what a piece records as its source. */
  readonly tokenId = input.required<string>();

  /**
   * Every piece, for the whole catalogue.
   *
   * Static on the class so two hundred rows share one listing and one request.
   * Undefined until it has been asked, so "nothing was made from this painting"
   * and "the api did not answer" are different states — they look identical on
   * a row with nothing on it, and only one of them is fine.
   */
  private static readonly all = signal<DerivedPiece[] | undefined>(undefined);
  private static asked = false;

  readonly removing = signal<string>('');
  readonly problem = signal<string>('');

  /** The pieces cut from this painting, newest first. */
  readonly pieces = computed(() =>
    (DerivedAssetsComponent.all() ?? []).filter((piece) => piece.source === this.tokenId())
  );
  readonly asking = computed(() => DerivedAssetsComponent.all() === undefined);

  constructor() {
    this.load();
  }

  /** Asks once per session, however many rows are opened. */
  private load(force = false): void {
    const token = this.auth.bearerToken();
    if (!token || (DerivedAssetsComponent.asked && !force)) return;

    DerivedAssetsComponent.asked = true;
    this.atelier
      .derived(token)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((pieces) => DerivedAssetsComponent.all.set(pieces));
  }

  /**
   * Throws away one piece, after asking.
   *
   * The whole piece, because that is the unit somebody decides about: layers
   * without their manifest are files nothing can read. Confirmed because a
   * bucket delete is not a thing to find out about afterwards — and the files
   * are the only copy, since the cutting that made them was by hand.
   */
  remove(piece: DerivedPiece): void {
    const token = this.auth.bearerToken();
    if (!token || this.removing()) return;

    const sure = confirm(
      `Throw away "${piece.title}" and its ${piece.assets.length} file(s)?\n\n` +
        `This cannot be undone. The layers were cut by hand and this is the only copy.`
    );
    if (!sure) return;

    this.removing.set(piece.id);
    this.problem.set('');
    this.atelier
      .forget(piece.id, token)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((gone) => {
        this.removing.set('');
        if (!gone) {
          this.problem.set(`${piece.title} would not go. Nothing was removed.`);
          return;
        }
        DerivedAssetsComponent.all.set(
          (DerivedAssetsComponent.all() ?? []).filter((kept) => kept.id !== piece.id)
        );
      });
  }

  /** Reloads the shared listing — after a delete elsewhere, or a failed ask. */
  refresh(): void {
    this.load(true);
  }

  /** So a test can start from nothing. */
  static forget(): void {
    DerivedAssetsComponent.all.set(undefined);
    DerivedAssetsComponent.asked = false;
  }
}
