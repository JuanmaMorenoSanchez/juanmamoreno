import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { ApiResponse } from '@shared/types/api-response.type';
import { catchError, map, Observable, of } from 'rxjs';

/** One painting, as the Instagram account has lately shown it. */
export interface PostedArtwork {
  tokenId: string;
  name: string;
  /** ISO 8601, or empty for a record made before the stamp existed. */
  postedAt: string;
  /** Where the post can be seen, or null for posts made before this was kept. */
  permalink: string | null;
}

/**
 * What has been put on Instagram, read back.
 *
 * Instagram allows one clickable link on the whole account and none in a
 * caption, so a follower who has just seen a painting has no way to reach the
 * page about it. This is both halves of the answer: what the account has
 * lately shown, for the link in the profile to land on, and where a particular
 * painting can be seen, for its own page to point back at.
 *
 * Both answer with something empty rather than failing. Neither is what any
 * page is for — one is a list of paintings that are all in the catalogue
 * anyway, the other a link beside a painting that is already on screen — and
 * neither is worth an error where a reader can see it.
 */
@Injectable({ providedIn: 'root' })
export class PostedArtworksService {
  private http = inject(HttpClient);

  /**
   * Undefined when the question could not be asked, an empty list when the
   * answer was that nothing has been posted.
   *
   * The difference matters on the page: an empty list is worth a sentence
   * saying so, and a failed request is not — answering one with the other
   * would replace a page full of paintings with a claim that there are none.
   */
  getLatest(limit = 12): Observable<PostedArtwork[] | undefined> {
    return this.http
      .get<ApiResponse<PostedArtwork[]>>(`${environment.backendUrl}posts/latest?limit=${limit}`)
      .pipe(
        map((response) => response?.data ?? []),
        catchError(() => of(undefined))
      );
  }

  getInstagramPermalink(tokenId: string): Observable<string | null> {
    return this.http
      .get<ApiResponse<{ permalink: string | null }>>(
        `${environment.backendUrl}posts/instagram/${tokenId}`
      )
      .pipe(
        map((response) => response?.data?.permalink ?? null),
        catchError(() => of(null))
      );
  }
}
