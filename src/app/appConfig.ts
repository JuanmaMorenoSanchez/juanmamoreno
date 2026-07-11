import {
  ApplicationConfig,
  provideZonelessChangeDetection,
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
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ARTWORK_PORT } from '@domain/artwork/artwork.token';
import { ArtworkInfraService } from '@features/artwork/artwork.service';
import { provideTranslateService } from '@ngx-translate/core';
import { ALLOWED_LANGUAGES } from '@shared/constants/languages.constants';
import { routes } from './app-routing.module';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withPreloading(PreloadAllModules)),
    // ngx-translate v18 dropped TranslateModule.forRoot in favour of this
    // provider. English is the fallback; the active language is selected in
    // AppComponent once the JSON dictionaries have been registered.
    provideTranslateService({ fallbackLang: ALLOWED_LANGUAGES.ENGLISH }),
    {
      provide: ARTWORK_PORT,
      useClass: ArtworkInfraService, // ArtworkInfraService is the implementation for the ArtworkPort. Decopupled. We call the abstraction, not the implementation.
    },
    provideZonelessChangeDetection(),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimationsAsync(),
  ],
};
