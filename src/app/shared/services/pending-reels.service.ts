import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { ApiResponse } from '@shared/types/api-response.type';
import { catchError, map, Observable, of } from 'rxjs';

/** One reel that has been made and not published. */
export interface PendingReel {
  tokenId: string;
  tokenIds: string[];
  name: string;
  /** Public url of the mp4 in the bucket: what plays on the page. */
  video: string;
  /** The caption it would go out with, as it read when the video was made. */
  caption: string;
  /** ISO 8601. */
  renderedAt: string;
}

/**
 * The reels waiting to be looked at, and the two things that can be done with
 * one.
 *
 * Every request carries the artist's token, because every one of these is a
 * decision only he can make. The backend would refuse them anyway; sending the
 * token is what makes them work rather than what makes them safe.
 */
@Injectable({ providedIn: 'root' })
export class PendingReelsService {
  private http = inject(HttpClient);

  private authorised(token: string) {
    return { headers: { Authorization: `Bearer ${token}` } };
  }

  /**
   * Undefined when the question could not be asked, an empty list when the
   * answer was that nothing is waiting.
   *
   * Worth telling apart here more than anywhere: "no reels are waiting" and
   * "the server did not answer" look identical on a page that has nothing on
   * it, and only one of them means everything is fine.
   */
  pending(token: string): Observable<PendingReel[] | undefined> {
    return this.http
      .get<ApiResponse<PendingReel[]>>(`${environment.backendUrl}reels/pending`, {
        ...this.authorised(token),
      })
      .pipe(
        map((response) => response?.data ?? []),
        catchError(() => of(undefined))
      );
  }

  /**
   * Publishes one, with the caption as it now reads on the page.
   *
   * The caption is sent rather than assumed: it was drafted when the video was
   * made and he can rewrite it before it goes out, so what is on screen is what
   * should be published. Answers false rather than throwing.
   */
  publish(tokenId: string, caption: string, token: string): Observable<boolean> {
    return this.http
      .post<ApiResponse<unknown>>(
        `${environment.backendUrl}reels/${tokenId}/publish`,
        { caption },
        this.authorised(token)
      )
      .pipe(
        map((response) => response?.success === true),
        catchError(() => of(false))
      );
  }

  /** Throws one away, video and all, so a new one is made for that painting. */
  discard(tokenId: string, token: string): Observable<boolean> {
    return this.http
      .delete<ApiResponse<unknown>>(`${environment.backendUrl}reels/${tokenId}`, {
        ...this.authorised(token),
      })
      .pipe(
        map((response) => response?.success === true),
        catchError(() => of(false))
      );
  }
}
