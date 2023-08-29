import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { persistState } from '@datorama/akita';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

const persistStorage = persistState();

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic([{ provide: 'persistStorage', useValue: persistStorage }]).bootstrapModule(AppModule)
  .catch(err => console.error(err));
