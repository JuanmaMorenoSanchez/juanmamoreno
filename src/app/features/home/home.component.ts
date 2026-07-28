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
import { Nft } from '@domain/artwork/artwork.entity';
import { ARTWORK_PORT } from '@domain/artwork/artwork.token';
import { SORT } from '@shared/constants/order.constants';
import { HeroTitleService } from '@shared/services/hero-title.service';
import { TranslatePipe } from '@ngx-translate/core';

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

  readonly featuredImage = signal<string | null>(null);
  readonly featuredLoaded = signal(false);

  constructor() {
    // Optimistic: on this page the hero name is on screen from the start, so
    // claim it up front to avoid a flash of the top-bar brand before the
    // observer's first callback; the observer refines it thereafter.
    this.heroTitle.visible.set(true);

    inject(DestroyRef).onDestroy(() => {
      this.observer?.disconnect();
      this.heroTitle.visible.set(false);
    });

    // Load the featured piece's preview progressively once it resolves; the
    // cleanup drops the previous subscription if the pick changes (e.g. the
    // fallback catalogue is replaced by server data).
    effect((onCleanup) => {
      const nft = this.featured();
      this.featuredImage.set(null);
      this.featuredLoaded.set(false);
      if (!nft) return;
      const sub = this.artworkService
        .getProgressiveImageUrls(nft)
        .subscribe((url) => this.featuredImage.set(url));
      onCleanup(() => sub.unsubscribe());
    });
  }

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(([entry]) => {
      this.heroTitle.visible.set(entry.isIntersecting);
    });
    this.observer.observe(this.heroTitleRef.nativeElement);
  }
}
