import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { SOLD_AT_LAST_BUILD } from '@features/artwork/constants/artworks-fallback.constants';
import type { ApiResponse } from '@shared/types/api-response.type';
import { firstValueFrom } from 'rxjs';
import { AdminAuthService } from './admin-auth.service';

/**
 * Which paintings are sold.
 *
 * It was a list in this repository, so a sale meant an edit, a commit and a
 * deploy — four hundred pages rebuilt to turn on one red dot, and no way at all
 * to record a sale from the room it was sold in. The list now lives in the
 * api, and this is how the site reads it.
 *
 * **Asked once and shared.** Every tile in the catalogue, every artwork page
 * and every printed sheet needs the answer, and it is the same few hundred
 * bytes for all of them.
 *
 * **It starts with an answer rather than with nothing.** The build writes down
 * what was sold when the pages were made, so the dot is right in the html
 * before any request is sent, and right again a moment later if a painting has
 * sold since. A page that paints every painting as available while it waits is
 * a page that lies for half a second, in the direction that costs an email.
 */
@Injectable({ providedIn: 'root' })
export class AvailabilityService {
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AdminAuthService);

  private readonly soldIds = signal<ReadonlySet<string>>(new Set(SOLD_AT_LAST_BUILD));
  private asked: Promise<void> | null = null;

  /** Everything sold, as the site currently understands it. */
  readonly sold = computed(() => this.soldIds());

  public isSold(tokenId: string): boolean {
    return this.soldIds().has(String(tokenId));
  }

  /**
   * Brings the site up to date with the api, once per visit.
   *
   * Never throws and never empties what it already knows: if the api cannot be
   * reached, what the build wrote down is still a better answer than none.
   */
  public async refresh(): Promise<void> {
    this.asked ??= this.ask();
    return this.asked;
  }

  private async ask(): Promise<void> {
    try {
      const answer = await firstValueFrom(
        this.http.get<ApiResponse<{ sold: string[] }>>(`${environment.backendUrl}availability`)
      );
      const sold = answer?.data?.sold;
      if (Array.isArray(sold)) this.soldIds.set(new Set(sold.map(String)));
    } catch {
      // The build's answer stands. A catalogue that is a few hours out of date
      // is worth having; one that claims everything is for sale is not.
    }
  }

  /**
   * Records a sale, or takes one back. The artist's, and refused by the api
   * for anybody else.
   *
   * The new answer is kept here as soon as the api has taken it, so the dot
   * he just changed is the dot he sees, without asking again.
   */
  public async set(tokenId: string, sold: boolean): Promise<void> {
    const token = this.auth.bearerToken();
    if (!token) throw new Error('Not signed in');

    await firstValueFrom(
      this.http.patch<ApiResponse<{ tokenId: string; sold: boolean }>>(
        `${environment.backendUrl}availability/${tokenId}`,
        { sold },
        { headers: { Authorization: `Bearer ${token}` } }
      )
    );

    const next = new Set(this.soldIds());
    if (sold) next.add(String(tokenId));
    else next.delete(String(tokenId));
    this.soldIds.set(next);
  }
}
