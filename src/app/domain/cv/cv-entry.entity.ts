/** The five kinds of thing a career is made of, as the cv page sections them. */
export type CvKind = 'solo' | 'collective' | 'award' | 'conference' | 'education';

/**
 * A piece of text in both languages, Spanish optional.
 *
 * Spanish absent means *the same as English*, which is the common case rather
 * than an oversight: most of the titles are Spanish proper nouns that an
 * English page shows unchanged.
 */
export interface Bilingual {
  en: string;
  es?: string;
}

/**
 * One line of the cv, as the api serves it.
 *
 * The id says nothing about the entry — sixteen random hex characters — because
 * an id built out of the year and the title goes stale the moment either is
 * corrected, and because one that looks derivable gets derived instead of
 * looked up. What a readable id was for is an address, and that is `anchor`
 * below, which has the opposite rule.
 */
export interface CvEntry {
  id: string;
  kind: CvKind;
  year: number;
  month?: number;
  title: Bilingual;
  venue?: Bilingual;
  /** A place name, which is not translated. */
  city?: string;
  /** The key under `cv.countries`, which is a closed set of six. */
  country: string;
  /** Where to read about the thing itself — a fair, a prize, a course. */
  titleUrl?: string;
  /** Where to read about the place — usually a gallery. */
  venueUrl?: string;
}

/** One line with its language already chosen, which is what a page draws. */
export interface CvLine {
  id: string;
  /**
   * Where this entry is on the cv page: `/cv#2024-el-valle-inquietante`.
   *
   * Built from the year and the English title as the page is drawn, not stored
   * — so it follows the title, which is what an address for a reader should do
   * and exactly what an id must not. A renamed show moves its anchor and an old
   * link lands at the top of the page; a renamed show must never move its id.
   *
   * From the English title in both languages, so one anchor addresses the entry
   * wherever it is linked from.
   */
  anchor: string;
  year: number;
  title: string;
  titleUrl?: string;
  venue?: string;
  venueUrl?: string;
  city?: string;
  /** Resolved against the dictionary by whoever draws it. */
  countryKey: string;
}

/** A heading and the lines under it. */
export interface CvSection {
  /** A translation key: five headings are a closed set. */
  title: string;
  items: CvLine[];
}

/**
 * Which heading each kind sits under.
 *
 * The headings stay translation keys while the entries no longer do, and the
 * line between the two is whether the set is closed: nobody adds a sixth kind
 * of thing to a career from a phone, and the words "Solo shows" are the
 * page's, not the data's.
 */
export const CV_SECTION_TITLES: Readonly<Record<CvKind, string>> = {
  solo: 'cv.shows.title',
  collective: 'cv.collectiveShows.title',
  award: 'cv.awards.title',
  conference: 'cv.conferences.title',
  education: 'cv.education.title',
};
