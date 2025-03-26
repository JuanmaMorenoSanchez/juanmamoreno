import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { akitaDevtools, enableAkitaProdMode, persistState } from '@datorama/akita';
import { ArtworkService } from '@domain/artwork/artwork.service';
import { environment } from '@environments/environment';
import { TranslateModule } from '@ngx-translate/core';
import { ALLOWED_LANGUAGES } from '@shared/constants/languages.constans';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from './app/app.component';

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
        provideAnimations(),
        ArtworkService // we need to provide domain dependencies so Angular can find them
    ]
}).catch(err => console.error(err));
