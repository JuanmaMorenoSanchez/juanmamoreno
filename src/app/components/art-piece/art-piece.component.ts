import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NftsService } from '@services/nfts.service';
import CommonUtils from '@utils/common.utils';
import NftUtils from '@utils/nft.utils';
import { Nft } from 'alchemy-sdk';

@Component({
  selector: 'app-art-piece',
  templateUrl: './art-piece.component.html',
  styleUrls: ['./art-piece.component.scss']
})
export class ArtPieceComponent implements OnInit  {

  @Input() tokenId: string | null = null;
  public numberOfViewMoreColumns = 6;
  public nft?: Nft;
  public year?: string;
  public medium?: string;
  public size?: string;
  public artist?: string;

  constructor(
    private nftsService: NftsService,
    private activatedroute: ActivatedRoute,
  ) {
    this.tokenId = this.activatedroute.snapshot.params['id'];
    this.loadArtData();
  }

  ngOnInit(): void {
  }

  loadArtData(): void {
    this.nft = this.nftsService.getArtById(this.tokenId!);
    const year = NftUtils.getAttrValue('year', this.nft!);
    const medium = NftUtils.getAttrValue('medium', this.nft!);
    const size = NftUtils.getAttrValue('size', this.nft!);
    const artist = NftUtils.getAttrValue('artist', this.nft!)
    this.year = year ? year : undefined;
    this.medium = medium ? medium : undefined;
    this.size = size ? size : undefined;
    this.artist = artist ? artist : undefined;
  }

  handleSelectedItem(tokenId: string): void {
    this.tokenId = tokenId;
    this.loadArtData();
    CommonUtils.scrollToTop();
  }

  public getBigImgUrl(mediaUrl: string): string {
    return mediaUrl.replace("w=500", `w=${window.screen.width}`)
  }
}
