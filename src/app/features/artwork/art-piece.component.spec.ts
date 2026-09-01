import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { provideRouter } from '@angular/router';
import { VALIDTRAITS, VIEW_TYPES } from '@domain/artwork/artwork.constants';
import { Nft } from '@domain/artwork/artwork.entity';
import { ARTWORK_PORT } from '@domain/artwork/artwork.token';
import { Descriptions } from '@domain/artwork/descriptions.entity';
import { provideTranslateService } from '@ngx-translate/core';
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
    countCatalogueArtworksInYear: () => 0,
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

  return { fixture, port, paramMap, answerAbout };
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
