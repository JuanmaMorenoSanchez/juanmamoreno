import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { environment } from '@environments/environment';
import { ApiResponse } from '@shared/types/api-response.type';
import { catchError, map, of } from 'rxjs';

/**
 * Which build of the backend is answering.
 *
 * Asked for once and shown next to the site's own version, so the page says
 * whether the two halves match. Empty when the backend cannot be reached,
 * which is a fair thing for the page to say: it prints its own version and
 * stays quiet about the other one.
 */
@Injectable({ providedIn: 'root' })
export class VersionService {
  private http = inject(HttpClient);

  readonly apiVersion = toSignal(
    this.http.get<ApiResponse<{ version: string }>>(`${environment.backendUrl}version`).pipe(
      map((response) => response.data?.version ?? ''),
      catchError(() => of(''))
    ),
    { initialValue: '' }
  );
}
