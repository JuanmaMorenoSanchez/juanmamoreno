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
    // The pages are prerendered, and without this Angular throws that markup
    // away on bootstrap and builds the page again from nothing — the reader
    // sees the page, then a blank, then the page. Hydration reuses the served
    // DOM instead.
    //
    // What the build fetched travels with the page, except for three things
    // that would only make the page heavier:
    //   nfts-snapshot  ~430kB of raw catalogue metadata, on every one of 386
    //                  pages, to spare a request the app already caches in
    //                  localStorage.
    //   nft-thumbnails the preview is already inlined in the markup as a data
    //                  uri; transferring it stores the same image twice.
    //   critics        the build asks with ?generate=false and the browser
    //                  without it, so the entry can never be matched — 26kB of
    //                  essay carried on every page and read by no one.
    //   version        the point of printing it is to say which backend is
    //                  answering now. Carried in the page it would instead say
    //                  which backend answered while the site was being built —
    //                  and since the two deploy in parallel, that is usually
    //                  the previous one.
    provideClientHydration(
      withHttpTransferCacheOptions({
        filter: ({ url }) =>
          !['nfts-snapshot', 'nft-thumbnails', 'critics'].some((path) => url.includes(path)) &&
          !url.endsWith('/version'),
      })
    ),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    provideAnimationsAsync(),
    { provide: TitleStrategy, useExisting: SeoTitleStrategy },
  ],
};
