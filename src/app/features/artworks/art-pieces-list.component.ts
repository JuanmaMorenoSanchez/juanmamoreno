import { NgClass } from '@angular/common';
import { Component, computed, inject, input, OnInit, output, signal, Signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCard, MatCardImage } from '@angular/material/card';
import { MatChip, MatChipListbox } from '@angular/material/chips';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatTooltip } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtworkDomain } from '@domain/artwork/artwork';
import { SortMethod, VALIDTRAITS } from '@domain/artwork/artwork.constants';
import { Nft, NftFilters } from '@domain/artwork/artwork.entity';
import { ArtworkInfraService } from '@features/artwork/artwork.service';
import { PdfButtonComponent } from '@shared/components/pdf-button/pdf-button.component';
import { SORT } from '@shared/constants/order.constants';
import { LazyLoadDirective } from '@shared/directives/lazy-load.directive';
import { ResponsiveService } from '@shared/services/responsive.service';
import { SessionQuery } from '@shared/store/session.query';
import { SortOrder } from '@shared/types/sort.type';
import { distinctUntilChanged, take } from 'rxjs';

@Component({
    selector: 'app-art-pieces-list',
    templateUrl: './art-pieces-list.component.html',
    styleUrls: ['./art-pieces-list.component.scss'],
    imports: [NgClass, MatChipListbox, MatChip, MatIcon, MatTooltip, PdfButtonComponent, MatGridList, MatGridTile, MatCard, MatProgressSpinner, MatCardImage, LazyLoadDirective],
})
export class ArtPiecesListComponent implements OnInit {
  private artworkInfraService = inject(ArtworkInfraService);
  private router = inject(Router);
  private activatedroute = inject(ActivatedRoute);
  private responsiveService = inject(ResponsiveService);
  private sessionQuery = inject(SessionQuery);
  
  numberOfCols = input<number>(!this.responsiveService.displayMobileLayout.value ? 2 : 3);
  viewAsWidget = input<boolean>(false);
  nftFilters = input<NftFilters>({});
  selectedTokenId = output<string>()

  public sortMethods = Object.values(SortMethod);
  
  public artPieces: Signal<Nft[] | undefined> = toSignal(this.artworkInfraService.getArtPiecesObservable());
  public dataReady = computed(() => this.artPieces()?.length ? true : false);
  public activeSortMethod: WritableSignal<SortMethod> = signal(SortMethod.YEAR);
  public sortOrder: WritableSignal<SortOrder> = signal(SORT.DESC)
  public sortedArtPieces = computed(() => {
    switch (this.activeSortMethod()) {
      case SortMethod.SIZE:
        return ArtworkDomain.sortBySize(this.artPieces()!, this.sortOrder())
      case SortMethod.MEDIUM:
        return ArtworkDomain.sortByMedium(this.artPieces()!, this.sortOrder())
      case SortMethod.YEAR:
        return ArtworkDomain.sortByYear(this.artPieces()!, this.sortOrder())
    }
  });
  public visibleImages = new Set<string>();
  public imgThumbUrls = signal(new Map<string, string>());
  public selectedNfts: WritableSignal<Nft[]> = signal([]);

  private frontalViewMap = new Map<string, boolean>();



  ngOnInit(): void {
    this.listenYearParamChange();
  }

  public onImageVisible(tokenId: string): void {
    this.visibleImages.add(tokenId);
    const nft = this.artPieces()?.find(p => p.tokenId === tokenId);
    if (nft) this.loadImgThumbUrl(nft);
  }

  public loadImgThumbUrl(nft: Nft): void {
    if (!this.imgThumbUrls().has(nft.tokenId)){
      this.artworkInfraService.getAvailableOptimalUrl(nft).pipe(
        take(1)
      ).subscribe(url => {
        this.imgThumbUrls.update(map => {
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
    const index = currentSelection.findIndex(selected => selected.tokenId === nft.tokenId);
  
    if (index === -1) {
      this.selectedNfts.set([...currentSelection, nft]);
    } else {
      const updatedSelection = [...currentSelection];
      updatedSelection.splice(index, 1);
      this.selectedNfts.set(updatedSelection);
    }
  }

  public isSelected(nft: Nft): boolean {
    return this.selectedNfts().some(selected => selected.tokenId === nft.tokenId);
  }
  
  public getOrderNumber(nft: Nft): number | null {
    const index = this.selectedNfts().findIndex(selected => selected.tokenId === nft.tokenId);
    return index !== -1 ? index + 1 : null;
  }

  public toggleSortOrder(): void {
    this.sortOrder.set(this.sortOrder() === SORT.ASC ? SORT.DESC : SORT.ASC);
  }

  public changeSortMethod(method: string): void {
    if (this.activeSortMethod() === method as SortMethod) {
      this.toggleSortOrder();
    } else {
      this.activeSortMethod.set(method as SortMethod);
      this.sortOrder.set(SORT.ASC);
    }
  }

  public displayPiece(nft: Nft): boolean {
    return !this.isExcludedByYear(nft) && !this.isExcludedById(nft) && this.isMemoizedFrontalView(nft);
  }


  public handleArtPieceClick(tokenId: string) {
    this.selectedTokenId.emit(tokenId);
    this.router.navigate(['/artwork', tokenId ]);
  }

  public listTracking(index: number, value: Nft) {
    return value
  }

  public methodTracking(method: SortMethod) {
    return method
  }

  private isMemoizedFrontalView(nft: Nft): boolean {
    if (this.frontalViewMap.has(nft.tokenId)) {
      return this.frontalViewMap.get(nft.tokenId) || false;
    } else {
      const sameFrontalArtworks = ArtworkDomain.getArtByTitle(nft.name, this.sessionQuery.selectArtPieces);
      const result = ArtworkDomain.isFrontalView(nft, sameFrontalArtworks);
      this.frontalViewMap.set(nft.tokenId, result);
      return result;
    }
  }
  

  private listenYearParamChange(): void {
    this.router.events.pipe(
      distinctUntilChanged()
    ).subscribe(() => {
      if (this.activatedroute.firstChild) { // is on list page. Not ideal. Refactor maybe
        const yearValues = this.activatedroute.firstChild.snapshot.queryParamMap.get('years')!;
        this.nftFilters().years = yearValues ? yearValues.split(',') : [];
      } else if (!this.activatedroute.snapshot.paramMap.get('id')) { // not on single view
        const yearValues = this.activatedroute.snapshot.queryParamMap.get('years')!;
        this.nftFilters().years = yearValues ? yearValues.split(',') : [];
      }
    })
  }

  private isExcludedById(nft: Nft): boolean {
    if (this.nftFilters()?.idsToExclude?.length) {
      return this.nftFilters().idsToExclude!.includes(nft.tokenId)
    } else {
      return false;
    }
  }

  private isExcludedByYear(nft: Nft): boolean {
    if (this.nftFilters().years?.length) {
      return !this.nftFilters().years!.some(year =>
        nft.raw.metadata!['attributes']?.some((attr: any) => 
          attr['trait_type'] === VALIDTRAITS.YEAR && attr['value'] === year
        )
      );
    } else {
      return false;
    }
  }
}
