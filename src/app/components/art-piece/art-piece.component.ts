import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SOLDCERTIFICATES, VALIDTRAITS } from '@constants/nft.constants';
import { NFTMetadata, Trait } from '@models/nfts.models';
import { NftsService } from '@services/nfts.service';
import CommonUtils from '@utils/common.utils';

@Component({
  selector: 'app-art-piece',
  templateUrl: './art-piece.component.html',
  styleUrls: ['./art-piece.component.scss']
})
export class ArtPieceComponent {

  @Input() tokenId: string;
  public numberOfViewMoreColumns = 6;
  public nft?: NFTMetadata;
  public year?: string;
  public medium?: string;
  public height?: string;
  public width?: string;
  public unit?: string;
  public artist?: string;

  constructor(
    private nftsService: NftsService,
    private activatedroute: ActivatedRoute,
  ) {
    this.tokenId = this.activatedroute.snapshot.params['id'];
    this.loadArtData();
  }

  get sold(): boolean {
    return SOLDCERTIFICATES.includes(this.tokenId);
  }

  loadArtData(): void {
    this.nftsService.getArtById(this.tokenId).then(nft => {
      this.nft = nft;
      const traits: Array<Trait> = this.nft.traits;
      this.year = traits.find(trait => trait.trait_type === VALIDTRAITS.YEAR)?.value
      this.medium = traits.find(trait => trait.trait_type === VALIDTRAITS.MEDIUM)?.value
      this.height = traits.find(trait => trait.trait_type === VALIDTRAITS.HEIGHT)?.value
      this.width = traits.find(trait => trait.trait_type === VALIDTRAITS.WIDTH)?.value
      this.unit = traits.find(trait => trait.trait_type === VALIDTRAITS.UNIT)?.value
      this.artist = traits.find(trait => trait.trait_type === VALIDTRAITS.ARTIST)?.value
    })
  }

  handleSelectedItem(tokenId: string): void {
    this.tokenId = tokenId;
    this.loadArtData();
    CommonUtils.scrollToTop();
  }
}