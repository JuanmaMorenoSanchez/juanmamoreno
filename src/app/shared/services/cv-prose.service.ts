import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { cvSections } from '@domain/cv/cv';
import { environment } from '@environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { AdminAuthService } from '@shared/services/admin-auth.service';
import { CvService } from '@shared/services/cv.service';
import { ApiResponse } from '@shared/types/api-response.type';
import { catchError, firstValueFrom, map, of } from 'rxjs';

export interface CvProse {
  lang: string;
  body: string;
  writtenAt: string;
}

/**
 * The cv as a biography rather than a table.
 *
 * The api writes it and keeps it; this asks for it, and — for the one person
 * allowed to — asks for a new one. The list is still rendered here and sent
 * with the request, which was once a necessity and is now a choice: the cv
 * lives in the api too, so the biography is written about the list he was
 * looking at when he asked for it.
 */
@Injectable({ providedIn: 'root' })
export class CvProseService {
  private readonly http = inject(HttpClient);
  private readonly translate = inject(TranslateService);
  private readonly auth = inject(AdminAuthService);
  private readonly cv = inject(CvService);

  /** What has been written in this language, or null if nothing has. */
  public read(lang: string): Promise<CvProse | null> {
    return firstValueFrom(
      this.http.get<ApiResponse<CvProse | null>>(`${environment.backendUrl}cv/prose/${lang}`).pipe(
        map((response) => response?.data ?? null),
        // A dossier without the biography is still a dossier, and the page
        // simply does not offer what it has not got.
        catchError(() => of(null))
      )
    );
  }

  /** Writes a new one from the cv as it stands. His alone; it costs a call. */
  public write(lang: string): Promise<CvProse> {
    const token = this.auth.bearerToken();
    return firstValueFrom(
      this.http
        .post<ApiResponse<CvProse>>(
          `${environment.backendUrl}cv/prose`,
          { lang, list: this.asList() },
          { headers: token ? { Authorization: `Bearer ${token}` } : {} }
        )
        .pipe(map((response) => response.data as CvProse))
    );
  }

  /**
   * The cv as plain lines, in the language being read.
   *
   * Year, then what happened, then where — the same three the page shows in
   * three columns, which a model reads as well as a reader does and better than
   * it reads a table.
   *
   * The titles are text now. They used to be whatever was in the array: two of
   * them were translation keys and reached the model as `cv.awards.fag`, and
   * eleven more arrived wrapped in the `<a>` tags the page rendered them with.
   */
  public asList(): string {
    const lang = this.translate.currentLang()?.startsWith('es') ? 'es' : 'en';

    return cvSections(this.cv.entries(), lang)
      .map((section) => {
        const lines = section.items.map((item) => {
          const where = [item.venue, item.city, this.translate.instant(item.countryKey) as string]
            .filter(Boolean)
            .join(', ');
          return `${item.year} — ${item.title}${where ? `, ${where}` : ''}`;
        });
        return `${this.translate.instant(section.title) as string}\n${lines.join('\n')}`;
      })
      .join('\n\n');
  }
}
