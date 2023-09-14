import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NftsService } from '@services/nfts.service';
import { OwnedNft } from 'alchemy-sdk';

@Component({
  selector: 'app-art-piece',
  templateUrl: './art-piece.component.html',
  styleUrls: ['./art-piece.component.scss']
})
export class ArtPieceComponent implements OnInit {

  @Input() tokenId: string | null;
  public nft?: OwnedNft;

  constructor(
    private nftsService: NftsService,
    private route: ActivatedRoute,
  ) {
    this.tokenId = this.route.snapshot.params['id'];
    this.nft = this.nftsService.getArtById(this.tokenId!)
  }

  ngOnInit(): void {
  }

}
