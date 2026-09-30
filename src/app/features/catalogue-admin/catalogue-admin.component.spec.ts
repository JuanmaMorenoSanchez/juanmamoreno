import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { VALIDTRAITS } from '@domain/artwork/artwork.constants';
import { Nft } from '@domain/artwork/artwork.entity';
import { ARTWORK_PORT } from '@domain/artwork/artwork.token';
import { provideTranslateService } from '@ngx-translate/core';
import { AvailabilityService } from '@shared/services/availability.service';
import { PostedArtworksService } from '@shared/services/posted-artworks.service';
import { of } from 'rxjs';
import { CatalogueAdminComponent } from './catalogue-admin.component';

const painting = (tokenId: string, name: string, year = '2026'): Nft => ({
  tokenId,
  name,
  image: { thumbnailUrl: `data:image/jpeg;base64,${tokenId}` },
  raw: {
    metadata: {
      attributes: [
        { trait_type: VALIDTRAITS.MEDIUM, value: 'Oil on canvas' },
        { trait_type: VALIDTRAITS.HEIGHT, value: '100' },
        { trait_type: VALIDTRAITS.WIDTH, value: '80' },
        { trait_type: VALIDTRAITS.UNIT, value: 'cm' },
        { trait_type: VALIDTRAITS.YEAR, value: year },
        { trait_type: VALIDTRAITS.IMAGETYPE, value: 'Frontal view' },
      ],
    },
  },
});

const catalogue = [
  painting('7', 'Oldest', '2019'),
  painting('101', 'Middle'),
  painting('42', 'Newest'),
];

type Page = {
  rows: () => Nft[];
  term: { set(value: string): void };
  order: () => string;
  opened: () => string | null;
  chosen: () => Nft[];
  chosenCount: () => number;
  canGenerate: () => boolean;
  nothingPosted: () => boolean;
  trait(nft: Nft, key: VALIDTRAITS): string;
  thumbOf(nft: Nft): string;
  isSold(nft: Nft): boolean;
  permalinkOf(nft: Nft): string | null;
  wasPosted(nft: Nft): boolean;
  positionOf(nft: Nft): number | null;
  arrange(order: 'newest' | 'posted'): void;
  toggleOpen(nft: Nft): void;
  toggleChosen(nft: Nft): void;
  clear(): void;
  chooseAll(): void;
};

/**
 * `undefined` is a request that failed; `[]` is an account with nothing on it.
 *
 * No default on `posted`, because a default would turn "the request failed"
 * back into "nothing has been posted" — which is the very distinction the page
 * has to keep, and a harness that cannot express it cannot test it.
 */
function setup(
  posted: Array<{ tokenId: string; permalink: string | null }> | undefined,
  sold: string[] = []
) {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    imports: [CatalogueAdminComponent],
    providers: [
      provideTranslateService(),
      provideRouter([]),
      {
        provide: ARTWORK_PORT,
        useValue: {
          getArtPiecesObservable: () => of(catalogue),
          getTraitValue: (nft: Nft, key: string) =>
            nft.raw?.metadata?.attributes?.find(
              (a: { trait_type: string }) => a.trait_type === key
            )?.value ?? '',
          getNftOptimalUrl: (image: { thumbnailUrl?: string }) => image?.thumbnailUrl ?? '',
        },
      },
      { provide: PostedArtworksService, useValue: { getLatest: () => of(posted) } },
      { provide: AvailabilityService, useValue: { isSold: (id: string) => sold.includes(id) } },
    ],
  });
  TestBed.overrideComponent(CatalogueAdminComponent, { set: { template: '' } });

  return TestBed.createComponent(CatalogueAdminComponent).componentInstance as unknown as Page;
}

/**
 * The catalogue as the artist sees it — one page where there were three.
 *
 * What is tested here is that consolidating did not lose any of the three
 * things those pages did: the order Instagram posts went out in, the dossier's
 * click-ordering, and the way into a certificate.
 */
