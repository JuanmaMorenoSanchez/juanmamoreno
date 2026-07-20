import { SORT } from '@shared/constants/order.constants';
import { Artwork } from './artwork';
import { VALIDTRAITS, VIEW_TYPES } from './artwork.constants';
import { Nft, NftImage, Trait } from './artwork.entity';

// ── Test data helpers ──────────────────────────────────────────────────────

const trait = (trait_type: string, value: string): Trait => ({ trait_type, value });

/** Builds a well-formed Nft with the given traits. */
function nft(tokenId: string, traits: Trait[] = [], props: Partial<Nft> = {}): Nft {
  return {
    tokenId,
    name: 'Untitled',
    image: {},
    raw: { metadata: { attributes: traits } },
    ...props,
  };
}

/** An Nft whose raw metadata is missing entirely (simulates malformed data). */
function brokenNft(tokenId = 'broken'): Nft {
  return { tokenId, name: 'Broken', image: {} } as unknown as Nft;
}

const frontal = () => trait(VALIDTRAITS.IMAGETYPE, VIEW_TYPES.FRONTAL);
const year = (y: string) => trait(VALIDTRAITS.YEAR, y);
const version = (v: string) => trait(VALIDTRAITS.VERSION, v);

describe('Artwork', () => {
  let art: Artwork;
  beforeEach(() => {
    art = new Artwork();
  });

  // ── getTraitValue ────────────────────────────────────────────────────────
  describe('getTraitValue', () => {
    it('returns the value of a present trait', () => {
      const n = nft('1', [trait(VALIDTRAITS.MEDIUM, 'Oil on canvas')]);
      expect(art.getTraitValue(n, VALIDTRAITS.MEDIUM)).toBe('Oil on canvas');
    });

    it('returns empty string when the trait is absent but metadata is valid', () => {
      const n = nft('1', [trait(VALIDTRAITS.YEAR, '2021')]);
      expect(art.getTraitValue(n, VALIDTRAITS.MEDIUM)).toBe('');
    });

    it('keeps an explicit empty-string value (does not fall through to default)', () => {
      const n = nft('1', [trait(VALIDTRAITS.MEDIUM, '')]);
      expect(art.getTraitValue(n, VALIDTRAITS.MEDIUM)).toBe('');
    });

    // FINDING (robustness): when metadata is malformed the catch block returns
    // trait-specific SENTINEL strings instead of empty/undefined. These leak
    // into anything that reads them (see getSize / isFrontalView below).
    it('returns trait-specific fallbacks when metadata is malformed', () => {
      const b = brokenNft();
      expect(art.getTraitValue(b, VALIDTRAITS.MEDIUM)).toBe('Error getting medium');
      expect(art.getTraitValue(b, VALIDTRAITS.HEIGHT)).toBe('XX');
      expect(art.getTraitValue(b, VALIDTRAITS.WIDTH)).toBe('XX');
      expect(art.getTraitValue(b, VALIDTRAITS.UNIT)).toBe('cm');
      expect(art.getTraitValue(b, VALIDTRAITS.YEAR)).toBe('XXXX');
      expect(art.getTraitValue(b, VALIDTRAITS.VERSION)).toBe('');
      expect(art.getTraitValue(b, VALIDTRAITS.ARTIST)).toBe('Error getting data');
    });

    // Fixed: a malformed nft must NOT report a real VIEW_TYPES value for
    // IMAGETYPE, or it would be misclassified as a frontal view.
    it('returns a neutral (empty) IMAGETYPE for malformed data', () => {
      const imageType = art.getTraitValue(brokenNft(), VALIDTRAITS.IMAGETYPE);
      expect(imageType).toBe('');
      expect(imageType).not.toBe(VIEW_TYPES.FRONTAL);
    });
  });

  // ── getYears ─────────────────────────────────────────────────────────────
  describe('getYears', () => {
    it('returns a set of numeric years sorted descending, de-duplicated', () => {
      const nfts = [nft('1', [year('2019')]), nft('2', [year('2021')]), nft('3', [year('2021')])];
      expect([...art.getYears(nfts)]).toEqual([2021, 2019]);
    });

    it('drops non-numeric years (e.g. the "XXXX" fallback)', () => {
      const nfts = [nft('1', [year('2020')]), nft('2', [year('not-a-year')]), brokenNft()];
      expect([...art.getYears(nfts)]).toEqual([2020]);
    });

    it('handles null/undefined input without throwing', () => {
      expect([...art.getYears(null as unknown as Nft[])]).toEqual([]);
      expect([...art.getYears(undefined as unknown as Nft[])]).toEqual([]);
    });
  });

  // ── sortByYear ───────────────────────────────────────────────────────────
  describe('sortByYear', () => {
    const a = nft('a', [year('2019')]);
    const b = nft('b', [year('2021')]);
    const c = nft('c', [year('2020')]);

    it('sorts ascending by default', () => {
      expect(art.sortByYear([b, a, c]).map((n) => n.tokenId)).toEqual(['a', 'c', 'b']);
    });

    it('sorts descending when requested', () => {
      expect(art.sortByYear([a, b, c], SORT.DESC).map((n) => n.tokenId)).toEqual(['b', 'c', 'a']);
    });

    it('is stable for equal years (preserves input order)', () => {
      const y1 = nft('y1', [year('2020')]);
      const y2 = nft('y2', [year('2020')]);
      expect(art.sortByYear([y1, y2]).map((n) => n.tokenId)).toEqual(['y1', 'y2']);
      expect(art.sortByYear([y2, y1]).map((n) => n.tokenId)).toEqual(['y2', 'y1']);
    });

    it('does not mutate the input array', () => {
      const input = [b, a, c];
      const snapshot = [...input];
      art.sortByYear(input);
      expect(input).toEqual(snapshot);
    });

    // Fixed: a non-numeric year maps to 0 in the comparator (no NaN), so the
    // order is deterministic — the malformed item sorts as year 0.
    it('orders a non-numeric year deterministically as 0', () => {
      const bad = nft('bad', [year('XXXX')]);
      expect(art.sortByYear([a, bad, b]).map((n) => n.tokenId)).toEqual(['bad', 'a', 'b']);
      expect(art.sortByYear([a, bad, b], SORT.DESC).map((n) => n.tokenId)).toEqual(['b', 'a', 'bad']);
    });
  });

  // ── sortByMedium ─────────────────────────────────────────────────────────
  describe('sortByMedium', () => {
    const oil = nft('oil', [trait(VALIDTRAITS.MEDIUM, 'Oil on canvas')]);
    const water = nft('water', [trait(VALIDTRAITS.MEDIUM, 'Watercolor on paper')]);
    const other = nft('other', [trait(VALIDTRAITS.MEDIUM, 'Charcoal')]);

    it('ranks oil before watercolor before anything else (ascending)', () => {
      expect(art.sortByMedium([other, water, oil]).map((n) => n.tokenId)).toEqual([
        'oil', 'water', 'other',
      ]);
    });

    it('reverses order when descending', () => {
      expect(art.sortByMedium([oil, water, other], SORT.DESC).map((n) => n.tokenId)).toEqual([
        'other', 'water', 'oil',
      ]);
    });

    it('is case-insensitive on the medium name', () => {
      const upper = nft('upper', [trait(VALIDTRAITS.MEDIUM, 'OIL PASTEL')]);
      const misc = nft('misc', [trait(VALIDTRAITS.MEDIUM, 'Ink')]);
      expect(art.sortByMedium([misc, upper]).map((n) => n.tokenId)).toEqual(['upper', 'misc']);
    });

    it('does not mutate the input array', () => {
      const input = [other, oil, water];
      const snapshot = [...input];
      art.sortByMedium(input);
      expect(input).toEqual(snapshot);
    });
  });

  // ── sortBySize ───────────────────────────────────────────────────────────
  describe('sortBySize', () => {
    const small = nft('small', [trait(VALIDTRAITS.HEIGHT, '10'), trait(VALIDTRAITS.WIDTH, '10')]);
    const big = nft('big', [trait(VALIDTRAITS.HEIGHT, '100'), trait(VALIDTRAITS.WIDTH, '100')]);

    it('sorts by summed dimensions ascending then descending', () => {
      expect(art.sortBySize([big, small]).map((n) => n.tokenId)).toEqual(['small', 'big']);
      expect(art.sortBySize([small, big], SORT.DESC).map((n) => n.tokenId)).toEqual(['big', 'small']);
    });
  });

  // ── sortByName ───────────────────────────────────────────────────────────
  describe('sortByName', () => {
    it('sorts case-insensitively', () => {
      const nfts = [nft('1', [], { name: 'banana' }), nft('2', [], { name: 'Apple' })];
      expect(art.sortByName(nfts).map((n) => n.name)).toEqual(['Apple', 'banana']);
    });

    it('treats a missing name as empty string without throwing', () => {
      const noName = nft('1', [], { name: undefined as unknown as string });
      const named = nft('2', [], { name: 'Art' });
      expect(() => art.sortByName([named, noName])).not.toThrow();
      expect(art.sortByName([named, noName])[0].name).toBeUndefined();
    });
  });

  // ── getSize ──────────────────────────────────────────────────────────────
  describe('getSize', () => {
    it('sums parsed height and width', () => {
      const n = nft('1', [trait(VALIDTRAITS.HEIGHT, '30'), trait(VALIDTRAITS.WIDTH, '40')]);
      expect(art.getSize(n)).toBe(70);
    });

    // Fixed: non-numeric dimensions (or the "XX" fallback) count as 0 instead
    // of poisoning the result with NaN.
    it('treats non-numeric dimensions as 0', () => {
      expect(art.getSize(brokenNft())).toBe(0);
      const oneBad = nft('1', [trait(VALIDTRAITS.HEIGHT, '30'), trait(VALIDTRAITS.WIDTH, 'n/a')]);
      expect(art.getSize(oneBad)).toBe(30);
    });
  });

  // ── getNftById / getArtByTitle / getNftLenghtByYear ──────────────────────
  describe('lookup helpers', () => {
    const nfts = [nft('1', [year('2020')], { name: 'A' }), nft('2', [year('2021')], { name: 'B' })];

    it('getNftById returns the match or null', () => {
      expect(art.getNftById('2', nfts)?.tokenId).toBe('2');
      expect(art.getNftById('nope', nfts)).toBeNull();
    });

    it('getArtByTitle filters by exact name', () => {
      expect(art.getArtByTitle('A', nfts).map((n) => n.tokenId)).toEqual(['1']);
      expect(art.getArtByTitle('missing', nfts)).toEqual([]);
    });

    it('getNftLenghtByYear counts matches for a year string', () => {
      expect(art.getNftLenghtByYear('2020', nfts)).toBe(1);
      expect(art.getNftLenghtByYear('1999', nfts)).toBe(0);
    });
  });

  // ── filterFrontalArtworks / isFrontalView ────────────────────────────────
  describe('frontal view logic', () => {
    it('filterFrontalArtworks keeps only frontal-view nfts', () => {
      const f = nft('f', [frontal()]);
      const d = nft('d', [trait(VALIDTRAITS.IMAGETYPE, VIEW_TYPES.DETAIL)]);
      expect(art.filterFrontalArtworks([f, d]).map((n) => n.tokenId)).toEqual(['f']);
    });

    it('isFrontalView is false when there are no frontals in the group', () => {
      const nonFrontal = nft('1', [trait(VALIDTRAITS.IMAGETYPE, VIEW_TYPES.DETAIL)]);
      expect(art.isFrontalView(nonFrontal, [nonFrontal])).toBe(false);
    });

    it('isFrontalView matches the single frontal by tokenId', () => {
      const f = nft('f', [frontal()]);
      const other = nft('o', [frontal()]);
      expect(art.isFrontalView(f, [f])).toBe(true);
      expect(art.isFrontalView(other, [f])).toBe(false);
    });

    it('isFrontalView picks the latest version when several frontals exist', () => {
      const v1 = nft('v1', [frontal(), version('1')]);
      const v2 = nft('v2', [frontal(), version('2')]);
      expect(art.isFrontalView(v2, [v1, v2])).toBe(true);
      expect(art.isFrontalView(v1, [v1, v2])).toBe(false);
    });

    // Fixed: a malformed nft is no longer mistaken for a frontal view.
    it('does not classify a malformed nft as a frontal view', () => {
      expect(art.filterFrontalArtworks([brokenNft()])).toEqual([]);
    });
  });

  // ── isExcludedByYear ─────────────────────────────────────────────────────
  describe('isExcludedByYear', () => {
    const n = nft('1', [year('2020')]);

    it('never excludes when the year filter is empty/undefined', () => {
      expect(art.isExcludedByYear(n, [])).toBe(false);
      expect(art.isExcludedByYear(n, undefined)).toBe(false);
    });

    it('excludes when the nft year is not in the allowed list', () => {
      expect(art.isExcludedByYear(n, ['2021'])).toBe(true);
    });

    it('does not exclude when the nft year is in the allowed list', () => {
      expect(art.isExcludedByYear(n, ['2020', '2021'])).toBe(false);
    });
  });

  // ── getLatestVersion / getLatestVersionIndex ─────────────────────────────
  describe('version selection', () => {
    it('getLatestVersion returns null for an empty list', () => {
      expect(art.getLatestVersion([])).toBeNull();
    });

    it('getLatestVersion returns the highest version', () => {
      const v1 = nft('v1', [version('1')]);
      const v3 = nft('v3', [version('3')]);
      const v2 = nft('v2', [version('2')]);
      expect(art.getLatestVersion([v1, v3, v2])?.tokenId).toBe('v3');
    });

    it('getLatestVersion keeps the first when versions tie', () => {
      const a = nft('a', [version('2')]);
      const b = nft('b', [version('2')]);
      expect(art.getLatestVersion([a, b])?.tokenId).toBe('a');
    });

    it('treats missing/unparseable versions as 0', () => {
      const none = nft('none', []);
      const one = nft('one', [version('1')]);
      expect(art.getLatestVersion([none, one])?.tokenId).toBe('one');
    });

    it('getLatestVersionIndex returns the index, or -1 for empty', () => {
      const v1 = nft('v1', [version('1')]);
      const v2 = nft('v2', [version('2')]);
      expect(art.getLatestVersionIndex([v1, v2])).toBe(1);
      expect(art.getLatestVersionIndex([])).toBe(-1);
    });
  });

  // ── URL collection ───────────────────────────────────────────────────────
  describe('url collection', () => {
    const image: NftImage = {
      originalUrl: 'ipfs://original',
      cachedUrl: 'https://cached',
      thumbnailUrl: 'https://thumb',
      pngUrl: 'https://png',
    };

    it('getNftQualityUrls orders original > cached > thumbnail', () => {
      expect(art.getNftQualityUrls(image)).toEqual([
        'ipfs://original', 'https://cached', 'https://thumb',
      ]);
    });

    it('getNftFetchableUrls orders original > png > thumbnail', () => {
      expect(art.getNftFetchableUrls(image)).toEqual([
        'ipfs://original', 'https://png', 'https://thumb',
      ]);
    });

    it('getNftOptimalUrl prefers the thumbnail', () => {
      expect(art.getNftOptimalUrl(image)).toBe('https://thumb');
    });

    it('getNftQualityUrl returns the best, or empty string when none', () => {
      expect(art.getNftQualityUrl(image)).toBe('ipfs://original');
      expect(art.getNftQualityUrl({})).toBe('');
    });

    it('drops empty/undefined urls and de-duplicates identical ones', () => {
      const partial: NftImage = { originalUrl: 'same', cachedUrl: 'same', thumbnailUrl: '' };
      expect(art.getNftQualityUrls(partial)).toEqual(['same']);
    });

    it('returns an empty list for undefined image without throwing', () => {
      expect(art.getNftQualityUrls(undefined as unknown as NftImage)).toEqual([]);
      expect(art.getNftQualityUrl(undefined as unknown as NftImage)).toBe('');
    });
  });
});
