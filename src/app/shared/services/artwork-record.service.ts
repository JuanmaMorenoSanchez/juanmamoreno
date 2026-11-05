import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { PLATFORM_ID, Injectable, computed, inject, signal } from '@angular/core';
import { RECORDS_AT_LAST_BUILD } from '@domain/artwork/record-fallback.constants';
import { ArtworkRecord, RecordEntry, RecordEntryEdit } from '@domain/artwork/record.entity';
import { environment } from '@environments/environment';
import type { ApiResponse } from '@shared/types/api-response.type';
import { firstValueFrom } from 'rxjs';
import { AdminAuthService } from './admin-auth.service';

/**
 * What happened to each painting: where it was shown, what it won, when it sold.
 *
 * **Every record at once, asked once.** Each artwork page needs its own, the cv
 * page builds the other direction out of the same answer, and the whole thing
 * is a few kilobytes — the same decision as which paintings are sold, for the
 * same reason.
 *
 * **It starts with an answer rather than with nothing.** The build writes down
 * every record as it stood, so an artwork page carries its own provenance in
 * the html with no javascript at all, which is the premise of this site. A line
 * added since appears a moment later.
 */
@Injectable({ providedIn: 'root' })
export class ArtworkRecordService {
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AdminAuthService);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private readonly known = signal<ReadonlyMap<string, RecordEntry[]>>(
    byToken(RECORDS_AT_LAST_BUILD)
  );
  private asked: Promise<void> | null = null;

  /** Every painting that has a record, by token id. */
  readonly records = computed(() => this.known());

  /** One painting's lines, oldest first, or nothing at all. */
  public of(tokenId: string): RecordEntry[] {
    return this.known().get(String(tokenId)) ?? [];
  }

  /**
   * Brings the site up to date with the api, once per visit.
   *
   * Never throws and never empties what it already knows: a painting whose
   * record is in the html already has a better answer than none.
   *
   * **Nothing is asked while the pages are being built.** The build has already
   * written every record into the bundle, so a request during the prerender
   * answers a question that is already answered — and it is asked once per
   * page, which measured 384 calls to the api in a single build. It also
   * overwrote the bundled copy with whatever the api said at that moment,
   * which is how this was found: a record in the bundle and an empty answer
   * from a half-finished deploy left the provenance off every page.
   */
  public async refresh(): Promise<void> {
    if (!this.isBrowser) return;
    this.asked ??= this.ask();
    return this.asked;
  }

  /**
   * Replaces one painting's record. His, and only his.
   *
   * Sent whole, because the form edits a list — and a list written whole cannot
   * end up holding the same line twice. The answer comes back resolved, so the
   * page shows what was actually stored rather than what was typed.
   */
  public async set(tokenId: string, entries: RecordEntryEdit[]): Promise<RecordEntry[]> {
    const token = this.auth.bearerToken();
    const answer = await firstValueFrom(
      this.http.put<ApiResponse<ArtworkRecord>>(
        `${environment.backendUrl}artwork-record/${tokenId}`,
        { entries },
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      )
    );

    const saved = answer?.data?.entries ?? [];
    const next = new Map(this.known());
    if (saved.length) next.set(String(tokenId), saved);
    else next.delete(String(tokenId));
    this.known.set(next);

    return saved;
  }

  private async ask(): Promise<void> {
    try {
      const answer = await firstValueFrom(
        this.http.get<ApiResponse<{ records: ArtworkRecord[] }>>(
          `${environment.backendUrl}artwork-record`
        )
      );
      const records = answer?.data?.records;
      if (Array.isArray(records)) this.known.set(byToken(records));
    } catch {
      // What the build wrote down stands. A page with provenance on it is not
      // worth emptying over a request that did not arrive.
    }
  }
}

function byToken(records: readonly ArtworkRecord[]): ReadonlyMap<string, RecordEntry[]> {
  return new Map(
    records
      .filter((record) => record.entries?.length)
      .map((record) => [String(record.tokenId), record.entries])
  );
}
