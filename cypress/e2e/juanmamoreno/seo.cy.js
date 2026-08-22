/// <reference types="cypress" />

import { stubBackend } from '../../support/backend';

// The build checks the prerendered html (scripts/verify-render.mjs). This
// checks the same guarantees hold in a running browser, where the head is
// rewritten on every navigation rather than written once.
describe('page metadata', () => {
  beforeEach(stubBackend);

  const head = (selector) => cy.get(`head ${selector}`, { includeShadowDom: false });

  it('gives each page its own canonical as you navigate', () => {
    cy.visit('/about');
    head('link[rel="canonical"]').should('have.attr', 'href', 'https://juanmamoreno.com/about/');

    cy.visit('/cv');
    head('link[rel="canonical"]').should('have.attr', 'href', 'https://juanmamoreno.com/cv/');
  });

  it('pairs every page with its translation', () => {
    cy.visit('/texts');
    head('link[hreflang="en"]').should('have.attr', 'href', 'https://juanmamoreno.com/texts/');
    head('link[hreflang="es"]').should('have.attr', 'href', 'https://juanmamoreno.com/es/texts/');
    head('link[hreflang="x-default"]').should('exist');
  });

  // Navigating used to leave the previous page's tags behind.
  it('leaves one canonical behind, not one per page visited', () => {
    cy.visit('/about');
    cy.visit('/cv');
    cy.visit('/contact');
    cy.get('head link[rel="canonical"]').should('have.length', 1);
    cy.get('head link[rel="alternate"][hreflang]').should('have.length', 3);
  });

  it('describes the artwork as structured data', () => {
    cy.visit('/artwork/152');
    cy.get('app-image-viewer', { timeout: 30000 }).should('exist');

    cy.get('head script[type="application/ld+json"]')
      .should('have.length.greaterThan', 1)
      .then((scripts) => {
        const types = [...scripts].map((s) => JSON.parse(s.textContent)['@type']);
        expect(types).to.include('VisualArtwork');
        expect(types).to.include('BreadcrumbList');
      });
  });

  // An artwork's markup following the reader onto the next page would describe
  // the wrong thing entirely.
  it('drops the artwork markup when leaving the artwork', () => {
    cy.visit('/artwork/152');
    cy.get('head #artwork-structured-data').should('exist');

    cy.visit('/cv');
    cy.get('head #artwork-structured-data').should('not.exist');
  });

  it('titles each page distinctly', () => {
    const titles = [];
    ['/about', '/cv', '/texts', '/artwork/152'].forEach((path) => {
      cy.visit(path);
      cy.title().then((title) => {
        expect(title, `title for ${path}`).to.not.equal('Juanma Moreno Sánchez, artist.');
        titles.push(title);
      });
    });
    cy.then(() => {
      expect(new Set(titles).size, 'every page has its own title').to.equal(titles.length);
    });
  });
});
