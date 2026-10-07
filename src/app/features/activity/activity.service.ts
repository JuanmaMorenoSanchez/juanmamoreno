import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { ApiResponse } from '@shared/types/api-response.type';
import { catchError, map, Observable, of } from 'rxjs';

/**
 * What one job failed at: which, what kind, when.
 *
 * A kind and a time, never a message. A failed call to Meta or Google throws an
 * error whose message is the request url, and the url carries the token — so
 * nothing in this app writes a message down, and there is none to show.
 */
export interface JobFailure {
  name: string;
  ok: boolean;
  code?: string;
  at?: string;
}

/** Something the machine does, and when it last did it. */
export interface Heartbeat {
  what: string;
  at: string | null;
  count?: number;
  /** Where to go and look. */
  goTo?: string;
  /** What the last run failed at; absent once a run comes back clean. */
  errors?: JobFailure[];
  state: 'quiet' | 'late' | 'never';
}

/** One cron run. A line with no end never came back. */
export interface CronRun {
  id: string;
  startedAt: string;
  finishedAt?: string;
  jobs?: JobFailure[];
  failures?: number;
}

export interface Activity {
  runs: CronRun[];
  beats: Heartbeat[];
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

  /** What each painting has done, as the last cron read it. */
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
