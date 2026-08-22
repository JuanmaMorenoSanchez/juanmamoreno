import {
  Component,
  computed,
  effect,
  inject,
  signal,
  Signal,
  viewChild,
  WritableSignal,
} from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { toSignal } from '@angular/core/rxjs-interop';

import { SOLDCERTIFICATES, VALIDTRAITS, VIEW_TYPES } from '@domain/artwork/artwork.constants';
import { Nft, NftFilters } from '@domain/artwork/artwork.entity';
import { ARTWORK_PORT } from '@domain/artwork/artwork.token';
import { Descriptions } from '@domain/artwork/descriptions.entity';
import { ArtPiecesListComponent } from '@features/artworks/art-pieces-list.component';
import { BackButtonComponent } from '@shared/components/back-button/back-button.component';
import { PdfButtonComponent } from '@shared/components/pdf-button/pdf-button.component';
import { SORT } from '@shared/constants/order.constants';
import { ResponsiveService } from '@shared/services/responsive.service';
import { LanguageUrlService } from '@shared/services/language-url.service';
import { SeoTitleStrategy } from '@shared/services/seo-title.strategy';
import { map, switchMap } from 'rxjs';
import { ArtworkCriticComponent } from './components/artwork-critic/artwork-critic.component';
import { DownloadButtonComponent } from './components/download-button/download-button.component';
import { ImageViewerComponent } from './components/image-viewer/image-viewer.component';
import { LinksButtonComponent } from './components/links-button/links-button.component';
import { QuoteButtonComponent } from './components/quote-button/quote-button.component';
import { TraitPipe } from './pipes/traits.pipe';

// Sentinel returned when an artwork has no generated description yet.
const NO_DESCRIPTION = 'No description available';

