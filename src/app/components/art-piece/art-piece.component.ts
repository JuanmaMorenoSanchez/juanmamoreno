import { Component, computed, inject, Signal, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SOLDCERTIFICATES, VALIDTRAITS, VIEW_TYPES } from '@constants/nft.constants';
import { NftFilters } from '@models/nfts.models';

import { NftsService } from '@services/nfts.service';
import { ResponsiveService } from '@services/responsive.service';
import { NftImage, Nft } from 'alchemy-sdk';
import { map, switchMap } from 'rxjs';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { ImageViewerComponent } from '../image-viewer/image-viewer.component';
import { MatTooltip } from '@angular/material/tooltip';
import { DownloadButtonComponent } from '../download-button/download-button.component';
import { PdfButtonComponent } from '../pdf-button/pdf-button.component';
import { LinksButtonComponent } from '../links-button/links-button.component';
import { MatDivider } from '@angular/material/divider';
import { ArtPiecesListComponent } from '../art-pieces-list/art-pieces-list.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'app-art-piece',
    templateUrl: './art-piece.component.html',
    styleUrls: ['./art-piece.component.scss'],
    imports: [MatGridList, MatGridTile, ImageViewerComponent, RouterLink, MatTooltip, DownloadButtonComponent, PdfButtonComponent, LinksButtonComponent, MatDivider, ArtPiecesListComponent, TranslatePipe]
})
export class ArtPieceComponent {
  private router = inject(Router);
  private activatedroute = inject(ActivatedRoute);
  private nftsService = inject(NftsService);
  private responsiveService = inject(ResponsiveService);
  
  readonly validTraits = VALIDTRAITS;

  public displayingIndex: WritableSignal<number> = signal(0);
  public nfts: WritableSignal<Array<Nft>> = signal([]);
  public nft: Signal<Nft> = computed(() => this.nfts()[this.displayingIndex()])
  
  public numberOfViewMoreColumns = 3;
  public horizontalView = false;

  constructor( ) {
    this.responsiveService.displayMobileLayout.subscribe(display => {
      this.horizontalView = display;
      this.numberOfViewMoreColumns = !display ? 3 : 6;
    });
  }

  ngOnInit(): void {
    this.listenIdParamChange();
  }

  private listenIdParamChange(): void {
    this.activatedroute.paramMap.pipe(
      map(paramMap => paramMap.get('id')!),
      switchMap((id: string) => {
        this.displayingIndex.set(0);
        return this.nftsService.getSameArtThanObservable(id);
      })
    ).subscribe(nfts => {
      this.nfts.set(nfts);
    });
  }

  public getViewLabel(nft: Nft): string {
    switch (this.getTraitValue(nft, this.validTraits.IMAGETYPE)) {
      case VIEW_TYPES.PROGRESS:
        return "(Work in progress)"
      case VIEW_TYPES.DETAIL:
        return "(Detail view)"
      default:
        return ""
    }
  }

  public generateRatio(nft: Nft): number {
    // TODO: resolve when there are multiple images in same art
    const height = parseFloat(this.getTraitValue(nft, VALIDTRAITS.HEIGHT));
    const width = parseFloat(this.getTraitValue(nft, VALIDTRAITS.WIDTH));
    const mobileAdjustement = !this.horizontalView ? Math.ceil((height/width)) : 0;
    const ratio = Math.ceil((height/width)*2)+mobileAdjustement;
    return ratio
  }

  public getSameYearListFilter(nft: Nft): NftFilters {
    const idsToExclude: string[] = this.nfts().map(nft => nft.tokenId);
    const filters: NftFilters = {
      years: [this.getTraitValue(nft, this.validTraits.YEAR)],
      idsToExclude
    }
    return filters
  }

  public getFrontalViewNft(): Nft {
    return this.nfts().find(nft => this.nftsService.isFrontalView(nft))!;
  }

  public getTraitValue(nft: Nft, validTrait: VALIDTRAITS): string {
    return this.nftsService.getTraitValue(nft, validTrait);
  }

  public sold(tokenId: string): boolean {
    return SOLDCERTIFICATES.includes(tokenId);
  }

  public getQualityImg(image: NftImage): string {
    return this.nftsService.getQualityUrl(image);
  }

  public indexChanged(event: number) {
    this.displayingIndex.set(event);
  }

  handleSelectedItem(tokenId: string): void {
    this.router.navigate(['/art', tokenId]);
  }
}