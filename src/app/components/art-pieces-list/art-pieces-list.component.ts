import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VALIDTRAITS } from '@constants/nft.constants';
import { NFTMetadata } from '@models/nfts.models';
import { SessionQuery } from '@store/session.query';
import { NFT } from 'opensea-js';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-art-pieces-list',
  templateUrl: './art-pieces-list.component.html',
  styleUrls: ['./art-pieces-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtPiecesListComponent implements OnInit, OnDestroy {

  @Input() numberOfCols = 3;
  @Input() yearFilter?: string;

  @Output() selectedTokenId = new EventEmitter<string>();

  public artPieces$: Observable<NFT[]> = this.sessionQuery.selectArtPiecesObservable;

  private subscriptions = new Subscription();
  private screenWidth: number;

  constructor(
    private sessionQuery: SessionQuery,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    this.screenWidth = (window.screen.width);
  }

  ngOnInit(): void {
    !this.yearFilter && this.subscriptions.add(this.yearSubscription());
  }

  yearSubscription(): Subscription {
    return this.activatedroute.paramMap.subscribe(paramMap => {
      const year = paramMap.get('year');
      if (year) {
        this.yearFilter = year;
      }
      this.changeDetectorRef.detectChanges();
    });
  }

  public displayPiece(nft: NFT): boolean {
    const foundMetadata: NFTMetadata | undefined = this.sessionQuery.selectArtPiecesMetadata.find(nftMetadata => nftMetadata.identifier === nft.identifier);
    return !this.yearFilter ? true : foundMetadata?.traits.find((trait)  => trait.trait_type === VALIDTRAITS.YEAR)?.value === this.yearFilter;
  }

  public getThumbImgUrl(mediaUrl: string): string {
    return mediaUrl.replace("w=500", `w=${Math.floor(this.screenWidth/this.numberOfCols)}`)
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
