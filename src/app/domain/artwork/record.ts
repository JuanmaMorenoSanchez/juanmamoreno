import { cvAnchor, say } from '@domain/cv/cv';
import { RECORD_VERBS, RecordEntry, RecordLine } from './record.entity';

/**
 * A painting's record as the page draws it, in one language.
 *
 * Each line is a verb, a year and whatever follows the verb. What follows is
 * assembled here rather than in the template because it has three shapes and
 * the template should not have to know which: a show with a venue and a city,
 * a named institution, or both at once.
 *
 * The api already answers oldest first — a record reads as a life rather than
 * as a log — so this does not sort.
 */
export function recordLines(entries: readonly RecordEntry[], lang: 'en' | 'es'): RecordLine[] {
  return entries.map((entry) => {
    const cited = entry.cv
      ? [say(entry.cv.title, lang), say(entry.cv.venue, lang), entry.cv.city]
          .filter((part) => part)
          .join(', ')
      : '';
    const named = say(entry.who, lang);

    return {
      kind: entry.kind,
      verb: RECORD_VERBS[entry.kind],
      year: entry.year,
      ...(entry.cv ? { anchor: cvAnchor(entry.cv) } : {}),
      // Both, where a prize was won and the institution that took the painting
      // is named: one event, said once.
      what: [cited, named].filter((part) => part).join(' — '),
      ...(say(entry.note, lang) ? { note: say(entry.note, lang) } : {}),
    };
  });
}
