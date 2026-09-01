import { NgClass } from '@angular/common';
import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  output,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MatCard, MatCardImage } from '@angular/material/card';
import { MatChip, MatChipSet } from '@angular/material/chips';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatTooltip } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SOLDCERTIFICATES, SortMethod } from '@domain/artwork/artwork.constants';
import { Nft, NftFilters } from '@domain/artwork/artwork.entity';
import { ARTWORK_PORT } from '@domain/artwork/artwork.token';
import { AdminAuthService } from '@shared/services/admin-auth.service';
import { AvailabilityFilterService } from '@shared/services/availability-filter.service';
import { TranslatePipe } from '@ngx-translate/core';
import { PdfButtonComponent } from '@shared/components/pdf-button/pdf-button.component';
import { SORT } from '@shared/constants/order.constants';
import {
  PREFERENCE_KEYS,
  readPreference,
  writePreference,
} from '@shared/constants/preferences.constants';
import { LazyLoadDirective } from '@shared/directives/lazy-load.directive';
import { ParallaxTiltDirective } from '@shared/directives/parallax-tilt.directive';
import { ResponsiveService } from '@shared/services/responsive.service';
import { SortOrder } from '@shared/types/sort.type';
import { Observable, map, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-art-pieces-list',
  templateUrl: './art-pieces-list.component.html',
  styleUrls: ['./art-pieces-list.component.scss'],
  imports: [
    NgClass,
    MatChipSet,
    MatChip,
    MatIcon,
    MatTooltip,
    PdfButtonComponent,
    MatGridList,
    MatGridTile,
    MatCard,
    MatProgressSpinner,
    MatCardImage,
    LazyLoadDirective,
    ParallaxTiltDirective,
    TranslatePipe,
    RouterLink,
  ],
})
export class ArtPiecesListComponent {
  private artworkService = inject(ARTWORK_PORT);
  private router = inject(Router);
  private activatedroute = inject(ActivatedRoute);
  private responsiveService = inject(ResponsiveService);
  private destroyRef = inject(DestroyRef);

  public sortMethods = Object.values(SortMethod);
  // Read once: this component is rebuilt when the route changes, and a grid
  // never moves between languages without one.
  private readonly inSpanish = this.router.url === '/es' || this.router.url.startsWith('/es/');
  // Token ids whose thumbnail race has already started — guards against a
  // duplicate race if loadImgThumbUrl is ever called twice for the same
  // tile; it does NOT filter emissions, since one race legitimately keeps
  // upgrading imgThumbUrls as better sources arrive (see loadImgThumbUrl).
  private loadStarted = new Set<string>();

  numberOfCols = input<number>(!this.responsiveService.displayMobileLayout.value ? 2 : 3);
  viewAsWidget = input<boolean>(false);
  nftFilters = input<NftFilters>({});
  selectedTokenId = output<string>();

  yearParamSignal = toSignal(this.queryParamsObservable(), {
    initialValue: [],
  });
  imgThumbUrls = signal(new Map<string, string>());
  private artPieces: Signal<Nft[] | undefined> = toSignal(
    this.artworkService.getArtPiecesObservable()
  );
  public dataReady = computed(() => !!this.artPieces()?.length);

  /**
   * Which essays have been gone over by hand, and the filter over them.
   *
   * Two hundred essays were written by a model and are being corrected one at a
   * time, over months. Without a way to see which have been done, the only way
   * to find the next one is to open them until an unfamiliar one turns up.
   *
   * Only the artist ever sees this. The flag is his business and the backend
   * refuses to hand it to anybody else, so an unauthenticated visitor gets an
   * empty map and no control to go with it.
   */
  private auth = inject(AdminAuthService);
  protected readonly isArtist = computed(() => this.auth.isAdmin());
  protected readonly criticFilter = signal<'all' | 'edited' | 'untouched'>('all');

  private readonly editedByToken = toSignal(
    toObservable(computed(() => this.auth.bearerToken())).pipe(
      switchMap((token) =>
        token ? this.artworkService.getEditedCritics(token) : of(new Map<string, boolean>())
      )
    ),
    { initialValue: new Map<string, boolean>() }
  );

  /** Written out rather than translated: nobody but the artist ever reads them. */
  protected readonly criticFilters = [
    { value: 'all' as const, label: 'All' },
    { value: 'edited' as const, label: 'Edited' },
    { value: 'untouched' as const, label: 'Not yet' },
  ];

