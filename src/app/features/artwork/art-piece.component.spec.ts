import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { provideRouter } from '@angular/router';
import { VALIDTRAITS, VIEW_TYPES } from '@domain/artwork/artwork.constants';
import { Artwork } from '@domain/artwork/artwork';
import { Nft } from '@domain/artwork/artwork.entity';
import { ARTWORK_PORT } from '@domain/artwork/artwork.token';
import { Descriptions } from '@domain/artwork/descriptions.entity';
import { provideTranslateService } from '@ngx-translate/core';
import { PostedArtworksService } from '@shared/services/posted-artworks.service';
import { ResponsiveService } from '@shared/services/responsive.service';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { vi } from 'vitest';
import { ArtPieceComponent } from './art-piece.component';

function makeNft(tokenId: string, name: string): Nft {
  return {
    tokenId,
    name,
    image: { thumbnailUrl: `https://cdn.test/${tokenId}` },
    raw: {
      metadata: {
        attributes: [
          { trait_type: VALIDTRAITS.IMAGETYPE, value: VIEW_TYPES.FRONTAL },
          { trait_type: VALIDTRAITS.YEAR, value: '2024' },
          { trait_type: VALIDTRAITS.HEIGHT, value: '100' },
          { trait_type: VALIDTRAITS.WIDTH, value: '80' },
          { trait_type: VALIDTRAITS.MEDIUM, value: 'Oil on canvas' },
        ],
      },
    },
  };
}

const describedAs = (tokenId: string, text: string): Descriptions => ({
  tokenId,
  translated: [
    { lang: 'en', shortDesc: text },
    { lang: 'es', shortDesc: text },
  ],
});

/** What the page says about a painting it has been told nothing about. */
const NOTHING_KNOWN = 'No description available';

/**
 * The class rather than the page.
 *
 * The template is replaced with nothing on purpose: it renders the viewer, the
 * catalogue widget, the pdf button and the dialogs behind them, none of which
 * has anything to do with the question here — whether what this component
 * holds is about the painting on screen. Rendering them would make this a test
 * of five other components and of whether jsdom has an IntersectionObserver.
 */
function setup() {
  const paramMap = new BehaviorSubject(new Map([['id', '5']]));

  // One channel per painting, not one shared by all of them: the whole point
  // is to answer for a painting the reader has already left, which a single
  // subject cannot express.
  const channels = new Map<string, Subject<Descriptions | null>>();
  const channelFor = (tokenId: string) => {
    const existing = channels.get(tokenId);
    if (existing) return existing;
    const created = new Subject<Descriptions | null>();
    channels.set(tokenId, created);
    return created;
  };

  // Where each painting can be seen on Instagram, answered per painting so a
  // late answer for one can be delivered while another is on screen.
  const instagramChannels = new Map<string, Subject<string | null>>();
  const instagramFor = (tokenId: string) => {
    const existing = instagramChannels.get(tokenId);
    if (existing) return existing;
    const created = new Subject<string | null>();
    instagramChannels.set(tokenId, created);
    return created;
  };

  const port = {
    getArtworkViewsObservable: vi.fn((id: string) => of([makeNft(id, `Painting ${id}`)])),
    getArtPiecesObservable: vi.fn().mockReturnValue(of([])),
    getArtPieceDescriptions: vi.fn((tokenId: string) => channelFor(tokenId).asObservable()),
    getNftFetchableUrls: () => [],
    getLatestVersion: (nfts: Nft[]) => nfts[0] ?? null,
    filterFrontalArtworks: (nfts: Nft[]) => nfts,
    getTraitValue: (nft: Nft, trait: VALIDTRAITS) =>
      nft?.raw?.metadata?.attributes?.find(
        (attribute: { trait_type: string }) => attribute.trait_type === trait
      )?.value ?? '',
    isFrontalView: () => true,
    sortByYear: (nfts: Nft[]) => nfts,
  };

  TestBed.configureTestingModule({
    imports: [ArtPieceComponent],
    providers: [
      provideTranslateService(),
      provideRouter([]),
      { provide: ARTWORK_PORT, useValue: port },
      {
        provide: PostedArtworksService,
        useValue: { getInstagramPermalink: (tokenId: string) => instagramFor(tokenId) },
      },
      {
        provide: ActivatedRoute,
        useValue: { paramMap: paramMap.asObservable(), snapshot: { paramMap: new Map() } },
      },
    ],
  });
  TestBed.overrideComponent(ArtPieceComponent, { set: { template: '', imports: [] } });

  const fixture = TestBed.createComponent(ArtPieceComponent);
  fixture.detectChanges();

  /** The backend answering about one painting, whenever the test chooses. */
  const answerAbout = (tokenId: string, text: string) => {
    channelFor(tokenId).next(describedAs(tokenId, text));
    fixture.detectChanges();
  };

  /** Instagram answering about one painting, whenever the test chooses. */
  const instagramAnswers = (tokenId: string, permalink: string | null) => {
    instagramFor(tokenId).next(permalink);
    fixture.detectChanges();
  };

  return { fixture, port, paramMap, answerAbout, instagramAnswers };
}

