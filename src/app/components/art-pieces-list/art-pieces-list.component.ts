import { Component, OnInit } from '@angular/core';
import { SessionQuery } from '@store/session.query';
import { TransferredNft } from 'alchemy-sdk';

@Component({
  selector: 'app-art-pieces-list',
  templateUrl: './art-pieces-list.component.html',
  styleUrls: ['./art-pieces-list.component.scss']
})
export class ArtPiecesListComponent implements OnInit {

  public artPieces$; //: TransferredNft[];

  //where do i put filters? here or in queryservice? 
  // inputs??

  //knoworigin case: rawMetadata.attributes.production_production_year
  // rarible: otro formato de rawMetadata

  // tengo que mintear 1, añadir toda la info posible, y guardar el tipo, que sirva de "molde"

  constructor(
    private sessionQuery: SessionQuery
  ) {
    this.artPieces$ = this.sessionQuery.selectArtPiecesObservable;
  }

  ngOnInit(): void {
  }

}
