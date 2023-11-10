import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NftsService } from '@services/nfts.service';
import NftUtils from '@utils/nft.utils';
import { Nft } from 'alchemy-sdk';

@Component({
  selector: 'app-art-piece',
  templateUrl: './art-piece.component.html',
  styleUrls: ['./art-piece.component.scss']
})
export class ArtPieceComponent implements OnInit {

  @Input() tokenId: string | null;
  public nft?: Nft;
  public year: string | null;
  public medium: string | null;
  public size: string | null;
  public artist: string | null;

  constructor(
    private nftsService: NftsService,
    private route: ActivatedRoute,
  ) {
    this.tokenId = this.route.snapshot.params['id'];
    this.nft = this.nftsService.getArtById(this.tokenId!)
    this.year = NftUtils.getAttrValue('year', this.nft!)
    this.medium = NftUtils.getAttrValue('medium', this.nft!)
    this.size = NftUtils.getAttrValue('size', this.nft!)
    this.artist = NftUtils.getAttrValue('artist', this.nft!)

  }

  ngOnInit(): void {
  }

}