/**
 * Pressing "next artwork" does not rebuild this component: the route is the
 * same `/artwork/:id`, so Angular keeps the instance and changes the
 * parameter. Anything it holds therefore has to be dropped by hand.
 */
describe('ArtPieceComponent — moving to the next painting', () => {
  afterEach(() => TestBed.resetTestingModule());

  const goTo = (
    paramMap: BehaviorSubject<Map<string, string>>,
    fixture: { detectChanges: () => void },
    id: string
  ) => {
    paramMap.next(new Map([['id', id]]));
    fixture.detectChanges();
  };

  it('is about the painting the address names', () => {
    const { fixture, paramMap } = setup();
    expect(fixture.componentInstance.tokenId()).toBe('5');

    goTo(paramMap, fixture, '9');

    expect(fixture.componentInstance.tokenId()).toBe('9');
    expect(fixture.componentInstance.nft().name).toBe('Painting 9');
  });

  /**
   * The description is what the viewer announces as the picture's alt text and
   * what the page offers search as its own description. Left standing while
   * the next one is fetched, it described the painting before it — to exactly
   * the readers who cannot see either.
   */
  it('drops the description rather than describing one painting as another', () => {
    const { fixture, paramMap, answerAbout } = setup();

    answerAbout('5', 'A room that will not settle.');
    expect(fixture.componentInstance.description()).toContain('A room that will not settle');

    goTo(paramMap, fixture, '9');

    expect(fixture.componentInstance.description()).toBe(NOTHING_KNOWN);
  });

  it('asks the backend about the painting now on screen', () => {
    const { fixture, paramMap, port } = setup();

    goTo(paramMap, fixture, '9');

    expect(port.getArtPieceDescriptions).toHaveBeenLastCalledWith('9');
  });

  /**
   * The link to the post about this painting is the same kind of thing as the
   * description: it belongs to one painting, and left standing it points the
   * reader at a post about a different one.
   */
  it('drops the link to Instagram rather than pointing at the wrong post', () => {
    const { fixture, paramMap, instagramAnswers } = setup();

    instagramAnswers('5', 'https://www.instagram.com/p/five/');
    expect(fixture.componentInstance.instagramPost()).toBe('https://www.instagram.com/p/five/');

    goTo(paramMap, fixture, '9');

    expect(fixture.componentInstance.instagramPost()).toBeNull();
  });

  it('ignores an Instagram answer that arrives after the reader has moved on', () => {
    const { fixture, paramMap, instagramAnswers } = setup();

    goTo(paramMap, fixture, '9');
    instagramAnswers('5', 'https://www.instagram.com/p/five/');

    expect(fixture.componentInstance.instagramPost()).toBeNull();
  });

  /**
   * The descriptions come over the network and can answer out of order. An
   * answer for the painting the reader has already left must not land on the
   * one they are looking at.
   */
  it('ignores a description that arrives after the reader has moved on', () => {
    const { fixture, paramMap, answerAbout } = setup();

    goTo(paramMap, fixture, '9');
    // The request made for painting five, answering at last.
    answerAbout('5', 'This is about painting five.');

    expect(fixture.componentInstance.description()).toBe(NOTHING_KNOWN);
  });
});

