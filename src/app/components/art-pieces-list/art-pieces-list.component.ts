import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { VALIDTRAITS, VIEW_TYPES } from '@constants/nft.constants';
import { NftsService } from '@services/nfts.service';
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

  @Input() numberOfCols = 4;
  @Input() yearFilter?: string;
  @Input() featuredFilter?: Array<string>;
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
  ) {
    this.artPieces$ = this.sessionQuery.selectArtPiecesObservable;
  }

  ngOnInit(): void {
    if (!this.yearFilter) {
      this.yearFilter = this.activatedroute.firstChild?.snapshot.paramMap.get('year')!
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
        this.yearFilter = this.activatedroute.firstChild.snapshot.paramMap.get('year')!;
      } else {
        if (!this.activatedroute.snapshot.paramMap.get('id')) { // not on single view
          this.yearFilter = this.activatedroute.snapshot.paramMap.get('year')!
        }
      }
      this.changeDetectorRef.detectChanges();
    })
  }

  public displayPiece(nft: Nft): boolean {
    return !this.isExcludedByYear(nft) && !this.isExcludedByFeature(nft) && this.isFrontalView(nft);
  }

  private isExcludedByYear(nft: Nft): boolean {
    return !!this.yearFilter && nft.rawMetadata!.attributes!.find((attr)  => attr['trait_type'] === VALIDTRAITS.YEAR)!['value'] !== this.yearFilter
  }

  private isExcludedByFeature(nft: Nft): boolean {
    return !!this.featuredFilter?.length && !this.featuredFilter!.includes(nft.tokenId)
  }

  private isFrontalView(nft: Nft): boolean {
    return nft.rawMetadata!.attributes!.find((attr)  => attr['trait_type'] === VALIDTRAITS.IMAGETYPE)!['value'] === VIEW_TYPES.FRONTAL
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
