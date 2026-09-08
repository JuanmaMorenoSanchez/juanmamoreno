import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { ApiResponse } from '@shared/types/api-response.type';
import { catchError, map, Observable, of } from 'rxjs';

/** What a reel is published with: either half, or neither. */
export interface ReelCaptionParts {
  sheet?: string;
  essay?: string;
}

/** One reel that has been made and not published. */
export interface PendingReel {
  tokenId: string;
  tokenIds: string[];
  name: string;
  /** Public url of the mp4 in the bucket: what plays on the page. */
  video: string;
  /** The caption it would go out with, as it read when the video was made. */
  caption: string;
  /**
   * The two halves the caption is made of.
   *
   * `essay` is the critic's markdown body rather than the flattened, trimmed
   * text the caption shows — which is what makes it something that can be saved
   * back over the essay instead of truncating it. `lang` says which language it
   * is, since only one of the two is his own writing.
   */
  sheet: string;
  essay: string;
  lang: string;
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
   * Publishes one, with both halves as they now read on the page.
   *
   * They are sent rather than assumed: both were drafted when the video was
   * made and he can rewrite either before it goes out, saved or not. The
   * backend joins them and trims the result, under the same rule the caption
   * was written with. Answers false rather than throwing.
   */
  publish(tokenId: string, parts: ReelCaptionParts, token: string): Observable<boolean> {
    return this.http
      .post<ApiResponse<unknown>>(
        `${environment.backendUrl}reels/${tokenId}/publish`,
        parts,
        this.authorised(token)
      )
      .pipe(
        map((response) => response?.success === true),
        catchError(() => of(false))
      );
  }

  /**
   * Saves the essay over the critic itself, everywhere it is read.
   *
   * The same route the artwork page uses, because it is the same act: this
   * replaces the stored essay in one language and has the other rewritten from
   * it. Publishing is separate and does not touch the critic — one changes the
   * work, the other announces it.
   */
  updateCritic(tokenId: string, lang: string, body: string, token: string): Observable<boolean> {
    return this.http
      .patch<ApiResponse<unknown>>(
        `${environment.backendUrl}critics/${tokenId}`,
        { lang, body },
        this.authorised(token)
      )
      .pipe(
        map((response) => response?.success === true),
        catchError(() => of(false))
      );
  }

  /**
   * Asks for the video to be made again, with whatever the render does now.
   *
   * Minutes, not seconds. Nothing waits on the answer: the page starts it and
   * then watches the list until the reel comes back with a new date, so a
   * closed tab or a dropped connection costs the reader nothing and the render
   * carries on regardless.
   */
  regenerate(tokenId: string, token: string): Observable<boolean> {
    return this.http
      .post<ApiResponse<unknown>>(
        `${environment.backendUrl}reels/${tokenId}/regenerate`,
        {},
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
