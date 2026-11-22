import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { AdminAuthService } from '@shared/services/admin-auth.service';
import { tap } from 'rxjs';

/**
 * Turns the api refusing a wallet session into a door, instead of a wall.
 *
 * A wallet session carries its own proof and is checked in two places: here, by
 * its address and its age, and at the api, which is the only side that can
 * recover the signature. So a bearer with a wrong signature looks alive in the
 * browser and is dead everywhere it matters — and that is not hypothetical. One
 * sat in his phone for two days: he was told he was signed in, the door
 * forwarded him past itself on every visit because it believed that, and every
 * guarded request came back 403. The studio showed him empty pages and offered
 * him nothing to press.
 *
 * The api's refusal is the signature check arriving late, so it is treated as
 * one: the session goes, and he is taken to the door to sign again. Only the
 * api's own refusals count — a 403 from anywhere else says nothing about his
 * session — and only a wallet session is dropped, because a Google token
 * renews itself silently and throwing one away would discard a session that
 * was about to repair itself.
 */
export const forgetRefusedWallet: HttpInterceptorFn = (request, next) => {
  const auth = inject(AdminAuthService);
  const router = inject(Router);

  return next(request).pipe(
    tap({
      error: (failure: unknown) => {
        if (!(failure instanceof HttpErrorResponse) || failure.status !== 403) return;
        if (!request.url.startsWith(environment.backendUrl)) return;
        // Navigating only when something was actually dropped keeps a Google
        // session, and a reader who never signed in at all, where they are.
        if (auth.forgetRefusedWallet()) void router.navigateByUrl('/door');
      },
    })
  );
};
