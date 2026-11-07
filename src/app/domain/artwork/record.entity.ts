import { Bilingual, CvEntry } from '@domain/cv/cv-entry.entity';

/**
 * What kind of thing happened to the painting.
 *
 * The kind chooses the verb the page shows, and is kept apart from the two
 * things that may accompany it — a cv entry and a name — because they are not
 * alternatives: "awarded and acquired by the foundation" is one event that
 * cites the prize on the cv *and* names the institution that took the painting.
 */
export type RecordKind = 'exhibited' | 'sold' | 'awarded' | 'collection';

/**
 * Offered in the order he reaches for them, the show first because almost
 * every line is one: forty-eight of the sixty-five written so far.
 *
 * "Acquired by" is gone. It said what "in the collection of" says, and the
 * form asked the same two questions for both — so the only thing it added was
 * a decision about which of two identical lines to write. Nothing had ever
 * been stored under it.
 */
export const RECORD_KINDS: readonly RecordKind[] = ['exhibited', 'sold', 'awarded', 'collection'];

/**
 * The kinds that take their words from the cv, and the kinds that take them
 * from a person.
 *
 * It is the whole shape of the form. A show and a prize are on the cv already,
 * so they cite the entry and borrow its year and its name, and have nothing
 * else to say. A sale and a collection are about somebody, so they ask who and
 * when, and leave room for a note. Asking every question of every kind is what
 * the form used to do, and it asked who about a show that had already said
 * where.
 */
export const RECORD_KINDS_FROM_THE_CV: readonly RecordKind[] = ['exhibited', 'awarded'];

/** The verb each kind is written as. A closed set, so these stay keys. */
export const RECORD_VERBS: Readonly<Record<RecordKind, string>> = {
  exhibited: 'record.exhibited',
  sold: 'record.sold',
  awarded: 'record.awarded',
  collection: 'record.collection',
};

/**
 * The same verb with nothing after it.
 *
 * Naming who bought a painting is optional — that it was sold, and when, is a
 * fact on its own — and two of these verbs end in a preposition that needs
 * something to govern. "Vendida a" with nobody after it is not a sentence.
 * Exhibited and awarded always cite the cv, so they read the same either way
 * and have no second key to go stale.
 */
export const RECORD_VERBS_ALONE: Readonly<Record<RecordKind, string>> = {
  exhibited: 'record.exhibited',
  sold: 'record.soldAlone',
  awarded: 'record.awarded',
  collection: 'record.collectionAlone',
};

/**
 * The kinds that have somebody to name.
 *
 * The two whose verb ends in a preposition, and for the same reason: "sold
 * to" and "in the collection of" both govern a name, while a show and a prize
 * take theirs from the cv entry the line cites. Asking a second time there
 * would be a name that could disagree with the first.
 */
export const RECORD_NAMING_KINDS: readonly RecordKind[] = ['sold', 'collection'];

/** One line of a painting's record, as the api serves it. */
export interface RecordEntry {
  kind: RecordKind;
  year: number;
  /** The show, prize or course, resolved — not an id to look up. */
  cv?: CvEntry;
  who?: Bilingual;
  note?: Bilingual;
}

export interface ArtworkRecord {
  tokenId: string;
  entries: RecordEntry[];
}

/** One line of a painting's record, as it is written back. */
export interface RecordEntryEdit {
  kind: RecordKind;
  cv?: string;
  who?: Bilingual;
  year?: number;
  note?: Bilingual;
}

/** One line with its language chosen and its words assembled, ready to draw. */
export interface RecordLine {
  kind: RecordKind;
  verb: string;
  year: number;
  /** The show's own address on the cv page, where the line cites one. */
  anchor?: string;
  /** The show, the prize, the institution — whatever follows the verb. */
  what: string;
  note?: string;
}
