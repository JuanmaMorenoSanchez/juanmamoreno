import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { VALIDTRAITS } from '@domain/artwork/artwork.constants';
import { Nft } from '@domain/artwork/artwork.entity';
import { ARTWORK_PORT } from '@domain/artwork/artwork.token';
import { provideTranslateService } from '@ngx-translate/core';
import { AvailabilityService } from '@shared/services/availability.service';
import { PostedArtworksService } from '@shared/services/posted-artworks.service';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { ActivityApiService, PostInsight } from '@features/activity/activity.service';
import { AdminAuthService } from '@shared/services/admin-auth.service';
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
  // Same year, so the token id breaks the tie and 101 leads 42.
  painting('101', 'Middle'),
  painting('42', 'Newest'),
];

let forgetPost: ReturnType<typeof vi.fn>;

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
  allNetworks: ReadonlyArray<{ id: string; mark: string; label: string }>;
  onNetwork(nft: Nft, network: string): boolean;
  networksOf(nft: Nft): string[];
  forget(nft: Nft, network: string): Promise<void>;
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
  sold: string[] = [],
  networks: Record<string, string[]> = {}
) {
  forgetPost = vi.fn(() => of({ forgotten: 1 }));
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
            nft.raw?.metadata?.attributes?.find((a: { trait_type: string }) => a.trait_type === key)
              ?.value ?? '',
          getNftOptimalUrl: (image: { thumbnailUrl?: string }) => image?.thumbnailUrl ?? '',
        },
      },
      {
        provide: PostedArtworksService,
        useValue: {
          getLatest: () => of(posted),
          getNetworks: () => of(networks),
          forgetPost: forgetPost,
        },
      },
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
  /**
   * By the year the painting was made, not by the number on its certificate.
   *
   * A token id is the order the paintings were certified, which is the order he
   * got round to them — 2009 work certified last year sits among the new ones.
   * The year is the number he thinks in.
   */
  it('lists one row per token, by the year the painting was made', () => {
    const page = setup([]);

    expect(page.rows().map((one) => one.tokenId)).toEqual(['101', '42', '7']);
  });

  it('puts an older painting below a newer one whatever its number', () => {
    const page = setup([]);
    const years = page.rows().map((one) => page.trait(one, VALIDTRAITS.YEAR));

    expect(years).toEqual(['2026', '2026', '2019']);
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

  /**
   * One mark per network on a row.
   *
   * Instagram's feed and its reels are separate marks on purpose: they are two
   * different things to have done with a painting, and while both wore the same
   * mark the studio could not tell them apart.
   */
  describe('where a painting has been', () => {
    const on = { '42': ['instagram', 'instagram reel video', 'facebook'], '7': ['bluesky'] };

    it('tells the feed and a reel apart', () => {
      const page = setup([], [], on);

      expect(page.onNetwork(catalogue[2], 'instagram')).toBe(true);
      expect(page.onNetwork(catalogue[2], 'instagram reel video')).toBe(true);
      expect(page.onNetwork(catalogue[0], 'instagram')).toBe(false);
      expect(page.onNetwork(catalogue[0], 'bluesky')).toBe(true);
    });

    it('marks the other networks too', () => {
      const page = setup([], [], on);

      expect(page.networksOf(catalogue[2])).toContain('facebook');
      expect(page.networksOf(catalogue[0])).toEqual(['bluesky']);
    });

    /** Fixed, so a row does not reshuffle as answers arrive. */
    it('keeps the marks in one order', () => {
      const page = setup([], [], on);

      expect(page.networksOf(catalogue[2])).toEqual([
        'instagram',
        'instagram reel video',
        'facebook',
      ]);
    });

    it('marks nothing for a painting that has never gone out', () => {
      const page = setup([], [], on);

      expect(page.networksOf(catalogue[1])).toEqual([]);
    });
  });

  /**
   * For a post that no longer exists. It puts the painting back in that
   * network's queue, so it is confirmed first — right for a post that was
   * deleted, wrong for one that is still up.
   */
  describe('forgetting a post', () => {
    const on = { '42': ['instagram reel video'] };

    it('forgets the network it was asked about', async () => {
      const page = setup([], [], on);
      vi.spyOn(window, 'confirm').mockReturnValue(true);

      await page.forget(catalogue[2], 'instagram reel video');

      expect(forgetPost).toHaveBeenCalledWith('42', 'instagram reel video');
    });

    it('does nothing when the confirmation is dismissed', async () => {
      const page = setup([], [], on);
      vi.spyOn(window, 'confirm').mockReturnValue(false);

      await page.forget(catalogue[2], 'instagram reel video');

      expect(forgetPost).not.toHaveBeenCalled();
    });
  });
});

