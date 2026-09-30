import { TestBed } from '@angular/core/testing';
import { VALIDTRAITS } from '@domain/artwork/artwork.constants';
import { Nft } from '@domain/artwork/artwork.entity';
import { ARTWORK_PORT } from '@domain/artwork/artwork.token';
import { provideTranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { CatalogueChartComponent } from './catalogue-chart.component';

const painting = (tokenId: string, name: string, year: string): Nft => ({
  tokenId,
  name,
  image: {},
  raw: { metadata: { attributes: [{ trait_type: VALIDTRAITS.YEAR, value: year }] } },
});

type Chart = {
  years: () => Array<{ year: string; count: number; share: number }>;
  total: () => number;
  span: () => string;
  labelled: () => Set<string>;
  columnHeight(one: { count: number; share: number }): number;
};

/** Frontal views are paintings; everything else is another photograph of one. */
function setup(catalogue: Nft[], frontals: string[] = catalogue.map((one) => one.tokenId)) {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    imports: [CatalogueChartComponent],
    providers: [
      provideTranslateService(),
      {
        provide: ARTWORK_PORT,
        useValue: {
          getArtPiecesObservable: () => of(catalogue),
          getTraitValue: (nft: Nft) => nft.raw?.metadata?.attributes?.[0]?.value ?? '',
          isFrontalView: (nft: Nft) => frontals.includes(nft.tokenId),
        },
      },
    ],
  });
  TestBed.overrideComponent(CatalogueChartComponent, { set: { template: '' } });

  return TestBed.createComponent(CatalogueChartComponent).componentInstance as unknown as Chart;
}

/**
 * How many paintings the catalogue holds in each year it covers.
 *
 * Counted at build time from the same catalogue the rest of the site reads, so
 * the drawing cannot drift from the page around it — which is the whole reason
 * the numbers are not written down.
 */
describe('CatalogueChartComponent', () => {
  const catalogue = [
    painting('1', 'One', '2009'),
    painting('2', 'Two', '2009'),
    painting('3', 'Three', '2011'),
    painting('4', 'A detail of Three', '2011'),
  ];

  it('counts paintings, not photographs of them', () => {
    const chart = setup(catalogue, ['1', '2', '3']);

    expect(chart.total()).toBe(3);
    expect(chart.years().find((one) => one.year === '2011')?.count).toBe(1);
  });

  /**
   * A year he painted nothing keeps its place, so the axis is time rather than
   * a list of the years that happen to have work in them.
   */
  it('keeps an empty year in the run', () => {
    const chart = setup(catalogue, ['1', '2', '3']);

    expect(chart.years().map((one) => one.year)).toEqual(['2009', '2010', '2011']);
    expect(chart.years()[1].count).toBe(0);
  });

  /** And draws nothing for it, rather than a sliver that would read as one. */
  it('draws no column for a year with nothing in it', () => {
    const chart = setup(catalogue, ['1', '2', '3']);
    const empty = chart.years()[1];

    expect(chart.columnHeight(empty)).toBe(0);
  });

  it('says the span it covers', () => {
    expect(setup(catalogue, ['1', '2', '3']).span()).toBe('2009–2011');
  });

  it('measures every column against the tallest year', () => {
    const chart = setup(catalogue, ['1', '2', '3']);

    expect(chart.years().find((one) => one.year === '2009')?.share).toBe(100);
    expect(chart.years().find((one) => one.year === '2011')?.share).toBe(50);
  });

  /** Nineteen labels do not fit; a crowded axis says less than a sparse one. */
  it('names every fifth year and the last', () => {
    const many = Array.from({ length: 12 }, (_, at) =>
      painting(String(at), `P${at}`, String(2010 + at))
    );
    const chart = setup(many);

    expect([...chart.labelled()]).toEqual(['2010', '2015', '2020', '2021']);
  });

  /** Before the catalogue arrives there is nothing to draw, and it draws nothing. */
  it('is empty until the catalogue is', () => {
    const chart = setup([]);

    expect(chart.years()).toEqual([]);
    expect(chart.total()).toBe(0);
  });

  it('ignores a painting with no year on it', () => {
    const chart = setup([painting('1', 'One', ''), painting('2', 'Two', '2011')]);

    expect(chart.years().map((one) => one.year)).toEqual(['2011']);
  });
});
