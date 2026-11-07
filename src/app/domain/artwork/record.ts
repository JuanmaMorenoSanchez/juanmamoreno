import { cvAnchor, say } from '@domain/cv/cv';
import {
  RECORD_VERBS,
  RECORD_VERBS_ALONE,
  RecordEntry,
  RecordKind,
  RecordLine,
} from './record.entity';

/**
 * The two that end a year.
 *
 * A painting is shown, shown again, and then it goes: within one year a sale
 * or a collection is where the year stops, whatever order the lines were
 * typed in. The others keep the order they were entered in, a stable sort
 * giving that for nothing.
 */
const LAST_IN_A_YEAR: readonly RecordKind[] = ['sold', 'collection'];

/**
 * Oldest first, because a record reads as a life rather than as a log.
 *
 * Sorted here rather than trusted from the api. The api does answer in order,
 * but the order a record is read in is a property of the record and not of
 * the request that fetched it — and a line added today for a show in 2016
 * arrived at the end of the list, which is where it stayed.
 *
 * Whoever sorts for display must sort before writing back as well: a line is
 * removed by its position, so a list drawn in one order and stored in another
 * takes away the wrong line.
 */
export function inOrder<T extends { kind: RecordKind; year: number }>(entries: readonly T[]): T[] {
  const last = (entry: T) => (LAST_IN_A_YEAR.includes(entry.kind) ? 1 : 0);
  return [...entries].sort((a, b) => a.year - b.year || last(a) - last(b));
}

/**
 * A painting's record as the page draws it, in one language.
 *
 * Each line is a verb, whatever follows the verb, and the year at the end of
 * it. What follows is assembled here rather than in the template because it
 * has four shapes and the template should not have to know which: a show with
 * its venue and city, a named institution, both at once, or nothing at all.
 *
 * Oldest first, by `inOrder` and not by the order the api happened to answer
 * in.
 */
export function recordLines(entries: readonly RecordEntry[], lang: 'en' | 'es'): RecordLine[] {
  return inOrder(entries).map((entry) => {
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
