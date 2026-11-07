import { CvEntry } from '@domain/cv/cv-entry.entity';
import { RecordEntry } from './record.entity';
import { recordLines } from './record';

const SHOW: CvEntry = {
  id: 'aaaa000000000001',
  kind: 'solo',
  year: 2024,
  title: { en: 'El valle inquietante' },
  venue: { en: 'Zunino gallery', es: 'Galería Zunino' },
  city: 'Sevilla',
  country: 'spain',
};

const PRIZE: CvEntry = {
  id: 'aaaa000000000002',
  kind: 'award',
  year: 2014,
  title: { en: 'The Pollock-Krasner Foundation award' },
  country: 'usa',
};

describe('a painting’s record as the page draws it', () => {
  const entry = (over: Partial<RecordEntry>): RecordEntry => ({
    kind: 'sold',
    year: 2025,
    ...over,
  });

  it('says the show, the venue and the city of an exhibition', () => {
    const [line] = recordLines([entry({ kind: 'exhibited', cv: SHOW, year: 2024 })], 'en');

    expect(line.verb).toBe('record.exhibited');
    expect(line.year).toBe(2024);
    expect(line.what).toBe('El valle inquietante, Zunino gallery, Sevilla');
  });

  it('says it in Spanish on a Spanish page', () => {
    const [line] = recordLines([entry({ kind: 'exhibited', cv: SHOW, year: 2024 })], 'es');

    expect(line.what).toBe('El valle inquietante, Galería Zunino, Sevilla');
  });

  /** A sale names whoever it names, and no more than that. */
  it('names the buyer of a sale, with no show behind it', () => {
    const [line] = recordLines([entry({ who: { en: 'a private collector' } })], 'en');

    expect(line.verb).toBe('record.sold');
    expect(line.what).toBe('a private collector');
    expect(line.anchor).toBeUndefined();
  });

  it('falls back to English where the buyer has no Spanish', () => {
    const [line] = recordLines([entry({ who: { en: 'a private collector' } })], 'es');

    expect(line.what).toBe('a private collector');
  });

  /**
   * One event, said once: the prize is on the cv and the institution that took
   * the painting is named beside it.
   */
  it('says both where a prize came with an acquisition', () => {
    const [line] = recordLines(
      [entry({ kind: 'awarded', cv: PRIZE, year: 2014, who: { en: 'the Foundation' } })],
      'en'
    );

    expect(line.what).toBe('The Pollock-Krasner Foundation award — the Foundation');
  });

  /** The link goes to the show's own place on the cv page. */
  it('addresses the cv entry it cites', () => {
    const [line] = recordLines([entry({ kind: 'exhibited', cv: SHOW, year: 2024 })], 'en');

    expect(line.anchor).toBe('2024-el-valle-inquietante');
  });

  it('leaves out a venue and a city the show has not got', () => {
    const [line] = recordLines([entry({ kind: 'awarded', cv: PRIZE, year: 2014 })], 'en');

    expect(line.what).toBe('The Pollock-Krasner Foundation award');
  });

  /**
   * Oldest first, whatever order it arrives in.
   *
   * It used to take the api's order on trust, so a line added today about a
   * show in 2016 was drawn last, under a sale from 2019.
   */
  it('puts the oldest first however it was given them', () => {
    const lines = recordLines(
      [
        entry({ kind: 'sold', who: { en: 'a private collector' }, year: 2025 }),
        entry({ kind: 'exhibited', cv: SHOW, year: 2016 }),
        entry({ kind: 'exhibited', cv: SHOW, year: 2024 }),
      ],
      'en'
    );

    expect(lines.map((line) => line.year)).toEqual([2016, 2024, 2025]);
  });

  /**
   * A painting is shown, shown again, and then it goes. Within one year the
   * sale is where the year stops, whichever order the lines were typed in.
   */
  it('ends a year with the sale, and with the collection it went to', () => {
    const lines = recordLines(
      [
        entry({ kind: 'sold', who: { en: 'a private collector' }, year: 2019 }),
        entry({ kind: 'exhibited', cv: SHOW, year: 2019 }),
        entry({ kind: 'collection', who: { en: 'the Foundation' }, year: 2018 }),
        entry({ kind: 'awarded', cv: PRIZE, year: 2018 }),
      ],
      'en'
    );

    expect(lines.map((line) => line.kind)).toEqual(['awarded', 'collection', 'exhibited', 'sold']);
  });

  /** Two of a kind in one year keep the order they were entered in. */
  it('leaves two shows in one year as they were entered', () => {
    const lines = recordLines(
      [
        entry({ kind: 'exhibited', cv: PRIZE, year: 2019 }),
        entry({ kind: 'exhibited', cv: SHOW, year: 2019 }),
      ],
      'en'
    );

    expect(lines.map((line) => line.anchor)).toEqual([
      recordLines([entry({ kind: 'exhibited', cv: PRIZE, year: 2019 })], 'en')[0].anchor,
      recordLines([entry({ kind: 'exhibited', cv: SHOW, year: 2019 })], 'en')[0].anchor,
    ]);
  });

  /**
   * Naming anybody is optional, and "Sold to" with nobody after it is not a
   * sentence. The verb drops its preposition instead.
   */
  it('drops the preposition when the line names nobody', () => {
    const [sold] = recordLines([entry({ kind: 'sold', year: 2025 })], 'en');
    const [collection] = recordLines([entry({ kind: 'collection', year: 2025 })], 'en');

    expect(sold.verb).toBe('record.soldAlone');
    expect(sold.what).toBe('');
    expect(collection.verb).toBe('record.collectionAlone');
  });

  it('keeps the preposition as soon as there is somebody to govern', () => {
    const [line] = recordLines([entry({ kind: 'sold', who: { en: 'the Foundation' } })], 'en');

    expect(line.verb).toBe('record.sold');
  });

  /** Exhibited and awarded always cite the cv, so they read the same either way. */
  it('has one word for the kinds that always cite something', () => {
    const [line] = recordLines([entry({ kind: 'awarded', cv: PRIZE, year: 2014 })], 'en');

    expect(line.verb).toBe('record.awarded');
  });

  it('carries a note where there is one, and nothing where there is not', () => {
    const [withNote] = recordLines([entry({ note: { en: 'through the gallery' } })], 'en');
    const [without] = recordLines([entry({})], 'en');

    expect(withNote.note).toBe('through the gallery');
    expect(without.note).toBeUndefined();
  });
});
