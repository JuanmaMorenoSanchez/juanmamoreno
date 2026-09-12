import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MintGateComponent } from '@shared/components/mint-gate/mint-gate.component';
import { MintApiService, type PendingMint } from '@shared/services/mint-api.service';
import { StudioHandoffService } from '../studio-handoff.service';
import {
  ARTIST,
  IMAGE_TYPES,
  MEDIUMS,
  UNITS,
  isMeasurement,
  mintableYears,
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
  imports: [RouterLink, MintGateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './mint-form.component.html',
  styleUrl: './mint-form.component.scss',
})
export class MintFormComponent {
  private readonly api = inject(MintApiService);
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
  protected readonly photo = signal<File | null>(null);
  protected readonly photoName = signal('');

  protected readonly busy = signal(false);
  protected readonly error = signal('');
  protected readonly prepared = signal<PendingMint | null>(null);
  protected readonly waiting = signal<PendingMint[]>([]);

  /** The line that will be written when no description is typed. */
  protected readonly describedAs = computed(() => {
    const typed = this.description().trim();
    if (typed) return typed;
    if (!this.height() || !this.width()) return '';
    return `${this.medium()}, ${this.height()} × ${this.width()} ${this.unit()}, ${this.year()}.`;
  });

  protected readonly measurementsOk = computed(
    () => isMeasurement(this.height()) && isMeasurement(this.width())
  );

  protected readonly ready = computed(
    () => !!this.name().trim() && this.measurementsOk() && !!this.photo() && !this.busy()
  );

  constructor() {
    this.loadWaiting();

    // A photograph corrected above arrives here with the size it was corrected
    // at, so neither the file nor the measurements are given twice.
    effect(() => {
      if (!this.handoff.waiting()) return;
      const prepared = this.handoff.take();
      if (!prepared) return;
      this.photo.set(prepared.file);
      this.photoName.set(prepared.file.name);
      this.height.set(prepared.height);
      this.width.set(prepared.width);
    });
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
  protected measure(which: 'height' | 'width', event: Event): void {
    const input = event.target as HTMLInputElement;
    const tidied = normaliseMeasurement(input.value);
    input.value = tidied;
    if (which === 'height') this.height.set(tidied);
    else this.width.set(tidied);
  }

  protected pickPhoto(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0] ?? null;
    this.photo.set(file);
    this.photoName.set(file?.name ?? '');
  }

  /**
   * Prepares the certificate, and either leaves it waiting or writes it now.
   *
   * Preparing is the same either way — the images are made and stored and the
   * metadata written down — so the only difference is whether the chain is asked
   * afterwards. Saving is the ordinary case: gas is the whole of what a
   * certificate costs, and nothing about a finished painting is urgent.
   */
  protected async prepare(mintNow = false): Promise<void> {
    const file = this.photo();
    if (!file || !this.ready()) return;

    this.busy.set(true);
    this.error.set('');
    const body = new FormData();
    body.append('photo', file);
    body.append('name', this.name().trim());
    body.append('medium', this.medium());
    body.append('height', this.height());
    body.append('width', this.width());
    body.append('unit', this.unit());
    body.append('year', this.year());
    body.append('imageType', this.imageType());
    if (this.description().trim()) body.append('description', this.description().trim());

    try {
      const result = await this.api.prepare(body);
      this.prepared.set(result ?? null);
      this.reset();
      this.loadWaiting();

      if (mintNow) {
        const written = await this.api.mintWaiting();
        if (!written.minted.length) {
          this.error.set(
            `Prepared and waiting, but not written${written.skipped ? ` — ${written.skipped}` : ''}.`
          );
        }
        this.loadWaiting();
      }
    } catch (failure: unknown) {
      const message = (failure as { error?: { message?: string } })?.error?.message;
      this.error.set(message ?? 'The api could not prepare that. Nothing was stored.');
    } finally {
      this.busy.set(false);
    }
  }

  protected async discard(tokenId: number): Promise<void> {
    await this.api.discard(tokenId).catch(() => undefined);
    this.loadWaiting();
  }

  private reset(): void {
    this.name.set('');
    this.height.set('');
    this.width.set('');
    this.description.set('');
    this.photo.set(null);
    this.photoName.set('');
  }

  private loadWaiting(): void {
    this.api
      .waiting()
      .then((list) => this.waiting.set(list))
      .catch(() => this.waiting.set([]));
  }
}
