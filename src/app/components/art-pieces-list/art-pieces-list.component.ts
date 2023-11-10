import { ChangeDetectionStrategy, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { NftFilters } from '@models/nfts.models';
import { SessionQuery } from '@store/session.query';
import { Nft} from 'alchemy-sdk';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-art-pieces-list',
  templateUrl: './art-pieces-list.component.html',
  styleUrls: ['./art-pieces-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtPiecesListComponent implements OnInit {

  @Input() filters: NftFilters | null = null;

  public artPieces$: Observable<Nft[]> = this.sessionQuery.selectArtPiecesObservable;

  constructor(
    private sessionQuery: SessionQuery,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("TODO: implement changes ", changes);
  }

  listTracking(index: number, value: Nft) {
    return value
  } 

  handleArtPieceClick(tokenId: string) {
    this.router.navigate(['/artwork', tokenId ]);
  }

}
