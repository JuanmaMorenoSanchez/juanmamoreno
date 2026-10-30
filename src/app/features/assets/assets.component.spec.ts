import { cutsFrom } from './assets.component';
import type { KeptPiece } from '@features/atelier/kept.service';

/**
 * The grouping is the page.
 *
 * Everything else here is tiles and buttons that say what they do; this is
 * the one part that can be quietly wrong — a painting whose parts land under
 * the wrong heading, or a reel counted as a cut of the canvas it was filmed
 * from, looks exactly like a page that works.
 */
const piece = (said: Partial<KeptPiece> = {}): KeptPiece => ({
  id: 'p1',
  name: 'Cuando éramos felices',
  tokenId: '2',
  kind: 'layer-a-blue-cup',
  media: 'image/png',
  width: 2500,
  height: 2500,
  bytes: 10,
  created: '',
  ...said,
});

describe('what the nights cut', () => {
  const catalogue = [
    { tokenId: '2', name: 'Cuando éramos felices' },
    { tokenId: '195', name: 'Rockets win I' },
  ];

  it('puts each part under the painting it came out of', () => {
    const cuts = cutsFrom(catalogue, [
      piece({ id: 'a', tokenId: '2' }),
      piece({ id: 'b', tokenId: '195', name: 'Rockets win I' }),
      piece({ id: 'c', tokenId: '2' }),
    ]);

    expect(cuts.map((one) => one.parts.length)).toEqual([2, 1]);
  });

  it('keeps a painting nothing has been cut from, which is the work left', () => {
    // The whole second half of the page: the ledger that knows what is done
    // lives on one laptop, and this says the same thing from the bucket.
    const cuts = cutsFrom(catalogue, [piece({ tokenId: '2' })]);

    expect(cuts).toHaveLength(2);
    expect(cuts[1]).toMatchObject({ tokenId: '195', parts: [] });
  });

  it('keeps the catalogue in its own order', () => {
    const cuts = cutsFrom(catalogue, [piece({ tokenId: '195' })]);

    expect(cuts.map((one) => one.tokenId)).toEqual(['2', '195']);
  });

  it('leaves out a clip, which is not a part of a painting', () => {
    // A reel is filmed from a canvas and carries its token, so it would
    // otherwise be counted here as one of the things cut out of it.
    const cuts = cutsFrom(catalogue, [
      piece({ id: 'a', tokenId: '2' }),
      piece({ id: 'reel', tokenId: '2', media: 'video/mp4', kind: 'clip' }),
    ]);

    expect(cuts[0].parts.map((one) => one.id)).toEqual(['a']);
  });

  it('leaves out a piece belonging to no painting', () => {
    // The atelier's own experiments. They have a home already and it is not
    // this page, which is about the catalogue.
    const cuts = cutsFrom(catalogue, [piece({ id: 'loose', tokenId: null })]);

    expect(cuts.every((one) => !one.parts.length)).toBe(true);
  });

  it('falls back to the name the piece carries', () => {
    // Read at the moment of cutting, which is the better name when the
    // catalogue entry has none.
    const cuts = cutsFrom(
      [{ tokenId: '2', name: null }],
      [piece({ name: 'Cuando éramos felices' })]
    );

    expect(cuts[0].name).toBe('Cuando éramos felices');
  });

  it('answers with nothing for an empty catalogue', () => {
    expect(cutsFrom([], [piece()])).toEqual([]);
  });
});
