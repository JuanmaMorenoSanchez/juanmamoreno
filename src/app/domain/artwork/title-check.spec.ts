import { comparableTitle, editDistance, titlesLike } from './title-check';

/**
 * Real titles from the collection, including the ones that are deliberately
 * shared — those are the same painting photographed more than once.
 */
const collection = [
  { tokenId: '2', name: 'Cuando éramos felices' },
  { tokenId: '5', name: 'Rockets win III' },
  { tokenId: '6', name: 'Rockets win III' },
  { tokenId: '131', name: 'Iluminando al mundo' },
  { tokenId: '132', name: 'Hijos de puta' },
  { tokenId: '197', name: 'Primer día con Iris en casa' },
];

describe('titles that would collide', () => {
  it('says nothing about a title nobody has used', () => {
    expect(titlesLike('Un título completamente nuevo', collection)).toEqual([]);
  });

  it('finds the painting a repeated title would join', () => {
    // Not an error: it is how a second photograph of one painting is grouped.
    const found = titlesLike('Rockets win III', collection);

    expect(found).toHaveLength(2);
    expect(found.every((match) => match.same)).toBe(true);
    expect(found.map((match) => match.tokenId)).toEqual(['5', '6']);
  });

  it('reads accents, case and punctuation as ways of writing one name', () => {
    // Stored one way and typed another is still the same painting.
    expect(titlesLike('cuando eramos felices', collection)[0]).toMatchObject({
      tokenId: '2',
      same: true,
    });
    expect(titlesLike('Cuando Éramos, Felices!', collection)[0]?.same).toBe(true);
  });

  it('catches the near miss, which is the dangerous one', () => {
    // A letter out splits a painting from its own other photographs, and
    // nothing would ever say so.
    const found = titlesLike('Rockets win II', collection);

    expect(found.length).toBeGreaterThan(0);
    expect(found[0].same).toBe(false);
    expect(found[0].name).toBe('Rockets win III');
  });

  it('puts an exact match before a near one', () => {
    const found = titlesLike('Rockets win III', [
      { tokenId: '9', name: 'Rockets win II' },
      ...collection,
    ]);

    expect(found[0].same).toBe(true);
  });

  it('does not shout about every short title', () => {
    // Two unrelated titles are not near misses just because they are brief.
    expect(titlesLike('Sol', collection)).toEqual([]);
    expect(titlesLike('', collection)).toEqual([]);
  });

  it('measures an edit distance, and gives up once it cannot matter', () => {
    expect(editDistance('rockets win iii', 'rockets win ii')).toBe(1);
    expect(editDistance('gato', 'gata')).toBe(1);
    // Far apart: answered as over the limit rather than counted exactly.
    expect(editDistance('a short one', 'something else entirely')).toBeGreaterThan(3);
  });

  it('compares titles the way they are read', () => {
    expect(comparableTitle('  Cuando  ÉRAMOS félices!! ')).toBe('cuando eramos felices');
  });
});
