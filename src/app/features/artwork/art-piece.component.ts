import {
  Component,
  computed,
  effect,
  inject,
  signal,
  Signal,
  untracked,
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

import { VALIDTRAITS, VIEW_TYPES } from '@domain/artwork/artwork.constants';
import { SoldToggleComponent } from './components/sold-toggle/sold-toggle.component';
import { AvailabilityService } from '@shared/services/availability.service';
import { Nft, NftFilters } from '@domain/artwork/artwork.entity';
import { ARTWORK_PORT } from '@domain/artwork/artwork.token';
import { metaDescription } from '@domain/seo/meta-description';
import { Descriptions } from '@domain/artwork/descriptions.entity';
import { ArtPiecesListComponent } from '@features/artworks/art-pieces-list.component';
import { BackButtonComponent } from '@shared/components/back-button/back-button.component';
import { PdfButtonComponent } from '@shared/components/pdf-button/pdf-button.component';
import { ShareButtonComponent } from '@shared/components/share-button/share-button.component';
import { SORT } from '@shared/constants/order.constants';
import { LanguageUrlService } from '@shared/services/language-url.service';
import { ArtworkRecordService } from '@shared/services/artwork-record.service';
import { PostedArtworksService } from '@shared/services/posted-artworks.service';
import { SeoTitleStrategy } from '@shared/services/seo-title.strategy';
import { map, switchMap } from 'rxjs';
import { ArtworkCriticComponent } from './components/artwork-critic/artwork-critic.component';
import { ArtworkRecordComponent } from './components/artwork-record/artwork-record.component';
import { CertificateButtonComponent } from './components/certificate-button/certificate-button.component';
import { DownloadButtonComponent } from '@shared/components/download-button/download-button.component';
import { ImageViewerComponent } from './components/image-viewer/image-viewer.component';
import { LinksButtonComponent } from './components/links-button/links-button.component';
import { QuoteButtonComponent } from './components/quote-button/quote-button.component';
import { WhatsappButtonComponent } from './components/whatsapp-button/whatsapp-button.component';
import { TraitPipe } from './pipes/traits.pipe';

// Sentinel returned when an artwork has no generated description yet.
const NO_DESCRIPTION = 'No description available';

/**
 * The fewest thumbnails the strip under a painting offers, before the rule
 * about whole rows and the rule about two years have their say.
 *
 * A count rather than a number of rows: two rows is twelve on a desktop and
 * six on a phone, and a phone is where a reader is most likely to be walking
 * the catalogue rather than scanning it.
 */
const LEAST_THUMBNAILS = 12;

/**
 * The row the count has to come out even against.
 *
 * The strip is six across above 600px and three below it, and css decides
 * which — this page cannot know, and when it tried to know, it asked
 * BreakpointObserver, which has no window to measure during the prerender. So
 * every artwork page was written out for six columns and re-laid out to three
 * on arrival on a phone.
 *
 * Six is a multiple of three, so a count that fills whole rows of six fills
 * whole rows of three as well, and the rule holds at both widths without
 * anybody measuring anything.
 */
const THUMBNAILS_PER_ROW = 6;

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
    WhatsappButtonComponent,
    MatDivider,
    ArtPiecesListComponent,
    TranslatePipe,
    TraitPipe,
    BackButtonComponent,
    ShareButtonComponent,
    ArtworkCriticComponent,
    ArtworkRecordComponent,
    CertificateButtonComponent,
    SoldToggleComponent,
  ],
  // On the document rather than on this element: the page is read by
  // scrolling, so by the time a reader wants the next painting the focus is
  // usually on nothing in particular, and a listener on the component would
  // answer only while something inside it happened to be focused.
  host: { '(document:keydown)': 'walkByKey($event)' },
})
export class ArtPieceComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private artworkService = inject(ARTWORK_PORT);
  private translateService = inject(TranslateService);
  private seo = inject(SeoTitleStrategy);
  private language = inject(LanguageUrlService);

  readonly validTraits = VALIDTRAITS;
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

  /**
   * Where this painting can be seen on Instagram, if it has been posted.
   *
   * The other half of the traffic: the post cannot link here, because an
   * Instagram caption is dead text, so the page links there instead. Null for
   * most of the catalogue — most of it has never been posted, and anything
   * posted before the address of a post was kept has none recorded.
   */
  private readonly postedArtworks = inject(PostedArtworksService);
  private readonly availability = inject(AvailabilityService);
  readonly instagramPost = signal<string | null>(null);

  readonly descriptions = signal<Descriptions | null>(null);
  readonly description = computed(() => {
    const descriptions = this.descriptions();
    return this.shortDescription(descriptions, this.language.contentLanguage());
  });

  /**
   * The paintings shown under this one: the catalogue either side of it.
   *
   * **It is how the catalogue is walked.** A reader who has opened one
   * painting should be able to reach the one before it and the one after it
   * from the thumbnails at the foot of the page, and keep going, from the
   * oldest work to the newest or the other way, without returning to the
   * catalogue once. So this is a window on the whole catalogue in year order,
   * centred on the painting being read — half of it newer, half older — rather
   * than a selection from its year. Both directions are always on the page,
   * and only the two ends of the catalogue have one side to offer.
   *
   * It was the painting's own year and nothing else: a dead end wherever the
   * year held one painting, and no way out of a year in either direction.
   *
   * Three rules decide how many. **Twelve at least, and two full rows at
   * least** — on a desktop twelve is the two rows, on a phone, at three
   * columns, it is four of them. **Two years at least**, however many the
   * middle of a busy year has to offer: a grid drawn entirely from one year
   * does not show a reader where they are. **And no half-empty row** — the
   * window grows to the end of the row rather than leaving a gap. Short only
   * at the very ends, where the catalogue itself runs out.
   */
  private readonly nearbyWindow = computed(() => {
    const nothing = { pieces: [] as Nft[], older: false, newer: false };
    // Newest first, one entry per painting. The same sequence the "next
    // artwork" button walks, so the two cannot disagree about what is next.
    const all = this.orderedFrontalPieces();
    const name = this.nft()?.name;
    const at = name ? all.findIndex((piece) => piece.name === name) : -1;
    if (at === -1 || all.length < 2) return nothing;

    const others = [...all.slice(0, at), ...all.slice(at + 1)];
    const yearOf = (piece: Nft) => this.getTraitValue(piece, VALIDTRAITS.YEAR);

    // `at` is where this painting was: everything before it in `others` is
    // newer, everything from it on is older. A side that runs out gives its
    // share to the other, so the count holds at the ends of the catalogue.
    const startOf = (size: number) => {
      const older = Math.min(others.length - at, size - Math.min(at, Math.floor(size / 2)));
      const newer = Math.min(at, size - older);
      return at - newer;
    };
    const windowOf = (wanted: number): Nft[] => {
      const size = Math.min(wanted, others.length);
      const from = startOf(size);
      return others.slice(from, from + size);
    };

    const columns = THUMBNAILS_PER_ROW;
    let take = Math.max(LEAST_THUMBNAILS, 2 * columns);
    while (take < others.length && new Set(windowOf(take).map(yearOf)).size < 2) take += 1;
    const short = Math.min(take, others.length) % columns;
    if (short) take = Math.min(others.length, take + columns - short);

    // Where the reader has paged to, in whole windows, from the one centred
    // on this painting. Later in `others` is older, so a positive page is
    // further back.
    const size = Math.min(take, others.length);
    const room = others.length - size;
    const from = Math.min(Math.max(startOf(size) + this.stripPage() * size, 0), Math.max(room, 0));

    return {
      pieces: others.slice(from, from + size),
      older: from + size < others.length,
      newer: from > 0,
    };
  });

  readonly nearbyPieces: Signal<Nft[]> = computed(() => this.nearbyWindow().pieces);
  readonly hasOlderNearby: Signal<boolean> = computed(() => this.nearbyWindow().older);
  readonly hasNewerNearby: Signal<boolean> = computed(() => this.nearbyWindow().newer);

  /**
   * How far the thumbnails have been paged from the painting they belong to.
   *
   * Clicking a thumbnail moves the reader half a window, because the next
   * window is centred on where they landed — so half of what they see is
   * what they just saw, and the strip reads as stuck even while it is
   * moving. These two take the window a whole step at a time without leaving
   * the painting, which is the difference between browsing the catalogue and
   * opening twelve pages to cross it.
   *
   * Back to zero whenever the painting changes: the window belongs to the
   * painting, and a page number carried onto the next one would open it
   * somewhere else in the catalogue for no reason the reader could see.
   */
  private readonly stripPage = signal(0);

  protected showOlderNearby(): void {
    this.stripPage.update((page) => page + 1);
  }

  protected showNewerNearby(): void {
    this.stripPage.update((page) => page - 1);
  }

  readonly hasMoreArtworks: Signal<boolean> = computed(() => this.nearbyPieces().length > 0);
  readonly nearbyFilter: Signal<NftFilters> = computed(() => ({
    idsToInclude: this.nearbyPieces().map((piece) => piece.tokenId),
  }));
  /** The heading's own words: the years the thumbnails under it come from. */
  readonly nearbySpan: Signal<string> = computed(() => {
    const years = [
      ...new Set(this.nearbyPieces().map((piece) => this.getTraitValue(piece, VALIDTRAITS.YEAR))),
    ]
      .filter(Boolean)
      .sort();
    if (!years.length) return '';
    const first = years[0];
    const last = years[years.length - 1];
    return first === last ? first : `${first}–${last}`;
  });
  readonly viewLabel: Signal<string> = computed(() => {
    const currentNft = this.nft();
    if (!currentNft) return '';
    const imageType = this.getTraitValue(currentNft, this.validTraits.IMAGETYPE);
    if (imageType === VIEW_TYPES.PROGRESS || imageType === VIEW_TYPES.DETAIL) {
      return `(${imageType})`;
    }

    return currentNft.tokenId === this.frontalViewNft()?.tokenId ? '' : `(${VIEW_TYPES.PROGRESS})`;
  });
  /**
   * The painting in one line — year, medium, size — as the page prints it
   * under the title. Handed to the share button, so passing a painting on
   * says what it is rather than only where it lives.
   */
  readonly technicalLine: Signal<string> = computed(() => this.lineFor(this.nft()));

  /**
   * The painting, not the photograph of it being looked at.
   *
   * Every photograph of an artwork is its own token — frontal view, detail, the
   * canvas caught half-finished — and anything that belongs to the *painting*
   * has to ask by the painting's token rather than by whichever photograph the
   * viewer happens to be showing. Two things do:
   *
   * **The certificate.** The seal used the token on screen, so pressing it
   * while looking at a detail produced a certificate of that detail, with the
   * detail's own photograph in it.
   *
   * **The record.** It is kept against the painting's own token — all 37 of
   * them are — so switching to a detail inside the viewer emptied the section:
   * the detail has no record of its own and never will, because what was
   * exhibited and sold is the painting.
   *
   * Falls back to what is on screen, which is what it always did, for the case
   * that has no frontal view at all.
   */
  readonly paintingNft: Signal<Nft> = computed(() => this.frontalViewNft() ?? this.nft());
  readonly certificateLine: Signal<string> = computed(() => this.lineFor(this.paintingNft()));

  private lineFor(nft: Nft | undefined): string {
    if (!nft) return '';
    const year = this.getTraitValue(nft, VALIDTRAITS.YEAR);
    const medium = this.translateService.instant(this.getTraitValue(nft, VALIDTRAITS.MEDIUM));
    const height = this.getTraitValue(nft, VALIDTRAITS.HEIGHT);
    const width = this.getTraitValue(nft, VALIDTRAITS.WIDTH);
    const unit = this.getTraitValue(nft, VALIDTRAITS.UNIT);
    // Both sides are needed for a measurement to say anything; the unit is
    // not, and its absence beats a wrong guess at one.
    const size = height && width ? `${height} x ${width}${unit ? ` ${unit}` : ''}` : '';
    return [year, medium, size].filter(Boolean).join(', ');
  }

  readonly qualityUrls: Signal<string[]> = computed(() => {
    const nft = this.nft();
    return nft ? this.artworkService.getNftFetchableUrls(nft.image) : [];
  });
  readonly sold: Signal<boolean> = computed(() => this.availability.isSold(this.tokenId()));

  /**
   * Whether the dot belongs here, beside the measurements.
   *
   * It does not when the record below says the same thing with more: a line
   * naming the year and the buyer carries the dot itself, and the two of them
   * said a painting had sold twice on one page. Still here for a painting
   * marked sold with no record of it, which is most of them — the mark is his
   * switch, and the record is a sentence he writes separately.
   */
  private readonly records = inject(ArtworkRecordService);
  readonly soldInTheRecord: Signal<boolean> = computed(() =>
    this.records.of(this.paintingNft()?.tokenId ?? '').some((entry) => entry.kind === 'sold')
  );
  readonly showSoldDot: Signal<boolean> = computed(() => this.sold() && !this.soldInTheRecord());

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

  /**
   * The token whose page stands for this painting.
   *
   * The frontal view of the group sharing this name — the same one the
   * catalogue puts a tile on — so the page search keeps is the page a reader
   * arrives at from anywhere else on the site. Falls back to the artwork itself
   * while the catalogue has not loaded, which is the honest answer: with
   * nothing to compare against, this page is all there is.
   */
  private canonicalTokenFor(nft: Nft): string {
    const sameName = this.nfts().filter((piece) => piece.name === nft.name);
    if (sameName.length < 2) return nft.tokenId;
    const frontal = sameName.find((piece) => this.artworkService.isFrontalView(piece, sameName));
    return frontal?.tokenId ?? nft.tokenId;
  }

  constructor() {
    effect(() => {
      this.displayingIndex.set(this.defaultDisplayIndex() || 0);
    });

    // The thumbnails belong to the painting on screen, so the page they are
    // showing is dropped with it.
    effect(() => {
      const painting = this.nft()?.name;
      if (painting === undefined) return;
      untracked(() => this.stripPage.set(0));
    });

    effect(() => {
      this.displayingIndex(); // read to scroll back up when the view changes
      if (typeof window === 'undefined') return; // nothing to scroll in a build
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    effect(() => {
      const token = this.tokenId();
      // The same rule as the description below: what belongs to the painting
      // before this one must not be left standing over this one.
      untracked(() => this.instagramPost.set(null));
      if (!token) return;
      this.postedArtworks.getInstagramPermalink(token).subscribe((permalink) => {
        if (this.tokenId() === token) this.instagramPost.set(permalink);
      });
    });

    effect(() => {
      const token = this.tokenId();
      // Dropped before the next is asked for. This component is reused as the
      // reader moves between paintings, so a description left standing is the
      // previous painting's — and it is what the viewer announces as the
      // image's alt text and what the page offers search as its description.
      untracked(() => this.descriptions.set(null));
      // Undefined until the artwork has loaded. Asking anyway fetched
      // /descriptions/undefined, which the backend answers with a 500 — once
      // per page view, and once per prerendered page at build time.
      if (!token) return;
      this.artworkService.getArtPieceDescriptions(token).subscribe((data) => {
        // A slow answer for the painting before this one must not land on it.
        if (this.tokenId() === token) this.descriptions.set(data);
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
      // The tag gets what a search result has room for; the structured data
      // below gets the whole thing, where there is no such limit and where a
      // machine reading about the painting benefits from all of it.
      this.seo.setPageTitle(nft.name, metaDescription(description), image, 'article');
      // Several photographs of one painting mean several token ids opening the
      // same page. Whichever is asked for, the painting's own page is named as
      // the original, so search has one address for one work rather than up to
      // seven that it must choose between.
      const original = this.canonicalTokenFor(nft);
      this.seo.pointCanonicalAt(this.language.link(`artwork/${original}`));
      this.seo.setArtworkStructuredData({
        name: nft.name,
        // The page's own address, in the page's own language. Written without
        // the prefix this said /artwork/23/ on the Spanish page as well, which
        // contradicted that page's canonical and put an English trail — Home,
        // Paintings — at the foot of every Spanish painting.
        url: `https://juanmamoreno.com${this.language.link(`artwork/${nft.tokenId}`)}/`,
        image,
        description,
        year: this.getTraitValue(nft, VALIDTRAITS.YEAR),
        medium: this.translateService.instant(this.getTraitValue(nft, VALIDTRAITS.MEDIUM)),
        width: this.getTraitValue(nft, VALIDTRAITS.WIDTH),
        height: this.getTraitValue(nft, VALIDTRAITS.HEIGHT),
        unit: this.getTraitValue(nft, VALIDTRAITS.UNIT),
        // The same answer the dot beside the caption gives, so the two cannot
        // disagree about a painting.
        sold: this.sold(),
        // Its certificate carries the same number.
        tokenId: nft.tokenId,
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
    this.step(1);
  }

  /**
   * The same walk, backwards.
   *
   * There was only the one button, so the catalogue could be walked in one
   * direction and the way back was the browser's own. Both ways now, from the
   * same sequence the thumbnails at the foot of the page are a window on.
   */
  goToPreviousArtPiece(): void {
    this.step(-1);
  }

  /**
   * Shift and an arrow walks the catalogue from the keyboard.
   *
   * The buttons were reachable by tab already — they are buttons — but that is
   * eleven tab stops from the top of the page to reach the one control a
   * reader walking the catalogue presses over and over.
   *
   * Shift because the bare arrows are taken: inside the viewer they move
   * between the photographs of *this* painting, and the shifted pair reads as
   * the same gesture one level up. Angular's `keydown.arrowRight` requires an
   * exact modifier match, so the two cannot both fire.
   *
   * Never while anything is being typed into. He edits the record on this
   * page, and Shift and an arrow in a text box selects a character.
   */
  protected walkByKey(event: KeyboardEvent): void {
    if (!event.shiftKey || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;

    const from = event.target as HTMLElement | null;
    if (from?.closest('input, textarea, select, [contenteditable="true"]')) return;

    event.preventDefault();
    this.step(event.key === 'ArrowRight' ? 1 : -1);
  }

  private step(by: 1 | -1): void {
    const ordered = this.orderedFrontalPieces();
    if (ordered.length <= 1) return;
    const currentName = this.nft()?.name;
    const index = ordered.findIndex((piece) => piece.name === currentName);
    if (index === -1) return;
    const next = ordered[(index + by + ordered.length) % ordered.length];
    // In the language being read: `/artwork/5` is an English address, and
    // pressing next on a Spanish page used to answer in English.
    this.router.navigateByUrl(this.language.link(`artwork/${next.tokenId}`));
  }
}
