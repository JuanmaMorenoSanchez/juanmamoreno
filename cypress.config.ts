import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    // The dev server runs on 4201 (see the start script), not Angular's
    // default. Pointed at 4200 the whole suite failed to connect.
    baseUrl: 'http://127.0.0.1:4201',
    // Only this site's specs. The rest of cypress/e2e is the scaffolding
    // Cypress ships with, which exercises example.cypress.io over the network.
    specPattern: 'cypress/e2e/juanmamoreno/**/*.cy.{js,ts}',
    video: false,
    setupNodeEvents() {
      // no node events needed yet
    },
  },
});
