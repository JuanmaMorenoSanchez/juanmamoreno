import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { PLATFORM_ID, Injectable, computed, inject, signal } from '@angular/core';
import { CV_AT_LAST_BUILD } from '@domain/cv/cv-fallback.constants';
import { CvEntry, CvWrite } from '@domain/cv/cv-entry.entity';
import { environment } from '@environments/environment';
import type { ApiResponse } from '@shared/types/api-response.type';
import { firstValueFrom } from 'rxjs';
import { AdminAuthService } from './admin-auth.service';

/**
 * The career: the shows, the awards, the conference, the education.
 *
 * It was an array in this repository, so adding a show meant an edit, a commit
 * and a deploy — and the labels it referred to lived in two translation
 * dictionaries that only a deploy could change. The list now lives in the api,
 * and this is how the site reads it.
 *
 * **It starts with an answer rather than with nothing.** The build writes down
 * the cv as it stood when the pages were made, so `/cv` is a complete page in
 * the html before any request is sent — which is the whole premise of this
 * site, and the reason the cv is readable with no javascript at all. A show
 * added since appears a moment later.
 *
 * **Asked at most once, and only if something wants it.** Two places do: the
 * cv page and the pdf, which can put the cv in a dossier from anywhere in the
 * catalogue. Everywhere else never sends the request — and a write asks again,
 * because the order a new entry falls into is the api's to decide.
 */
@Injectable({ providedIn: 'root' })
export class CvService {
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AdminAuthService);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private readonly known = signal<readonly CvEntry[]>(CV_AT_LAST_BUILD);
  private asked: Promise<void> | null = null;

  /** The whole cv, as the site currently understands it. */
  readonly entries = computed(() => this.known());

  /**
   * Brings the site up to date with the api, once per visit.
   *
   * Never throws and never empties what it already knows: if the api cannot be
   * reached, what the build wrote down is still a better answer than none —
   * and on `/cv` the alternative is a page with no career on it.
   *
   * **Nothing is asked while the pages are being built.** `prebuild` has
   * already written the api's answer into the bundle, so asking again during
   * the prerender answers a question that is answered — and it would let a
   * half-finished deploy replace a complete cv with whatever it had.
   */
  public async refresh(): Promise<void> {
    if (!this.isBrowser) return;
    this.asked ??= this.ask();
    return this.asked;
  }

  /** Puts a show, an award or a course on the cv. His, and only his. */
  public async create(entry: CvWrite): Promise<void> {
    await firstValueFrom(
      this.http.post<ApiResponse<CvEntry>>(
        `${environment.backendUrl}cv/entries`,
        entry,
        this.asHim()
      )
    );
    await this.reread();
  }

  /** Corrects one, seeded or not. The id does not move. */
  public async update(id: string, entry: CvWrite): Promise<void> {
    await firstValueFrom(
      this.http.put<ApiResponse<CvEntry>>(
        `${environment.backendUrl}cv/entries/${id}`,
        entry,
        this.asHim()
      )
    );
    await this.reread();
  }

  /**
   * Takes one off the cv.
   *
   * The api refuses this while a painting still cites the entry, and names the
   * paintings in the refusal. That message is worth showing him rather than
   * replacing with "it failed": it says which records to edit first.
   */
  public async remove(id: string): Promise<void> {
    await firstValueFrom(
      this.http.delete<ApiResponse<{ id: string }>>(
        `${environment.backendUrl}cv/entries/${id}`,
        this.asHim()
      )
    );
    await this.reread();
  }

  /**
   * Asks the api again after a write, rather than patching what is held.
   *
   * The order is the api's: grouped by kind, newest first, and within a year
   * the order the seed was in, which is his. A new entry spliced in here would
   * land in whatever position this code guessed, and be somewhere else after
   * the next reload.
   */
  private async reread(): Promise<void> {
    this.asked = this.ask();
    return this.asked;
  }

  /** His credential, which the api verifies before writing anything. */
  private asHim(): { headers: Record<string, string> } {
    const token = this.auth.bearerToken();
    return { headers: token ? { Authorization: `Bearer ${token}` } : {} };
  }

  private async ask(): Promise<void> {
    try {
      const answer = await firstValueFrom(
        this.http.get<ApiResponse<{ entries: CvEntry[] }>>(`${environment.backendUrl}cv/entries`)
      );
      const entries = answer?.data?.entries;
      if (Array.isArray(entries) && entries.length) this.known.set(entries);
    } catch {
      // The build's copy stands. A cv page is not worth emptying over a
      // request that did not arrive.
    }
  }
}
