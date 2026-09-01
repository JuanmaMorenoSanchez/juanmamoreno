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
 * Narrowing the catalogue by something other than the year.
 *
 * Year was the only filter there had ever been, and it is the thing about a
 * painting that says least about whether somebody wants to look at it. Both of
 * these are read off the pieces themselves, so neither costs a request and
 * neither has a list to keep up to date.
 */
describe('ArtPiecesListComponent — narrowing the catalogue', () => {
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

  // Found through the row they belong to rather than by their words: nothing
  // has loaded a dictionary here, so a chip labelled by a translation key
  // renders the key.
  const chipsIn = (fixture: { nativeElement: HTMLElement }, label: string) =>
    Array.from(
      fixture.nativeElement.querySelectorAll<HTMLElement>(
        `mat-chip-set[aria-labelledby="${label}"] mat-chip`
      )
    );

  /** Labelled by translation key here, since no dictionary is loaded. */
  const mediumChip = (fixture: { nativeElement: HTMLElement }, family: string) =>
    chipsIn(fixture, 'medium-label').find((chip) =>
      (chip.textContent ?? '').includes(`filter.family.${family}`)
    );

  const mixed = () => [
    makeNft('1', 'An oil', '2024', 'Oil on canvas'),
    makeNft('2', 'A watercolour', '2024', 'Watercolor on paper'),
    makeNft('23', 'A sold oil', '2023', 'Oil on canvas'),
  ];

  it('offers the materials the paintings are actually made with', () => {
    const { fixture, artworkService } = setup();
    artworkService.artPieces$.next(mixed());
    fixture.detectChanges();

    expect(mediumChip(fixture, 'oil')).toBeDefined();
    expect(mediumChip(fixture, 'watercolor')).toBeDefined();
  });

  it('shows only the paintings in the material picked', () => {
    const { fixture, artworkService } = setup();
    artworkService.artPieces$.next(mixed());
    fixture.detectChanges();

    mediumChip(fixture, 'watercolor')!.click();
    fixture.detectChanges();

    expect(shown(fixture)).toEqual(['/artwork/2']);
  });

  it('shows only what is still for sale, and only what is not', () => {
    const { fixture, artworkService } = setup();
    artworkService.artPieces$.next(mixed());
    fixture.detectChanges();

    // The row reads: all, available, sold. '23' is in SOLDCERTIFICATES; the
    // other two are not.
    const [, available, sold] = chipsIn(fixture, 'availability-label');

    sold.click();
    fixture.detectChanges();
    expect(shown(fixture)).toEqual(['/artwork/23']);

    available.click();
    fixture.detectChanges();
    expect(shown(fixture)).toEqual(['/artwork/1', '/artwork/2']);
  });

  /**
   * The point of grouping. The catalogue records eight mediums; five of them
   * cover between one and four paintings each, and offering all eight put two
   * rows of chips above a page whose subject is the paintings. A reader wants
   * the oils, not "oil on canvas on cardboard" — which is still named in full
   * on the artwork's own page.
   */
  it('gathers every oil under one chip, whatever it was painted on', () => {
    const { fixture, artworkService } = setup();
    artworkService.artPieces$.next([
      makeNft('1', 'On canvas', '2024', 'Oil on canvas'),
      makeNft('2', 'On wood', '2024', 'Oil on wood'),
      makeNft('3', 'On aluminium', '2024', 'Oil on aluminium'),
      makeNft('4', 'A watercolour', '2024', 'Watercolor on paper'),
    ]);
    fixture.detectChanges();

    // All, oil, watercolour — not All plus four supports.
    expect(chipsIn(fixture, 'medium-label')).toHaveLength(3);

    mediumChip(fixture, 'oil')!.click();
    fixture.detectChanges();

    expect(shown(fixture)).toEqual(['/artwork/1', '/artwork/2', '/artwork/3']);
  });

  // A material in no family keeps its own name rather than going missing, so
  // something the artist takes up is never simply absent from the filter.
  it('gives a material it does not recognise a chip of its own', () => {
    const { fixture, artworkService } = setup();
    artworkService.artPieces$.next([
      makeNft('1', 'An oil', '2024', 'Oil on canvas'),
      makeNft('2', 'Something new', '2024', 'Gouache on board'),
    ]);
    fixture.detectChanges();

    const labels = chipsIn(fixture, 'medium-label').map((chip) => (chip.textContent ?? '').trim());
    expect(labels).toContain('Gouache on board');
  });

  // A row offering one choice is furniture.
  it('says nothing about medium when every piece shares one', () => {
    const { fixture, artworkService } = setup();
    // Different supports, one material: still nothing to choose between.
    artworkService.artPieces$.next([
      makeNft('1', 'One', '2024', 'Oil on canvas'),
      makeNft('2', 'Two', '2024', 'Oil on wood'),
    ]);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('#medium-label')).toBeNull();
  });

  /**
   * A remembered medium can stop being on offer — a year with no watercolours
   * in it, or a catalogue that has changed under a preference saved months
   * ago. Showing everything is the only readable answer: an empty grid gives
   * the reader nothing to undo.
   */
  it('falls back to showing everything when the remembered medium is not on offer', () => {
    localStorage.setItem('juanmamoreno.catalogue.medium', 'gouache');
    const { fixture, artworkService } = setup();
    artworkService.artPieces$.next(mixed());
    fixture.detectChanges();

    expect(shown(fixture)).toHaveLength(3);
  });

  // getTraitValue answers 'Error getting medium' for a piece whose metadata
  // will not parse, and that string would otherwise become a chip of its own
  // offering to filter the catalogue down to the broken ones.
  it('does not offer a failure to parse as though it were a medium', () => {
    const { fixture, artworkService } = setup();
    const broken = makeNft('9', 'Broken', '2024', 'Oil on canvas');
    delete (broken.raw as { metadata?: unknown }).metadata;
    artworkService.artPieces$.next([...mixed(), broken]);
    fixture.detectChanges();

    const chipText = Array.from(
      fixture.nativeElement.querySelectorAll('mat-chip'),
      (chip) => (chip as HTMLElement).textContent ?? ''
    ).join(' ');

    expect(chipText).not.toContain('Error');
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
    Array.from(
      fixture.nativeElement.querySelectorAll<HTMLElement>(
        'mat-chip-set[aria-labelledby="sort-label"] mat-chip'
      )
    );

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
   * page. It carries no controls of its own, so a filter applied to it is one
   * the reader has no way to undo — and it must not rewrite preferences from a
   * grid they never touched.
   */
  it('leaves the more-from-this-year grid alone', () => {
    localStorage.setItem('juanmamoreno.catalogue.medium', 'watercolor');
    localStorage.setItem('juanmamoreno.catalogue.availability', 'sold');

    const { fixture, artworkService } = setup();
    fixture.componentRef.setInput('viewAsWidget', true);
    artworkService.artPieces$.next([
      makeNft('1', 'An oil', '2024', 'Oil on canvas'),
      makeNft('2', 'A watercolour', '2024', 'Watercolor on paper'),
    ]);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('a.tile-link')).toHaveLength(2);
  });
});