/**
 * Every photograph of a painting is its own token, and two things on the page
 * belong to the painting rather than to the photograph being looked at: the
 * certificate — the seal used the token on screen, so pressing it while looking
 * at a detail produced a certificate of that detail — and the record, which is
 * kept against the painting's own token, so switching to a detail emptied the
 * section. Both ask by `paintingNft`.
 */
describe('ArtPieceComponent — what belongs to the painting, not the photograph', () => {
  afterEach(() => TestBed.resetTestingModule());

  const photograph = (tokenId: string, imageType: string, version?: string): Nft => ({
    tokenId,
    name: 'Secuestro en la rave',
    image: { thumbnailUrl: `https://cdn.test/${tokenId}` },
    raw: {
      metadata: {
        attributes: [
          { trait_type: VALIDTRAITS.IMAGETYPE, value: imageType },
          { trait_type: VALIDTRAITS.YEAR, value: '2024' },
          { trait_type: VALIDTRAITS.HEIGHT, value: '130' },
          { trait_type: VALIDTRAITS.WIDTH, value: '130' },
          { trait_type: VALIDTRAITS.MEDIUM, value: 'Oil on canvas' },
          ...(version ? [{ trait_type: VALIDTRAITS.VERSION, value: version }] : []),
        ],
      },
    },
  });

  /** The real logic, so the answer is the catalogue's rather than a stub's. */
  const artworkLogic = new Artwork();

  const showing = (photographs: Nft[], index: number) => {
    TestBed.configureTestingModule({
      imports: [ArtPieceComponent],
      providers: [
        provideTranslateService(),
        provideRouter([]),
        {
          provide: ARTWORK_PORT,
          useValue: {
            getArtworkViewsObservable: () => of(photographs),
            getArtPiecesObservable: () => of([]),
            getArtPieceDescriptions: () => of(null),
            getNftFetchableUrls: () => [],
            getLatestVersion: (nfts: Nft[]) => artworkLogic.getLatestVersion(nfts),
            filterFrontalArtworks: (nfts: Nft[]) => artworkLogic.filterFrontalArtworks(nfts),
            getTraitValue: (nft: Nft, trait: VALIDTRAITS) => artworkLogic.getTraitValue(nft, trait),
            isFrontalView: () => true,
            sortByYear: (nfts: Nft[]) => nfts,
          },
        },
        {
          provide: PostedArtworksService,
          useValue: { getInstagramPermalink: () => of(null) },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(new Map([['id', photographs[0].tokenId]])),
            snapshot: { paramMap: new Map() },
          },
        },
      ],
    });
    TestBed.overrideComponent(ArtPieceComponent, { set: { template: '', imports: [] } });

    const fixture = TestBed.createComponent(ArtPieceComponent);
    fixture.detectChanges();
    fixture.componentInstance.displayingIndex.set(index);
    fixture.detectChanges();
    return fixture.componentInstance;
  };

  it('opens the painting, not the detail being looked at', () => {
    const page = showing(
      [
        photograph('152', VIEW_TYPES.FRONTAL),
        photograph('153', VIEW_TYPES.DETAIL),
        photograph('154', VIEW_TYPES.PROGRESS),
      ],
      1
    );

    expect(page.nft().tokenId).toBe('153');
    expect(page.paintingNft().tokenId).toBe('152');
  });

  /** A painting photographed again: the certificate is the photograph it is now. */
  it('opens the current frontal view where there is more than one', () => {
    const page = showing(
      [
        photograph('152', VIEW_TYPES.FRONTAL),
        photograph('200', VIEW_TYPES.FRONTAL, '1'),
        photograph('153', VIEW_TYPES.DETAIL),
      ],
      2
    );

    expect(page.paintingNft().tokenId).toBe('200');
  });

  it('says the painting’s measurements, whichever photograph is on screen', () => {
    const page = showing(
      [photograph('152', VIEW_TYPES.FRONTAL), photograph('153', VIEW_TYPES.DETAIL)],
      1
    );

    expect(page.certificateLine()).toContain('130 x 130');
  });

  /** Nothing to fall back from: a painting with no frontal view at all. */
  it('falls back to what is on screen when there is no frontal view', () => {
    const page = showing([photograph('153', VIEW_TYPES.DETAIL)], 0);

    expect(page.paintingNft().tokenId).toBe('153');
  });

  /**
   * The record the page asks for while a detail is on screen. A detail has no
   * record of its own and never will: what was exhibited and sold is the
   * painting, so asking by the token on screen emptied the section.
   */
  it('keeps the record on the painting while a detail is being looked at', () => {
    const page = showing(
      [photograph('156', VIEW_TYPES.FRONTAL), photograph('157', VIEW_TYPES.DETAIL)],
      1
    );

    expect(page.nft().tokenId).toBe('157');
    expect(page.paintingNft().tokenId).toBe('156');
  });
});

