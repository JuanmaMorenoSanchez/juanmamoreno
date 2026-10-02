import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { VALIDTRAITS } from '@domain/artwork/artwork.constants';
import { Nft } from '@domain/artwork/artwork.entity';
import { ARTWORK_PORT } from '@domain/artwork/artwork.token';
import { PdfButtonComponent } from '@shared/components/pdf-button/pdf-button.component';
import { AvailabilityService } from '@shared/services/availability.service';
import { PostedArtworksService } from '@shared/services/posted-artworks.service';
import { firstValueFrom } from 'rxjs';
import { CertificatePanelComponent } from './certificate-panel.component';
import { DerivedAssetsComponent } from './derived-assets.component';
import { NetworkIconComponent } from './network-icon.component';
import { NETWORKS } from './networks';

/** How the list is arranged. */
type Order = 'newest' | 'posted';

/**
 * The catalogue, as the artist sees it.
 *
 * One page where there were three — what had lately gone to Instagram, the
 * certificates that could be corrected, and the paintings a dossier was built
 * from. All three were the same list of paintings wearing different clothes,
 * each re-implementing "show me the catalogue" slightly differently, and
 * choosing between them meant knowing in advance which of the three things you
 * wanted to do to a painting you had not found yet.
 *
 * So: one list, and everything that can be done to a painting is on its row.
 * Clicking the row opens what is known about it and what may be done to its
 * certificate; the button on the right adds it to a dossier, in one click,
 * because choosing twenty out of a hundred and sixty-seven is the one thing
 * here that is done in bulk.
 */
