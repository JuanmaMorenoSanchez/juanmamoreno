import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlchemyService } from '@services/alchemy.service';
import { SessionQuery } from '@store/session.query';
import { TransferredNft } from 'alchemy-sdk';

@Component({
  selector: 'app-art-piece',
  templateUrl: './art-piece.component.html',
  styleUrls: ['./art-piece.component.scss']
})
export class ArtPieceComponent implements OnInit {

  @Input() tokenId: string | null;
  public nft?: TransferredNft;

  constructor(
    private alchemyService: AlchemyService,
    private route: ActivatedRoute,
  ) {

    this.tokenId = this.route.snapshot.params['id'];
    this.nft = this.alchemyService.getNftById(this.tokenId!)

    // see how to handle this:
    // ipfs://QmSeRGNmNhrFaEBKW5STv1wL1NpeUkjb8dDAthiHkTooU3/asset.jpeg
  }

  ngOnInit(): void {
  }

}
