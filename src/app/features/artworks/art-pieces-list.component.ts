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
import { MatChip, MatChipListbox } from '@angular/material/chips';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatTooltip } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { SortMethod } from '@domain/artwork/artwork.constants';
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
    MatChipListbox,
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
  ],
})
export class ArtPiecesListComponent {
  private artworkService = inject(ARTWORK_PORT);
  private router = inject(Router);
  private activatedroute = inject(ActivatedRoute);
  private responsiveService = inject(ResponsiveService);
  private destroyRef = inject(DestroyRef);

  public loadedImages = new Set<string>();
  public sortMethods = Object.values(SortMethod);
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

  public onImageLoaded(tokenId: string): void {
    this.loadedImages.add(tokenId);
  }

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

  public handleArtPieceClick(tokenId: string) {
    this.selectedTokenId.emit(tokenId);
    this.router.navigate(['/artwork', tokenId]);
  }

  public listTracking(index: number, value: Nft) {
    return value;
  }

  public methodTracking(method: SortMethod) {
    return method;
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
