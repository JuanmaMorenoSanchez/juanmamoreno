import { CvEntry } from './cv-entry.entity';
import { cvAnchor, cvSections, say } from './cv';

const entry = (over: Partial<CvEntry>): CvEntry => ({
  id: 'x',
  kind: 'solo',
  year: 2000,
  title: { en: 'X' },
  country: 'spain',
  ...over,
});

describe('one of the two languages', () => {
  it('gives Spanish its own words where it has them', () => {
    expect(say({ en: 'Zunino gallery', es: 'Galería Zunino' }, 'es')).toBe('Galería Zunino');
  });

  /** Spanish absent means the same sentence, which is most of the cv. */
  it('falls back to English where Spanish is absent', () => {
    expect(say({ en: 'El valle inquietante' }, 'es')).toBe('El valle inquietante');
  });

  it('never gives the Spanish to an English reader', () => {
    expect(say({ en: 'Zunino gallery', es: 'Galería Zunino' }, 'en')).toBe('Zunino gallery');
  });

  it('says nothing about a field that is not there', () => {
    expect(say(undefined, 'en')).toBe('');
  });
});

/**
 * The readable half of what an id used to be, kept apart from it.
 *
 * An address for a reader should follow the title; an id must never move. The
 * ids are sixteen opaque hex characters for that reason, and this is what a
 * painting's record will link to.
 */
describe('where an entry is on the page', () => {
  it('reads as the year and the title', () => {
    expect(cvAnchor(entry({ year: 2024, title: { en: 'El valle inquietante' } }))).toBe(
      '2024-el-valle-inquietante'
    );
  });

  it('owes nothing to the opaque id', () => {
    const anchor = cvAnchor(entry({ id: '4790ab4546bf78fb', year: 2024, title: { en: 'A show' } }));

    expect(anchor).toBe('2024-a-show');
    expect(anchor).not.toContain('4790ab');
  });

  /** A fragment is ascii, and the titles are not. */
  it('strips the accents and the punctuation', () => {
    expect(cvAnchor(entry({ year: 2019, title: { en: '33. El desengaño' } }))).toBe(
      '2019-33-el-desengano'
    );
    expect(cvAnchor(entry({ year: 2017, title: { en: '#blessed' } }))).toBe('2017-blessed');
  });

  /**
   * The same anchor from either language's page, so a provenance line links to
   * one place however it is written.
   */
  it('is the English title even on the Spanish page', () => {
    const degree = entry({
      year: 2009,
      title: { en: 'Bachelor on arts degree', es: 'Licenciado en Bellas Artes' },
    });

    expect(cvAnchor(degree)).toBe('2009-bachelor-on-arts-degree');
    expect(cvSections([degree], 'es')[0].items[0].anchor).toBe('2009-bachelor-on-arts-degree');
  });

  it('never trails or doubles a dash', () => {
    expect(cvAnchor(entry({ year: 2014, title: { en: 'MULTI/TUTTI/FEST — ' } }))).toBe(
      '2014-multi-tutti-fest'
    );
  });
});

describe('the cv as the page draws it', () => {
  it('puts each kind under its own heading, in the page’s order', () => {
    const sections = cvSections(
      [
        entry({ id: 'a', kind: 'education', year: 2009 }),
        entry({ id: 'b', kind: 'solo', year: 2024 }),
        entry({ id: 'c', kind: 'award', year: 2014 }),
      ],
      'en'
    );

    expect(sections.map((one) => one.title)).toEqual([
      'cv.shows.title',
      'cv.awards.title',
      'cv.education.title',
    ]);
  });

  /** A career with no conferences in it must not show an empty "Conferences". */
  it('leaves out a heading nothing sits under', () => {
    const sections = cvSections([entry({ kind: 'solo' })], 'en');

    expect(sections).toHaveLength(1);
    expect(sections[0].items).toHaveLength(1);
  });

  /** The api answers in his order; this groups, and must not re-sort. */
  it('keeps the order it was given inside a heading', () => {
    const sections = cvSections(
      [
        entry({ id: 'first', year: 2015 }),
        entry({ id: 'second', year: 2015 }),
        entry({ id: 'third', year: 2014 }),
      ],
      'en'
    );

    expect(sections[0].items.map((one) => one.id)).toEqual(['first', 'second', 'third']);
  });

  it('resolves the country to the key the dictionary holds', () => {
    const sections = cvSections([entry({ country: 'germany' })], 'en');

    expect(sections[0].items[0].countryKey).toBe('cv.countries.germany');
  });

  it('carries both links through, and neither when there is none', () => {
    const [withLinks] = cvSections(
      [entry({ titleUrl: 'https://fair.example', venueUrl: 'https://gallery.example' })],
      'en'
    );
    const [without] = cvSections([entry({})], 'en');

    expect(withLinks.items[0].titleUrl).toBe('https://fair.example');
    expect(withLinks.items[0].venueUrl).toBe('https://gallery.example');
    expect(without.items[0].titleUrl).toBeUndefined();
    expect(without.items[0].venueUrl).toBeUndefined();
  });

  it('chooses the language for the venue as well as the title', () => {
    const [section] = cvSections(
      [entry({ title: { en: 'Degree', es: 'Licenciatura' }, venue: { en: 'Granada', es: 'UGR' } })],
      'es'
    );

    expect(section.items[0].title).toBe('Licenciatura');
    expect(section.items[0].venue).toBe('UGR');
  });
});
