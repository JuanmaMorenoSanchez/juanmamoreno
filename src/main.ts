import { enableProdMode, importProvidersFrom } from '@angular/core';
import { akitaDevtools, enableAkitaProdMode, persistState } from '@datorama/akita';
import { environment } from '@environments/environment';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ALLOWED_LANGUAGES } from '@constants/languages.constans';

const storage = persistState();

if (environment.production) {
  enableProdMode();
  enableAkitaProdMode();
} else {
  akitaDevtools();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(AppRoutingModule, BrowserModule, TranslateModule.forRoot({
            defaultLanguage: (() => {
              const browserLang = window.navigator.language || window.navigator.languages[0] || ALLOWED_LANGUAGES.ENGLISH;
              return Object.values(ALLOWED_LANGUAGES).includes(browserLang as ALLOWED_LANGUAGES)
                ? (browserLang as ALLOWED_LANGUAGES)
                : ALLOWED_LANGUAGES.ENGLISH;
            })()
        })),
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimationsAsync(),
        provideAnimations()
    ]
}).catch(err => console.error(err));
