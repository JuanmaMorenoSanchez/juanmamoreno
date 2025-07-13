import { NgClass } from '@angular/common';
import {
  Component,
  computed,
  inject,
  input,
  output,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
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
import { ResponsiveService } from '@shared/services/responsive.service';
import { SessionQuery } from '@shared/store/session.query';
import { SortOrder } from '@shared/types/sort.type';
import { map, take } from 'rxjs';

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
    TranslatePipe,
  ],
})
export class ArtPiecesListComponent {
  private artworkService = inject(ARTWORK_PORT);
  private router = inject(Router);
  private activatedroute = inject(ActivatedRoute);
  private responsiveService = inject(ResponsiveService);
  private sessionQuery = inject(SessionQuery);

  numberOfCols = input<number>(
    !this.responsiveService.displayMobileLayout.value ? 2 : 3
  );
  viewAsWidget = input<boolean>(false);
  selectedTokenId = output<string>();

  public sortMethods = Object.values(SortMethod);
  public yearParamSignal = toSignal(
    this.activatedroute.queryParamMap.pipe(
      map((params) => {
        const yearValues = params.get('years');
        return yearValues ? yearValues.split(',') : [];
      })
    ),
    { initialValue: [] }
  );
  public nftFilters = input<NftFilters>({});

  public artPieces: Signal<Nft[] | undefined> = toSignal(
    this.artworkService.getArtPiecesObservable()
  );
  public dataReady = computed(() => (this.artPieces()?.length ? true : false));
  public activeSortMethod: WritableSignal<SortMethod> = signal(SortMethod.YEAR);
  public sortOrder: WritableSignal<SortOrder> = signal(SORT.DESC);
  public sortedArtPieces = computed(() => {
    switch (this.activeSortMethod()) {
      case SortMethod.SIZE:
        return this.artworkService.sortBySize(
          this.artPieces()!,
          this.sortOrder()
        );
      case SortMethod.MEDIUM:
        return this.artworkService.sortByMedium(
          this.artPieces()!,
          this.sortOrder()
        );
      case SortMethod.YEAR:
        return this.artworkService.sortByYear(
          this.artPieces()!,
          this.sortOrder()
        );
    }
  });

  public visibleArtPieces = computed(() => {
    const sortedArtPieces = this.sortedArtPieces();
    const yearsQeryParams = this.yearParamSignal();
    const yearsInput = this.nftFilters()?.years;
    return (sortedArtPieces ?? []).filter(
      (nft) =>
        !this.artworkService.isExcludedByYear(
          nft,
          yearsInput?.length ? yearsInput : yearsQeryParams
        ) &&
        !this.isExcludedById(nft) &&
        this.isMemoizedFrontalView(nft)
    );
  });

  public displayedImages = new Set<string>();
  public imgThumbUrls = signal(new Map<string, string>());
  public selectedNfts: WritableSignal<Nft[]> = signal([]);

  private frontalViewMap = new Map<string, boolean>();

  public onImageVisible(tokenId: string): void {
    this.displayedImages.add(tokenId);
    const nft = this.artPieces()?.find((p) => p.tokenId === tokenId);
    if (nft) this.loadImgThumbUrl(nft);
  }

  public loadImgThumbUrl(nft: Nft): void {
    if (!this.imgThumbUrls().has(nft.tokenId)) {
      this.artworkService
        .getAvailableOptimalUrl(nft)
        .pipe(take(1))
        .subscribe((url) => {
          this.imgThumbUrls.update((map) => {
            const newMap = new Map(map);
            newMap.set(nft.tokenId, url);
            return newMap;
          });
        });
    }
  }

  public toggleNftSelection(event: MouseEvent, nft: Nft): void {
    event.preventDefault();
    const currentSelection = this.selectedNfts();
    const index = currentSelection.findIndex(
      (selected) => selected.tokenId === nft.tokenId
    );

    if (index === -1) {
      this.selectedNfts.set([...currentSelection, nft]);
    } else {
      const updatedSelection = [...currentSelection];
      updatedSelection.splice(index, 1);
      this.selectedNfts.set(updatedSelection);
    }
  }

  public isSelected(nft: Nft): boolean {
    return this.selectedNfts().some(
      (selected) => selected.tokenId === nft.tokenId
    );
  }

  public getOrderNumber(nft: Nft): number | null {
    const index = this.selectedNfts().findIndex(
      (selected) => selected.tokenId === nft.tokenId
    );
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

  private isMemoizedFrontalView(nft: Nft): boolean {
    if (this.frontalViewMap.has(nft.tokenId)) {
      return this.frontalViewMap.get(nft.tokenId) || false;
    } else {
      const sameFrontalArtworks = this.artworkService.getArtByTitle(
        nft.name,
        this.sessionQuery.selectArtPieces
      );
      const result = this.artworkService.isFrontalView(
        nft,
        sameFrontalArtworks
      );
      this.frontalViewMap.set(nft.tokenId, result);
      return result;
    }
  }

  private isExcludedById(nft: Nft): boolean {
    if (this.nftFilters()?.idsToExclude?.length) {
      return this.nftFilters().idsToExclude!.includes(nft.tokenId);
    } else {
      return false;
    }
  }
}
