import { Injectable, signal } from '@angular/core';
import {
  PREFERENCE_KEYS,
  readPreference,
  writePreference,
} from '@shared/constants/preferences.constants';

export type Availability = 'both' | 'sold' | 'available';

/** In the order the picker offers them; `both` is where everyone starts. */
export const AVAILABILITY_CHOICES: readonly Availability[] = ['both', 'sold', 'available'];

/**
 * Whether the catalogue is showing everything, only what has sold, or only
 * what has not.
 *
 * Held here rather than in either component because the two are nowhere near
 * each other: the picker lives in the breadcrumb, at the top of every page,
 * and the grid that answers to it is the catalogue's own component — which is
 * also rendered, as a widget, on every artwork page.
 *
 * Kept on the reader's own device and never sent anywhere, the same as the
 * sort. Unlike the year, it is deliberately not in the address: the year says
 * which paintings a link is about and belongs in a url that can be shared,
 * while this is a way of looking rather than a place, and putting it in the
 * address would give the catalogue several addresses for the same paintings.
 */
@Injectable({ providedIn: 'root' })
export class AvailabilityFilterService {
  private readonly chosen = signal<Availability>(
    readPreference<Availability>(PREFERENCE_KEYS.AVAILABILITY, AVAILABILITY_CHOICES) ?? 'both'
  );

  readonly availability = this.chosen.asReadonly();

  set(value: Availability): void {
    this.chosen.set(value);
    writePreference(PREFERENCE_KEYS.AVAILABILITY, value);
  }

  clear(): void {
    this.set('both');
  }
}
