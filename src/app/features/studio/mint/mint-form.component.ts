import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MintGateComponent } from '@shared/components/mint-gate/mint-gate.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { ARTWORK_PORT } from '@domain/artwork/artwork.token';
import type { Nft } from '@domain/artwork/artwork.entity';
import { titlesLike } from '@domain/artwork/title-check';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImageMatchService } from '@shared/services/image-match.service';
import { MintApiService, type PendingMint } from '@shared/services/mint-api.service';
import { StudioHandoffService } from '../studio-handoff.service';
import {
  ARTIST,
  IMAGE_TYPES,
  MEDIUMS,
  UNITS,
  mintableYears,
  measurementAsTyped,
  normaliseMeasurement,
} from '@domain/artwork/mint-vocabulary';

/**
 * Describes a new painting, and stops before signing for it.
 *
 * Almost every field is a choice rather than a box, and that is the whole design.
 * The migration audited the 186 certificates already written and found two
 * spelling the artist "Juan Manuel Moreno Sánchez", one with no unit at all, a
 * title ending in a space and another reading "spash" — every one of them typed,
 * and every one now permanent on chain. So the medium, the unit, the year and
 * the kind of photograph are picked from what the collection already contains,
 * and the artist is not asked for at all.
 *
 * What is left free is what genuinely varies: the title, the two measurements,
 * and a description that is written for you if you would rather not.
 */
