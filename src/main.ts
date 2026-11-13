import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { akitaDevtools, enableAkitaProdMode, persistState } from '@datorama/akita';
import { environment } from '@environments/environment';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/appConfig';
import { storageThatMayBeRefused } from './app/shared/store/persisted-storage';

persistState({
  storage: storageThatMayBeRefused,
  preStorageUpdate: (storeName, state) => {
    if (storeName !== 'session') return state;

    // Fallback artworks are stored without lastArtPiecesUpdate: keep them
    // in memory only, never in localStorage. Server data (which always has
    // the timestamp) is persisted and overwrites whatever was there.
    const artPieces = state.lastArtPiecesUpdate ? state.artPieces : [];

    /**
     * The thumbnails stay in memory for the session and never go to disk.
     *
     * They are base64 jpegs, measured at 14 KB each, appended one per painting
     * looked at and never pruned — so browsing the catalogue put better than
     * two megabytes of pictures into a store with about five. Worse than the
     * size: this whole state is serialised and written on *every* update, so
     * each new thumbnail rewrote every thumbnail before it, synchronously, on
     * the main thread.
     *
     * Nothing is lost by leaving them out. `GET /nft-thumbnails/:tokenId` is
     * served with a day's cache-control as of the api's 3.14.4, so a second
     * visit is answered by the browser's own cache — which is where a picture
     * belongs, and which does not cost the catalogue its place on disk.
     */
    return { ...state, artPieces, imageCache: [] };
  },
});

if (environment.production) {
  enableProdMode();
  enableAkitaProdMode();
} else {
  akitaDevtools();
}

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
