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
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
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
import { TranslatePipe } from '@ngx-translate/core';
import { PdfButtonComponent } from '@shared/components/pdf-button/pdf-button.component';
import { SORT } from '@shared/constants/order.constants';
import { LazyLoadDirective } from '@shared/directives/lazy-load.directive';
import { ParallaxTiltDirective } from '@shared/directives/parallax-tilt.directive';
import { ResponsiveService } from '@shared/services/responsive.service';
import { SortOrder } from '@shared/types/sort.type';
import { map, Observable } from 'rxjs';

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
  private readonly inSpanish =
    this.router.url === '/es' || this.router.url.startsWith('/es/');
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
  private filteredArtPieces = computed(() => {
    const artPieces = this.artPieces();
    const yearsQueryParams = this.yearParamSignal();
    const yearsInput = this.nftFilters()?.years;
    // Years passed as input take precedence over the ones in the URL
    const years = yearsInput?.length ? yearsInput : (yearsQueryParams ?? []);
    const frontalViewByToken = this.frontalViewByToken();
    return (artPieces ?? []).filter(
      (nft) =>
        !this.artworkService.isExcludedByYear(nft, years) &&
        !this.isExcludedById(nft) &&
        (frontalViewByToken.get(nft.tokenId) ?? false)
    );
  });
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
  public activeSortMethod: WritableSignal<SortMethod> = signal(SortMethod.YEAR);
  public sortOrder: WritableSignal<SortOrder> = signal(SORT.DESC);
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
  }

  public changeSortMethod(method: string): void {
    if (this.activeSortMethod() === (method as SortMethod)) {
      this.toggleSortOrder();
    } else {
      this.activeSortMethod.set(method as SortMethod);
      this.sortOrder.set(SORT.ASC);
    }
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
