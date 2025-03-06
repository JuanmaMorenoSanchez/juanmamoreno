import { Component, computed, inject, input, OnInit, output, signal, Signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SortMethod, VALIDTRAITS } from '@constants/nft.constants';
import { NftFilters } from '@models/nfts.models';
import { NftsService } from '@services/nfts.service';
import { ResponsiveService } from '@services/responsive.service';
import { SessionQuery } from '@store/session.query';
import { Nft } from 'alchemy-sdk';
import { distinctUntilChanged, Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgClass, AsyncPipe } from '@angular/common';
import { MatChipListbox, MatChip } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import { PdfButtonComponent } from '../pdf-button/pdf-button.component';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatCard, MatCardImage } from '@angular/material/card';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { LazyLoadDirective } from '../../directives/lazy-load.directive';

type SortOrder = 'asc' | 'desc';

@Component({
    selector: 'app-art-pieces-list',
    templateUrl: './art-pieces-list.component.html',
    styleUrls: ['./art-pieces-list.component.scss'],
    imports: [NgClass, MatChipListbox, MatChip, MatIcon, PdfButtonComponent, MatGridList, MatGridTile, MatCard, MatProgressSpinner, MatCardImage, LazyLoadDirective, AsyncPipe]
})
export class ArtPiecesListComponent implements OnInit {
  private router = inject(Router);
  private activatedroute = inject(ActivatedRoute);
  private sessionQuery = inject(SessionQuery);
  private nftService = inject(NftsService);
  private responsiveService = inject(ResponsiveService);
  
  numberOfCols = input<number>(!this.responsiveService.displayMobileLayout.value ? 2 : 3);
  viewAsWidget = input<boolean>(false);
  nftFilters = input<NftFilters>({});
  selectedTokenId = output<string>()

  public sortMethods = Object.values(SortMethod);
  public artPieces: Signal<Nft[] | undefined>;
  public dataReady = computed(() => this.artPieces()?.length ? true : false);
  public activeSortMethod: WritableSignal<SortMethod> = signal(SortMethod.YEAR);
  public sortOrder: WritableSignal<SortOrder> = signal('asc')
  public sortedArtPieces = computed(() => {
    switch (this.activeSortMethod()) {
      case SortMethod.SIZE:
        return this.nftService.sortBySize(this.artPieces()!, this.sortOrder())
      case SortMethod.MEDIUM:
        return this.nftService.sortByMedium(this.artPieces()!, this.sortOrder())
      case SortMethod.YEAR:
        return this.nftService.sortByYear(this.artPieces()!, this.sortOrder())
    }
  });
  public visibleImages = new Set<string>();
  public selectedNfts: WritableSignal<Nft[]> = signal([]);

  constructor( ) {
    this.artPieces = toSignal(this.sessionQuery.selectArtPiecesObservable)
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
    return !this.isExcludedByYear(nft) && !this.isExcludedById(nft) && this.nftService.isFrontalView(nft);
  }

  public getImgThumbUrl(nft: Nft): Observable<string> {
    return this.nftService.getOptimalUrl(nft).pipe(distinctUntilChanged());
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
