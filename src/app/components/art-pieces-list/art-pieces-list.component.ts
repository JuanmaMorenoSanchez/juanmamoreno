import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionQuery } from '@store/session.query';
import { TransferredNft } from 'alchemy-sdk';
import { distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-art-pieces-list',
  templateUrl: './art-pieces-list.component.html',
  styleUrls: ['./art-pieces-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtPiecesListComponent implements OnInit {

  public artPieces: TransferredNft[] | undefined;

  //where do i put filters? here or in queryservice? 
  // inputs??

  //knoworigin case: rawMetadata.attributes.production_production_year
  // rarible: otro formato de rawMetadata

  // tengo que mintear 1, añadir toda la info posible, y guardar el tipo, que sirva de "molde"

  constructor(
    private sessionQuery: SessionQuery,
    private router: Router
  ) {
    this.sessionQuery.selectArtPiecesObservable.pipe(distinctUntilChanged()).subscribe(artPieces => {
      this.artPieces = artPieces
    })

  }

  ngOnInit(): void {
  }

  handleArtPieceClick(tokenId: string) {
    this.router.navigate(['/artwork', tokenId ]);
  }

}
