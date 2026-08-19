/// <reference types="cypress" />

import { stubBackend } from '../../support/backend';

// Was a single empty it(): green, and testing nothing.
//
// The store is persisted so a return visit paints immediately. The nuance worth
// protecting is that the bundled fallback artworks are deliberately kept out of
// localStorage — they carry no lastArtPiecesUpdate, and writing them would make
// stale bundled data look like a fresh snapshot from the server.
describe('local storage', () => {
  beforeEach(stubBackend);

  const session = (win) => JSON.parse(win.localStorage.getItem('AkitaStores') ?? '{}').session ?? {};

  it('keeps the artworks snapshot for the next visit', () => {
    cy.intercept('GET', '**/nfts-snapshot').as('getPaintings');
    cy.visit('/artworks');
    cy.wait('@getPaintings', { timeout: 60000 });
    cy.get('mat-grid-tile', { timeout: 30000 }).should('have.length.greaterThan', 50);

    cy.window().should((win) => {
      const stored = session(win);
      expect(stored.artPieces, 'stored artworks').to.have.length.greaterThan(50);
      expect(stored.lastArtPiecesUpdate, 'timestamp marking the data as fresh').to.exist;
    });
  });

  it('serves the second visit from storage without waiting on the api', () => {
    cy.intercept('GET', '**/nfts-snapshot').as('getPaintings');
    cy.visit('/artworks');
    cy.wait('@getPaintings', { timeout: 60000 });
    cy.get('mat-grid-tile', { timeout: 30000 }).should('have.length.greaterThan', 50);

    // Second visit: the tiles must be up quickly, from what was stored.
    cy.reload();
    cy.get('mat-grid-tile', { timeout: 6000 }).should('have.length.greaterThan', 50);
  });

  it('never writes the bundled fallback artworks to storage', () => {
    // A snapshot that never answers: whatever renders comes from the fallback.
    cy.intercept('GET', '**/nfts-snapshot', (req) => {
      req.on('response', (res) => res.setDelay(30000));
    }).as('slowPaintings');

    cy.visit('/artworks');
    cy.get('mat-grid-tile', { timeout: 15000 }).should('have.length.greaterThan', 20);

    cy.window().should((win) => {
      const stored = session(win);
      // Either nothing was stored, or what was stored is real server data.
      if (stored.artPieces?.length) expect(stored.lastArtPiecesUpdate).to.exist;
    });
  });
});
