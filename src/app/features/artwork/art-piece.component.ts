import {
  Component,
  computed,
  effect,
  inject,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatTooltip } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { toSignal } from '@angular/core/rxjs-interop';

import {
  SOLDCERTIFICATES,
  VALIDTRAITS,
  VIEW_TYPES,
} from '@domain/artwork/artwork.constants';
import { Nft, NftFilters } from '@domain/artwork/artwork.entity';
import { ARTWORK_PORT } from '@domain/artwork/artwork.token';
import { Descriptions } from '@domain/artwork/descriptions.entity';
import { ArtPiecesListComponent } from '@features/artworks/art-pieces-list.component';
import { BackButtonComponent } from '@shared/components/back-button/back-button.component';
import { PdfButtonComponent } from '@shared/components/pdf-button/pdf-button.component';
import { ResponsiveService } from '@shared/services/responsive.service';
import { map, switchMap } from 'rxjs';
import { DownloadButtonComponent } from './components/download-button/download-button.component';
import { ImageViewerComponent } from './components/image-viewer/image-viewer.component';
import { LinksButtonComponent } from './components/links-button/links-button.component';
import { TraitPipe } from './pipes/traits.pipe';

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
    TraitPipe,
    BackButtonComponent,
  ],
})
export class ArtPieceComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private artworkService = inject(ARTWORK_PORT);
  private responsiveService = inject(ResponsiveService);
  private translateService = inject(TranslateService);

  readonly validTraits = VALIDTRAITS;
  readonly numberOfViewMoreColumns: Signal<number> = toSignal(
    this.responsiveService.displayMobileLayout.pipe(
      map((display) => (display ? 6 : 3))
    ),
    { initialValue: 3 }
  );
  readonly nfts: Signal<Nft[]> = toSignal(
    this.route.paramMap.pipe(
      map((paramMap) => paramMap.get('id')!),
      switchMap((id: string) => {
        return this.artworkService.getSameArtThanObservable(id);
      })
    ),
    { initialValue: [] }
  );

  defaultDisplayIndex = computed(() => {
    const nfts = this.nfts();
    const latestFrontalNft = this.artworkService.getLatestVersion(
      this.artworkService.filterFrontalArtworks(nfts)
    );
    return nfts.findIndex((nft) => nft.tokenId === latestFrontalNft?.tokenId);
  });
  readonly displayingIndex: WritableSignal<number> = signal(
    this.defaultDisplayIndex() || 0
  );

  readonly nft: Signal<Nft> = computed(
    () => this.nfts()[this.displayingIndex()]
  );
  readonly tokenId = computed(() => this.nft()?.tokenId);

  readonly currentLang = signal(
    this.translateService.currentLang === 'es-ES' ? 'es' : 'en'
  );

  readonly descriptions = signal<Descriptions | null>(null);
  readonly description = computed(() => {
    const descriptions = this.descriptions();
    const currentLang = this.currentLang();
    return this.getShortDescription(descriptions, currentLang);
  });

  readonly frontalViewNft: Signal<Nft | undefined> = computed(() =>
    this.nfts().find((nft) =>
      this.artworkService.isFrontalView(nft, this.nfts())
    )
  );
  readonly thereAreMoreInYear: Signal<boolean> = computed(() => {
    const year = this.artworkService.getTraitValue(
      this.nft(),
      VALIDTRAITS.YEAR
    );
    return this.artworkService.getFullNftLenghtByYear(year) > 1;
  });
  readonly getSameYearListFilter: Signal<NftFilters> = computed(() => ({
    years: [this.getTraitValue(this.nft(), VALIDTRAITS.YEAR)],
    idsToExclude: this.nfts().map((n) => n.tokenId),
  }));
  readonly viewLabel: Signal<string> = computed(() => {
    const currentNft = this.nft();
    if (!currentNft) return '';
    const imageType = this.getTraitValue(
      currentNft,
      this.validTraits.IMAGETYPE
    );
    if (imageType === VIEW_TYPES.PROGRESS || imageType === VIEW_TYPES.DETAIL) {
      return `(${imageType})`;
    }

    const latestFrontalNft = this.artworkService.getLatestVersion(
      this.artworkService.filterFrontalArtworks(this.nfts())
    );
    return this.nft().tokenId === latestFrontalNft?.tokenId
      ? ''
      : `(${VIEW_TYPES.PROGRESS})`;
  });
  readonly qualityImg: Signal<string> = computed(() =>
    this.artworkService.getNftQualityUrl(this.nft().image)
  );
  readonly sold: Signal<boolean> = computed(() =>
    SOLDCERTIFICATES.includes(this.tokenId())
  );

  readonly isFading: WritableSignal<boolean> = signal(false);

  constructor() {
    this.translateService.onLangChange.subscribe(({ lang }) => {
      this.currentLang.set(lang === 'es-ES' ? 'es' : 'en');
    });

    effect(() => {
      this.displayingIndex.set(this.defaultDisplayIndex() || 0);
    });

    effect(() => {
      const index = this.displayingIndex();
      this.isFading.set(true);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => this.isFading.set(false), 300);
      }, 150);
    });

    effect(() => {
      const token = this.tokenId();
      this.artworkService.getArtPieceDescriptions(token).subscribe((data) => {
        this.descriptions.set(data);
      });
    });
  }

  private getTraitValue(nft: Nft, trait: VALIDTRAITS): string {
    return this.artworkService.getTraitValue(nft, trait);
  }

  private getShortDescription(
    descriptions: Descriptions | null,
    lang: string
  ): string {
    if (!descriptions) return 'No description available';
    return (
      descriptions.translated.find((t) => t.lang === lang)?.shortDesc ||
      'No description available'
    );
  }

  handleSelectedItem(tokenId: string): void {
    this.router.navigate(['/art', tokenId]);
  }
}
