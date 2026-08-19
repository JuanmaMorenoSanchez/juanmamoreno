/// <reference types="cypress" />

// Regression test: on a first visit (empty storage) the bundled fallback
// artworks must render immediately, without waiting for the slow API.
// Run against a local dev server, e.g.:
//   npm start   then   npm run test:e2e
describe('first load with empty storage', () => {
  it('renders fallback artworks while the nfts-snapshot call is still pending', () => {
    cy.intercept('GET', '**/nfts-snapshot', (req) => {
      req.on('response', (res) => {
        res.setDelay(8000); // simulate the slow backend
      });
    }).as('getPaintings');

    cy.visit('/');

    // Must be visible well before the 8s API response arrives
    cy.get('.mat-grid-list .mat-grid-tile', { timeout: 4000 }).should(
      'have.length.greaterThan',
      50
    );
  });
});
