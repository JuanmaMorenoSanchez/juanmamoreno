import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { serverConfig } from './app/app.config.server';

// Prerender entry point: no persistState / akita devtools here, unlike main.ts.
// Those touch localStorage, which does not exist in the build-time renderer.
const bootstrap = (context: BootstrapContext) =>
  bootstrapApplication(AppComponent, serverConfig, context);

export default bootstrap;
