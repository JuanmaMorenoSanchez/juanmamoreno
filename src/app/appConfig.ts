import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideZonelessChangeDetection,
} from '@angular/core';
import {
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
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { ALLOWED_LANGUAGES } from '@shared/constants/languages.constants';
import { PublicPreloading } from '@shared/services/public-preloading.strategy';
import { SeoTitleStrategy } from '@shared/services/seo-title.strategy';
import translationsEN from '@translations/en.json';
import translationsES from '@translations/es.json';
import { routes } from './app-routing.module';

export const appConfig: ApplicationConfig = {
  providers: [
    // ngx-translate v18 dropped TranslateModule.forRoot in favour of this
    // provider. English is the fallback; which language a page is in is settled
    // by its route's guard.
    provideTranslateService({ fallbackLang: ALLOWED_LANGUAGES.ENGLISH }),
    // Both dictionaries, before anything can ask for a word.
    //
    // They were registered in the root component's constructor, which happens
    // to run before the first route is resolved — so the language guards found
    // them there by luck of ordering rather than by arrangement. Here they are
    // in place before the router starts, whatever that ordering is. Listed
    // before it on purpose: app initializers run in the order they are given.
    provideAppInitializer(() => {
      const translate = inject(TranslateService);
      translate.setTranslation(ALLOWED_LANGUAGES.ENGLISH, translationsEN);
      translate.setTranslation(ALLOWED_LANGUAGES.SPANISH, translationsES);
    }),
    provideRouter(
      routes,
      withPreloading(PublicPreloading),
      withViewTransitions({ skipInitialTransition: true })
    ),
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
          //   vision          the build never asks, so there is no answer worth
          //                   carrying — and an empty one carried across would
          //                   stop the browser asking at all
          !['nfts-snapshot', 'nft-thumbnails', 'critics', 'posts/', 'vision/'].some((path) =>
            url.includes(path)
          ) && !url.endsWith('/version'),
      })
    ),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    provideAnimationsAsync(),
    { provide: TitleStrategy, useExisting: SeoTitleStrategy },
  ],
};
