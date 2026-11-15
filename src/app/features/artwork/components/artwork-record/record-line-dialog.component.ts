import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { inOrder } from '@domain/artwork/record';
import {
  RECORD_KIND_OF_THE_MAKING,
  RECORD_KINDS,
  RECORD_KINDS_FROM_THE_CV,
  RECORD_NAMING_KINDS,
  type RecordEntryEdit,
  type RecordKind,
} from '@domain/artwork/record.entity';
import { cvSections } from '@domain/cv/cv';
import type { Bilingual } from '@domain/cv/cv-entry.entity';
import { ArtworkRecordService } from '@shared/services/artwork-record.service';
import { CvService } from '@shared/services/cv.service';
import { LanguageUrlService } from '@shared/services/language-url.service';
import { TranslatePipe } from '@ngx-translate/core';

/** Which painting the line is for, and what year the painting carries. */
export interface RecordLineDialogData {
  tokenId: string;
  /** Null when the painting's year could not be read; the form then asks. */
  artworkYear: number | null;
}

/** What a line is being written as, before it is sent. */
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
 * A new line, opening on the show.
 *
 * Forty-eight of the sixty-five lines written so far are a show, and a show
 * needs one answer: which one. It opened on a sale, which is the kind with
 * the most to fill in and a quarter of the lines.
 */
function empty(): Draft {
  return {
    kind: 'exhibited',
    cv: '',
    buyer: 'private',
    whoName: '',
    year: new Date().getFullYear(),
    noteEn: '',
  };
}

/**
 * Adding a line to a painting's record, in a window over the page.
 *
 * It was six fields opening inline under the record, on the artwork page —
 * so pressing Add pushed the painting, its essay and the strip of nearby
 * paintings down the screen, and on a phone put the form somewhere below what
 * was being looked at. A record is written while looking at the painting; the
 * form should not be the thing that moves it.
 *
 * It writes the whole record rather than appending, because that is what the
 * api takes: a list written whole cannot end up holding the same line twice.
 * What it writes is built from what the api last answered, not from the drawn
 * lines — the resolved shape is a projection, and sending it back would
 * rewrite the entries already there.
 */
@Component({
  selector: 'app-record-line-dialog',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    TranslatePipe,
  ],
  templateUrl: './record-line-dialog.component.html',
  styleUrl: './record-line-dialog.component.scss',
})
export class RecordLineDialogComponent {
  private readonly records = inject(ArtworkRecordService);
  private readonly cv = inject(CvService);
  private readonly language = inject(LanguageUrlService);

  private readonly asked = inject<RecordLineDialogData>(MAT_DIALOG_DATA);
  protected readonly tokenId = this.asked.tokenId;
  protected readonly ref = inject(MatDialogRef<RecordLineDialogComponent>);

  protected readonly kinds = RECORD_KINDS;

  /**
   * Whether this line has anybody to name.
   *
   * The kinds whose verb governs a name. An exhibition and a prize take their
   * name from the cv entry they cite, so a second one here would be a name
   * that could disagree with it — and the two boxes used to be on the form
   * whatever had happened, asking who for a show that already said where.
   */
  protected readonly naming = computed(() => RECORD_NAMING_KINDS.includes(this.draft().kind));

  protected readonly saving = signal(false);
  protected readonly failed = signal('');
  protected readonly draft = signal<Draft>(empty());

  /** Whether this kind takes its words from the cv rather than from a person. */
  protected readonly fromTheCv = computed(() =>
    RECORD_KINDS_FROM_THE_CV.includes(this.draft().kind)
  );

  /**
   * Every cv entry for the picker, still in the sections the cv keeps them in.
   *
   * The headings are translation keys — the cv keeps one per section — so the
   * template puts them through the pipe. Bound straight in, the picker's
   * separators read "cv.shows.title".
   */
  protected readonly career = computed(() =>
    cvSections(this.cv.entries(), this.language.contentLanguage()).map((section) => ({
      kind: section.kind,
      title: section.title,
      items: section.items.map((item) => ({
        id: item.id,
        label: `${item.year} · ${item.title}${item.venue ? `, ${item.venue}` : ''}`,
      })),
    }))
  );

  constructor() {
    // The picker is the whole of this form for a show, and the cv is a few
    // kilobytes shared with the page that lists it.
    void this.cv.refresh();
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
    if (this.fromTheCv()) return Boolean(draft.cv);
    if (this.ofTheMaking()) return Boolean(this.yearOfTheWork() && draft.whoName.trim());
    return Boolean(draft.year);
  });

  /**
   * Whether this line belongs to the making of the painting.
   *
   * A grant or a residency that paid for it is true of the painting before it
   * was finished: it is dated by the painting, so the form does not ask for a
   * year, and it always names whoever gave the support — a line saying only
   * "created with support" is a line that says nothing.
   */
  protected readonly ofTheMaking = computed(() => this.draft().kind === RECORD_KIND_OF_THE_MAKING);

  /** The painting's year, where it could be read. */
  protected readonly yearOfTheWork = computed(() => this.asked.artworkYear);

  protected async add(): Promise<void> {
    if (!this.ready() || this.saving()) return;

    this.saving.set(true);
    this.failed.set('');
    try {
      await this.records.set(this.tokenId, [...this.stored(), this.asEntry(this.draft())]);
      this.ref.close();
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
    return inOrder(this.records.of(this.tokenId)).map((entry) => ({
      kind: entry.kind,
      ...(entry.cv ? { cv: entry.cv.id } : {}),
      ...(entry.who ? { who: entry.who } : {}),
      // An exhibition's year belongs to the show; sending it back would create
      // a second year that could disagree with it.
      ...(entry.cv ? {} : { year: entry.year }),
      ...(entry.note ? { note: entry.note } : {}),
    }));
  }

  /**
   * What the kind asks for, and nothing the form happened to be holding.
   *
   * Built from the kind rather than from whichever boxes have a value in
   * them: switching the kind leaves the old answers in the draft, and sending
   * them would store a note on a prize and a cv entry on a sale, which is
   * what the boxes were taken off the form to prevent.
   */
  private asEntry(draft: Draft): RecordEntryEdit {
    if (RECORD_KINDS_FROM_THE_CV.includes(draft.kind)) {
      return { kind: draft.kind, cv: draft.cv };
    }

    // Nobody gives a grant anonymously, so the support line takes the typed
    // name whatever the buyer field happens to be holding: that control is
    // not drawn for it, and its default is "a private collector".
    const who = this.ofTheMaking() ? named(draft.whoName) : whoOf(draft);
    const noteEn = draft.noteEn.trim();
    // The support that paid for the painting is dated by the painting.
    //
    // shortcut: the year is copied in when the line is written rather than
    // resolved from the catalogue on every read. Upgrade it the day a
    // painting's own year is ever corrected, which would leave this behind.
    const year = this.ofTheMaking()
      ? (this.yearOfTheWork() ?? Number(draft.year))
      : Number(draft.year);
    return {
      kind: draft.kind,
      ...(who ? { who } : {}),
      year,
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
  return named(draft.whoName);
}

/**
 * A typed name as the api keeps one: English alone, which is what it stores
 * when there is no different Spanish — so a proper noun reads the same on
 * both pages, as a name should.
 */
function named(typed: string): Bilingual | undefined {
  const name = typed.trim();
  return name ? { en: name } : undefined;
}