@Component({
  selector: 'app-mint-form',
  imports: [RouterLink, MintGateComponent, MatIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './mint-form.component.html',
  styleUrl: './mint-form.component.scss',
})
export class MintFormComponent {
  private readonly api = inject(MintApiService);
  private readonly artworks = inject(ARTWORK_PORT);
  private readonly images = inject(ImageMatchService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly router = inject(Router);
  private readonly handoff = inject(StudioHandoffService);

  protected readonly mediums = MEDIUMS;
  protected readonly imageTypes = IMAGE_TYPES;
  protected readonly units = UNITS;
  protected readonly years = mintableYears();
  protected readonly artist = ARTIST;

  protected readonly name = signal('');
  protected readonly medium = signal(MEDIUMS[0]);
  protected readonly height = signal('');
  protected readonly width = signal('');
  protected readonly unit = signal(UNITS[0]);
  protected readonly year = signal(String(mintableYears()[0]));
  protected readonly imageType = signal(IMAGE_TYPES[0]);
  protected readonly description = signal('');

  protected readonly busy = signal(false);
  protected readonly waiting = signal<PendingMint[]>([]);

  /** The line that will be written when no description is typed. */
  protected readonly describedAs = computed(() => {
    const typed = this.description().trim();
    if (typed) return typed;
    if (!this.height() || !this.width()) return '';
    return `${this.medium()}, ${this.height()} × ${this.width()} ${this.unit()}, ${this.year()}.`;
  });

  /**
   * Everything already in the collection, for the title check below.
   *
   * Read from what the site already holds rather than asked for: the catalogue
   * is in the browser by the time the studio is open.
   */
  private readonly existing = toSignal(this.artworks.getArtPiecesObservable(), {
    initialValue: [] as Nft[],
  });

  /**
   * Titles this one would collide with, exactly or nearly.
   *
   * A word rather than a refusal. Sharing a title is how a second photograph of
   * one painting is grouped, so an exact match is often right — and a title one
   * letter out is how a painting quietly gets split from its own other
   * photographs, which nothing else would ever mention.
   */
  protected readonly titleClashes = computed(() =>
    titlesLike(
      this.name(),
      this.existing().map((nft) => ({ tokenId: String(nft.tokenId), name: nft.name ?? '' }))
    )
  );

  /**
   * Certificates whose picture is this picture.
   *
   * Free, and entirely on this machine: every certificate carries its own
   * thumbnail inside the token, so the collection to compare against arrived
   * with the catalogue. What it catches is the same photograph prepared twice,
   * which has happened here.
   */
  protected readonly sameImage = computed(() => {
    const sample = this.handoff.sample();
    this.images.ready();
    return sample ? this.images.like(sample) : [];
  });

  protected readonly sameTitle = computed(() => this.titleClashes().filter((one) => one.same));
  protected readonly nearTitle = computed(() => this.titleClashes().filter((one) => !one.same));

  /** What the corrector has, as it changes, before anything has been rendered. */
  protected readonly fromCorrector = this.handoff.size;

  /**
   * Enough to go on.
   *
   * A title, and a photograph the corrector could give us. Not a photograph in
   * hand: rendering one takes long enough that it is done when one of these
   * buttons is pressed rather than on the chance that one will be.
   */
  protected readonly ready = computed(
    () => !!this.name().trim() && this.handoff.canProduce() && !this.busy()
  );

  /**
   * Says how it went, over the page rather than in it.
   *
   * What used to happen was a copy of the certificate appearing below the form:
   * the thumbnail, the title, the description — all of it already known, none of
   * it needing a decision, and all of it below the fold. What is wanted is to
   * know it worked and to start the next one.
   */
  private say(message: string, how: 'good' | 'bad'): void {
    this.snackBar.open(message, 'Ok', {
      duration: how === 'good' ? 6000 : 10000,
      panelClass: how === 'good' ? 'studio-good' : 'studio-bad',
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  /** Back to the photograph, which is where the next certificate starts. */
  private toTheTop(): void {
    if (typeof window === 'undefined') return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  constructor() {
    this.loadWaiting();
    // Started now, while a photograph is still being chosen, so there is
    // something to compare against by the time there is anything to compare.
    void this.images.learn();
  }

  protected set(which: 'name' | 'description', event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    if (which === 'name') this.name.set(value);
    else this.description.set(value);
  }

  protected choose(which: 'medium' | 'unit' | 'year' | 'imageType', event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    ({
      medium: () => this.medium.set(value),
      unit: () => this.unit.set(value),
      year: () => this.year.set(value),
      imageType: () => this.imageType.set(value),
    })[which]();
  }

  /** A measurement is tidied as it is typed, so "140.5" becomes "140,5". */
  /**
   * What was typed, tidied only as far as typing allows.
   *
   * It used to drop a trailing comma on every keystroke, which meant the comma
   * of "140,5" was removed by the keypress that made it and the 5 landed on the
   * whole number: 1405. No decimal could be entered here at all. The comma is
   * left where it is put now; it is dropped when the measurement is read, not
   * while it is being written.
   */
  protected measure(which: 'height' | 'width', event: Event): void {
    const input = event.target as HTMLInputElement;
    const tidied = measurementAsTyped(input.value);
    input.value = tidied;
    if (which === 'height') this.height.set(tidied);
    else this.width.set(tidied);
  }

  /**
   * Prepares the certificate, and either leaves it waiting or writes it now.
   *
   * Preparing is the same either way — the images are made and stored and the
   * metadata written down — so the only difference is whether the chain is asked
   * afterwards. Saving is the ordinary case: gas is the whole of what a
   * certificate costs, and nothing about a finished painting is urgent.
   */
  /**
   * Prepares the certificate, and optionally goes on to sign it.
   *
   * Signing happens on the waiting list, where the wallet is, because the only
   * key that can write a certificate is on the artist's phone. This used to ask
   * the server to mint instead, which could not work — no minting key is
   * configured there, by choice — and asked it to write *everything* waiting
   * rather than the one just prepared.
   *
   * Nothing after the preparing is inside the same try any more. A failure there
   * reported "nothing was stored" over a certificate that had been stored
   * perfectly well, which sent the artist back to prepare it a second time.
   */
  protected async prepare(signNow = false): Promise<void> {
    if (!this.ready()) return;

    this.busy.set(true);

    // Asked for here, and rendered now, because this is the moment it is going
    // to be used. The corrector answers with null when it cannot.
    const prepared = this.handoff.take() ?? (await this.handoff.request());
    if (!prepared) {
      this.say('The photograph above could not be prepared, so nothing was stored.', 'bad');
      this.busy.set(false);
      return;
    }
    this.height.set(prepared.height);
    this.width.set(prepared.width);
    const file = prepared.file;
    const body = new FormData();
    body.append('photo', file);
    body.append('name', this.name().trim());
    body.append('medium', this.medium());
    // Tidied here rather than while typing: a measurement is stored without a
    // trailing comma, and "140," is a measurement halfway written.
    body.append('height', normaliseMeasurement(this.height()));
    body.append('width', normaliseMeasurement(this.width()));
    body.append('unit', this.unit());
    body.append('year', this.year());
    body.append('imageType', this.imageType());
    if (this.description().trim()) body.append('description', this.description().trim());

    try {
      const result = await this.api.prepare(body);
      this.reset();
      // And the corrector above with it, so what is left is the studio as it
      // opens: no file chosen, no corners, no measurements. Clearing only these
      // fields left the last painting straightened on the stage, which read as
      // a certificate still waiting to be saved.
      this.handoff.startAgain();
      this.loadWaiting();
      this.say(
        `Certificate ${result.tokenId} — “${result.name}” — is prepared and waiting.`,
        'good'
      );
      this.toTheTop();
    } catch (failure: unknown) {
      const message = (failure as { error?: { message?: string } })?.error?.message;
      this.say(message ?? 'The api could not prepare that. Nothing was stored.', 'bad');
      return;
    } finally {
      this.busy.set(false);
    }

    if (signNow) await this.router.navigate(['/pendingmint']);
  }

  protected async discard(tokenId: number): Promise<void> {
    try {
      await this.api.discard(tokenId);
    } catch (failure: unknown) {
      const message = (failure as { error?: { message?: string } })?.error?.message;
      this.say(message ?? `Certificate ${tokenId} could not be thrown away.`, 'bad');
    }
    this.loadWaiting();
  }

  private reset(): void {
    this.name.set('');
    this.height.set('');
    this.width.set('');
    this.description.set('');
  }

  private loadWaiting(): void {
    this.api
      .waiting()
      .then((list) => this.waiting.set(list))
      .catch(() => this.waiting.set([]));
  }
}
