import {
  ApplicationConfig,
  importProvidersFrom,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withPreloading,
} from '@angular/router';

import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ARTWORK_PORT } from '@domain/artwork/artwork.token';
import { ArtworkInfraService } from '@features/artwork/artwork.service';
import { TranslateModule } from '@ngx-translate/core';
import { ALLOWED_LANGUAGES } from '@shared/constants/languages.constants';
import { routes } from './app-routing.module';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withPreloading(PreloadAllModules)),
    importProvidersFrom(
      BrowserModule,
      TranslateModule.forRoot({
        defaultLanguage: (() => {
          const browserLang =
            window.navigator.language ||
            window.navigator.languages[0] ||
            ALLOWED_LANGUAGES.ENGLISH;
          return Object.values(ALLOWED_LANGUAGES).includes(
            browserLang as ALLOWED_LANGUAGES
          )
            ? (browserLang as ALLOWED_LANGUAGES)
            : ALLOWED_LANGUAGES.ENGLISH;
        })(),
      })
    ),
    {
      provide: ARTWORK_PORT,
      useClass: ArtworkInfraService, // ArtworkInfraService is the implementation for the ArtworkPort. Decopupled. We call the abstraction, not the implementation.
    },
    provideExperimentalZonelessChangeDetection(),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimationsAsync(),
    provideAnimations(),
  ],
};
