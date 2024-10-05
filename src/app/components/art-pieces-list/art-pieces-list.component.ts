import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { VALIDTRAITS, VIEW_TYPES } from '@constants/nft.constants';
import { NftFilters } from '@models/nfts.models';
import { NftsService } from '@services/nfts.service';
import { ResponsiveService } from '@services/responsive.service';
import { SessionQuery } from '@store/session.query';
import { Media, Nft } from 'alchemy-sdk';
import { Observable, Subscription, distinctUntilChanged, filter } from 'rxjs';

@Component({
  selector: 'app-art-pieces-list',
  templateUrl: './art-pieces-list.component.html',
  styleUrls: ['./art-pieces-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtPiecesListComponent implements OnInit, OnDestroy {

  @Input() numberOfCols: number | null = null;
  @Input() nftFilters?: NftFilters = {};
  // @Input() featuredFilter?: Array<string>;
  @Input() viewAsWidget = false;

  @Output() selectedTokenId = new EventEmitter<string>();

  public artPieces$: Observable<Nft[]>;

  private subscriptions = new Subscription();

  constructor(
    private sessionQuery: SessionQuery,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private nftService: NftsService,
    private responsiveService: ResponsiveService
  ) {
    this.artPieces$ = this.sessionQuery.selectArtPiecesObservable;
    this.setLayout();
  }

  ngOnInit(): void {
    if (!this.nftFilters?.years?.length) {
      const routeYear = this.activatedroute.firstChild?.snapshot.paramMap.get('year')!;
      this.nftFilters = { years: routeYear ? [routeYear] : []}
    }
    if (this.yearSubscription()) {
      this.subscriptions.add(this.yearSubscription());
    }
  }

  yearSubscription(): Subscription {
    return this.router.events.pipe(
      filter((e: unknown) => e instanceof NavigationEnd),
      distinctUntilChanged()
    ).subscribe((ev) => {
      // TODO: DO BETTER. NEED TO REFACTOR FILTERS AND PARAMS
      if (this.activatedroute.firstChild) { // is on list page. Not ideal. Refactor maybe
        const yearValue = this.activatedroute.firstChild.snapshot.paramMap.get('year');
        if (yearValue) {
          this.nftFilters!.years = [yearValue];
        } else {
          this.nftFilters!.years = [];
        }
      } else {
        if (!this.activatedroute.snapshot.paramMap.get('id')) { // not on single view
          const yearValue = this.activatedroute.snapshot.paramMap.get('year')!
          if (yearValue) {
            this.nftFilters!.years = [yearValue]
          } else {
            this.nftFilters!.years = [];
          }
        }
      }
      this.changeDetectorRef.detectChanges();
    })
  }

  public displayPiece(nft: Nft): boolean {
    return !this.isExcludedByYear(nft) && this.isFrontalView(nft) /*&& !this.isExcludedByFeature(nft)*/;
  }

  private setLayout(): void {
    if (!this.numberOfCols) {
      this.numberOfCols = !this.responsiveService.displayMobileLayout.value ? 2 : 5
    }
  }

  private isExcludedByYear(nft: Nft): boolean {
    if (this.nftFilters?.years && this.nftFilters?.years?.length) {
      return this.nftFilters.years.some(year => nft.rawMetadata!.attributes!.find((attr)  => attr['trait_type'] === VALIDTRAITS.YEAR)!['value'] !== year)
    } else {
      return false
    }
  }

  // private isExcludedByFeature(nft: Nft): boolean {
  //   return !!this.featuredFilter?.length && !this.featuredFilter!.includes(nft.tokenId);
  // }

  private isFrontalView(nft: Nft): boolean {
    const imagetype = nft.rawMetadata!.attributes!.find((attr)  => attr['trait_type'] === VALIDTRAITS.IMAGETYPE);
    const imagetypeIsSet = !!imagetype;
    return (imagetype!['value'] === VIEW_TYPES.FRONTAL || !imagetypeIsSet);
  }

  public getImgThumbUrl(media: Media): string {
    return this.nftService.getOptimalUrl(media);
  }

  public handleArtPieceClick(tokenId: string) {
    this.selectedTokenId.emit(tokenId);
    this.router.navigate(['/artwork', tokenId ]);
  }

  listTracking(index: number, value: Nft) {
    return value
  } 
 
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
