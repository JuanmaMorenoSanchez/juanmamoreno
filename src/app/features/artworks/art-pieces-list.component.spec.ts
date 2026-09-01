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
import { AdminAuthService } from '@shared/services/admin-auth.service';
import { AvailabilityFilterService } from '@shared/services/availability-filter.service';
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

function makeNft(tokenId: string, name: string, year = '2024', medium = 'oil'): Nft {
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
          { trait_type: VALIDTRAITS.MEDIUM, value: medium },
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

  edited = new Map<string, boolean>();

  getEditedCritics() {
    return of(this.edited);
  }
}

function setup(options: { signedIn?: boolean; edited?: Map<string, boolean> } = {}) {
  const artworkService = new MockArtworkService();
  if (options.edited) artworkService.edited = options.edited;

  const auth = {
    isAdmin: () => options.signedIn === true,
    bearerToken: () => (options.signedIn ? 'a-real-looking-token' : null),
    identity: () => (options.signedIn ? { email: 'morenosanchezjuanma@gmail.com' } : null),
  };

  TestBed.configureTestingModule({
    imports: [ArtPiecesListComponent],
    providers: [
      provideTranslateService(),
      provideAnimations(),
      { provide: ARTWORK_PORT, useValue: artworkService },
      { provide: AdminAuthService, useValue: auth },
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

  // The grid is the only route from the catalogue to an artwork page, so the
  // href is the whole feature: without it the tile is a picture that does
  // nothing.
  it('links every tile to its own artwork page', () => {
    const { fixture, artworkService } = setup();
    artworkService.artPieces$.next([makeNft('7', 'First piece'), makeNft('12', 'Second piece')]);
    fixture.detectChanges();

    const hrefs = Array.from(fixture.nativeElement.querySelectorAll('a.tile-link'), (link) =>
      (link as HTMLAnchorElement).getAttribute('href')
    );

    expect(hrefs).toEqual(['/artwork/7', '/artwork/12']);
  });

  // Links and images are both draggable by default, and once the browser starts
  // a drag it fires no click at all — so pressing a tile and letting the mouse
  // drift a few pixels before releasing left the catalogue stuck on the list.
  // Only a mouse can do it, which is why it looked like a desktop-only fault.
  // Undoing either of these attributes brings the fault straight back.
  it('refuses to be dragged, so a click that drifts still opens the artwork', () => {
    const { fixture, artworkService } = setup();
    artworkService.artPieces$.next([makeNft('7', 'First piece')]);
    fixture.detectChanges();

    const link = fixture.nativeElement.querySelector('a.tile-link') as HTMLAnchorElement;
    const image = fixture.nativeElement.querySelector('img.front-image') as HTMLImageElement;

    expect(link.draggable).toBe(false);
    expect(image.draggable).toBe(false);
  });

  it('marks sold pieces and leaves available ones unmarked', () => {
    const { fixture, artworkService } = setup();
    // '23' is in SOLDCERTIFICATES, '999999' is not.
    artworkService.artPieces$.next([makeNft('23', 'Sold piece'), makeNft('999999', 'For sale')]);
    fixture.detectChanges();

    const tiles = fixture.nativeElement.querySelectorAll('mat-grid-tile');
    const dotsPerTile = Array.from(
      tiles,
      (tile) => (tile as HTMLElement).querySelectorAll('.sold-dot').length
    );

    expect(dotsPerTile).toEqual([1, 0]);
  });
});

describe('ArtPiecesListComponent — seeing which essays have been gone over', () => {
  beforeAll(() => vi.stubGlobal('IntersectionObserver', MockIntersectionObserver));
  afterAll(() => vi.unstubAllGlobals());
  afterEach(() => TestBed.resetTestingModule());

  /** Which artworks are on screen. The tile carries its name in aria-label, not in text. */
  const shown = (fixture: { nativeElement: HTMLElement }) =>
    Array.from(fixture.nativeElement.querySelectorAll('a.tile-link'), (link) =>
      link.getAttribute('href')
    );

  it('shows a reader no such control', async () => {
    // The flag is the artist's business. A reader is never offered the question,
    // and the backend would not answer it for them anyway.
    const { fixture, artworkService } = setup({ signedIn: false });
    fixture.detectChanges();
    artworkService.artPieces$.next([makeNft('1', 'One'), makeNft('2', 'Two')]);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.edited-filter')).toBeNull();
  });

  /**
   * Last on the page, after everything a reader is offered. It is scaffolding
   * for one person under a page whose subject is the paintings, and sitting
   * above the sort chips it read as one of them.
   */
  it('puts the artist controls after everything else, not among them', async () => {
    const { fixture, artworkService } = setup({ signedIn: true });
    fixture.detectChanges();
    artworkService.artPieces$.next([makeNft('23', 'Sold piece')]);
    fixture.detectChanges();

    const page = fixture.nativeElement as HTMLElement;
    const sort = page.querySelector('.sort-group')!;
    const legend = page.querySelector('.sold-legend')!;
    const artistControls = page.querySelector('.edited-filter')!;

    // Node.DOCUMENT_POSITION_FOLLOWING: the artist controls come after both.
    expect(
      sort.compareDocumentPosition(artistControls) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
    expect(
      legend.compareDocumentPosition(artistControls) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });

  it('offers the artist the choice', async () => {
    const { fixture, artworkService } = setup({ signedIn: true });
    fixture.detectChanges();
    artworkService.artPieces$.next([makeNft('1', 'One')]);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.edited-filter')).not.toBeNull();
  });

  it('shows only what has been gone over', async () => {
    const { fixture, artworkService } = setup({
      signedIn: true,
      edited: new Map([
        ['1', true],
        ['2', false],
      ]),
    });
    fixture.detectChanges();
    artworkService.artPieces$.next([
      makeNft('1', 'One'),
      makeNft('2', 'Two'),
      makeNft('3', 'Three'),
    ]);
    fixture.detectChanges();

    fixture.componentInstance['setCriticFilter']('edited');
    fixture.detectChanges();

    expect(shown(fixture)).toEqual(['/artwork/1']);
  });

  it('counts an artwork with no essay at all as not yet done', async () => {
    // Which is the truth, and the whole point: it is one of the ones left.
    const { fixture, artworkService } = setup({
      signedIn: true,
      edited: new Map([['1', true]]),
    });
    fixture.detectChanges();
    artworkService.artPieces$.next([makeNft('1', 'One'), makeNft('3', 'Three')]);
    fixture.detectChanges();

    fixture.componentInstance['setCriticFilter']('untouched');
    fixture.detectChanges();

    expect(shown(fixture)).toEqual(['/artwork/3']);
  });

  it('shows everything again when asked for all', async () => {
    const { fixture, artworkService } = setup({
      signedIn: true,
      edited: new Map([['1', true]]),
    });
    fixture.detectChanges();
    artworkService.artPieces$.next([makeNft('1', 'One'), makeNft('2', 'Two')]);
    fixture.detectChanges();

    fixture.componentInstance['setCriticFilter']('edited');
    fixture.detectChanges();
    fixture.componentInstance['setCriticFilter']('all');
    fixture.detectChanges();

    expect(shown(fixture)).toEqual(['/artwork/1', '/artwork/2']);
  });
});

/**
 * The key to the red dot, which was drawn on sold tiles and never explained: a
 * screen reader was told "sold" by the tile's own label while anybody looking
 * at it had no way to find out.
 */
describe('ArtPiecesListComponent — explaining the dot', () => {
  beforeAll(() => vi.stubGlobal('IntersectionObserver', MockIntersectionObserver));
  afterAll(() => vi.unstubAllGlobals());
  afterEach(() => {
    TestBed.resetTestingModule();
    localStorage.clear();
  });

  it('explains the dot when there is a sold piece on screen, and not otherwise', () => {
    const { fixture, artworkService } = setup();
    artworkService.artPieces$.next([makeNft('999999', 'For sale')]);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.sold-legend')).toBeNull();

    artworkService.artPieces$.next([makeNft('23', 'Sold piece')]);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.sold-legend')).not.toBeNull();
  });
});

describe('ArtPiecesListComponent — remembering how the reader likes it', () => {
  beforeAll(() => vi.stubGlobal('IntersectionObserver', MockIntersectionObserver));
  afterAll(() => vi.unstubAllGlobals());
  afterEach(() => {
    TestBed.resetTestingModule();
    localStorage.clear();
  });

  const sortChips = (fixture: { nativeElement: HTMLElement }) =>
    Array.from(fixture.nativeElement.querySelectorAll<HTMLElement>('.sort-group mat-chip'));

  it('starts newest-first for a reader who has never changed it', () => {
    const { fixture } = setup();
    fixture.detectChanges();

    expect(fixture.componentInstance.activeSortMethod()).toBe('year');
    expect(fixture.componentInstance.sortOrder()).toBe('desc');
  });

  it('writes down a change of arrangement', () => {
    const { fixture, artworkService } = setup();
    artworkService.artPieces$.next([makeNft('1', 'One')]);
    fixture.detectChanges();

    // The row reads: year, size, medium.
    sortChips(fixture)[1].click();

    expect(localStorage.getItem('juanmamoreno.catalogue.sort')).toBe('size');
    expect(localStorage.getItem('juanmamoreno.catalogue.order')).toBe('asc');
  });

  it('comes back arranged the way it was left', () => {
    localStorage.setItem('juanmamoreno.catalogue.sort', 'size');
    localStorage.setItem('juanmamoreno.catalogue.order', 'asc');

    const { fixture } = setup();
    fixture.detectChanges();

    expect(fixture.componentInstance.activeSortMethod()).toBe('size');
    expect(fixture.componentInstance.sortOrder()).toBe('asc');
  });

  it('ignores an arrangement it has no case for', () => {
    localStorage.setItem('juanmamoreno.catalogue.sort', 'by-colour');

    const { fixture } = setup();
    fixture.detectChanges();

    expect(fixture.componentInstance.activeSortMethod()).toBe('year');
  });

  /**
   * The same component renders the "more from this year" grid on an artwork
   * page, which carries no controls of its own. It must not write the reader's
   * catalogue preferences from a grid they never touched.
   */
  it('does not rewrite preferences from the more-from-this-year grid', () => {
    const { fixture, artworkService } = setup();
    fixture.componentRef.setInput('viewAsWidget', true);
    artworkService.artPieces$.next([makeNft('1', 'One')]);
    fixture.detectChanges();

    fixture.componentInstance.changeSortMethod('size');

    expect(localStorage.getItem('juanmamoreno.catalogue.sort')).toBeNull();
  });
});

/**
 * The grid answering the picker in the breadcrumb.
 *
 * The two are nowhere near each other in the page, which is the whole reason
 * the choice lives in a service: this component is also rendered as the
 * "more from this year" widget on every artwork page.
 */
describe('ArtPiecesListComponent — narrowing by availability', () => {
  beforeAll(() => vi.stubGlobal('IntersectionObserver', MockIntersectionObserver));
  afterAll(() => vi.unstubAllGlobals());
  afterEach(() => {
    TestBed.resetTestingModule();
    localStorage.clear();
  });

  const shown = (fixture: { nativeElement: HTMLElement }) =>
    Array.from(fixture.nativeElement.querySelectorAll('a.tile-link'), (link) =>
      link.getAttribute('href')
    );

  // '23' is in SOLDCERTIFICATES; the other two are not.
  const mixed = () => [
    makeNft('23', 'A sold one'),
    makeNft('999998', 'For sale'),
    makeNft('999999', 'Also for sale'),
  ];

  it('shows everything until the reader narrows it', () => {
    const { fixture, artworkService } = setup();
    artworkService.artPieces$.next(mixed());
    fixture.detectChanges();

    expect(shown(fixture)).toHaveLength(3);
  });

  it('shows only what has sold', () => {
    const { fixture, artworkService } = setup();
    TestBed.inject(AvailabilityFilterService).set('sold');
    artworkService.artPieces$.next(mixed());
    fixture.detectChanges();

    expect(shown(fixture)).toEqual(['/artwork/23']);
  });

  it('shows only what has not', () => {
    const { fixture, artworkService } = setup();
    TestBed.inject(AvailabilityFilterService).set('available');
    artworkService.artPieces$.next(mixed());
    fixture.detectChanges();

    expect(shown(fixture)).toEqual(['/artwork/999998', '/artwork/999999']);
  });

  // The picker is in the breadcrumb, above the grid: changing it has to reach
  // the paintings without the page being rebuilt.
  it('follows the picker while the reader is looking at the grid', () => {
    const { fixture, artworkService } = setup();
    const availability = TestBed.inject(AvailabilityFilterService);
    artworkService.artPieces$.next(mixed());
    fixture.detectChanges();

    availability.set('sold');
    fixture.detectChanges();
    expect(shown(fixture)).toEqual(['/artwork/23']);

    availability.clear();
    fixture.detectChanges();
    expect(shown(fixture)).toHaveLength(3);
  });

  it('starts narrowed for a reader who left the chip on', () => {
    localStorage.setItem('juanmamoreno.catalogue.availability', 'sold');

    const { fixture, artworkService } = setup();
    artworkService.artPieces$.next(mixed());
    fixture.detectChanges();

    expect(shown(fixture)).toEqual(['/artwork/23']);
  });

  /**
   * The "more from this year" strip on an artwork page is a suggestion rather
   * than the catalogue, and the section around it decides whether to appear by
   * counting every painting of that year. Filtering its contents would leave a
   * heading standing over an empty row.
   */
  /**
   * Narrowed to nothing, the page used to end after the controls — which reads
   * as a catalogue that has broken rather than one the reader has narrowed.
   */
  it('says so when the narrowing leaves nothing', () => {
    const { fixture, artworkService } = setup();
    TestBed.inject(AvailabilityFilterService).set('sold');
    // Not one of them is in SOLDCERTIFICATES.
    artworkService.artPieces$.next([makeNft('999998', 'For sale'), makeNft('999999', 'Also')]);
    fixture.detectChanges();

    expect(shown(fixture)).toHaveLength(0);
    expect(fixture.nativeElement.querySelector('.nothing-matched')).not.toBeNull();
  });

  it('says nothing of the sort while there are paintings to show', () => {
    const { fixture, artworkService } = setup();
    artworkService.artPieces$.next(mixed());
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.nothing-matched')).toBeNull();
  });

  /**
   * The spinner and the message answer different questions — "still loading"
   * and "nothing matched" — and showing the second while the first is true
   * would tell the reader their filters were at fault for a catalogue that had
   * simply not arrived.
   */
  it('waits for the catalogue rather than blaming the filters for it', () => {
    const { fixture } = setup();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.nothing-matched')).toBeNull();
    expect(fixture.nativeElement.querySelector('mat-progress-spinner')).not.toBeNull();
  });

  // The strip on an artwork page carries no controls, so it has nothing to say
  // about them.
  it('says nothing in the more-from-this-year grid', () => {
    const { fixture, artworkService } = setup();
    fixture.componentRef.setInput('viewAsWidget', true);
    fixture.componentRef.setInput('nftFilters', { idsToExclude: ['23', '999998', '999999'] });
    artworkService.artPieces$.next(mixed());
    fixture.detectChanges();

    expect(shown(fixture)).toHaveLength(0);
    expect(fixture.nativeElement.querySelector('.nothing-matched')).toBeNull();
  });

  it('leaves the more-from-this-year grid showing everything', () => {
    const { fixture, artworkService } = setup();
    TestBed.inject(AvailabilityFilterService).set('sold');
    fixture.componentRef.setInput('viewAsWidget', true);
    artworkService.artPieces$.next(mixed());
    fixture.detectChanges();

    expect(shown(fixture)).toHaveLength(3);
  });
});
