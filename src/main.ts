import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { akitaDevtools, enableAkitaProdMode, persistState } from '@datorama/akita';
import { environment } from '@environments/environment';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/appConfig';

const storage = persistState({
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

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
