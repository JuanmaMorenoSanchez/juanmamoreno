import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SOLDCERTIFICATES, VALIDTRAITS } from '@constants/nft.constants';

import { NftsService } from '@services/nfts.service';
import { ResponsiveService } from '@services/responsive.service';
import { SessionQuery } from '@store/session.query';
import { Media, Nft } from 'alchemy-sdk';
import { Observable, filter, last, map } from 'rxjs';

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
  public horizontalView = false;

  constructor(
    private sessionQuery: SessionQuery,
    private nftsService: NftsService,
    private activatedroute: ActivatedRoute,
    private responsiveService: ResponsiveService
  ) {
    this.responsiveService.displayMobileLayout.subscribe(display => this.horizontalView = display)

    this.tokenId = this.activatedroute.snapshot.params['id'];
    this.nfts$ = this.setArtData(this.tokenId);
  }

  public generateRadio(nft: Nft): number {
    // TODO: resolve when there are multiple images in same art
    const height = parseFloat(this.getTraitValue(nft, VALIDTRAITS.HEIGHT));
    const width = parseFloat(this.getTraitValue(nft, VALIDTRAITS.WIDTH));
    const mobileAdjustement = !this.horizontalView ? Math.ceil((height/width)) : 0;
    const ratio = Math.ceil((height/width)*2)+mobileAdjustement;
    return ratio
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