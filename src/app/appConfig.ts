import { ApplicationConfig, importProvidersFrom, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TranslateModule } from '@ngx-translate/core';
import { ALLOWED_LANGUAGES } from '@shared/constants/languages.constants';
import { routes } from './app-routing.module';

export const appConfig: ApplicationConfig = {
        providers: [
            provideRouter(routes, withPreloading(PreloadAllModules)),
            importProvidersFrom(BrowserModule, TranslateModule.forRoot({
                defaultLanguage: (() => {
                const browserLang = window.navigator.language || window.navigator.languages[0] || ALLOWED_LANGUAGES.ENGLISH;
                return Object.values(ALLOWED_LANGUAGES).includes(browserLang as ALLOWED_LANGUAGES)
                    ? (browserLang as ALLOWED_LANGUAGES)
                    : ALLOWED_LANGUAGES.ENGLISH;
                })()
            })),
            provideExperimentalZonelessChangeDetection(),
            provideHttpClient(withInterceptorsFromDi()),
            provideAnimationsAsync(),
            provideAnimations(),
        ]
    };