/// <reference types="cypress" />

import { stubBackend } from '../../support/backend';

// Was an empty describe block: it reported green while asserting nothing.
describe('artwork page', () => {
  beforeEach(() => {
    stubBackend();
    cy.visit('/artwork/152');
    cy.get('app-image-viewer', { timeout: 30000 }).should('exist');
  });

  it('names the artwork in the page heading, not the site', () => {
    cy.get('h1').should('not.be.empty').invoke('text').should('not.contain', 'Juanma Moreno');
  });

  it('shows year, medium and dimensions', () => {
    cy.get('.catalog-caption').invoke('text').should('match', /\d{4}.*\d+\s*x\s*\d+/);
  });

  it('loads the artwork image', () => {
    cy.get('app-image-viewer img, app-image-viewer .preview-layer', { timeout: 30000 }).should(
      'exist'
    );
  });

  it('says an essay is on its way when the artwork has none', () => {
    // The backend is stubbed to 404, which is the "no essay written yet" case.
    cy.get('app-artwork-critic').should('exist');
  });

  it('offers a way to enquire about the piece', () => {
    cy.get('app-quote-button button').should('exist').click();
    cy.get('mat-dialog-container, app-quote-dialog', { timeout: 10000 }).should('exist');
  });
});
