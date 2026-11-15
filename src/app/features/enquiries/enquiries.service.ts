import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { ApiResponse } from '@shared/types/api-response.type';
import { catchError, firstValueFrom, map, Observable, of } from 'rxjs';

/**
 * One message somebody sent through the form.
 *
 * Every field of it was typed by a stranger, so everything the page does with
 * one is text in a text node. The api strips urls out of what it stores, which
 * is why a link in a message is not here to click.
 */
export interface Enquiry {
  id: string;
  name: string;
  email: string;
  message: string;
  /** Which half of the site it was sent from, where the form said. */
  lang?: string;
  /** The sender's own name, where the form asked for one separately. */
  greeting?: string;
  createdAt?: string;
}

/**
 * The messages, for the one person allowed to read them.
 *
 * They have been stored since the form existed — saved before either mail goes
 * out, so one the mailer dropped is still there. This is the only way to read
 * them that is not an inbox.
 */
@Injectable({ providedIn: 'root' })
export class EnquiriesService {
  private http = inject(HttpClient);

  private authorised(token: string) {
    return { headers: { Authorization: `Bearer ${token}` } };
  }

  /**
   * Undefined when the question could not be asked at all.
   *
   * An empty list and a failed request are different answers, and on a page
   * whose job is to show what arrived, "nothing has arrived" must not be what
   * a refused request looks like.
   */
  all(token: string): Observable<Enquiry[] | undefined> {
    return this.http
      .get<ApiResponse<{ messages: Enquiry[] }>>(
        `${environment.backendUrl}contact`,
        this.authorised(token)
      )
      .pipe(
        map((response) => response?.data?.messages ?? []),
        catchError(() => of(undefined))
      );
  }

  /** Throws one away for good. There is no undo and no bin. */
  async remove(token: string, id: string): Promise<void> {
    await firstValueFrom(
      this.http.delete<ApiResponse<string>>(
        `${environment.backendUrl}contact/${encodeURIComponent(id)}`,
        this.authorised(token)
      )
    );
  }
}
