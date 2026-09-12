import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '@environments/environment';

/**
 * A certificate prepared and waiting for a cheap morning.
 *
 * The whole of what the api stores, which is more than either page shows: the
 * two pages used to declare a field each and disagree about the rest.
 */
export interface PendingMint {
  tokenId: number;
  name: string;
  description: string;
  external_url: string;
  attributes: Array<{ trait_type: string; value: string }>;
  /** The image that will live in the token, as it will be written. */
  thumbnailBase64: string;
  webUrl: string;
  originalUrl: string;
  preparedAt: string;
}

/** What came of asking for the waiting certificates to be written. */
export interface MintOutcome {
  minted: number[];
  skipped: string;
}

/**
 * The one place that knows the mint endpoints.
 *
 * Two pages write certificates — the studio, and the list of the ones put off
 * until later — and both used to hold their own copy of these four calls, their
 * own `PendingMint`, and their own reading of what came back. Two copies of an
 * api that must agree is a change waiting to be made in one place and forgotten
 * in the other.
 */
@Injectable({ providedIn: 'root' })
export class MintApiService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.backendUrl}/mint`;

  /** The certificates prepared and not yet written, lowest token first. */
  public async waiting(): Promise<PendingMint[]> {
    const list = await firstValueFrom(this.http.get<PendingMint[]>(`${this.base}/pending`));
    return [...list].sort((a, b) => a.tokenId - b.tokenId);
  }

  /** Prepares one from the studio form: images, metadata, a token id. */
  public prepare(form: FormData): Promise<PendingMint> {
    return firstValueFrom(this.http.post<PendingMint>(`${this.base}/prepare`, form));
  }

  /** Asks for everything waiting to be written, which it may decline to do. */
  public mintWaiting(): Promise<MintOutcome> {
    return firstValueFrom(this.http.post<MintOutcome>(`${this.base}/pending/mint`, {}));
  }

  /** Takes one off the list. It was never on the chain, so nothing is lost. */
  public discard(tokenId: number): Promise<unknown> {
    return firstValueFrom(this.http.delete(`${this.base}/pending/${tokenId}`));
  }
}
