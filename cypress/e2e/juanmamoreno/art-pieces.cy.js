/// <reference types="cypress" />

import { stubBackend } from '../../support/backend';

// Was pointed at https://juanmamoreno.com, so it tested whatever happened to be
// deployed rather than the working copy, and passed or failed for reasons
// nothing to do with the change being made. It now runs against baseUrl like
// every other spec.
describe('art pieces list', () => {
  beforeEach(() => {
    stubBackend();
    cy.intercept('GET', '**/nfts-snapshot').as('getPaintings');
    cy.visit('/artworks');
    cy.wait('@getPaintings', { timeout: 60000 });
  });

  it('displays a tile for every artwork', () => {
    // 138 at the time of writing, and the catalogue only grows.
    cy.get('mat-grid-tile').should('have.length.greaterThan', 137);
  });

  // Previously asserted a base64 data uri. The tiles now start from the
  // artwork's own thumbnail url so a picture is in the very first paint,
  // including in the prerendered html, and the progressive race upgrades it
  // afterwards. Either a remote url or a data uri is a correctly loading tile.
  it('renders a real image in each tile', () => {
    cy.get('img.front-image')
      .first()
      .should('have.attr', 'src')
      .and('match', /^(https?:\/\/|data:image\/)/);
  });

  it('sorts by year, size and medium', () => {
    cy.get('mat-chip-set mat-chip').should('have.length.greaterThan', 2);
    cy.get('mat-chip-set mat-chip').eq(1).click();
    cy.get('mat-grid-tile').should('have.length.greaterThan', 137);
  });

  it('is reachable by keyboard', () => {
    // The tiles are anchors now, so they take focus without any tabindex work.
    cy.get('mat-grid-tile a.tile-link').first().focus().should('have.focus');
  });
});
