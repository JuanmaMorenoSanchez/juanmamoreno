import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { ApiResponse } from '@shared/types/api-response.type';
import { catchError, map, Observable, of, shareReplay } from 'rxjs';

/** When one certificate was written to Ethereum, and by which transaction. */
export interface MintRecord {
  txHash: string;
  mintedAt: string;
}

/**
 * When each certificate was written.
 *
 * Asked for once, the first time anybody opens a certificate, and kept for the
 * rest of the visit — it is one answer for the whole collection, about twenty
 * kilobytes, and none of it can change. Not fetched while the pages are built:
 * the date is read inside a dialog that opens on a click, so putting it in four
 * hundred prerendered pages would be four hundred requests for something nobody
 * has asked to see.
 *
 * A failure is an empty map rather than an error. Everything else in the
 * certificate — the contract, the token, the links to both — is known without
 * asking anybody, so the date is the only sentence that goes missing.
 */
@Injectable({ providedIn: 'root' })
export class CertificateService {
  private readonly http = inject(HttpClient);

  private readonly mints$: Observable<Record<string, MintRecord>> = this.http
    .get<ApiResponse<Record<string, MintRecord>>>(`${environment.backendUrl}certificates/mints`)
    .pipe(
      map((response) => response?.data ?? {}),
      catchError(() => of({} as Record<string, MintRecord>)),
      shareReplay({ bufferSize: 1, refCount: false })
    );

  /** The record for one token, or null while it is loading and if it never comes. */
  public recordFor(tokenId: string): Observable<MintRecord | null> {
    return this.mints$.pipe(map((mints) => mints[tokenId] ?? null));
  }
}
