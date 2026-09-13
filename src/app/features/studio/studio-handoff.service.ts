import { Injectable, signal } from '@angular/core';

/**
 * What the corrector has, and the corrected photograph itself, shared with the
 * form beneath it.
 *
 * The two halves of the studio are siblings on one page doing one job, and for
 * a while the only way from the first to the second was downloading a JPEG and
 * choosing it again from disk. Then it was a handover on a button, which left
 * three rows of buttons down the page — prepare, download, save — for what is
 * really one decision.
 *
 * Now the form simply asks. It knows whether there is a photograph ready and
 * what size it is as those change, so it can offer to save or sign before
 * anything has been rendered; and when one of those is pressed, it asks for the
 * photograph and waits. The expensive part — warping forty megapixels — happens
 * once, when something is actually going to be done with the result.
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
  private readonly asked = signal(0);
  private askers: ((prepared: PreparedForMint | null) => void)[] = [];

  /** What is waiting, if anything. */
  readonly waiting = this.held.asReadonly();

  /**
   * Bumped each time the form asks for the corrected photograph.
   *
   * A counter rather than a flag: two asks in a row are two asks, and a flag
   * would swallow the second.
   */
  readonly asksForPhotograph = this.asked.asReadonly();

  /**
   * Whether the corrector could produce one right now, and at what size.
   *
   * Published as it changes rather than on completion, so the form can offer
   * its buttons before anything has been rendered — which is the whole point of
   * rendering only when one of them is pressed.
   */
  readonly canProduce = signal(false);
  readonly size = signal<{ height: string; width: string } | null>(null);

  /**
   * Asks the corrector for the photograph, and waits.
   *
   * Resolves with null when the corrector cannot give one, so the caller finds
   * out rather than waiting for ever.
   */
  request(): Promise<PreparedForMint | null> {
    return new Promise((resolve) => {
      this.askers.push(resolve);
      this.asked.update((count) => count + 1);
    });
  }

  handOver(prepared: PreparedForMint): void {
    this.held.set(prepared);
    this.answer(prepared);
  }

  /** Said when the corrector tried and could not. */
  couldNot(): void {
    this.answer(null);
  }

  private answer(prepared: PreparedForMint | null): void {
    const waiting = this.askers;
    this.askers = [];
    for (const asker of waiting) asker(prepared);
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
