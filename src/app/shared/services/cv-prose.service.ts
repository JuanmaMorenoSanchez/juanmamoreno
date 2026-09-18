import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CV_OBJECT } from '@domain/cv/cv.constants';
import { environment } from '@environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { AdminAuthService } from '@shared/services/admin-auth.service';
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
 * allowed to — asks for a new one. The list is rendered here and sent with the
 * request, because the cv lives in this repository and nowhere else: a copy on
 * the server would be a second thing to remember to update, and the stale one
 * would be the one nobody was looking at.
 */
@Injectable({ providedIn: 'root' })
export class CvProseService {
  private readonly http = inject(HttpClient);
  private readonly translate = inject(TranslateService);
  private readonly auth = inject(AdminAuthService);

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
   */
  public asList(): string {
    const say = (key?: string) => (key ? (this.translate.instant(key) as string) : '');

    return CV_OBJECT.map((section) => {
      const lines = section.items.map((item) => {
        const where = [say(item.venue), item.city, say(item.country)].filter(Boolean).join(', ');
        return `${item.year} — ${item.title}${where ? `, ${where}` : ''}`;
      });
      return `${say(section.title)}\n${lines.join('\n')}`;
    }).join('\n\n');
  }
}
