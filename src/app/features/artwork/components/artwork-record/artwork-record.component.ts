import { Component, computed, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Bilingual } from '@domain/cv/cv-entry.entity';
import { cvSections } from '@domain/cv/cv';
import {
  RECORD_KINDS,
  RECORD_NAMING_KINDS,
  RecordEntryEdit,
  RecordKind,
} from '@domain/artwork/record.entity';
import { recordLines } from '@domain/artwork/record';
import { TranslatePipe } from '@ngx-translate/core';
import { AdminAuthService } from '@shared/services/admin-auth.service';
import { ArtworkRecordService } from '@shared/services/artwork-record.service';
import { CvService } from '@shared/services/cv.service';
import { LanguageUrlService } from '@shared/services/language-url.service';

/** What a line is being edited to, before it is sent. */
interface Draft {
  kind: RecordKind;
  cv: string;
  /** Which of the two answers to "who": the collector nobody names, or a name. */
  buyer: 'private' | 'named';
  /** The institution, typed, when that is the answer. */
  whoName: string;
  year: number | null;
  noteEn: string;
}

/**
 * The buyer who is not named, in his words, in both languages.
 *
 * The one answer here that is a phrase rather than a proper noun, which is why
 * it is a choice and not something to type: typed, it would arrive in one
 * language and print English on the Spanish page. An institution's name is a
 * proper noun and the same in both, so one box fills both.
 */
const PRIVATE_COLLECTOR: Bilingual = {
  en: 'a private collector',
  es: 'un coleccionista privado',
};

/**
 * What has happened to this painting, between the technical sheet and the essay.
 *
 * Where it was shown, what it won, when it was sold — the half of a catalogue
 * entry that the measurements and the essay both leave out. Oldest first,
 * because a record reads as a life rather than as a log.
 *
 * **Absent for a reader when there is nothing to say.** Most of the catalogue
 * has no record, and a heading over an empty list is worse than no heading. The
 * artist sees it either way, because an empty record is the one he needs to add
 * the first line to.
 *
 * **No money.** There is no field for a price and the api has nowhere to put
 * one. Nothing on this site says what a painting costs; a record says that a
 * painting was sold and when, which is what provenance publishes.
 *
 * The exhibition picker offers the cv and nothing else: the whole point of a
 * link is that it is a link, and free text would make a second list of shows
 * that disagreed with the first within a year.
 */
@Component({
  selector: 'app-artwork-record',
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
  templateUrl: './artwork-record.component.html',
  styleUrl: './artwork-record.component.scss',
})
export class ArtworkRecordComponent {
  private readonly records = inject(ArtworkRecordService);
  private readonly cv = inject(CvService);
  private readonly auth = inject(AdminAuthService);
  private readonly language = inject(LanguageUrlService);

  readonly tokenId = input.required<string>();

  constructor() {
    // The build wrote down every record, so the page is already right; this
    // catches a line added since, and is one request for the whole catalogue.
    void this.records.refresh();
  }

  protected readonly kinds = RECORD_KINDS;

  /**
   * Whether this line has anybody to name.
   *
   * The three kinds whose verb governs a name. An exhibition and a prize take
   * their name from the cv entry they cite, so a second one here would be a
   * name that could disagree with it — and the two boxes used to be on the
   * form whatever had happened, asking who for a show that already said where.
   */
  protected readonly naming = computed(() => RECORD_NAMING_KINDS.includes(this.draft().kind));
  protected readonly mine = computed(() => this.auth.isAdmin());

  /** The lines as the page draws them, in the language the address is in. */
  protected readonly lines = computed(() =>
    recordLines(this.records.of(this.tokenId()), this.language.contentLanguage())
  );

  /** Drawn at all? For a reader, only when there is something to read. */
  protected readonly shown = computed(() => this.mine() || this.lines().length > 0);

  /** Every cv entry, newest first, for the picker. */
  protected readonly career = computed(() =>
    cvSections(this.cv.entries(), this.language.contentLanguage()).flatMap((section) =>
      section.items.map((item) => ({
        id: item.id,
        label: `${item.year} · ${item.title}${item.venue ? `, ${item.venue}` : ''}`,
      }))
    )
  );

