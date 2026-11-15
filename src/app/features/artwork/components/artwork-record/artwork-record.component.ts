import { Component, computed, inject, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RecordEntryEdit } from '@domain/artwork/record.entity';
import { inOrder, recordLines } from '@domain/artwork/record';
import { TranslatePipe } from '@ngx-translate/core';
import { AdminAuthService } from '@shared/services/admin-auth.service';
import { ArtworkRecordService } from '@shared/services/artwork-record.service';
import { LanguageUrlService } from '@shared/services/language-url.service';
import { RecordLineDialogComponent } from './record-line-dialog.component';

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
  imports: [MatButtonModule, MatIconModule, TranslatePipe],
  templateUrl: './artwork-record.component.html',
  styleUrl: './artwork-record.component.scss',
})
export class ArtworkRecordComponent {
  private readonly records = inject(ArtworkRecordService);
  private readonly dialog = inject(MatDialog);
  private readonly auth = inject(AdminAuthService);
  private readonly language = inject(LanguageUrlService);

  readonly tokenId = input.required<string>();

  constructor() {
    // The build wrote down every record, so the page is already right; this
    // catches a line added since, and is one request for the whole catalogue.
    void this.records.refresh();
  }

  protected readonly mine = computed(() => this.auth.isAdmin());

  /** The lines as the page draws them, in the language the address is in. */
  protected readonly lines = computed(() =>
    recordLines(this.records.of(this.tokenId()), this.language.contentLanguage())
  );

  /**
   * Which line wears the sold dot, or -1.
   *
   * The dot said the painting had sold beside the measurements, and the
   * record said it again underneath with the year and the buyer — the same
   * fact in two places, one of which had less to say. It belongs on the line
   * that dates it. The page drops its own dot when this finds one (R113).
   */
  protected readonly soldLine = computed(() =>
    this.lines().findIndex((line) => line.kind === 'sold')
  );

  /** Drawn at all? For a reader, only when there is something to read. */
  protected readonly shown = computed(() => this.mine() || this.lines().length > 0);

  protected readonly saving = signal(false);
  protected readonly failed = signal('');

  /** Where the cv page says this show is, in the language being read. */
  protected cvLink(anchor: string): string {
    return `${this.language.link('cv')}#${anchor}`;
  }

  /**
   * Adds a line, in a window over the page.
   *
   * It was six fields opening inline under the record, which pushed the
   * painting, its essay and the strip of nearby paintings down the screen
   * every time. A record is written while looking at the painting.
   */
  protected open(): void {
    this.failed.set('');
    this.dialog.open(RecordLineDialogComponent, {
      data: this.tokenId(),
      width: '34rem',
      maxWidth: '92vw',
    });
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
    // In the order the page drew them, because `remove` takes a line away by
    // its position in that list.
    return inOrder(this.records.of(this.tokenId())).map((entry) => ({
      kind: entry.kind,
      ...(entry.cv ? { cv: entry.cv.id } : {}),
      ...(entry.who ? { who: entry.who } : {}),
      // An exhibition's year belongs to the show; sending it back would create
      // a second year that could disagree with it.
      ...(entry.cv ? {} : { year: entry.year }),
      ...(entry.note ? { note: entry.note } : {}),
    }));
  }
}
