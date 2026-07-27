import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { ApiResponse } from '@shared/types/api-response.type';
import { Observable } from 'rxjs';

export type QuoteMode = 'price' | 'info';

export interface QuoteRequest {
  email: string;
  /** The visitor's optional free text. */
  message: string;
  artworkName: string;
  tokenId: string;
  mode: QuoteMode;
}

/**
 * Sends visitor-authored messages to the artist's backend. One HTTP endpoint
 * (`contact`) backs every kind of message; the higher-level helpers compose the
 * `{ name, email, message }` shape it expects so callers don't have to.
 */
@Injectable({ providedIn: 'root' })
export class MailService {
  private http = inject(HttpClient);

  sendContactMessage(formData: {
    name: string;
    email: string;
    message: string;
  }): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(`${environment.backendUrl}contact`, formData);
  }

  /**
   * A price or availability enquiry about a specific artwork. It reuses the
   * contact endpoint: the artwork reference is folded into the name and body so
   * the enquiry arrives self-describing, without needing a dedicated backend
   * route. `info` mode is for sold pieces (where it is, how to see it, who to
   * buy it from); `price` mode is for available ones.
   */
  sendQuoteRequest({
    email,
    message,
    artworkName,
    tokenId,
    mode,
  }: QuoteRequest): Observable<ApiResponse<string>> {
    const label = mode === 'info' ? 'Availability enquiry' : 'Price request';
    const name = `${label}: ${artworkName} (#${tokenId})`;
    const extra = message.trim() ? message.trim() : '(no additional message)';
    const composed = `${label} for "${artworkName}" (id ${tokenId}).\n\n${extra}`;
    return this.sendContactMessage({ name, email, message: composed });
  }
}
