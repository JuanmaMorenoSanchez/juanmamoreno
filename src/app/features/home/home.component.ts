import {
  AfterViewInit,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { VersionService } from '@shared/services/version.service';
import { APP_VERSION } from '../../../version';
import { Nft } from '@domain/artwork/artwork.entity';
import { ARTWORK_PORT } from '@domain/artwork/artwork.token';
import { HeroTitleService } from '@shared/services/hero-title.service';
import { LanguageUrlService } from '@shared/services/language-url.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { environment } from '@environments/environment';
import { Subscription, takeLast } from 'rxjs';

/**
 * One painting on a wall, with the card that belongs to it.
 *
 * The name and the one-line statement are signage — small, high, left — and
 * the painting is the headline. It deliberately loads only one artwork image,
 * not the whole catalogue, so the first paint is cheap; the hang lives at
 * /artworks.
 *
 * **The painting no longer moves.** It used to drift on a 22-second loop, or
 * lean towards the pointer where there was one, and both began by scaling it
 * past the edges of its own frame — so the landing page cropped about five per
 * cent off a painting in order to have somewhere to wander. A hung work is
 * still. What is left is the one arrival, on the site's clock.
 *
 * While its hero name is on screen the top bar's duplicate brand is hidden (via
 * HeroTitleService), so the title never appears twice at once.
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [RouterLink, TranslatePipe],
})
export class HomeComponent implements AfterViewInit {
  // Printed small at the foot of the page: this build, and the build of the
  // backend answering it.
  protected readonly appVersion = APP_VERSION;
  protected readonly apiVersion = inject(VersionService).apiVersion;

  private artworkService = inject(ARTWORK_PORT);
  private heroTitle = inject(HeroTitleService);
  private lang = inject(LanguageUrlService);
  private translate = inject(TranslateService);

  /**
   * The featured painting, at the address for the language being read.
   *
   * Written as "/artwork/5" this was the one link on the site that moved a
   * Spanish reader into English — and the most prominent one there is, since
   * it is most of the landing page. The catalogue grid has always built its
   * links this way; the hero did not.
   */
  protected artworkLink(tokenId: string): string {
    return this.lang.link(`artwork/${tokenId}`);
  }

  /** The way out of the room, in the language being read. */
  protected readonly allPaintingsLink = this.lang.link('artworks');

  @ViewChild('heroTitle') private heroTitleRef!: ElementRef<HTMLElement>;
  private observer?: IntersectionObserver;

  private readonly artPieces = toSignal(this.artworkService.getArtPiecesObservable(), {
    initialValue: [] as Nft[],
  });

  /**
   * The painting on the landing page.
   *
   * One he has chosen, when `homeTokenId` names one, and otherwise the newest
   * frontal view — the automatic pick that keeps the page curated with no
   * upkeep at all, and the right answer whenever he has not said otherwise.
   *
   * A name that is not in the catalogue is ignored rather than obeyed. The
   * catalogue arrives after the page does and a token can be retired, and
   * neither is a reason for the landing page to have no painting on it.
   *
   * Same frontal-view and sort-by-year logic the detail page uses to order
   * pieces, so what counts as "the painting" is decided in one place.
   */
  readonly featured = computed<Nft | undefined>(() =>
    this.artworkService.featuredArtwork(this.artPieces(), environment.homeTokenId)
  );

  // Blur-up (same idea as the artwork viewer's preview layer): the small
  // thumbnail is shown blurred at full hero size first — fast — then the
  // full-resolution image fades in over it.
  readonly featuredThumb = signal<string | null>(null);
  readonly featuredFull = signal<string | null>(null);
  readonly fullLoaded = signal(false);
  private hiResSub?: Subscription;

  // Reserves the hero at full size before the low-res preview arrives, which
  // would otherwise shrink the frame to the thumbnail's natural size.
  private readonly decodedAspect = signal<number | null>(null);
  readonly featuredAspect = computed(
    () => this.decodedAspect() ?? this.artworkService.getAspectRatio(this.featured())
  );

  /**
   * The three facts on the card beside the work.
   *
   * Built in the domain so the catalogue and the painting's own page say the
   * same things in the same order; the medium arrives as its translation key
   * and the template resolves it.
   */
  readonly label = computed(() => this.artworkService.cartela(this.featured()));

  /**
   * The card's middle line: what it is made of, and when.
   *
   * Joined here rather than in the template. Written there it was a pipe, an
   * `@if` for the comma and an interpolation, and the formatter — rightly,
   * for html — put each on its own line; the whitespace between them collapses
   * to a space in the rendered page, so the label read "ÓLEO SOBRE TELA ,
   * 2026". A separator is a string, not a layout.
   */
  readonly labelLine = computed(() => {
    const { medium, year } = this.label();
    return [medium ? this.translate.instant(medium) : '', year].filter(Boolean).join(', ');
  });
  /**
   * The painting's shape, handed to the stylesheet rather than measured by it.
   *
   * The plate used to be sized by a width this component computed, capped at
   * 34rem — 544px, on any screen, which is why the landing painting was a
   * postcard on a desktop. The stylesheet now drives it by height, because
   * that is what "hung" means: as tall as the room allows, and as wide as its
   * own proportions make it.
   */
  readonly aspectVar = computed(() => String(this.featuredAspect()));

  constructor() {
    // Optimistic: on this page the hero name is on screen from the start, so
    // claim it up front to avoid a flash of the top-bar brand before the
    // observer's first callback; the observer refines it thereafter.
    this.heroTitle.visible.set(true);

    inject(DestroyRef).onDestroy(() => {
      this.observer?.disconnect();
      this.hiResSub?.unsubscribe();
      this.heroTitle.visible.set(false);
    });

    // Thumbnail tier first (small, fast); once its race has settled, load the
    // full-resolution image to override the blurred preview. Cleanup drops the
    // subscriptions if the pick changes (e.g. the fallback catalogue is
    // replaced by server data).
    effect((onCleanup) => {
      const nft = this.featured();
      this.featuredThumb.set(null);
      this.featuredFull.set(null);
      this.fullLoaded.set(false);
      this.decodedAspect.set(null);
      this.hiResSub?.unsubscribe();
      if (!nft) return;
      const thumbSub = this.artworkService.getProgressiveImageUrls(nft, true).subscribe({
        next: (url) => this.featuredThumb.set(url),
        // complete fires once the thumbnail sources settle (loaded or not), so
        // the full image loads even if no thumbnail was available.
        complete: () => this.loadFullImage(nft),
      });
      onCleanup(() => {
        thumbSub.unsubscribe();
        this.hiResSub?.unsubscribe();
      });
    });
  }

  private loadFullImage(nft: Nft): void {
    this.hiResSub = this.artworkService
      .getProgressiveImageUrls(nft)
      .pipe(takeLast(1)) // only the highest-quality url, once the race settles
      .subscribe((url) => this.featuredFull.set(url));
  }

  onFullLoad(event: Event): void {
    this.fullLoaded.set(true);
    const img = event.target as HTMLImageElement;
    if (img.naturalWidth > 0 && img.naturalHeight > 0) {
      this.decodedAspect.set(img.naturalWidth / img.naturalHeight);
    }
  }

  ngAfterViewInit(): void {
    // No IntersectionObserver while prerendering, and nothing scrolls past the
    // hero in a build for it to report on.
    if (typeof IntersectionObserver === 'undefined') return;
    this.observer = new IntersectionObserver(([entry]) => {
      this.heroTitle.visible.set(entry.isIntersecting);
    });
    this.observer.observe(this.heroTitleRef.nativeElement);
  }
}
