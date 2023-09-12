import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { persistState } from '@datorama/akita';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import Moralis from 'moralis';
import { MORALIS_CONFIG } from '@constants/moralis.constants';

const persistStorage = persistState();

if (environment.production) {
  enableProdMode();
}

Moralis.start(MORALIS_CONFIG).then(() => 
  console.log("MORALIS INICIA "));

platformBrowserDynamic([{ provide: 'persistStorage', useValue: persistStorage }]).bootstrapModule(AppModule)
  .catch(err => console.error(err));
