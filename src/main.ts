import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { persistState } from '@datorama/akita';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { GALLERY_CONFIG, GalleryConfig } from 'ng-gallery';
// import { LIGHTBOX_CONFIG, LightboxConfig } from 'ng-gallery/lightbox';

const persistStorage = persistState();

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic([
  { 
    provide: 'persistStorage', 
    useValue: persistStorage
  },
  {
    provide: GALLERY_CONFIG,
    useValue: {
      autoHeight: true,
      imageSize: 'contain'
    } as GalleryConfig
  },
  // {
  //   provide: LIGHTBOX_CONFIG,
  //   useValue: {
  //     exitAnimationTime: 1000
  //   } as LightboxConfig
  // }
]).bootstrapModule(AppModule)
  .catch(err => console.error(err));
