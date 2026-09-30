import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { VALIDTRAITS } from '@domain/artwork/artwork.constants';
import { Nft } from '@domain/artwork/artwork.entity';
import { ARTWORK_PORT } from '@domain/artwork/artwork.token';
import { TranslatePipe } from '@ngx-translate/core';

/** One year and how many paintings carry it. */
export interface YearCount {
  year: string;
  count: number;
  /** Height as a percentage of the tallest year, for the column. */
  share: number;
}

/** The drawing's own coordinate space; the svg scales to whatever width it gets. */
const CHART = { width: 720, height: 200, gap: 4, labelBand: 22 };

/**
 * How many paintings the catalogue holds in each year it covers.
 *
 * **Counted from the catalogue at build time, not written down.** Every number
 * here comes from the same source the rest of the site reads, so the drawing is
 * as current as the page around it and cannot drift from it — a chart with
 * last year's figures typed into it is worse than no chart.
 *
 * One painting per column, not one certificate: a painting photographed three
 * times is one painting, which is the number a reader means.
 *
 * Drawn as svg in the page rather than by a charting library, because this site
 * is written to disk before it is published and read without JavaScript. A
 * chart that needs a script to appear would be a blank rectangle in the one
 * place this page is making a claim about how it is built.
 */
@Component({
  selector: 'app-catalogue-chart',
  templateUrl: './catalogue-chart.component.html',
  styleUrl: './catalogue-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe],
})
export class CatalogueChartComponent {
  private readonly artworkService = inject(ARTWORK_PORT);

  protected readonly chart = CHART;

  private readonly all = toSignal(this.artworkService.getArtPiecesObservable(), {
    initialValue: [] as Nft[],
  });

  /** One entry per year the catalogue covers, oldest first, gaps included. */
  protected readonly years = computed<YearCount[]>(() => {
    const paintings = this.paintings();
    if (!paintings.length) return [];

    const counted = new Map<number, number>();
    for (const painting of paintings) {
      const year = Number(this.artworkService.getTraitValue(painting, VALIDTRAITS.YEAR));
      if (!Number.isFinite(year) || year < 1) continue;
      counted.set(year, (counted.get(year) ?? 0) + 1);
    }
    if (!counted.size) return [];

    // A year he painted nothing is a real answer and keeps its place, so the
    // axis is time rather than a list of years that happen to have work in them.
    const first = Math.min(...counted.keys());
    const last = Math.max(...counted.keys());
    const tallest = Math.max(...counted.values());

    const years: YearCount[] = [];
    for (let year = first; year <= last; year += 1) {
      const count = counted.get(year) ?? 0;
      years.push({ year: String(year), count, share: (count / tallest) * 100 });
    }
    return years;
  });

  protected readonly total = computed(() => this.paintings().length);

  protected readonly span = computed(() => {
    const years = this.years();
    return years.length ? `${years[0].year}–${years[years.length - 1].year}` : '';
  });

  /** Every fifth year and the last one, because nineteen labels do not fit. */
  protected readonly labelled = computed(() => {
    const years = this.years();
    return new Set(
      years.filter((_, at) => at % 5 === 0 || at === years.length - 1).map((one) => one.year)
    );
  });

  protected columnWidth(): number {
    const many = this.years().length || 1;
    return (CHART.width - CHART.gap * (many - 1)) / many;
  }

  protected columnX(at: number): number {
    return at * (this.columnWidth() + CHART.gap);
  }

  protected columnHeight(one: YearCount): number {
    const plot = CHART.height - CHART.labelBand;
    // A year with nothing in it draws nothing rather than a sliver that would
    // read as one painting.
    return one.count ? Math.max(2, (one.share / 100) * plot) : 0;
  }

  protected columnY(one: YearCount): number {
    return CHART.height - CHART.labelBand - this.columnHeight(one);
  }

  /** One painting per entry: the frontal view of each group sharing a title. */
  private readonly paintings = computed<Nft[]>(() => {
    const all = this.all();
    const byName = new Map<string, Nft[]>();
    for (const piece of all) {
      const group = byName.get(piece.name);
      if (group) group.push(piece);
      else byName.set(piece.name, [piece]);
    }
    return all.filter((piece) =>
      this.artworkService.isFrontalView(piece, byName.get(piece.name) ?? [])
    );
  });
}