@Component({
  selector: 'app-art-piece',
  templateUrl: './art-piece.component.html',
  styleUrls: ['./art-piece.component.scss'],
  standalone: true,
  imports: [
    ImageViewerComponent,
    RouterLink,
    MatTooltip,
    MatIconButton,
    MatIcon,
    DownloadButtonComponent,
    PdfButtonComponent,
    LinksButtonComponent,
    QuoteButtonComponent,
    MatDivider,
    ArtPiecesListComponent,
    TranslatePipe,
    TraitPipe,
    BackButtonComponent,
    ArtworkCriticComponent,
  ],
})
export class ArtPieceComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private artworkService = inject(ARTWORK_PORT);
  private responsiveService = inject(ResponsiveService);
  private translateService = inject(TranslateService);
  private seo = inject(SeoTitleStrategy);
  private language = inject(LanguageUrlService);

  readonly validTraits = VALIDTRAITS;
  readonly numberOfViewMoreColumns: Signal<number> = toSignal(
    this.responsiveService.displayMobileLayout.pipe(map((display) => (display ? 6 : 3))),
    { initialValue: 3 }
  );
  readonly nfts: Signal<Nft[]> = toSignal(
    this.route.paramMap.pipe(
      map((paramMap) => paramMap.get('id')!),
      switchMap((id: string) => {
        return this.artworkService.getArtworkViewsObservable(id);
      })
    ),
    { initialValue: [] }
  );

  readonly frontalViewNft: Signal<Nft | undefined> = computed(
    () =>
      this.artworkService.getLatestVersion(
        this.artworkService.filterFrontalArtworks(this.nfts())
      ) ?? undefined
  );

  defaultDisplayIndex = computed(() =>
    this.nfts().findIndex((nft) => nft.tokenId === this.frontalViewNft()?.tokenId)
  );
  readonly displayingIndex: WritableSignal<number> = signal(this.defaultDisplayIndex() || 0);

  readonly nft: Signal<Nft> = computed(() => this.nfts()[this.displayingIndex()]);
  readonly tokenId = computed(() => this.nft()?.tokenId);

  readonly descriptions = signal<Descriptions | null>(null);
  readonly description = computed(() => {
    const descriptions = this.descriptions();
    return this.shortDescription(descriptions, this.language.contentLanguage());
  });

  readonly hasMoreFromSameYear: Signal<boolean> = computed(() => {
    const year = this.artworkService.getTraitValue(this.nft(), VALIDTRAITS.YEAR);
    return this.artworkService.countCatalogueArtworksInYear(year) > 1;
  });
  readonly sameYearFilter: Signal<NftFilters> = computed(() => ({
    years: [this.getTraitValue(this.nft(), VALIDTRAITS.YEAR)],
    idsToExclude: this.nfts().map((n) => n.tokenId),
  }));
  readonly viewLabel: Signal<string> = computed(() => {
    const currentNft = this.nft();
    if (!currentNft) return '';
    const imageType = this.getTraitValue(currentNft, this.validTraits.IMAGETYPE);
    if (imageType === VIEW_TYPES.PROGRESS || imageType === VIEW_TYPES.DETAIL) {
      return `(${imageType})`;
    }

    return currentNft.tokenId === this.frontalViewNft()?.tokenId ? '' : `(${VIEW_TYPES.PROGRESS})`;
  });
  readonly qualityUrls: Signal<string[]> = computed(() => {
    const nft = this.nft();
    return nft ? this.artworkService.getNftFetchableUrls(nft.image) : [];
  });
  readonly sold: Signal<boolean> = computed(() => SOLDCERTIFICATES.includes(this.tokenId()));

  // The essay is set to the width the viewer gives the artwork itself, so the
  // text block sits exactly under the image rather than under the container.
  // Read from the viewer instead of recomputed here: it narrows the frame to
  // the image's real decoded ratio once it loads, and the two must not diverge.
  private readonly imageViewer = viewChild(ImageViewerComponent);
  readonly frameWidth = computed(() => this.imageViewer()?.frameWidth() ?? '100%');

  // Every artwork represented by its frontal view, newest year first — the same
  // ordering the "more on {year}" list at the bottom uses. Walking this flat
  // sequence is how the "next artwork" button advances through the current year
  // and then rolls into the first piece of the previous (older) year.
  private readonly allArtPieces: Signal<Nft[]> = toSignal(
    this.artworkService.getArtPiecesObservable(),
    { initialValue: [] }
  );
  private readonly orderedFrontalPieces: Signal<Nft[]> = computed(() => {
    const all = this.allArtPieces();
    const byName = new Map<string, Nft[]>();
    for (const piece of all) {
      const group = byName.get(piece.name);
      if (group) group.push(piece);
      else byName.set(piece.name, [piece]);
    }
    const frontals = all.filter((piece) =>
      this.artworkService.isFrontalView(piece, byName.get(piece.name) ?? [])
    );
    // Stable sort keeps within-year store order, matching the bottom list.
    return this.artworkService.sortByYear(frontals, SORT.DESC);
  });
  readonly hasNextArtPiece: Signal<boolean> = computed(
    () => this.orderedFrontalPieces().length > 1
  );

  constructor() {
    effect(() => {
      this.displayingIndex.set(this.defaultDisplayIndex() || 0);
    });

    effect(() => {
      this.displayingIndex(); // read to scroll back up when the view changes
      if (typeof window === 'undefined') return; // nothing to scroll in a build
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    effect(() => {
      const token = this.tokenId();
      // Undefined until the artwork has loaded. Asking anyway fetched
      // /descriptions/undefined, which the backend answers with a 500 — once
      // per page view, and once per prerendered page at build time.
      if (!token) return;
      this.artworkService.getArtPieceDescriptions(token).subscribe((data) => {
        this.descriptions.set(data);
      });
    });

    // Title each artwork page by its own name so the many /artwork/:id pages are
    // distinct to search. For the meta description, prefer the artwork's own
    // (localized) generated description when it has loaded; otherwise fall back
    // to one built from its year and medium.
    effect(() => {
      const nft = this.nft();
      if (!nft?.name) return;
      const description = this.seoDescription(nft);
      const image = nft.image?.cachedUrl || nft.image?.thumbnailUrl;
      this.seo.setPageTitle(nft.name, description, image);
      this.seo.setArtworkStructuredData({
        name: nft.name,
        url: `https://juanmamoreno.com/artwork/${nft.tokenId}/`,
        image,
        description,
        year: this.getTraitValue(nft, VALIDTRAITS.YEAR),
        medium: this.translateService.instant(this.getTraitValue(nft, VALIDTRAITS.MEDIUM)),
        width: this.getTraitValue(nft, VALIDTRAITS.WIDTH),
        height: this.getTraitValue(nft, VALIDTRAITS.HEIGHT),
        unit: this.getTraitValue(nft, VALIDTRAITS.UNIT),
      });
    });
  }

  private seoDescription(nft: Nft): string {
    const generated = this.description();
    if (generated && generated !== NO_DESCRIPTION) return generated;

    const year = this.getTraitValue(nft, VALIDTRAITS.YEAR);
    const medium = this.translateService.instant(this.getTraitValue(nft, VALIDTRAITS.MEDIUM));
    const details = [year, medium].filter(Boolean).join(', ');
    const by = this.translateService.instant('seo.artworkBy');
    return details ? `${nft.name} — ${details}. ${by}` : `${nft.name}. ${by}`;
  }

  private getTraitValue(nft: Nft, trait: VALIDTRAITS): string {
    return this.artworkService.getTraitValue(nft, trait);
  }

  private shortDescription(descriptions: Descriptions | null, language: string): string {
    const match = descriptions?.translated.find((entry) => entry.lang === language);
    return match?.shortDesc || NO_DESCRIPTION;
  }

  // Advances to the next artwork in the year sequence; at the last piece of a
  // year it continues into the first piece of the previous (older) year, and
  // wraps from the very last artwork back to the first (newest).
  goToNextArtPiece(): void {
    const ordered = this.orderedFrontalPieces();
    if (ordered.length <= 1) return;
    const currentName = this.nft()?.name;
    const index = ordered.findIndex((piece) => piece.name === currentName);
    if (index === -1) return;
    const next = ordered[(index + 1) % ordered.length];
    this.router.navigate(['/artwork', next.tokenId]);
  }
}
