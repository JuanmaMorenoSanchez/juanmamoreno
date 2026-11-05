import {
  Bilingual,
  CV_SECTION_TITLES,
  CvEntry,
  CvKind,
  CvLine,
  CvSection,
} from './cv-entry.entity';

/**
 * One of the two languages, chosen.
 *
 * Spanish falls back to English rather than to nothing, because Spanish absent
 * means the two are the same sentence. English has nothing behind it: an entry
 * without one is a hole in the page, and the api will not serve one.
 */
export function say(text: Bilingual | undefined, lang: 'en' | 'es'): string {
  if (!text) return '';
  return (lang === 'es' ? text.es : undefined) ?? text.en;
}

/**
 * The cv as the page draws it: a heading per kind, in one language.
 *
 * The api already answers in the order the page wants — grouped by kind,
 * newest first — so this groups rather than sorts. A kind nobody has an entry
 * for gets no heading at all, which is why a career with no conferences in it
 * does not show an empty "Conferences".
 */
export function cvSections(entries: readonly CvEntry[], lang: 'en' | 'es'): CvSection[] {
  const sections: CvSection[] = [];

  for (const kind of Object.keys(CV_SECTION_TITLES) as CvKind[]) {
    const items = entries.filter((entry) => entry.kind === kind).map((entry) => line(entry, lang));
    if (items.length) sections.push({ title: CV_SECTION_TITLES[kind], items });
  }

  return sections;
}

/**
 * The address of one entry on the cv page.
 *
 * The readable half of what an id used to be, and kept apart from it on
 * purpose: this is built from the year and the title every time the page is
 * drawn, so renaming a show moves its anchor — which is right for an address
 * and would be wrong for an id. The English title in both languages, so a
 * provenance line links to the same place whichever language it is written in.
 */
export function cvAnchor(entry: CvEntry): string {
  const slug = entry.title.en
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48);

  return `${entry.year}-${slug}`;
}

function line(entry: CvEntry, lang: 'en' | 'es'): CvLine {
  const venue = say(entry.venue, lang);

  return {
    id: entry.id,
    anchor: cvAnchor(entry),
    year: entry.year,
    title: say(entry.title, lang),
    ...(entry.titleUrl ? { titleUrl: entry.titleUrl } : {}),
    ...(venue ? { venue } : {}),
    ...(entry.venueUrl ? { venueUrl: entry.venueUrl } : {}),
    ...(entry.city ? { city: entry.city } : {}),
    countryKey: `cv.countries.${entry.country}`,
  };
}
