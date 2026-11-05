import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { akitaDevtools, enableAkitaProdMode, persistState } from '@datorama/akita';
import { environment } from '@environments/environment';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/appConfig';

/**
 * localStorage, for a browser that may refuse it.
 *
 * Every other write to storage in this app is wrapped in try/catch — the
 * language choice, the preferences, the brush, the admin token, the atelier
 * graph, the photograph sliders. This was the one that was not, and it is the
 * one that writes the whole catalogue, around 430 kB, on every update: Akita
 * calls `setItem` bare inside a store subscription. On iOS Safari with "Block
 * All Cookies", and in any browser that has filled its quota, that throws.
 *
 * The throw does not break the page — rxjs reports it as an unhandled error and
 * the catalogue still draws from memory — but it puts an error in the console
 * every time the catalogue changes, and nothing is ever cached. Swallowing it
 * here means such a reader simply fetches the catalogue again next time, which
 * is what a cache that cannot be written should do.
 */
const storageThatMayBeRefused = {
  getItem: (key: string): string | null => {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      // Not cached. The catalogue is fetched again on the next visit.
    }
  },
  clear: (): void => {
    try {
      window.localStorage.clear();
    } catch {
      // Nothing was stored, so there is nothing to clear.
    }
  },
};

persistState({
  storage: storageThatMayBeRefused,
  preStorageUpdate: (storeName, state) => {
    // Fallback artworks are stored without lastArtPiecesUpdate: keep them
    // in memory only, never in localStorage. Server data (which always has
    // the timestamp) is persisted and overwrites whatever was there.
    if (storeName === 'session' && !state.lastArtPiecesUpdate) {
      return { ...state, artPieces: [] };
    }
    return state;
  },
});

if (environment.production) {
  enableProdMode();
  enableAkitaProdMode();
} else {
  akitaDevtools();
}

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
