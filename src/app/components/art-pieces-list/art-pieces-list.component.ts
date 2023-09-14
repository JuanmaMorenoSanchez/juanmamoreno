import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionQuery } from '@store/session.query';
import { OwnedNft } from 'alchemy-sdk';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-art-pieces-list',
  templateUrl: './art-pieces-list.component.html',
  styleUrls: ['./art-pieces-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtPiecesListComponent implements OnInit {

  public artPieces$: Observable<OwnedNft[]> = this.sessionQuery.selectArtPiecesObservable;

  //knoworigin case: rawMetadata.attributes.production_production_year
  // rarible: otro formato de rawMetadata


  constructor(
    private sessionQuery: SessionQuery,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  listTracking(index: number, value: OwnedNft) {
    return value
  } 

  handleArtPieceClick(tokenId: string) {
    this.router.navigate(['/artwork', tokenId ]);
  }

}
