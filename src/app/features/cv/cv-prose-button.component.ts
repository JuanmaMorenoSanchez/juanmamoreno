import { Component, computed, inject, signal } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltip } from '@angular/material/tooltip';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { SNACKBAR_DURATION_MS } from '@shared/constants/common.constants';
import { AdminAuthService } from '@shared/services/admin-auth.service';
import { CvProseService } from '@shared/services/cv-prose.service';
import { LanguageUrlService } from '@shared/services/language-url.service';
import { PdfService } from '@shared/services/pdf/pdf.service';

/**
 * The cv as a biography, beside the cv as a list.
 *
 * Two different things for two different readers. A gallery wants the list: it
 * is scanned, not read, and being a table is the point of it. Somebody deciding
 * whether to open the list at all wants the paragraph.
 *
 * Downloading is for anybody; writing a new one is his. It costs a model call —
 * so a public page that spent money per press would be a page somebody holds
 * F5 on — and it is a biography of a living person written by a machine, which
 * he reads before anybody else does.
 */
@Component({
  selector: 'app-cv-prose-button',
  templateUrl: './cv-prose-button.component.html',
  imports: [MatIconButton, MatIcon, MatTooltip, MatProgressSpinner, TranslatePipe],
})
export class CvProseButtonComponent {
  private readonly prose = inject(CvProseService);
  private readonly pdf = inject(PdfService);
  private readonly language = inject(LanguageUrlService);
  private readonly translate = inject(TranslateService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly auth = inject(AdminAuthService);

  protected readonly written = signal<string | null>(null);
  protected readonly busy = signal(false);
  protected readonly isArtist = computed(() => this.auth.isAdmin());

  /** Two letters, which is what the api files a biography under. */
  private get lang(): string {
    return this.language.inSpanish() ? 'es' : 'en';
  }

  constructor() {
    void this.load();
  }

  private async load(): Promise<void> {
    const found = await this.prose.read(this.lang);
    this.written.set(found?.body ?? null);
  }

  /** The biography as a page to keep, for whoever asked for it. */
  async download(): Promise<void> {
    const body = this.written();
    if (!body) return;

    this.busy.set(true);
    try {
      const doc = await this.pdf.createCvProse(body);
      doc.save('juanmamoreno-biography.pdf');
    } catch {
      this.say('download.error');
    } finally {
      this.busy.set(false);
    }
  }

  /** Writes a new one from the cv as it stands now. Replaces the one before it. */
  async rewrite(): Promise<void> {
    this.busy.set(true);
    try {
      const fresh = await this.prose.write(this.lang);
      this.written.set(fresh.body);
      this.say('cv.proseWritten');
    } catch {
      this.say('cv.proseFailed');
    } finally {
      this.busy.set(false);
    }
  }

  private say(key: string): void {
    this.snackBar.open(this.translate.instant(key) as string, 'Ok!', {
      duration: SNACKBAR_DURATION_MS,
      verticalPosition: 'top',
    });
  }
}
