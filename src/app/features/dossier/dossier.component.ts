import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { VALIDTRAITS } from '@domain/artwork/artwork.constants';
import { Nft } from '@domain/artwork/artwork.entity';
import { ARTWORK_PORT } from '@domain/artwork/artwork.token';
import { SORT } from '@shared/constants/order.constants';
import { PdfButtonComponent } from '@shared/components/pdf-button/pdf-button.component';
import { AvailabilityService } from '@shared/services/availability.service';
import { toSignal } from '@angular/core/rxjs-interop';

/**
 * Where a dossier is made.
 *
 * It used to be made from the catalogue, by right-clicking paintings — a
 * gesture nothing on the page mentioned, on a page every reader sees, offering
 * a document only one person has any use for. The catalogue is a catalogue
 * again, and this is his.
 *
 * The grid is deliberately dense. Choosing twenty paintings out of a hundred
 * and sixty-seven is a job done by eye, and the catalogue's tiles are sized for
 * looking at one painting rather than for finding one among many.
 */
@Component({
  selector: 'app-dossier',
  templateUrl: './dossier.component.html',
  styleUrl: './dossier.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIcon, PdfButtonComponent],
})
export class DossierComponent {
  private readonly artworkService = inject(ARTWORK_PORT);
  private readonly availability = inject(AvailabilityService);

  private readonly all = toSignal(this.artworkService.getArtPiecesObservable(), {
    initialValue: [] as Nft[],
  });

  /**
   * One tile per painting, newest first.
   *
   * The frontal view of each title-group and nothing else: a dossier is a book
   * of paintings, and a detail shot or a superseded photograph is not a
   * painting to choose. The same rule the catalogue grid uses.
   */
  readonly paintings = computed<Nft[]>(() => {
    const all = this.all();
    const byName = new Map<string, Nft[]>();
    for (const piece of all) {
      const group = byName.get(piece.name);
      if (group) group.push(piece);
      else byName.set(piece.name, [piece]);
    }
    const frontals = all.filter((piece) =>
      this.artworkService.isFrontalView(piece, byName.get(piece.name) ?? [])
    );
    return this.artworkService.sortByYear(frontals, SORT.DESC);
  });

  /**
   * The chosen paintings, in the order they were chosen.
   *
   * Order is the whole point rather than a side-effect: a dossier is read in
   * sequence, and the sequence is an argument. Clicking a painting adds it at
   * the end; clicking it again takes it out and closes the gap.
   */
  readonly chosen = signal<Nft[]>([]);

  readonly chosenCount = computed(() => this.chosen().length);

  /** A dossier needs at least two paintings; one is a technical sheet. */
  readonly canGenerate = computed(() => this.chosenCount() > 1);

  protected positionOf(nft: Nft): number | null {
    const index = this.chosen().findIndex((one) => one.tokenId === nft.tokenId);
    return index === -1 ? null : index + 1;
  }

  protected isSold(nft: Nft): boolean {
    return this.availability.isSold(nft.tokenId);
  }

  protected toggle(nft: Nft): void {
    this.chosen.update((current) => {
      const index = current.findIndex((one) => one.tokenId === nft.tokenId);
      if (index === -1) return [...current, nft];
      return current.filter((_, at) => at !== index);
    });
  }

  protected clear(): void {
    this.chosen.set([]);
  }

  /** Everything showing, in the order it is shown, as one click. */
  protected chooseAll(): void {
    this.chosen.set([...this.paintings()]);
  }

  protected thumbOf(nft: Nft): string {
    return nft.image?.thumbnailUrl ?? nft.image?.cachedUrl ?? '';
  }

  protected yearOf(nft: Nft): string {
    return this.artworkService.getTraitValue(nft, VALIDTRAITS.YEAR);
  }
}
