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
import { SORT } from '@shared/constants/order.constants';
import { HeroTitleService } from '@shared/services/hero-title.service';
import { TranslatePipe } from '@ngx-translate/core';
import { Subscription, takeLast } from 'rxjs';

/**
 * Editorial landing page: the artist's name, a one-line statement, a single
 * featured painting and the primary entries (Paintings / About / Contact, plus
 * CV and Generative). It deliberately loads only one artwork image, not the
 * whole catalogue, so the first paint is cheap — the full grid lives at
 * /artworks.
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

  @ViewChild('heroTitle') private heroTitleRef!: ElementRef<HTMLElement>;
  private observer?: IntersectionObserver;

  private readonly artPieces = toSignal(this.artworkService.getArtPiecesObservable(), {
    initialValue: [] as Nft[],
  });

  // The newest frontal-view artwork, used as the featured hero. Auto-picking
  // "latest" keeps the landing curated with zero manual upkeep. Same frontal +
  // sort-by-year logic the detail page uses to order pieces.
  readonly featured = computed<Nft | undefined>(() => {
    const all = this.artPieces();
    if (!all.length) return undefined;
    const byName = new Map<string, Nft[]>();
    for (const piece of all) {
      const group = byName.get(piece.name);
      if (group) group.push(piece);
      else byName.set(piece.name, [piece]);
    }
    const frontals = all.filter((piece) =>
      this.artworkService.isFrontalView(piece, byName.get(piece.name) ?? [])
    );
    return this.artworkService.sortByYear(frontals, SORT.DESC)[0];
  });

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
  readonly frameWidth = computed(() => `min(90vw, 34rem, calc(60vh * ${this.featuredAspect()}))`);

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
