import { TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { Artwork } from '@domain/artwork/artwork';
import { VALIDTRAITS, VIEW_TYPES } from '@domain/artwork/artwork.constants';
import { Nft } from '@domain/artwork/artwork.entity';
import { ARTWORK_PORT } from '@domain/artwork/artwork.token';
import { provideTranslateService } from '@ngx-translate/core';
import { BehaviorSubject, of } from 'rxjs';
import { afterAll, beforeAll, vi } from 'vitest';
import { ArtPiecesListComponent } from './art-pieces-list.component';

// jsdom has no IntersectionObserver. This stub reports every observed tile as
// immediately visible, which is what makes LazyLoadDirective fire (visible)
// and the thumbnails render at all.
class MockIntersectionObserver {
  constructor(private readonly callback: IntersectionObserverCallback) {}

  observe(target: Element): void {
    this.callback(
      [{ isIntersecting: true, target } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver
    );
  }

  unobserve(): void {}
  disconnect(): void {}
}

function makeNft(tokenId: string, name: string, year = '2024'): Nft {
  return {
    tokenId,
    name,
    image: { thumbnailUrl: `https://example.test/${tokenId}-thumb.jpg` },
    raw: {
      metadata: {
        attributes: [
          { trait_type: VALIDTRAITS.IMAGETYPE, value: VIEW_TYPES.FRONTAL },
          { trait_type: VALIDTRAITS.YEAR, value: year },
          { trait_type: VALIDTRAITS.HEIGHT, value: '100' },
          { trait_type: VALIDTRAITS.WIDTH, value: '80' },
          { trait_type: VALIDTRAITS.MEDIUM, value: 'oil' },
        ],
      },
    },
  };
}

/** The list as the API would return it — same pieces, fresh object identities. */
function reparse(nfts: Nft[]): Nft[] {
  return JSON.parse(JSON.stringify(nfts)) as Nft[];
}

// Real domain logic (sorting / frontal-view classification), only the two
// data-fetching members stubbed.
class MockArtworkService extends Artwork {
  readonly artPieces$ = new BehaviorSubject<Nft[]>([]);

  getArtPiecesObservable() {
    return this.artPieces$.asObservable();
  }

  getProgressiveImageUrls(nft: Nft) {
    return of(`https://example.test/${nft.tokenId}-preview.jpg`);
  }
}

function setup() {
  const artworkService = new MockArtworkService();

  TestBed.configureTestingModule({
    imports: [ArtPiecesListComponent],
    providers: [
      provideTranslateService(),
      provideAnimations(),
      { provide: ARTWORK_PORT, useValue: artworkService },
      { provide: ActivatedRoute, useValue: { queryParamMap: of(new Map()) } },
    ],
  });

  const fixture = TestBed.createComponent(ArtPiecesListComponent);
  return { fixture, artworkService };
}

describe('ArtPiecesListComponent', () => {
  beforeAll(() => vi.stubGlobal('IntersectionObserver', MockIntersectionObserver));
  afterAll(() => vi.unstubAllGlobals());
  afterEach(() => TestBed.resetTestingModule());

  // getArtPiecesObservable emits twice on a cold load — bundled fallback (or
  // persisted) data first, then the API response. The second emission carries
  // equal-valued but brand-new Nft objects, so tracking tiles by object
  // identity tore down and rebuilt every tile, blanking each already-painted
  // <img> for a frame: the visible blink between the low- and high-quality
  // image. Tracking by tokenId keeps the elements alive across the swap.
  it('reuses the same tile elements when the API list replaces the initial one', () => {
    const { fixture, artworkService } = setup();
    const fallback = [makeNft('1', 'First piece'), makeNft('2', 'Second piece')];

    artworkService.artPieces$.next(fallback);
    fixture.detectChanges();

    const before = fixture.nativeElement.querySelectorAll('mat-grid-tile');
    const imagesBefore = fixture.nativeElement.querySelectorAll('img.front-image');
    expect(before).toHaveLength(2);
    // Guards the assertion below: if the thumbnails never rendered, comparing
    // empty NodeLists would pass while proving nothing.
    expect(imagesBefore).toHaveLength(2);

    artworkService.artPieces$.next(reparse(fallback));
    fixture.detectChanges();

    const after = fixture.nativeElement.querySelectorAll('mat-grid-tile');
    const imagesAfter = fixture.nativeElement.querySelectorAll('img.front-image');
    expect(after).toHaveLength(2);
    expect(after[0]).toBe(before[0]);
    expect(after[1]).toBe(before[1]);
    // The <img> surviving the swap is what stops the blink.
    expect(imagesAfter[0]).toBe(imagesBefore[0]);
    expect(imagesAfter[1]).toBe(imagesBefore[1]);
  });

  it('marks sold pieces and leaves available ones unmarked', () => {
    const { fixture, artworkService } = setup();
    // '23' is in SOLDCERTIFICATES, '999999' is not.
    artworkService.artPieces$.next([makeNft('23', 'Sold piece'), makeNft('999999', 'For sale')]);
    fixture.detectChanges();

    const tiles = fixture.nativeElement.querySelectorAll('mat-grid-tile');
    const dotsPerTile = Array.from(tiles, (tile) =>
      (tile as HTMLElement).querySelectorAll('.sold-dot').length
    );

    expect(dotsPerTile).toEqual([1, 0]);
  });
});
