import { Component, computed, inject, input, linkedSignal, output, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  CV_COUNTRIES,
  CV_SECTION_TITLES,
  CvEntry,
  CvKind,
  CvWrite,
} from '@domain/cv/cv-entry.entity';
import { TranslatePipe } from '@ngx-translate/core';
import { CvService } from '@shared/services/cv.service';

/** What an entry is being written or corrected to, before it is sent. */
interface Draft {
  kind: CvKind;
  year: number | null;
  titleEn: string;
  titleEs: string;
  venueEn: string;
  venueEs: string;
  city: string;
  country: string;
  titleUrl: string;
  venueUrl: string;
}

/**
 * The cv, written from the cv page.
 *
 * The list used to be an array in this repository, so adding a show meant an
 * edit, a commit and a deploy of four hundred pages. The api has held it for a
 * release now; this is the half that makes that true in practice, which is
 * where it belongs — on the page that shows the list, beside the line being
 * corrected.
 *
 * **Spanish is optional everywhere it appears**, because Spanish absent means
 * *the same sentence as the English*, which is the common case rather than an
 * oversight: most of these titles are Spanish proper nouns an English page
 * shows unchanged. The api drops a Spanish that repeats its English, so
 * leaving the field as it was found cannot create two copies that drift apart.
 *
 * **The kind is a select even though the section already said it.** An add
 * button under "Solo shows" opens on `solo`, which is the answer nine times in
 * ten; but a kind nobody has an entry for yet has no section to add from at
 * all, and that would have made the first conference unaddable from the site
 * that holds the conferences.
 */
@Component({
  selector: 'app-cv-entry-form',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    TranslatePipe,
  ],
  templateUrl: './cv-entry-form.component.html',
  styleUrl: './cv-entry-form.component.scss',
})
export class CvEntryFormComponent {
  private readonly cv = inject(CvService);

  /** Which section the form was opened from, which is what it opens on. */
  readonly kind = input.required<CvKind>();

  /** The entry being corrected, or nothing at all if one is being added. */
  readonly entry = input<CvEntry | null>(null);

  /** Shut the form, whether anything was written or not. */
  readonly done = output<void>();

  protected readonly kinds = Object.keys(CV_SECTION_TITLES) as CvKind[];
  protected readonly headings = CV_SECTION_TITLES;
  protected readonly countries = CV_COUNTRIES;

  /**
   * The draft, which follows whichever entry the form was opened on.
   *
   * A `linkedSignal` rather than a value set in the constructor: the form is
   * one component instance per section, so clicking the pencil on a second
   * line while the first is open changes the input and must change the fields
   * — which a draft built once would not have done, leaving him correcting one
   * show in another show's boxes.
   */
  protected readonly draft = linkedSignal<Draft>(() => from(this.entry(), this.kind()));

  protected readonly saving = signal(false);
  protected readonly failed = signal('');

  /** Whether this is a correction, which is also whether it can be deleted. */
  protected readonly correcting = computed(() => this.entry() !== null);

  /**
   * Whether it could be saved.
   *
   * A year, an English title and a country. Everything else is genuinely
   * optional: a conference has no venue, an online show has no city, and most
   * of the list has no link at all.
   */
  protected readonly ready = computed(() => {
    const draft = this.draft();
    return Boolean(draft.year) && Boolean(draft.titleEn.trim()) && Boolean(draft.country);
  });

  protected set<K extends keyof Draft>(field: K, value: Draft[K]): void {
    this.draft.update((draft) => ({ ...draft, [field]: value }));
  }

  protected async save(): Promise<void> {
    if (!this.ready() || this.saving()) return;

    this.saving.set(true);
    this.failed.set('');
    try {
      const written = asWritten(this.draft());
      const existing = this.entry();
      if (existing) await this.cv.update(existing.id, written);
      else await this.cv.create(written);
      this.done.emit();
    } catch (error) {
      this.failed.set(refusal(error, 'cv.saveFailed'));
    } finally {
      this.saving.set(false);
    }
  }

  /**
   * Takes the entry off the cv.
   *
   * The api refuses while a painting cites it and names the paintings, which is
   * the message shown: it says which records to edit first, where "it could not
   * be deleted" would have sent him looking.
   */
  protected async remove(): Promise<void> {
    const existing = this.entry();
    if (!existing || this.saving()) return;

    this.saving.set(true);
    this.failed.set('');
    try {
      await this.cv.remove(existing.id);
      this.done.emit();
    } catch (error) {
      this.failed.set(refusal(error, 'cv.deleteFailed'));
    } finally {
      this.saving.set(false);
    }
  }
}

/** The entry as the fields show it, or an empty form on the section's kind. */
function from(entry: CvEntry | null, kind: CvKind): Draft {
  return {
    kind: entry?.kind ?? kind,
    year: entry?.year ?? new Date().getFullYear(),
    titleEn: entry?.title.en ?? '',
    titleEs: entry?.title.es ?? '',
    venueEn: entry?.venue?.en ?? '',
    venueEs: entry?.venue?.es ?? '',
    city: entry?.city ?? '',
    country: entry?.country ?? 'spain',
    titleUrl: entry?.titleUrl ?? '',
    venueUrl: entry?.venueUrl ?? '',
  };
}

/**
 * The draft as the api takes it.
 *
 * A field left blank is left out rather than sent empty: the api stores what it
 * is given, and an empty string is a venue that renders as a stray comma.
 */
function asWritten(draft: Draft): CvWrite {
  const titleEn = draft.titleEn.trim();
  const titleEs = draft.titleEs.trim();
  const venueEn = draft.venueEn.trim();
  const venueEs = draft.venueEs.trim();
  const city = draft.city.trim();
  const titleUrl = draft.titleUrl.trim();
  const venueUrl = draft.venueUrl.trim();

  return {
    kind: draft.kind,
    year: Number(draft.year),
    title: { en: titleEn, ...(titleEs && titleEs !== titleEn ? { es: titleEs } : {}) },
    ...(venueEn
      ? { venue: { en: venueEn, ...(venueEs && venueEs !== venueEn ? { es: venueEs } : {}) } }
      : {}),
    ...(city ? { city } : {}),
    country: draft.country,
    ...(titleUrl ? { titleUrl } : {}),
    ...(venueUrl ? { venueUrl } : {}),
  };
}

/**
 * What the api said, where it said anything worth reading.
 *
 * Only its own refusals: every route answers in an envelope with a message in
 * it, and the one that matters here names the paintings citing the entry.
 * Anything else — a dropped connection, a 500 — falls back to the key, because
 * "Internal server error" on his cv page is noise.
 */
function refusal(error: unknown, fallback: string): string {
  const said = error instanceof HttpErrorResponse ? error.error : null;
  const message = (said as { message?: unknown } | null)?.message;
  const usable =
    typeof message === 'string' && error instanceof HttpErrorResponse && error.status < 500;
  return usable ? (message as string) : fallback;
}
