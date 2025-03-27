import { AsyncPipe, NgClass } from '@angular/common';
import { Component, computed, inject, input, OnInit, output, signal, Signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCard, MatCardImage } from '@angular/material/card';
import { MatChip, MatChipListbox } from '@angular/material/chips';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { SortMethod, VALIDTRAITS } from '@domain/artwork/artwork.constants';
import { Nft, NftFilters } from '@domain/artwork/artwork.entity';
import { ArtworkService } from '@domain/artwork/artwork.service';
import { ArtworkInfraService } from '@infrastructure/artwork/artwork.service';
import { PdfButtonComponent } from '@shared/components/pdf-button/pdf-button.component';
import { LazyLoadDirective } from '@shared/directives/lazy-load.directive';
import { ResponsiveService } from '@shared/services/responsive.service';
import { SessionQuery } from '@shared/store/session.query';
import { distinctUntilChanged, Observable } from 'rxjs';

type SortOrder = 'asc' | 'desc';

@Component({
    selector: 'app-art-pieces-list',
    templateUrl: './art-pieces-list.component.html',
    styleUrls: ['./art-pieces-list.component.scss'],
    imports: [NgClass, MatChipListbox, MatChip, MatIcon, PdfButtonComponent, MatGridList, MatGridTile, MatCard, MatProgressSpinner, MatCardImage, LazyLoadDirective, AsyncPipe],
})
export class ArtPiecesListComponent implements OnInit {
  private artworkDomainService = inject(ArtworkService);
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
  
  public artPieces: Signal<Nft[] | undefined>;
  public dataReady = computed(() => this.artPieces()?.length ? true : false);
  public activeSortMethod: WritableSignal<SortMethod> = signal(SortMethod.YEAR);
  public sortOrder: WritableSignal<SortOrder> = signal('desc')
  public sortedArtPieces = computed(() => {
    switch (this.activeSortMethod()) {
      case SortMethod.SIZE:
        return this.artworkDomainService.sortBySize(this.artPieces()!, this.sortOrder())
      case SortMethod.MEDIUM:
        return this.artworkDomainService.sortByMedium(this.artPieces()!, this.sortOrder())
      case SortMethod.YEAR:
        return this.artworkDomainService.sortByYear(this.artPieces()!, this.sortOrder())
    }
  });
  public visibleImages = new Set<string>();
  public selectedNfts: WritableSignal<Nft[]> = signal([]);

  constructor( ) {
    this.artPieces = toSignal(this.artworkInfraService.getLocalArtPiecesObservable())
  }

  ngOnInit(): void {
    this.listenYearParamChange();
  }

  public onImageVisible(tokenId: string): void {
    this.visibleImages.add(tokenId);
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
    this.sortOrder.set(this.sortOrder() === 'asc' ? 'desc' : 'asc');
  }

  public changeSortMethod(method: string): void {
    if (this.activeSortMethod() === method as SortMethod) {
      this.toggleSortOrder();
    } else {
      this.activeSortMethod.set(method as SortMethod);
      this.sortOrder.set('asc');
    }
  }

  public displayPiece(nft: Nft): boolean {
    const sameFrontalArtworks = this.artworkDomainService.getArtByTitle(nft.name, this.sessionQuery.selectArtPieces);
    return !this.isExcludedByYear(nft) && !this.isExcludedById(nft) && this.artworkDomainService.isFrontalView(nft, sameFrontalArtworks);
  }

  public getImgThumbUrl(nft: Nft): Observable<string> {
    return this.artworkInfraService.getAvailableOptimalUrl(nft).pipe(distinctUntilChanged());
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
        nft.raw.metadata!['attributes'].some((attr: any) => 
          attr['trait_type'] === VALIDTRAITS.YEAR && attr['value'] === year
        )
      );
    } else {
      return false;
    }
  }
}