  protected setCriticFilter(value: 'all' | 'edited' | 'untouched'): void {
    this.criticFilter.set(value);
  }

  /** How many of the pieces on screen he has been over, to sit beside the control. */
  protected readonly editedCount = computed(() => {
    const edited = this.editedByToken();
    return (this.artPieces() ?? []).filter((nft) => edited.get(nft.tokenId) === true).length;
  });
  /**
   * Sold, available or both, chosen from the picker in the breadcrumb.
   *
   * Not applied to the "more from this year" grid on an artwork page. That
   * strip is a suggestion rather than the catalogue, and the section around it
   * decides whether to appear by counting every painting of the year, so
   * filtering its contents would leave a heading over an empty row.
   */
  private readonly availability = inject(AvailabilityFilterService).availability;

  private filteredArtPieces = computed(() => {
    const artPieces = this.artPieces();
    const yearsQueryParams = this.yearParamSignal();
    const yearsInput = this.nftFilters()?.years;
    // Years passed as input take precedence over the ones in the URL
    const years = yearsInput?.length ? yearsInput : (yearsQueryParams ?? []);
    const frontalViewByToken = this.frontalViewByToken();
    const wanted = this.criticFilter();
    const edited = this.editedByToken();
    const availability = this.viewAsWidget() ? 'both' : this.availability();

    return (artPieces ?? []).filter(
      (nft) =>
        !this.artworkService.isExcludedByYear(nft, years) &&
        !this.isExcludedById(nft) &&
        (frontalViewByToken.get(nft.tokenId) ?? false) &&
        // An artwork with no essay yet counts as untouched, because it is.
        (wanted === 'all' || (edited.get(nft.tokenId) === true) === (wanted === 'edited')) &&
        (availability === 'both' || this.isSold(nft) === (availability === 'sold'))
    );
  });

  /** Whether the dot has anything to mark here, and so whether to explain it. */
  protected readonly hasSoldOnDisplay = computed(() =>
    this.filteredArtPieces().some((nft) => this.isSold(nft))
  );

  // Classifies each piece against the list it belongs to (not the store),
  // recomputed whenever the list changes (fallback -> API data).
  private frontalViewByToken = computed(() => {
    const nfts = this.artPieces() ?? [];
    const byName = new Map<string, Nft[]>();
    for (const nft of nfts) {
      const group = byName.get(nft.name);
      if (group) {
        group.push(nft);
      } else {
        byName.set(nft.name, [nft]);
      }
    }
    const frontals = new Map<string, boolean>();
    for (const nft of nfts) {
      frontals.set(nft.tokenId, this.artworkService.isFrontalView(nft, byName.get(nft.name) ?? []));
    }
    return frontals;
  });
  // How the reader last had the catalogue arranged. Newest first is the
  // default, and remains the default for anyone who has never changed it.
  public activeSortMethod: WritableSignal<SortMethod> = signal(
    readPreference(PREFERENCE_KEYS.SORT_METHOD, this.sortMethods) ?? SortMethod.YEAR
  );
  public sortOrder: WritableSignal<SortOrder> = signal(
    readPreference<SortOrder>(PREFERENCE_KEYS.SORT_ORDER, [SORT.ASC, SORT.DESC]) ?? SORT.DESC
  );
  public sortedArtPieces = computed(() => {
    const sortOrder = this.sortOrder();
    const artPieces = this.filteredArtPieces();
    switch (this.activeSortMethod()) {
      case SortMethod.SIZE:
        return this.artworkService.sortBySize(artPieces!, sortOrder);
      case SortMethod.MEDIUM:
        return this.artworkService.sortByMedium(artPieces!, sortOrder);
      case SortMethod.YEAR:
        return this.artworkService.sortByYear(artPieces!, sortOrder);
    }
  });
  public selectedNfts: WritableSignal<Nft[]> = signal([]);

  public onImageVisible(tokenId: string): void {
    const nft = this.artPieces()?.find((p) => p.tokenId === tokenId);
    if (nft) this.loadImgThumbUrl(nft);
  }