  protected readonly adding = signal(false);
  protected readonly saving = signal(false);
  protected readonly failed = signal('');
  protected readonly draft = signal<Draft>(empty());

  /** Where the cv page says this show is, in the language being read. */
  protected cvLink(anchor: string): string {
    return `${this.language.link('cv')}#${anchor}`;
  }

  protected open(): void {
    this.draft.set(empty());
    this.failed.set('');
    this.adding.set(true);
    void this.cv.refresh();
  }

  protected close(): void {
    this.adding.set(false);
    this.failed.set('');
  }

  protected set<K extends keyof Draft>(field: K, value: Draft[K]): void {
    this.draft.update((draft) => ({ ...draft, [field]: value }));
  }

  /**
   * Whether the line could be saved.
   *
   * An exhibition needs the show; everything else needs a year, since there is
   * no show to take one from.
   */
  protected readonly ready = computed(() => {
    const draft = this.draft();
    if (draft.kind === 'exhibited') return Boolean(draft.cv);
    return Boolean(draft.year) || Boolean(draft.cv);
  });

  protected async add(): Promise<void> {
    if (!this.ready() || this.saving()) return;

    this.saving.set(true);
    this.failed.set('');
    try {
      await this.records.set(this.tokenId(), [...this.stored(), this.asEntry(this.draft())]);
      this.adding.set(false);
    } catch {
      this.failed.set('record.failed');
    } finally {
      this.saving.set(false);
    }
  }

  /**
   * Takes a line back.
   *
   * By position, because a line has no id of its own: the record is written
   * whole, so the list as drawn is the list that is sent.
   */
  protected async remove(at: number): Promise<void> {
    if (this.saving()) return;

    this.saving.set(true);
    this.failed.set('');
    try {
      const left = this.stored().filter((_, index) => index !== at);
      await this.records.set(this.tokenId(), left);
    } catch {
      this.failed.set('record.failed');
    } finally {
      this.saving.set(false);
    }
  }

  /**
   * The record as it would be written back.
   *
   * Built from what the api last answered rather than from the drawn lines, so
   * sending a new line cannot rewrite the ones already there — the resolved
   * shape is a projection and not what is stored.
   */
  private stored(): RecordEntryEdit[] {
    return this.records.of(this.tokenId()).map((entry) => ({
      kind: entry.kind,
      ...(entry.cv ? { cv: entry.cv.id } : {}),
      ...(entry.who ? { who: entry.who } : {}),
      // An exhibition's year belongs to the show; sending it back would create
      // a second year that could disagree with it.
      ...(entry.cv ? {} : { year: entry.year }),
      ...(entry.note ? { note: entry.note } : {}),
    }));
  }

  private asEntry(draft: Draft): RecordEntryEdit {
    const who = RECORD_NAMING_KINDS.includes(draft.kind) ? whoOf(draft) : undefined;
    const noteEn = draft.noteEn.trim();

    return {
      kind: draft.kind,
      ...(draft.cv ? { cv: draft.cv } : {}),
      ...(who ? { who } : {}),
      ...(draft.cv ? {} : { year: Number(draft.year) }),
      ...(noteEn ? { note: { en: noteEn } } : {}),
    };
  }
}

/**
 * Who the painting went to, or nobody.
 *
 * An institution is taken as a proper noun: one box, stored as English alone,
 * which is what the api keeps when there is no different Spanish — so the name
 * reads the same on both pages, as a name should. Left empty it is nobody,
 * because naming anybody is optional: that a painting sold, and when, is a
 * fact on its own, and the line then reads "Sold" with nothing after it.
 */
function whoOf(draft: Draft): Bilingual | undefined {
  if (draft.buyer === 'private') return PRIVATE_COLLECTOR;
  const named = draft.whoName.trim();
  return named ? { en: named } : undefined;
}

/**
 * A new line, with the sale already filled in.
 *
 * Most of what he will ever add here is a sale to somebody who does not want
 * naming, so that is what the form opens as.
 */
function empty(): Draft {
  return {
    kind: 'sold',
    cv: '',
    buyer: 'private',
    whoName: '',
    year: new Date().getFullYear(),
    noteEn: '',
  };
}
