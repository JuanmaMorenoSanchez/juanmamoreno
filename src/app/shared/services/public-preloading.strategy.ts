import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';

/**
 * Fetch the pages a reader can reach ahead of time; leave the studio's alone.
 *
 * The router was set to `PreloadAllModules`, which does what it says: after
 * every page settles it downloads the code for every other route. Measured on
 * /about — a page of prose with no picture on it — that is 2053kB of
 * javascript, of which about half is the atelier, the certificate tools, the
 * photograph editor and the pdf writer: eight guarded pages that belong to one
 * person and that nobody else can open at all.
 *
 * `noindex` is the marker rather than a list kept here: those routes already
 * say they are not for the public, and a list in this file would be a second
 * place to remember when a ninth is added.
 *
 * The artist pays a chunk download the first time he opens one of his own
 * pages. He is one person, signed in, on a laptop.
 */
@Injectable({ providedIn: 'root' })
export class PublicPreloading implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<unknown>): Observable<unknown> {
    return route.data?.['noindex'] ? EMPTY : load();
  }
}
