import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
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
  private authorised(): { headers: Record<string, string> } {
    const token = this.auth.bearerToken();
    return { headers: token ? { Authorization: `Bearer ${token}` } : {} };
  }

  /** The certificates prepared and not yet written, lowest token first. */
  public async waiting(): Promise<PendingMint[]> {
    const list = await firstValueFrom(
      this.http.get<PendingMint[]>(`${this.base}/pending`, this.authorised())
    );
    return [...list].sort((a, b) => a.tokenId - b.tokenId);
  }

  /** Prepares one from the studio form: images, metadata, a token id. */
  public prepare(form: FormData): Promise<PendingMint> {
    return firstValueFrom(
      this.http.post<PendingMint>(`${this.base}/prepare`, form, this.authorised())
    );
  }

  /** Asks for everything waiting to be written, which it may decline to do. */
  public mintWaiting(): Promise<MintOutcome> {
    return firstValueFrom(
      this.http.post<MintOutcome>(`${this.base}/pending/mint`, {}, this.authorised())
    );
  }

  /**
   * The transaction that writes one certificate, for a wallet to sign.
   *
   * Assembled by the api, because what a certificate says is decided in one
   * place. Nothing here builds metadata or encodes a call.
   */
  public signable(
    tokenId: number,
    to: string
  ): Promise<{ to: string; data: string; chainId: number; tokenId: number }> {
    return firstValueFrom(
      this.http.get<{ to: string; data: string; chainId: number; tokenId: number }>(
        `${this.base}/pending/${tokenId}/transaction`,
        { params: { to }, ...this.authorised() }
      )
    );
  }

  /** Asks the api to check the chain, and to take it off the list if it is there. */
  public confirmWritten(tokenId: number): Promise<{ written: boolean }> {
    return firstValueFrom(
      this.http.post<{ written: boolean }>(
        `${this.base}/pending/${tokenId}/written`,
        {},
        this.authorised()
      )
    );
  }

  /** Takes one off the list. It was never on the chain, so nothing is lost. */
  public discard(tokenId: number): Promise<unknown> {
    return firstValueFrom(this.http.delete(`${this.base}/pending/${tokenId}`, this.authorised()));
  }
}
