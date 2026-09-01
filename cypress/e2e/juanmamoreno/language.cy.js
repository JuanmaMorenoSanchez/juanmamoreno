/// <reference types="cypress" />

import { stubBackend } from '../../support/backend';

// The language is part of the address: /about and /es/about are two pages.
// Every assertion here corresponds to a bug that reached the deployed site.
describe('language', () => {
  beforeEach(stubBackend);

  it('serves the Spanish home page', () => {
    cy.visit('/es');
    cy.contains('Pinturas').should('be.visible');
    cy.contains('404').should('not.exist');
  });

  // The switcher built "/es/" from the home page, which the router reads as the
  // segments ["es", ""], matches to nothing, and answers with the 404 page.
  it('switches to Spanish from the home page without hitting the 404', () => {
    cy.visit('/');
    cy.contains('Paintings').should('be.visible');

    cy.get('button[aria-label="Language switcher"]').first().click();

    cy.location('pathname').should('eq', '/es');
    cy.contains('Pinturas').should('be.visible');
    cy.contains('404').should('not.exist');
  });

  it('switches back to English and stays there on a reload', () => {
    cy.visit('/es');
    cy.get('button[aria-label="Language switcher"]').first().click();
    cy.location('pathname').should('eq', '/');

    // The stored choice has to beat the browser's own language, or a Spanish
    // browser is sent back to /es the moment the page reloads.
    cy.reload();
    cy.contains('Paintings').should('be.visible');
  });

  // Menu links were absolute, so About, CV and Contact threw a Spanish reader
  // back into English halfway through the site.
  ['Statement', 'Contacto'].forEach((label) => {
    it(`keeps the reader in Spanish when following "${label}"`, () => {
      cy.visit('/es/artworks');
      cy.get('app-top-menu').contains('button', label).click();
      cy.location('pathname').should('match', /^\/es\//);
    });
  });

  it('links artworks within the Spanish tree', () => {
    cy.visit('/es/artworks');
    cy.get('mat-grid-tile a.tile-link', { timeout: 30000 })
      .first()
      .should('have.attr', 'href')
      .and('match', /^\/es\/artwork\/\d+$/);
  });

  it('serves the Spanish Texts page', () => {
    cy.visit('/es/texts');
    cy.contains('Textos').should('be.visible');
    cy.contains('Marisol Salanova').should('exist');
    cy.get('app-root').should('not.contain.text', '[object Object]');
  });
});