/**
 * The strip of thumbnails under the painting.
 *
 * It was the painting's own year and nothing else, so a year holding two
 * paintings offered one tile, and a year holding only this one offered a
 * heading over an empty row. It now widens outwards a year at a time until
 * there are two rows of them.
 */
describe('ArtPieceComponent — the years offered under the painting', () => {
  afterEach(() => TestBed.resetTestingModule());

  const inYear = (tokenId: string, year: string): Nft => ({
    tokenId,
    name: `Painting ${tokenId}`,
    image: { thumbnailUrl: `https://cdn.test/${tokenId}` },
    raw: {
      metadata: {
        attributes: [
          { trait_type: VALIDTRAITS.IMAGETYPE, value: VIEW_TYPES.FRONTAL },
          { trait_type: VALIDTRAITS.YEAR, value: year },
        ],
      },
    },
  });

  const many = (year: string, count: number): Nft[] =>
    Array.from({ length: count }, (_unused, at) => inYear(`${year}-${at}`, year));

  /** Three columns, so two rows is six thumbnails, whatever jsdom's width is. */
  const page = (reading: Nft, catalogue: Nft[]) => {
    TestBed.configureTestingModule({
      imports: [ArtPieceComponent],
      providers: [
        provideTranslateService(),
        provideRouter([]),
        {
          provide: ResponsiveService,
          useValue: { displayMobileLayout: new BehaviorSubject(false) },
        },
        {
          provide: ARTWORK_PORT,
          useValue: {
            getArtworkViewsObservable: () => of([reading]),
            getArtPiecesObservable: () => of(catalogue),
            getArtPieceDescriptions: () => of(null),
            getNftFetchableUrls: () => [],
            getLatestVersion: (nfts: Nft[]) => nfts[0] ?? null,
            filterFrontalArtworks: (nfts: Nft[]) => nfts,
            getTraitValue: (nft: Nft, trait: VALIDTRAITS) =>
              new Artwork().getTraitValue(nft, trait),
            isFrontalView: () => true,
            sortByYear: (nfts: Nft[]) => nfts,
          },
        },
        { provide: PostedArtworksService, useValue: { getInstagramPermalink: () => of(null) } },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(new Map([['id', reading.tokenId]])),
            snapshot: { paramMap: new Map() },
          },
        },
      ],
    });
    TestBed.overrideComponent(ArtPieceComponent, { set: { template: '', imports: [] } });

    const fixture = TestBed.createComponent(ArtPieceComponent);
    fixture.detectChanges();
    return fixture.componentInstance;
  };

  /** A year that fills the rows by itself is still shown by itself. */
  it('stays on the painting’s own year when that year has enough', () => {
    const reading = inYear('500', '2020');
    const showing = page(reading, [reading, ...many('2020', 8), ...many('2016', 5)]);

    expect(showing.nearbySpan()).toBe('2020');
    expect(showing.hasMoreArtworks()).toBe(true);
  });

  /**
   * The painting is the only one of 2020, so its own year contributes nothing
   * and drops back out of the range: the heading names a range with paintings
   * in it, not the years the search walked through.
   */
  it('widens outwards, later first, until two rows are filled', () => {
    const reading = inYear('500', '2020');
    const showing = page(reading, [
      reading,
      ...many('2021', 2),
      ...many('2019', 2),
      ...many('2018', 3),
      ...many('2016', 5),
    ]);

    expect(showing.nearbySpan()).toBe('2018–2021');
  });

  /** Nothing else in the catalogue at all: no heading over an empty row. */
  it('offers nothing when the painting is the only one there is', () => {
    const reading = inYear('500', '2020');
    const showing = page(reading, [reading]);

    expect(showing.hasMoreArtworks()).toBe(false);
  });
});
