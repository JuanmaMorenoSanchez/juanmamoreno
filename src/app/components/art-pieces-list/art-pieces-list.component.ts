import { Component, input, OnInit, output, Signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VALIDTRAITS, VIEW_TYPES } from '@constants/nft.constants';
import { NftFilters } from '@models/nfts.models';
import { NftsService } from '@services/nfts.service';
import { ResponsiveService } from '@services/responsive.service';
import { SessionQuery } from '@store/session.query';
import { Nft, NftImage } from 'alchemy-sdk';
import { distinctUntilChanged } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-art-pieces-list',
  templateUrl: './art-pieces-list.component.html',
  styleUrls: ['./art-pieces-list.component.scss']
})
export class ArtPiecesListComponent implements OnInit {

  numberOfCols = input<number>(!this.responsiveService.displayMobileLayout.value ? 2 : 5);
  viewAsWidget = input<boolean>(false);
  nftFilters = input<NftFilters>({});
  selectedTokenId = output<string>()

  public artPieces: Signal<Nft[] | undefined>;

  constructor(
    private sessionQuery: SessionQuery,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private nftService: NftsService,
    private responsiveService: ResponsiveService
  ) {
    this.artPieces = toSignal(this.sessionQuery.selectArtPiecesObservable);
  }

  ngOnInit(): void {
    this.listenYearParamChange();
  }

  private listenYearParamChange(): void {
    this.router.events.pipe(
      distinctUntilChanged()
    ).subscribe(() => {
      if (this.activatedroute.firstChild) { // is on list page. Not ideal. Refactor maybe
        const yearValue = this.activatedroute.firstChild.snapshot.paramMap.get('year');
        this.nftFilters().years = yearValue ? [yearValue] : [];
      } else if (!this.activatedroute.snapshot.paramMap.get('id')) { // not on single view
        const yearValue = this.activatedroute.snapshot.paramMap.get('year')!
        this.nftFilters().years = yearValue ? [yearValue] : [];
      }
    })
  }

  public displayPiece(nft: Nft): boolean {
    return !this.isExcludedByYear(nft) && !this.isExcludedById(nft) && this.isFrontalView(nft);
  }

  private isExcludedById(nft: Nft): boolean {
    if (this.nftFilters()?.idsToExclude?.length) {
      return this.nftFilters().idsToExclude!.includes(nft.tokenId)
    } else {
      return false
    }
  }

  private isExcludedByYear(nft: Nft): boolean {
    if (this.nftFilters().years?.length) {
      return this.nftFilters().years!.some(year => nft.raw.metadata!['attributes'].find((attr: any)  => attr['trait_type'] === VALIDTRAITS.YEAR)!['value'] !== year)
    } else {
      return false
    }
  }

  private isFrontalView(nft: Nft): boolean {
    const imagetype = nft.raw.metadata['attributes'].find((attr: any)  => attr['trait_type'] === VALIDTRAITS.IMAGETYPE);
    const imagetypeIsSet = !!imagetype;
    return (imagetype!['value'] === VIEW_TYPES.FRONTAL || !imagetypeIsSet);  }

  public getImgThumbUrl(image: NftImage): string {
    return this.nftService.getOptimalUrl(image);
  }

  public handleArtPieceClick(tokenId: string) {
    this.selectedTokenId.emit(tokenId);
    this.router.navigate(['/artwork', tokenId ]);
  }

  listTracking(index: number, value: Nft) {
    return value
  } 
}
