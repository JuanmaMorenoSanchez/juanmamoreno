import { cvAnchor, say } from '@domain/cv/cv';
import { RECORD_VERBS, RECORD_VERBS_ALONE, RecordEntry, RecordLine } from './record.entity';

/**
 * A painting's record as the page draws it, in one language.
 *
 * Each line is a verb, whatever follows the verb, and the year at the end of
 * it. What follows is assembled here rather than in the template because it
 * has four shapes and the template should not have to know which: a show with
 * its venue and city, a named institution, both at once, or nothing at all.
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
    // Both, where a prize was won and the institution that took the painting
    // is named: one event, said once.
    const what = [cited, named].filter((part) => part).join(' — ');

    return {
      kind: entry.kind,
      // Naming anybody is optional, and three of the verbs end in a
      // preposition that needs something to govern.
      verb: what ? RECORD_VERBS[entry.kind] : RECORD_VERBS_ALONE[entry.kind],
      year: entry.year,
      ...(entry.cv ? { anchor: cvAnchor(entry.cv) } : {}),
      what,
      ...(say(entry.note, lang) ? { note: say(entry.note, lang) } : {}),
    };
  });
}
