import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom, map } from 'rxjs';
import type { ApiResponse } from '@shared/types/api-response.type';
import { environment } from '@environments/environment';
import { AdminAuthService } from './admin-auth.service';

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

/** A mint call, encoded by the api and ready for a wallet to sign. */
export interface SignableTransaction {
  to: string;
  data: string;
  chainId: number;
  tokenId: number;
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
  private readonly auth = inject(AdminAuthService);
  private readonly base = `${environment.backendUrl}/mint`;

  /**
   * The artist's token, on every request.
   *
   * There is no interceptor in this application — each service that asks
   * something only he may ask attaches this itself — and these did not, so every
   * one of them was refused with "Forbidden resource": preparing a certificate
   * stored nothing, and minting stopped before a wallet was ever opened.
   *
   * An expired token is never sent: `bearerToken` gives null once the hour is
   * up, and the call is refused exactly as it would have been anyway.
   */
  /**
   * What the api actually sent, out of the envelope it sends everything in.
   *
   * A single interceptor on the backend wraps every controller's return value
   * as `{ success, message, data }`. Read as though it were the value itself, a
   * prepared certificate has no token id and a list of waiting ones is not a
   * list at all — which is how a certificate that had been stored correctly, its
   * image already on Arweave, showed as "Token — undefined" and then as nothing
   * waiting at all.
   */
  private static unwrap<T>(response: ApiResponse<T> | T): T {
    const envelope = response as ApiResponse<T>;
    return envelope && typeof envelope === 'object' && 'success' in envelope
      ? (envelope.data as T)
      : (response as T);
  }

  private authorised(): { headers: Record<string, string> } {
    const token = this.auth.bearerToken();
    return { headers: token ? { Authorization: `Bearer ${token}` } : {} };
  }

  /** The certificates prepared and not yet written, lowest token first. */
  public async waiting(): Promise<PendingMint[]> {
    const list = MintApiService.unwrap(
      await firstValueFrom(
        this.http.get<ApiResponse<PendingMint[]>>(`${this.base}/pending`, this.authorised())
      )
    );
    return [...(list ?? [])].sort((a, b) => a.tokenId - b.tokenId);
  }

  /** Prepares one from the studio form: images, metadata, a token id. */
  public prepare(form: FormData): Promise<PendingMint> {
    return firstValueFrom(
      this.http
        .post<ApiResponse<PendingMint>>(`${this.base}/prepare`, form, this.authorised())
        .pipe(map(MintApiService.unwrap<PendingMint>))
    );
  }

  /** Asks for everything waiting to be written, which it may decline to do. */
  public mintWaiting(): Promise<MintOutcome> {
    return firstValueFrom(
      this.http
        .post<ApiResponse<MintOutcome>>(`${this.base}/pending/mint`, {}, this.authorised())
        .pipe(map(MintApiService.unwrap<MintOutcome>))
    );
  }

  /**
   * The transaction that writes one certificate, for a wallet to sign.
   *
   * Assembled by the api, because what a certificate says is decided in one
   * place. Nothing here builds metadata or encodes a call.
   */
  public signable(tokenId: number, to: string): Promise<SignableTransaction> {
    return firstValueFrom(
      this.http
        .get<ApiResponse<SignableTransaction>>(`${this.base}/pending/${tokenId}/transaction`, {
          params: { to },
          ...this.authorised(),
        })
        .pipe(map(MintApiService.unwrap<SignableTransaction>))
    );
  }

  /**
   * Asks the api to check the chain, take it off the list, and read the
   * catalogue again so the painting is on the site.
   */
  public confirmWritten(tokenId: number): Promise<{ written: boolean; shown: boolean }> {
    return firstValueFrom(
      this.http
        .post<ApiResponse<{ written: boolean; shown: boolean }>>(
          `${this.base}/pending/${tokenId}/written`,
          {},
          this.authorised()
        )
        .pipe(map(MintApiService.unwrap<{ written: boolean; shown: boolean }>))
    );
  }

  /** Takes one off the list. It was never on the chain, so nothing is lost. */
  public discard(tokenId: number): Promise<unknown> {
    return firstValueFrom(this.http.delete(`${this.base}/pending/${tokenId}`, this.authorised()));
  }
}
