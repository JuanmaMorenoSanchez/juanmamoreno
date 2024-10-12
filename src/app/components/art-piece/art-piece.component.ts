import { Component, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SOLDCERTIFICATES, VALIDTRAITS } from '@constants/nft.constants';
import { NftFilters } from '@models/nfts.models';

import { NftsService } from '@services/nfts.service';
import { ResponsiveService } from '@services/responsive.service';
import { Media, Nft } from 'alchemy-sdk';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-art-piece',
  templateUrl: './art-piece.component.html',
  styleUrls: ['./art-piece.component.scss'],
})
export class ArtPieceComponent {

  readonly validTraits = VALIDTRAITS;

  public tokenId: WritableSignal<string> = signal("");
  public nfts: WritableSignal<Array<Nft>> = signal([]); 
  
  public numberOfViewMoreColumns = 6;
  public horizontalView = false;

  constructor(
    private nftsService: NftsService,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private responsiveService: ResponsiveService,
  ) {
    this.responsiveService.displayMobileLayout.subscribe(display => this.horizontalView = display);
  }

  ngOnInit(): void {
    this.listenIdParamChange();
  }

  private listenIdParamChange(): void {
    this.activatedroute.paramMap.pipe(
      map(paramMap => paramMap.get('id')!),
      switchMap((id: string) => {
        this.tokenId.set(id);
        return this.nftsService.getSameArtThan(id);
      })
    ).subscribe(nfts => {
      this.nfts.set(nfts);
    });
  }

  public generateRatio(nft: Nft): number {
    // TODO: resolve when there are multiple images in same art
    const height = parseFloat(this.getTraitValue(nft, VALIDTRAITS.HEIGHT));
    const width = parseFloat(this.getTraitValue(nft, VALIDTRAITS.WIDTH));
    const mobileAdjustement = !this.horizontalView ? Math.ceil((height/width)) : 0;
    const ratio = Math.ceil((height/width)*2)+mobileAdjustement;
    return ratio
  }

  public getYearFilter(year: string): NftFilters {
    return {years: [year]}
  }

  public getTraitValue(nft: Nft, validTrait: VALIDTRAITS): string {
    try {
      return nft.rawMetadata!.attributes!.find(trait => trait['trait_type'] === validTrait)!['value']
    } catch {
      return "Error getting data"
    }
  }

  public sold(tokenId: string): boolean {
    return SOLDCERTIFICATES.includes(tokenId);
  }

  public getQualityImg(media: Media): string {
    return this.nftsService.getQualityUrl(media);
  }

  handleSelectedItem(tokenId: string): void {
    this.router.navigate(['/art', tokenId]);
  }
}