import { Component, computed, inject, Signal, signal, WritableSignal } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatTooltip } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SOLDCERTIFICATES, VALIDTRAITS, VIEW_TYPES } from '@domain/artwork/artwork.constants';
import { Nft, NftFilters, NftImage } from '@domain/artwork/artwork.entity';
import { ArtworkService } from '@domain/artwork/artwork.service';
import { ArtPiecesListComponent } from '@features/artworks/art-pieces-list.component';
import { ArtworkInfraService } from '@infrastructure/artwork/artwork.service';
import { TranslatePipe } from '@ngx-translate/core';
import { PdfButtonComponent } from '@shared/components/pdf-button/pdf-button.component';
import { ResponsiveService } from '@shared/services/responsive.service';
import { map, switchMap } from 'rxjs';
import { DownloadButtonComponent } from './components/download-button/download-button.component';
import { ImageViewerComponent } from './components/image-viewer/image-viewer.component';
import { LinksButtonComponent } from './components/links-button/links-button.component';

@Component({
    selector: 'app-art-piece',
    templateUrl: './art-piece.component.html',
    styleUrls: ['./art-piece.component.scss'],
    imports: [MatGridList, MatGridTile, ImageViewerComponent, RouterLink, MatTooltip, DownloadButtonComponent, PdfButtonComponent, LinksButtonComponent, MatDivider, ArtPiecesListComponent, TranslatePipe]
  })
export class ArtPieceComponent {
  private router = inject(Router);
  private activatedroute = inject(ActivatedRoute);
  private artworkDomainService = inject(ArtworkService);
  private artworkInfraService = inject(ArtworkInfraService);
  private responsiveService = inject(ResponsiveService);
  
  readonly validTraits = VALIDTRAITS;

  public displayingIndex: WritableSignal<number> = signal(0);
  public nfts: WritableSignal<Array<Nft>> = signal([]);
  public nft: Signal<Nft> = computed(() => this.nfts()[this.displayingIndex()])
  public frontalViewNft: WritableSignal<Nft | undefined> = signal(undefined);
  public thereAreMoreInYear: Signal<boolean> = computed(() => {
    const currentYear = this.artworkDomainService.getTraitValue(this.nft(), VALIDTRAITS.YEAR);
    return this.artworkInfraService.getNftLenghtByYear(currentYear) > 1; // by default there is allways at least 1
  });
  public numberOfViewMoreColumns = 3;
  public horizontalView = false;
  private latestVersionIndex = 0;

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
        return this.artworkInfraService.getSameArtThanObservable(id);
      })
    ).subscribe(nfts => {
      this.nfts.set(nfts);
      this.latestVersionIndex = this.artworkDomainService.getLatestVersionIndex(this.nfts());
      this.displayingIndex.set(this.latestVersionIndex);
      this.setFrontalView(nfts);
    });
  }

  public getViewLabel(nft: Nft): string {
    switch (this.getTraitValue(nft, this.validTraits.IMAGETYPE)) {
      case VIEW_TYPES.PROGRESS:
        return `(${VIEW_TYPES.PROGRESS})`
      case VIEW_TYPES.DETAIL:
        return `(${VIEW_TYPES.DETAIL})`
      default:
        if (this.displayingIndex() === this.latestVersionIndex) {
          return ""
        } else {
          return `(${VIEW_TYPES.PROGRESS})`
        }
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

  public getTraitValue(nft: Nft, validTrait: VALIDTRAITS): string {
    return this.artworkDomainService.getTraitValue(nft, validTrait);
  }

  public sold(tokenId: string): boolean {
    return SOLDCERTIFICATES.includes(tokenId);
  }

  public getQualityImg(image: NftImage): string {
    return this.artworkDomainService.getNftQualityUrl(image);
  }

  public indexChanged(event: number) {
    this.displayingIndex.set(event);
  }

  private setFrontalView(nfts: Nft[]): void {
    const frontal = nfts.find(nft => this.artworkDomainService.isFrontalView(nft, nfts));
    this.frontalViewNft.set(frontal);
  }

  handleSelectedItem(tokenId: string): void {
    this.router.navigate(['/art', tokenId]);
  }
}