import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { ApiResponse } from '@shared/types/api-response.type';
import { catchError, map, Observable, of } from 'rxjs';

/** Something the machine does, and when it last did it. */
export interface Heartbeat {
  what: string;
  at: string | null;
  count?: number;
  /** Where to go and look. */
  goTo?: string;
  state: 'quiet' | 'late' | 'never';
}

/** One night's work. A line with no end never came back. */
export interface CronRun {
  id: string;
  startedAt: string;
  finishedAt?: string;
  jobs?: { name: string; ok: boolean }[];
  failures?: number;
}

export interface Activity {
  runs: CronRun[];
  beats: Heartbeat[];
  spend: { spent: number; ceiling: number; left: number };
}

/** What one painting has done on Instagram. */
export interface PostInsight {
  tokenId: string;
  mediaId: string;
  permalink?: string;
  metrics: Record<string, number>;
  readAt: string;
}

/**
 * What the machine has been doing, as the page asks it.
 *
 * Read-only, and the whole of it is dates and counts: nothing here changes
 * anything or spends anything.
 */
@Injectable({ providedIn: 'root' })
export class ActivityApiService {
  private http = inject(HttpClient);

  private authorised(token: string) {
    return { headers: { Authorization: `Bearer ${token}` } };
  }

  /**
   * Undefined when the question could not be asked, which on a page whose whole
   * job is to say whether things are running is the one answer that must not
   * look like "everything is quiet".
   */
  latest(token: string): Observable<Activity | undefined> {
    return this.http
      .get<ApiResponse<Activity>>(`${environment.backendUrl}activity`, this.authorised(token))
      .pipe(
        map((response) => response?.data),
        catchError(() => of(undefined))
      );
  }

  /** What each painting has done, as the nightly work last read it. */
  insights(token: string): Observable<PostInsight[] | undefined> {
    return this.http
      .get<ApiResponse<PostInsight[]>>(
        `${environment.backendUrl}activity/insights`,
        this.authorised(token)
      )
      .pipe(
        map((response) => response?.data ?? []),
        catchError(() => of(undefined))
      );
  }
}
