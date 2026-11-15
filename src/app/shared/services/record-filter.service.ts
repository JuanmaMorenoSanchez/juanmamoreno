import { Injectable, signal } from '@angular/core';
import {
  PREFERENCE_KEYS,
  readPreference,
  writePreference,
} from '@shared/constants/preferences.constants';

/**
 * Everything, or only what has a show or a prize behind it.
 *
 * Two of the record's four kinds, not all four: a sale is the availability
 * filter beside this one already, and a painting in somebody's collection is
 * the same fact told from the other end. What is left is the pair that answers
 * a question nothing else here can — which of these has been out of the studio.
 */
export type RecordFilter = 'any' | 'exhibited' | 'awarded';

/** In the order the picker offers them; `any` is where everyone starts. */
export const RECORD_FILTER_CHOICES: readonly RecordFilter[] = ['any', 'exhibited', 'awarded'];

/**
 * Held here for the same reason availability is: the picker lives in the
 * breadcrumb at the top of every page and the grid that answers to it is the
 * catalogue's own component. Kept on the reader's own device, and deliberately
 * not in the address — like availability, it is a way of looking rather than a
 * place.
 */
@Injectable({ providedIn: 'root' })
export class RecordFilterService {
  private readonly chosen = signal<RecordFilter>(
    readPreference<RecordFilter>(PREFERENCE_KEYS.RECORD, RECORD_FILTER_CHOICES) ?? 'any'
  );

  readonly record = this.chosen.asReadonly();

  set(value: RecordFilter): void {
    this.chosen.set(value);
    writePreference(PREFERENCE_KEYS.RECORD, value);
  }

  clear(): void {
    this.set('any');
  }
}
