import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionQuery } from '@store/session.query';
import NftUtils from '@utils/nft.utils';
import { Nft } from 'alchemy-sdk';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-art-pieces-list',
  templateUrl: './art-pieces-list.component.html',
  styleUrls: ['./art-pieces-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtPiecesListComponent implements OnInit {

  @Input() numberOfCols = 3;
  @Input() yearFilter?: string;

  @Output() selectedTokenId = new EventEmitter<string>();

  public artPieces$: Observable<Nft[]> = this.sessionQuery.selectArtPiecesObservable;

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
    !this.yearFilter && this.subscriptions.add(this.yearSubscription()); // if yearfilter from outside, do not subscribe to this
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

  public displayPiece(nft: Nft): boolean {
    return !this.yearFilter ? true : NftUtils.getAttrValue('year', nft) === this.yearFilter;
  }

  public getThumbImgUrl(mediaUrl: string): string {
    return mediaUrl.replace("w=500", `w=${Math.floor(this.screenWidth/this.numberOfCols)}`)
  }

  listTracking(index: number, value: Nft) {
    return value
  } 

  handleArtPieceClick(tokenId: string) {
    this.selectedTokenId.emit(tokenId);
    this.router.navigate(['/artwork', tokenId ]);
  }
 
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
