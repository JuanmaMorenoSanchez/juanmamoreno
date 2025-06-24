import { Component, computed, inject, signal, Signal, WritableSignal } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatTooltip } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { toSignal } from '@angular/core/rxjs-interop';
import { ArtworkDomain } from '@domain/artwork/artwork';
import { SOLDCERTIFICATES, VALIDTRAITS, VIEW_TYPES } from '@domain/artwork/artwork.constants';
import { Nft, NftFilters } from '@domain/artwork/artwork.entity';
import { ArtworkInfraService } from '@features/artwork/artwork.service';
import { ArtPiecesListComponent } from '@features/artworks/art-pieces-list.component';
import { PdfButtonComponent } from '@shared/components/pdf-button/pdf-button.component';
import { ResponsiveService } from '@shared/services/responsive.service';
import { map, switchMap, tap } from 'rxjs';
import { DownloadButtonComponent } from './components/download-button/download-button.component';
import { ImageViewerComponent } from './components/image-viewer/image-viewer.component';
import { LinksButtonComponent } from './components/links-button/links-button.component';
import { TraitPipe } from "./pipes/traits.pipe";

@Component({
  selector: 'app-art-piece',
  templateUrl: './art-piece.component.html',
  styleUrls: ['./art-piece.component.scss'],
  standalone: true,
  imports: [
    ImageViewerComponent,
    RouterLink,
    MatTooltip,
    DownloadButtonComponent,
    PdfButtonComponent,
    LinksButtonComponent,
    MatDivider,
    ArtPiecesListComponent,
    TranslatePipe,
    TraitPipe
]
})
export class ArtPieceComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private artworkService = inject(ArtworkInfraService);
  private responsiveService = inject(ResponsiveService);

  readonly validTraits = VALIDTRAITS;
  readonly numberOfViewMoreColumns: Signal<number> = toSignal(
    this.responsiveService.displayMobileLayout.pipe(map(display => display ? 6 : 3)),
    { initialValue: 3 }
  );
  readonly displayingIndex: WritableSignal<number> = signal(0);
  readonly fullNftsList = toSignal(this.artworkService.getArtPiecesObservable())
  readonly nfts: Signal<Nft[]> = toSignal(
    this.route.paramMap.pipe(
      map(paramMap => paramMap.get('id')!),
      switchMap((id: string) => {
        return this.artworkService.getSameArtThanObservable(id);
      }),
      tap(nfts => this.displayingIndex.set(ArtworkDomain.getLatestVersionIndex(nfts)))
    ),
    { initialValue: [] }
  );
  readonly nft: Signal<Nft> = computed(() => this.nfts()[this.displayingIndex()]);
  readonly frontalViewNft: Signal<Nft | undefined> = computed(() =>
    this.nfts().find(nft => ArtworkDomain.isFrontalView(nft, this.nfts()))
  );
  readonly thereAreMoreInYear: Signal<boolean> = computed(() => {
    const year = ArtworkDomain.getTraitValue(this.nft(), VALIDTRAITS.YEAR);
    return this.artworkService.getNftLenghtByYear(year) > 1;
  });
  readonly getSameYearListFilter: Signal<NftFilters> = computed(() => ({
      years: [this.getTraitValue(this.nft(), VALIDTRAITS.YEAR)],
      idsToExclude: this.nfts().map(n => n.tokenId)
    }))
  readonly viewLabel: Signal<string> = computed(() => {
    const currentNft = this.nft();
    if (!currentNft) return '';
    const imageType = this.getTraitValue(currentNft, this.validTraits.IMAGETYPE);
    if (imageType === VIEW_TYPES.PROGRESS || imageType === VIEW_TYPES.DETAIL) {
      return `(${imageType})`;
    }
    return this.displayingIndex() === ArtworkDomain.getLatestVersionIndex(this.nfts())
      ? ''
      : `(${VIEW_TYPES.PROGRESS})`;
  });
  readonly qualityImg: Signal<string> = computed(() => ArtworkDomain.getNftQualityUrl(this.nft().image));
  readonly sold: Signal<boolean> = computed(() => SOLDCERTIFICATES.includes(this.nft().tokenId))

  readonly isFading: WritableSignal<boolean> = signal(false);

  private getTraitValue(nft: Nft, trait: VALIDTRAITS): string {
    return ArtworkDomain.getTraitValue(nft, trait);
  }

  indexChanged(index: number): void {
    this.isFading.set(true);
    setTimeout(() => {
      this.displayingIndex.set(index);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => this.isFading.set(false), 300); 
    }, 150);
  }

  handleSelectedItem(tokenId: string): void {
    this.router.navigate(['/art', tokenId]);
  }
}
