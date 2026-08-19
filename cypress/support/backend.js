/// <reference types="cypress" />

/**
 * Stubs for the backend calls an artwork page makes.
 *
 * The critics stub matters beyond speed: a GET for an artwork with no essay
 * makes the backend write one, which is a multi-minute reasoning-model run
 * that costs real money. A test suite that browses artwork pages against the
 * live API would commission essays every time it ran.
 */
export function stubBackend() {
  cy.intercept('GET', '**/critics/*', { statusCode: 404, body: { success: false, data: null } }).as(
    'critic'
  );
  cy.intercept('GET', '**/descriptions/*', {
    statusCode: 200,
    body: { success: true, data: { tokenId: '0', translated: [] } },
  }).as('descriptions');
  cy.intercept('GET', '**/vision/search/*', { statusCode: 200, body: { success: true, data: [] } });
  cy.intercept('GET', '**/nft-thumbnails/*', { statusCode: 404, body: {} });
}

/** Fails the test on any uncaught error or console error the page produced. */
export function failOnConsoleError() {
  cy.on('window:before:load', (win) => {
    cy.stub(win.console, 'error').callsFake((...args) => {
      // Blocked image/network stubs are expected noise in these tests.
      const text = args.join(' ');
      if (/Failed to load resource|net::ERR|404/.test(text)) return;
      throw new Error(`console.error during render: ${text}`);
    });
  });
}
