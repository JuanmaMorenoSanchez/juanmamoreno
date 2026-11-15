import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ARTWORK_PORT } from '@domain/artwork/artwork.token';
import { KeptService, type KeptPiece } from '@features/atelier/kept.service';
import { of } from 'rxjs';
import { AssetsComponent, cutsFrom } from './assets.component';

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

/**
 * Which of the two questions the page opens on.
 *
 * Two of a hundred and ninety-two paintings had been cut, and the page listed
 * all hundred and ninety-two: the two that could be opened were somewhere in
 * eight thousand pixels of rows that said "—". How much is left is the count
 * in the line above, which is why that is the half that can be put away.
 */
describe('the page itself', () => {
  async function build(): Promise<ComponentFixture<AssetsComponent>> {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [AssetsComponent],
      providers: [
        provideRouter([]),
        {
          provide: ARTWORK_PORT,
          useValue: {
            getArtPiecesObservable: () =>
              of([
                { tokenId: '2', name: 'Cuando éramos felices' },
                { tokenId: '195', name: 'Rockets win I' },
              ]),
          },
        },
        {
          provide: KeptService,
          useValue: {
            pieces: signal([piece({ tokenId: '2' })]),
            smallUrls: signal({}),
            trouble: signal({}),
            ensure: async () => undefined,
            showSmall: () => undefined,
          },
        },
      ],
    });

    const fixture = TestBed.createComponent(AssetsComponent);
    fixture.detectChanges();
    // `ensure()` is a promise, and until it has settled the page is still
    // "Looking…" — which is when it has no chips to press.
    await fixture.whenStable();
    fixture.detectChanges();
    return fixture;
  }

  const rows = (fixture: ComponentFixture<AssetsComponent>): string[] =>
    Array.from(fixture.nativeElement.querySelectorAll('.assets-name')).map((one) =>
      (one as HTMLElement).textContent!.trim()
    );

  it('opens on the paintings that have parts', async () => {
    const fixture = await build();

    expect(rows(fixture)).toEqual(['Cuando éramos felices']);
  });

  it('shows the whole catalogue, which is the work left, when asked', async () => {
    const fixture = await build();

    fixture.nativeElement.querySelector('[data-testid="show-all"]').click();
    fixture.detectChanges();

    expect(rows(fixture)).toEqual(['Cuando éramos felices', 'Rockets win I']);
  });
});
