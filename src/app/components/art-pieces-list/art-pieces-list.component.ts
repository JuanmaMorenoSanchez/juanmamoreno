import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionQuery } from '@store/session.query';
import NftUtils from '@utils/nft.utils';
import { Nft} from 'alchemy-sdk';
import { Observable, Subject, Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-art-pieces-list',
  templateUrl: './art-pieces-list.component.html',
  styleUrls: ['./art-pieces-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtPiecesListComponent implements OnInit {

  public artPieces$: Observable<Nft[]> = this.sessionQuery.selectArtPiecesObservable;
  public yearFilter: String | null = null;
  private subscriptions = new Subscription();

  constructor(
    private sessionQuery: SessionQuery,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    this.subscriptions.add(this.yearSubscription())
  }

  yearSubscription(): Subscription {
    return this.activatedroute.paramMap.subscribe(paramMap => {
      this.yearFilter = paramMap.get('year');
      this.changeDetectorRef.detectChanges();
    });
  }

  public displayPiece(nft: Nft): boolean {
    return !this.yearFilter ? true : NftUtils.getAttrValue('year', nft) === this.yearFilter;
  }

  listTracking(index: number, value: Nft) {
    return value
  } 

  handleArtPieceClick(tokenId: string) {
    this.router.navigate(['/artwork', tokenId ]);
  }
 
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
