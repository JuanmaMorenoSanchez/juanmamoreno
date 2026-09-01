import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  TitleStrategy,
  withPreloading,
  withViewTransitions,
} from '@angular/router';

import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { provideClientHydration, withHttpTransferCacheOptions } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ARTWORK_PORT } from '@domain/artwork/artwork.token';
import { ArtworkInfraService } from '@features/artwork/artwork.service';
import { provideTranslateService } from '@ngx-translate/core';
import { ALLOWED_LANGUAGES } from '@shared/constants/languages.constants';
import { SeoTitleStrategy } from '@shared/services/seo-title.strategy';
import { routes } from './app-routing.module';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withViewTransitions({ skipInitialTransition: true })
    ),
    // ngx-translate v18 dropped TranslateModule.forRoot in favour of this
    // provider. English is the fallback; the active language is selected in
    // AppComponent once the JSON dictionaries have been registered.
    provideTranslateService({ fallbackLang: ALLOWED_LANGUAGES.ENGLISH }),
    {
      provide: ARTWORK_PORT,
      useClass: ArtworkInfraService, // ArtworkInfraService is the implementation for the ArtworkPort. Decopupled. We call the abstraction, not the implementation.
    },
    provideZonelessChangeDetection(),
    // Without hydration Angular discards the prerendered markup and rebuilds
    // every page from nothing, which the reader sees as a blank between two
    // renders. Responses the build fetched travel with the page, except:
    //   nfts-snapshot   430kB of catalogue on every page, already in localStorage
    //   nft-thumbnails  already inlined in the markup as a data uri
    //   critics         the build asks with ?generate=false, the browser without
    //                   it, so the entry can never match
    //   version         must report the backend answering now, not the one that
    //                   answered while the site was building
    provideClientHydration(
      withHttpTransferCacheOptions({
        filter: ({ url }) =>
          //   posts           what has lately been posted changes daily, and the
          //                   build's answer is as old as the build
          !['nfts-snapshot', 'nft-thumbnails', 'critics', 'posts/'].some((path) =>
            url.includes(path)
          ) && !url.endsWith('/version'),
      })
    ),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    provideAnimationsAsync(),
    { provide: TitleStrategy, useExisting: SeoTitleStrategy },
  ],
};