describe('CatalogueAdminComponent', () => {
  it('lists one row per token, newest first', () => {
    const page = setup([]);

    expect(page.rows().map((one) => one.tokenId)).toEqual(['101', '42', '7']);
  });

  it('finds one by its number, its title or its year', () => {
    const page = setup([]);

    page.term.set('42');
    expect(page.rows().map((one) => one.tokenId)).toEqual(['42']);

    page.term.set('oldest');
    expect(page.rows().map((one) => one.tokenId)).toEqual(['7']);

    page.term.set('2019');
    expect(page.rows().map((one) => one.tokenId)).toEqual(['7']);
  });

  /** What `/latest` used to be, as an order rather than a page of its own. */
  describe('what has lately gone to Instagram', () => {
    const posted = [
      { tokenId: '7', permalink: 'https://instagram.com/p/aaa' },
      { tokenId: '42', permalink: null },
    ];

    it('puts the posted ones first, in the order they went out', () => {
      const page = setup(posted);

      page.arrange('posted');

      expect(page.rows().map((one) => one.tokenId)).toEqual(['7', '42', '101']);
    });

    /** Never dropped: the unposted ones are the interesting ones when choosing. */
    it('keeps the ones that have never been posted, after the rest', () => {
      const page = setup(posted);

      page.arrange('posted');

      expect(page.rows().map((one) => one.tokenId)).toContain('101');
    });

    it('offers the post to anything that has an address for one', () => {
      const page = setup(posted);

      expect(page.permalinkOf(catalogue[0])).toBe('https://instagram.com/p/aaa');
      expect(page.permalinkOf(catalogue[2])).toBeNull();
      // Posted before the address of a post was kept, which is not the same as
      // never posted at all.
      expect(page.wasPosted(catalogue[2])).toBe(true);
      expect(page.wasPosted(catalogue[1])).toBe(false);
    });

    /**
     * A request that failed is not an empty account. Answering the two the same
     * way would put a claim that nothing has gone out over a page that had a
     * dozen.
     */
    it('says nothing has been posted only when that is what was answered', () => {
      expect(setup([]).nothingPosted()).toBe(true);
      expect(setup(undefined).nothingPosted()).toBe(false);
    });
  });

  /** What `/dossier` used to be, on the same rows. */
  describe('building a dossier', () => {
    it('keeps the paintings in the order they were chosen', () => {
      const page = setup([]);
      const [first, second, third] = page.rows();

      page.toggleChosen(third);
      page.toggleChosen(first);
      page.toggleChosen(second);

      expect(page.chosen().map((one) => one.tokenId)).toEqual(['7', '101', '42']);
      expect(page.positionOf(third)).toBe(1);
    });

    it('closes the gap when one is taken out', () => {
      const page = setup([]);
      const [first, second, third] = page.rows();
      page.toggleChosen(first);
      page.toggleChosen(second);
      page.toggleChosen(third);

      page.toggleChosen(second);

      expect(page.chosen().map((one) => one.tokenId)).toEqual(['101', '7']);
      expect(page.positionOf(second)).toBeNull();
    });

    /** One painting is a technical sheet, which has its own button elsewhere. */
    it('will not generate from fewer than two', () => {
      const page = setup([]);
      page.toggleChosen(page.rows()[0]);

      expect(page.canGenerate()).toBe(false);

      page.toggleChosen(page.rows()[1]);
      expect(page.canGenerate()).toBe(true);
    });

    it('takes everything showing, in the order it is showing', () => {
      const page = setup([]);
      page.term.set('42');

      page.chooseAll();

      expect(page.chosen().map((one) => one.tokenId)).toEqual(['42']);
    });

    it('empties the choice', () => {
      const page = setup([]);
      page.chooseAll();

      page.clear();

      expect(page.chosenCount()).toBe(0);
    });
  });

  /**
   * Opening a row and choosing it are different gestures on purpose. Choosing
   * is done in bulk and has to stay one click; opening is what leads to a
   * permanent record being rewritten.
   */
  describe('opening one', () => {
    it('opens and closes a single row at a time', () => {
      const page = setup([]);
      const [first, second] = page.rows();

      page.toggleOpen(first);
      expect(page.opened()).toBe(first.tokenId);

      page.toggleOpen(second);
      expect(page.opened()).toBe(second.tokenId);

      page.toggleOpen(second);
      expect(page.opened()).toBeNull();
    });

    it('does not choose a painting for the dossier', () => {
      const page = setup([]);

      page.toggleOpen(page.rows()[0]);

      expect(page.chosenCount()).toBe(0);
    });

    it('does not open a painting when it is chosen', () => {
      const page = setup([]);

      page.toggleChosen(page.rows()[0]);

      expect(page.opened()).toBeNull();
    });
  });

  it('marks the ones that have sold', () => {
    const page = setup([], ['42']);

    expect(page.isSold(catalogue[2])).toBe(true);
    expect(page.isSold(catalogue[0])).toBe(false);
  });
});
