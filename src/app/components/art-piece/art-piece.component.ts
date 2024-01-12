import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SOLDCERTIFICATES, VALIDTRAITS } from '@constants/nft.constants';

import { NftsService } from '@services/nfts.service';
import { SessionQuery } from '@store/session.query';
import CommonUtils from '@utils/common.utils';
import { Media, Nft } from 'alchemy-sdk';
import { Observable, filter, map } from 'rxjs';

@Component({
  selector: 'app-art-piece',
  templateUrl: './art-piece.component.html',
  styleUrls: ['./art-piece.component.scss'],
})
export class ArtPieceComponent {

  readonly validTraits = VALIDTRAITS;

  @Input() tokenId: string;
  public numberOfViewMoreColumns = 6;
  public nfts$: Observable<Array<Nft>>;

  constructor(
    private sessionQuery: SessionQuery,
    private nftsService: NftsService,
    private activatedroute: ActivatedRoute,
  ) {
    this.tokenId = this.activatedroute.snapshot.params['id'];
    this.nfts$ = this.setArtData(this.tokenId);
  }

  public getTraitValue(nft: Nft, validTrait: VALIDTRAITS): string {
    return nft.rawMetadata!.attributes!.find(trait => trait['trait_type'] === validTrait)!['value']
  }

  public sold(tokenId: string): boolean {
    return SOLDCERTIFICATES.includes(tokenId);
  }

  public getQualityImg(media: Media): string {
    return this.nftsService.getQualityUrl(media);
  }

  setArtData(tokenId: string): Observable<Array<Nft>> {
    return this.nftsService.getNftByIdObservable(tokenId).pipe(
      filter(nft => nft !== undefined),
      map(nft => this.findSameArtPieceNfts(nft!.title))
    );
  }

  private findSameArtPieceNfts(titleToSearch: string): Array<Nft> {
    return this.sessionQuery.selectArtPieces?.filter(({title}) => title === titleToSearch);
  }

  handleSelectedItem(tokenId: string): void {
    this.tokenId = tokenId;
    this.nfts$ = this.setArtData(tokenId);
  }
}