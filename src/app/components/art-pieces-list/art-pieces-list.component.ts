import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { VALIDTRAITS } from '@constants/nft.constants';
import { NFTMetadata } from '@models/nfts.models';
import { SessionQuery } from '@store/session.query';
import { NFT } from 'opensea-js';
import { Observable, Subscription, distinctUntilChanged, filter } from 'rxjs';

@Component({
  selector: 'app-art-pieces-list',
  templateUrl: './art-pieces-list.component.html',
  styleUrls: ['./art-pieces-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtPiecesListComponent implements OnInit, OnDestroy {

  @Input() numberOfCols = 3;
  @Input() yearFilter?: string;
  @Input() featuredFilter?: Array<string>;
  @Input() viewAsWidget = false;

  @Output() selectedTokenId = new EventEmitter<string>();

  public artPieces$: Observable<NFT[]> = this.sessionQuery.selectArtPiecesObservable;

  private subscriptions = new Subscription();

  constructor(
    private sessionQuery: SessionQuery,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
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

  public displayPiece(nft: NFT): boolean {
    if (this.featuredFilter?.length) {
      return this.featuredFilter.includes(nft.identifier);
    } 
    if (this.yearFilter) {
      const foundMetadata: NFTMetadata | undefined = this.sessionQuery.selectArtPiecesMetadata.find(nftMetadata => nftMetadata.identifier === nft.identifier);
      return foundMetadata?.traits.find((trait)  => trait.trait_type === VALIDTRAITS.YEAR)?.value === this.yearFilter;
    }
    return true;
  }

  listTracking(index: number, value: NFT) {
    return value
  } 

  public handleArtPieceClick(tokenId: string) {
    this.selectedTokenId.emit(tokenId);
    this.router.navigate(['/artwork', tokenId ]);
  }
 
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
