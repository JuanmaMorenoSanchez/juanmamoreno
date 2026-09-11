import { Injectable, signal } from '@angular/core';

/**
 * A prepared photograph, passed from the corrector to the form beneath it.
 *
 * The two halves of the studio are siblings on one page, and the only way from
 * the first to the second used to be downloading a JPEG and then choosing it
 * again from disk — the same file, out of the browser and back in, for no
 * reason except that nothing carried it across.
 *
 * The size travels with it because the corrector has already been told it: a
 * photograph cannot be straightened without knowing the painting's proportions,
 * so by the time there is a result the height and width are known and typing
 * them a second time is only an opportunity to type them differently.
 */
export interface PreparedForMint {
  /** The corrected JPEG, rights already written into it. */
  file: File;
  /** As given to the corrector, in the notation the collection uses. */
  height: string;
  width: string;
}

@Injectable({ providedIn: 'root' })
export class StudioHandoffService {
  private readonly held = signal<PreparedForMint | null>(null);

  /** What is waiting, if anything. Read by the form to fill itself in. */
  readonly waiting = this.held.asReadonly();

  handOver(prepared: PreparedForMint): void {
    this.held.set(prepared);
  }

  /**
   * Takes what is waiting, leaving nothing behind.
   *
   * Cleared on being taken so that preparing a second photograph and then
   * deciding against it does not leave the first one lying about to be picked
   * up by the next mint.
   */
  take(): PreparedForMint | null {
    const prepared = this.held();
    this.held.set(null);
    return prepared;
  }
}