  // Races every cheap preview source for this artwork (backend thumbnail,
  // the NFT's own thumbnailUrl/cachedUrl) and renders whichever arrives
  // first; later, higher-quality arrivals replace it in imgThumbUrls, same
  // cascade the single-artwork viewer already uses for its own preview.
  public loadImgThumbUrl(nft: Nft): void {
    if (this.loadStarted.has(nft.tokenId)) return;
    this.loadStarted.add(nft.tokenId);

    this.artworkService
      .getProgressiveImageUrls(nft)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((url) => {
        this.imgThumbUrls.update((map) => {
          const newMap = new Map(map);
          newMap.set(nft.tokenId, url);
          return newMap;
        });
      });
  }

  public toggleNftSelection(event: MouseEvent, nft: Nft): void {
    event.preventDefault();
    const currentSelection = this.selectedNfts();
    const index = currentSelection.findIndex((selected) => selected.tokenId === nft.tokenId);

    if (index === -1) {
      this.selectedNfts.set([...currentSelection, nft]);
    } else {
      const updatedSelection = [...currentSelection];
      updatedSelection.splice(index, 1);
      this.selectedNfts.set(updatedSelection);
    }
  }

  public isSelected(nft: Nft): boolean {
    return this.selectedNfts().some((selected) => selected.tokenId === nft.tokenId);
  }

  public isSold(nft: Nft): boolean {
    return SOLDCERTIFICATES.includes(nft.tokenId);
  }

  public getOrderNumber(nft: Nft): number | null {
    const index = this.selectedNfts().findIndex((selected) => selected.tokenId === nft.tokenId);
    return index !== -1 ? index + 1 : null;
  }

  public toggleSortOrder(): void {
    this.sortOrder.set(this.sortOrder() === SORT.ASC ? SORT.DESC : SORT.ASC);
    this.remember(PREFERENCE_KEYS.SORT_ORDER, this.sortOrder());
  }

  public changeSortMethod(method: string): void {
    if (this.activeSortMethod() === (method as SortMethod)) {
      this.toggleSortOrder();
    } else {
      this.activeSortMethod.set(method as SortMethod);
      this.sortOrder.set(SORT.ASC);
      this.remember(PREFERENCE_KEYS.SORT_METHOD, method);
      this.remember(PREFERENCE_KEYS.SORT_ORDER, SORT.ASC);
    }
  }

  /**
   * Only the catalogue's own controls write anything down.
   *
   * The same component renders the "more from this year" grid on an artwork
   * page, which has no controls — but it does share these signals, and a
   * widget quietly rewriting the reader's catalogue preferences would be a
   * surprise from a grid they never touched.
   */
  private remember(key: string, value: string): void {
    if (!this.viewAsWidget()) writePreference(key, value);
  }

  // Navigation is the anchor's job now; this only tells whoever is listening
  // which piece was picked.
  public handleArtPieceClick(tokenId: string) {
    this.selectedTokenId.emit(tokenId);
  }

  // Keeps the reader in the language they are reading: from /es/artworks a
  // tile leads to /es/artwork/5, not to the English page.
  public artworkLink(tokenId: string): string[] {
    return this.inSpanish ? ['/es', 'artwork', tokenId] : ['/artwork', tokenId];
  }

  public methodTracking(method: SortMethod) {
    return method;
  }

  // Only the first screenful of tiles gets the entrance animation. Angular's
  // animate.enter has real per-element setup cost, and applying it to a full
  // catalog (100+ pieces) measurably blocked the main thread for over a
  // second on load — tiles that far down are off-screen anyway, so skipping
  // them there is free.
  private static readonly MAX_ANIMATED_TILES = 20;
  private static readonly TILE_DELAY_STEP_MS = 30;

  public tileEnterClass(index: number): string {
    return index < ArtPiecesListComponent.MAX_ANIMATED_TILES ? 'tile-enter' : '';
  }

  public tileEnterDelay(index: number): number {
    return (
      Math.min(index, ArtPiecesListComponent.MAX_ANIMATED_TILES) *
      ArtPiecesListComponent.TILE_DELAY_STEP_MS
    );
  }

  private queryParamsObservable(): Observable<string[]> {
    return this.activatedroute.queryParamMap.pipe(
      map((params) => {
        const yearValues = params.get('years');
        return yearValues ? yearValues.split(',') : [];
      })
    );
  }

  private isExcludedById(nft: Nft): boolean {
    if (this.nftFilters()?.idsToExclude?.length) {
      return this.nftFilters().idsToExclude!.includes(nft.tokenId);
    } else {
      return false;
    }
  }
}
