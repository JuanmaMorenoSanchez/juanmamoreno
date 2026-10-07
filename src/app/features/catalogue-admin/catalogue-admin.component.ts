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
import { ActivityApiService } from '@features/activity/activity.service';
import { AdminAuthService } from '@shared/services/admin-auth.service';
import { CertificatePanelComponent } from './certificate-panel.component';
import { NetworkIconComponent } from './network-icon.component';
import { NETWORKS } from './networks';

/** How the list is arranged. */
/**
 * How the list is arranged.
 *
 * The two that end in a metric are what Instagram said, and they are the two it
 * actually answers with. There was a third, by average watch time, which never
 * worked and could not have: what goes out nightly is a carousel of
 * photographs, and a photograph has no watch time. Instagram refuses the reel
 * metrics for it and answers with the basic set, so the ordering had no number
 * to read on any of the fifty posts it was offered.
 */
type Order = 'year' | 'posted' | 'reach' | 'liked';

/**
 * What each ordering reads, as a number where **bigger means more** — the
 * newest year, the most recent post, the largest metric. That one convention is
 * what lets a single comparator serve every button and lets "descending" mean
 * the same thing on all of them.
 */
const ORDER_LABELS: Record<Order, { more: string; less: string }> = {
  year: { more: 'Newest first', less: 'Oldest first' },
  posted: { more: 'Recently posted', less: 'Posted longest ago' },
  reach: { more: 'Reached most', less: 'Reached least' },
  liked: { more: 'Most interactions', less: 'Least interactions' },
};

/** Which stored metric each ordering reads. Instagram's own names. */
const METRIC_OF: Partial<Record<Order, string>> = {
  reach: 'reach',
};

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
  protected readonly order = signal<Order>('year');

  /**
   * Which way the chosen ordering points. Pressing the button that is already
   * on turns it round rather than doing nothing, which is the only press that
   * had no answer before.
   */
  protected readonly descending = signal(true);

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
  /**
   * What each painting has done on Instagram, as the nightly work last read it.
   *
   * Undefined until it answers, so "no numbers yet" and "could not ask" stay
   * different things on a page where both look like an empty column.
   */
  private readonly insights = toSignal(
    inject(ActivityApiService).insights(inject(AdminAuthService).bearerToken() ?? ''),
    { initialValue: undefined }
  );

  /** By painting, for the row to read without searching a list each time. */
  protected readonly metrics = computed(() => {
    const byToken = new Map<string, Record<string, number>>();
    for (const insight of this.insights() ?? []) byToken.set(insight.tokenId, insight.metrics);
    return byToken;
  });

  /** One metric of one painting, or nothing — which is not zero. */
  protected metric(nft: Nft, name: string): number | undefined {
    return this.metrics().get(nft.tokenId)?.[name];
  }

  /**
   * What a painting's post provoked, added up.
   *
   * `total_interactions` is a reel metric and Instagram never returns it for a
   * carousel of photographs — it was stored on none of the fifty posts, so the
   * ordering that read it did nothing. These four are what it does return, and
   * their sum is the same quantity by its own definition.
   */
  protected interactions(nft: Nft): number | undefined {
    const metrics = this.metrics().get(nft.tokenId);
    if (!metrics) return undefined;

    const parts = ['likes', 'comments', 'shares', 'saved']
      .map((name) => metrics[name])
      .filter((value): value is number => typeof value === 'number');

    return parts.length ? parts.reduce((all, one) => all + one, 0) : undefined;
  }

  protected readonly rows = computed<Nft[]>(() => {
    const term = this.term().trim().toLowerCase();

    const found = this.all().filter(
      (nft) =>
        !term ||
        String(nft.tokenId) === term ||
        (nft.name ?? '').toLowerCase().includes(term) ||
        this.trait(nft, VALIDTRAITS.YEAR).includes(term)
    );

    return this.inOrder(found, this.order(), this.descending());
  });

  /**
   * One painting's standing under one ordering, as a number where bigger means
   * more, or nothing at all when there is no answer.
   *
   * Nothing is not nought. A painting that was never posted has no reach, and a
   * painting posted and ignored has a reach of nought; ranking them together
   * would turn an absence into a verdict.
   */
  private standing(nft: Nft, order: Order): number | undefined {
    if (order === 'year') {
      const year = Number(this.trait(nft, VALIDTRAITS.YEAR));
      return Number.isFinite(year) ? year : undefined;
    }

    if (order === 'posted') {
      // The list arrives newest first, so a low index is a recent post: negated
      // so that bigger means more recent, like every other ordering here.
      const at = this.postedIndex().get(nft.tokenId)?.at;
      return at === undefined ? undefined : -at;
    }

    if (order === 'liked') return this.interactions(nft);

    const metric = METRIC_OF[order];
    return metric ? this.metrics().get(nft.tokenId)?.[metric] : undefined;
  }

  /**
   * The rows arranged, whichever way round, with what has no answer at the end.
   *
   * The end, in both directions. Turning the order round must not bring the
   * never-posted to the front: "least reached" is a statement about paintings
   * that were posted, and a painting that was never posted is not the least
   * reached of them — it is not in the running at all.
   */
  private inOrder(rows: Nft[], order: Order, descending: boolean): Nft[] {
    return [...rows].sort((a, b) => {
      const left = this.standing(a, order);
      const right = this.standing(b, order);

      if (left === undefined && right === undefined) return Number(b.tokenId) - Number(a.tokenId);
      if (left === undefined) return 1;
      if (right === undefined) return -1;

      const between = descending ? right - left : left - right;
      return between || Number(b.tokenId) - Number(a.tokenId);
    });
  }

  /** What a button says: where it points now, or where it would point. */
  protected label(order: Order): string {
    const descending = this.order() === order ? this.descending() : true;
    return descending ? ORDER_LABELS[order].more : ORDER_LABELS[order].less;
  }

  /** Whether anything at all has numbers, so the controls can say why not. */
  protected readonly noNumbers = computed(() => this.metrics().size === 0);
  protected readonly numbersUnknown = computed(() => this.insights() === undefined);

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
    if (this.order() === order) {
      this.descending.update((was) => !was);
      return;
    }
    // A new ordering starts at its "most" end, which is what the button says
    // before it is pressed.
    this.order.set(order);
    this.descending.set(true);
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
