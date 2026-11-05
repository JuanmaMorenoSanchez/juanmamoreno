import { Bilingual, CvEntry } from '@domain/cv/cv-entry.entity';

/**
 * What kind of thing happened to the painting.
 *
 * The kind chooses the verb the page shows, and is kept apart from the two
 * things that may accompany it — a cv entry and a name — because they are not
 * alternatives: "awarded and acquired by the foundation" is one event that
 * cites the prize on the cv *and* names the institution that took the painting.
 */
export type RecordKind = 'exhibited' | 'sold' | 'awarded' | 'acquired' | 'collection';

export const RECORD_KINDS: readonly RecordKind[] = [
  'exhibited',
  'sold',
  'awarded',
  'acquired',
  'collection',
];

/** The verb each kind is written as. A closed set, so these stay keys. */
export const RECORD_VERBS: Readonly<Record<RecordKind, string>> = {
  exhibited: 'record.exhibited',
  sold: 'record.sold',
  awarded: 'record.awarded',
  acquired: 'record.acquired',
  collection: 'record.collection',
};

/**
 * The same verb with nothing after it.
 *
 * Naming who bought a painting is optional — that it was sold, and when, is a
 * fact on its own — and three of these verbs end in a preposition that needs
 * something to govern. "Vendida a" with nobody after it is not a sentence.
 * Exhibited and awarded always cite the cv, so they read the same either way
 * and have no second key to go stale.
 */
export const RECORD_VERBS_ALONE: Readonly<Record<RecordKind, string>> = {
  exhibited: 'record.exhibited',
  sold: 'record.soldAlone',
  awarded: 'record.awarded',
  acquired: 'record.acquiredAlone',
  collection: 'record.collectionAlone',
};

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