describe('CatalogueAdminComponent — arranging by what Instagram said', () => {
  let fixture: ComponentFixture<CatalogueAdminComponent>;

  const painting = (tokenId: string, year: string): Nft =>
    ({
      tokenId,
      name: `Painting ${tokenId}`,
      image: {},
      raw: { metadata: { attributes: [{ trait_type: VALIDTRAITS.YEAR, value: year }] } },
    }) as unknown as Nft;

  const catalogue = [painting('1', '2024'), painting('2', '2025'), painting('3', '2026')];

  function build(insights: PostInsight[] | undefined): void {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [CatalogueAdminComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: AdminAuthService, useValue: { bearerToken: () => 'a-token' } },
        { provide: ActivityApiService, useValue: { insights: () => of(insights) } },
        {
          provide: ARTWORK_PORT,
          useValue: {
            getArtPiecesObservable: () => of(catalogue),
            getTraitValue: (nft: Nft, trait: string) =>
              String(
                (nft.raw?.metadata?.attributes ?? []).find(
                  (a: { trait_type: string }) => a.trait_type === trait
                )?.value ?? ''
              ),
            isFrontalView: () => true,
            getNftOptimalUrl: (image: { thumbnailUrl?: string }) => image?.thumbnailUrl ?? '',
          },
        },
        {
          provide: PostedArtworksService,
          useValue: {
            getLatest: () => of([]),
            getNetworks: () => of([]),
            forgetPost: () => of(true),
          },
        },
        { provide: AvailabilityService, useValue: { isSold: () => false } },
        provideTranslateService(),
      ],
    });
    fixture = TestBed.createComponent(CatalogueAdminComponent);
    fixture.detectChanges();
  }

  const insight = (tokenId: string, metrics: Record<string, number>): PostInsight => ({
    tokenId,
    mediaId: `m${tokenId}`,
    metrics,
    readAt: '2026-10-03T06:00:00.000Z',
  });

  const order = () =>
    (fixture.componentInstance as unknown as { rows: () => Nft[] }).rows().map((n) => n.tokenId);

  const arrange = (how: string) =>
    (fixture.componentInstance as unknown as { arrange: (o: string) => void }).arrange(how);

  const label = (how: string) =>
    (fixture.componentInstance as unknown as { label: (o: string) => string }).label(how);

  /**
   * One button per ordering, and pressing it again turns it round. Two buttons
   * for the two ends of one ordering said the same thing twice.
   */
  it('arranges by year, and turns round when pressed again', () => {
    build([]);

    // Year is where the page opens, newest first, so the first press is already
    // the second state of that button.
    expect(order()).toEqual(['3', '2', '1']);

    arrange('year');
    expect(order()).toEqual(['1', '2', '3']);

    arrange('year');
    expect(order()).toEqual(['3', '2', '1']);
  });

  /** A different ordering starts where its own button says it will. */
  it('starts a new ordering at the end its label promises', () => {
    build([insight('1', { reach: 10 }), insight('2', { reach: 90 }), insight('3', { reach: 50 })]);

    arrange('year');
    arrange('year'); // now pointing the other way
    arrange('reach');

    expect(order()).toEqual(['2', '3', '1']);
    expect(label('reach')).toBe('Reached most');
  });

  /** The button says where the list points, so it can be read without pressing. */
  it('says which way it is pointing', () => {
    build([]);

    expect(label('year')).toBe('Newest first');
    arrange('year');
    expect(label('year')).toBe('Oldest first');
    arrange('year');
    expect(label('year')).toBe('Newest first');
  });

  /** An ordering that is not on says where it would go, not where it last was. */
  it('shows an ordering that is off at its own starting end', () => {
    build([insight('1', { reach: 10 })]);

    arrange('reach');
    arrange('reach'); // reach now points the other way
    arrange('year');

    expect(label('reach')).toBe('Reached most');
  });

  /**
   * `total_interactions` is a reel metric. What goes out nightly is a carousel
   * of photographs, Instagram refuses the reel metrics for one and answers with
   * the basic set — so the ordering read a number that was stored on none of
   * the fifty posts. These four are what it does send, and their sum is the
   * same quantity by its own definition.
   */
  it('adds up what a post provoked, from the metrics Instagram actually sends', () => {
    build([
      insight('1', { likes: 1, comments: 1, saved: 1 }),
      insight('3', { likes: 20, comments: 5, shares: 2, saved: 3 }),
      insight('2', { likes: 10, comments: 1, saved: 0 }),
    ]);

    arrange('liked');

    expect(order()).toEqual(['3', '2', '1']);
  });

  it('puts the furthest reached first', () => {
    build([
      insight('1', { reach: 50 }),
      insight('2', { reach: 900 }),
      insight('3', { reach: 120 }),
    ]);

    arrange('reach');

    expect(order()).toEqual(['2', '3', '1']);
  });

  /**
   * A painting with no number is not a painting with a nought. Never posted and
   * posted-and-ignored are different things, and only one of them is a verdict
   * — so the unmeasured go to the end rather than to the bottom of the ranking.
   */
  it('sends the unmeasured to the end rather than ranking them last', () => {
    build([insight('2', { reach: 10 })]);

    arrange('reach');

    expect(order()[0]).toBe('2');
    expect(order().slice(1).sort()).toEqual(['1', '3']);
  });

  /**
   * The point of the whole arrangement. "Least reached" is a statement about
   * paintings that were posted; one that was never posted is not the least
   * reached of them, it is not in the running — so turning the order round must
   * not bring it to the front.
   */
  it('keeps the never-posted at the end when the order is turned round', () => {
    build([insight('2', { reach: 90 }), insight('3', { reach: 10 })]);

    arrange('reach');
    expect(order()).toEqual(['2', '3', '1']);

    arrange('reach');
    expect(order()).toEqual(['3', '2', '1']);
    expect(order()[2]).toBe('1');
  });

  it('keeps the never-posted at the end either way round for every metric', () => {
    build([insight('2', { reach: 90, likes: 40 }), insight('3', { reach: 10, likes: 5 })]);

    for (const how of ['reach', 'liked']) {
      arrange(how);
      expect(order()[2]).toBe('1');
      arrange(how);
      expect(order()[2]).toBe('1');
    }
  });

  /** A control that silently does nothing is worse than one that is not there. */
  it('offers no metric ordering while there are no metrics', () => {
    build([]);

    const buttons = [...fixture.nativeElement.querySelectorAll('button')].map((b: HTMLElement) =>
      b.textContent?.trim()
    );
    expect(buttons).not.toContain('Reached most');
  });

  it('offers them once there is something to sort by', () => {
    build([insight('1', { reach: 10 })]);

    const buttons = [...fixture.nativeElement.querySelectorAll('button')].map((b: HTMLElement) =>
      b.textContent?.trim()
    );
    expect(buttons).toContain('Reached most');
  });

  /**
   * "No numbers yet" and "could not ask" look identical in an empty column and
   * only one of them is fine.
   */
  it('tells a listing that failed from a catalogue with no numbers', () => {
    build(undefined);

    const component = fixture.componentInstance as unknown as {
      numbersUnknown: () => boolean;
      noNumbers: () => boolean;
    };
    expect(component.numbersUnknown()).toBe(true);
    expect(component.noNumbers()).toBe(true);
  });

  it('shows on the row what the post reached and provoked', () => {
    build([insight('1', { reach: 300, likes: 20, comments: 3, saved: 1 })]);

    const shown = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(shown).toContain('300 reached');
    expect(shown).toContain('24 interactions');
  });

  /** Nothing of its own to say is not a nought: the row simply stays quiet. */
  it('says nothing about a painting Instagram has no numbers for', () => {
    build([insight('2', { reach: 300 })]);

    const rows = [...fixture.nativeElement.querySelectorAll('.cat-metrics')];
    expect(rows.length).toBe(1);
  });
});