@Component({
  selector: 'app-catalogue-admin',
  templateUrl: './catalogue-admin.component.html',
  styleUrl: './catalogue-admin.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    PdfButtonComponent,
    CertificatePanelComponent,
    DerivedAssetsComponent,
    NetworkIconComponent,
  ],
})
export class CatalogueAdminComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly artworkService = inject(ARTWORK_PORT);
  private readonly availability = inject(AvailabilityService);

  protected readonly validTraits = VALIDTRAITS;

  private readonly all = toSignal(this.artworkService.getArtPiecesObservable(), {
    initialValue: [] as Nft[],
  });

  private readonly posts = inject(PostedArtworksService);

  /** Undefined until the api has answered, and if it never does. */
  private readonly posted = toSignal(this.posts.getLatest(60));

  /**
   * Which networks each painting has been on, asked of the whole collection.
   *
   * A plain signal filled by a subscription rather than anything derived:
   * it has to be re-asked after a post is forgotten, and that is a thing that
   * happens rather than a thing to compute. An empty answer is the api not
   * answering — a list with no marks is a smaller wrong than one that will not
   * draw.
   */
  private readonly networks = signal<Record<string, string[]>>({});

  constructor() {
    this.askNetworks();
  }

  private askNetworks(): void {
    this.posts
      .getNetworks()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((on) => this.networks.set(on));
  }

  /**
   * The marks a row wears, in a fixed order so the row does not reshuffle.
   *
   * Instagram's feed and its reels are separate on purpose: they are two
   * different things to have done with a painting, and one mark for both meant
   * the studio could not tell them apart.
   */
  protected readonly allNetworks = NETWORKS;

  protected onNetwork(nft: Nft, network: string): boolean {
    return (this.networks()[nft.tokenId] ?? []).includes(network);
  }

  protected networksOf(nft: Nft): string[] {
    const on = this.networks()[nft.tokenId] ?? [];
    return NETWORKS.filter((network) => on.includes(network.id)).map((network) => network.id);
  }

  protected readonly forgetting = signal<string | null>(null);

  /**
   * Forgets a post that no longer exists, and asks again.
   *
   * Confirmed first: it puts the painting back in that network's queue, so the
   * nightly run will post it again — which is right for a post that was
   * deleted and wrong for one that is still up.
   */
  protected async forget(nft: Nft, network: string): Promise<void> {
    const name = NETWORKS.find((one) => one.id === network)?.label ?? network;
    if (
      !confirm(
        `Forget that "${nft.name}" went to ${name}?

` +
          'Nothing is deleted on the network itself — this removes the record that it went ' +
          'out, which puts the painting back in that queue and it will be posted again.'
      )
    ) {
      return;
    }

    this.forgetting.set(`${nft.tokenId}:${network}`);
    try {
      await firstValueFrom(this.posts.forgetPost(nft.tokenId, network));
      this.askNetworks();
    } finally {
      this.forgetting.set(null);
    }
  }

  protected isForgetting(nft: Nft, network: string): boolean {
    return this.forgetting() === `${nft.tokenId}:${network}`;
  }

  protected readonly term = signal('');
  protected readonly order = signal<Order>('newest');

  /** Where each painting sits in what has been posted, and where it can be seen. */
  private readonly postedIndex = computed(() => {
    const index = new Map<string, { at: number; permalink: string | null }>();
    (this.posted() ?? []).forEach((entry, at) => {
      if (!index.has(entry.tokenId)) index.set(entry.tokenId, { at, permalink: entry.permalink });
    });
    return index;
  });

  /**
   * Whether to say that nothing has been posted.
   *
   * Only when that is what was actually answered. A request that failed is not
   * an empty account, and answering the two the same way would put a claim that
   * nothing has gone out over a page that had a dozen.
   */
  protected readonly nothingPosted = computed(() => this.posted()?.length === 0);

  /**
   * One row per **token**, not per painting.
   *
   * A painting photographed three times has three certificates, and the one
   * with the wrong measurements need not be the one the catalogue shows.
   */
  protected readonly rows = computed<Nft[]>(() => {
    const term = this.term().trim().toLowerCase();
    const posted = this.postedIndex();

    const found = this.all().filter(
      (nft) =>
        !term ||
        String(nft.tokenId) === term ||
        (nft.name ?? '').toLowerCase().includes(term) ||
        this.trait(nft, VALIDTRAITS.YEAR).includes(term)
    );

    if (this.order() === 'posted') {
      // What has been on Instagram, in the order it went out, and everything
      // else after it. Never dropped from the list: a painting that has not
      // been posted is the interesting one when deciding what to post next.
      return [...found].sort((a, b) => {
        const left = posted.get(a.tokenId)?.at ?? Number.MAX_SAFE_INTEGER;
        const right = posted.get(b.tokenId)?.at ?? Number.MAX_SAFE_INTEGER;
        return left - right || Number(b.tokenId) - Number(a.tokenId);
      });
    }

    return [...found].sort(
      (a, b) =>
        Number(this.trait(b, VALIDTRAITS.YEAR)) - Number(this.trait(a, VALIDTRAITS.YEAR)) ||
        Number(b.tokenId) - Number(a.tokenId)
    );
  });

  protected readonly opened = signal<string | null>(null);

  /** The chosen paintings, in the order they were chosen. */
  protected readonly chosen = signal<Nft[]>([]);
  protected readonly chosenCount = computed(() => this.chosen().length);

  /** A dossier needs at least two paintings; one is a technical sheet. */
  protected readonly canGenerate = computed(() => this.chosenCount() > 1);

  protected trait(nft: Nft, key: VALIDTRAITS): string {
    return this.artworkService.getTraitValue(nft, key);
  }

  protected thumbOf(nft: Nft): string {
    return this.artworkService.getNftOptimalUrl(nft.image);
  }

  protected isSold(nft: Nft): boolean {
    return this.availability.isSold(nft.tokenId);
  }

  protected permalinkOf(nft: Nft): string | null {
    return this.postedIndex().get(nft.tokenId)?.permalink ?? null;
  }

  protected wasPosted(nft: Nft): boolean {
    return this.postedIndex().has(nft.tokenId);
  }

  protected positionOf(nft: Nft): number | null {
    const index = this.chosen().findIndex((one) => one.tokenId === nft.tokenId);
    return index === -1 ? null : index + 1;
  }

  protected search(event: Event): void {
    this.term.set((event.target as HTMLInputElement).value);
  }

  protected arrange(order: Order): void {
    this.order.set(order);
  }

  protected toggleOpen(nft: Nft): void {
    this.opened.update((open) => (open === nft.tokenId ? null : nft.tokenId));
  }

  protected toggleChosen(nft: Nft): void {
    this.chosen.update((current) => {
      const index = current.findIndex((one) => one.tokenId === nft.tokenId);
      if (index === -1) return [...current, nft];
      return current.filter((_, at) => at !== index);
    });
  }

  protected clear(): void {
    this.chosen.set([]);
  }

  /** Everything showing, in the order it is showing. */
  protected chooseAll(): void {
    this.chosen.set([...this.rows()]);
  }
}
