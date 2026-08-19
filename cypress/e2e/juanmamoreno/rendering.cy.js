/// <reference types="cypress" />

import { stubBackend } from '../../support/backend';

// Does every page actually put its content on the screen?
//
// The prerendered html is checked separately by scripts/verify-render.mjs.
// This covers what that cannot: the app running in a browser, after hydration,
// with navigation and the language switcher working.
//
//   npm start          (dev server on 4201)
//   npm run test:e2e

const PAGES = [
  { path: '/', name: 'home', expect: ['Juanma Moreno'] },
  { path: '/artworks', name: 'artworks', expect: ['Sort by'] },
  { path: '/cv', name: 'cv', expect: ['Solo shows', 'Education'] },
  { path: '/about', name: 'statement', expect: ['Painting', 'Art'] },
  { path: '/contact', name: 'contact', expect: ['Contact'] },
  { path: '/texts', name: 'texts', expect: ['Texts', 'Marisol Salanova', 'ABC Cultural'] },
  { path: '/terms', name: 'terms', expect: ['Terms'] },
  { path: '/privacy', name: 'privacy', expect: ['Privacy'] },
];

describe('every page renders', () => {
  beforeEach(stubBackend);

  PAGES.forEach(({ path, name, expect: expected }) => {
    it(`${name} renders its content`, () => {
      cy.visit(path);
      cy.get('app-root', { timeout: 20000 }).should('be.visible');

      expected.forEach((text) => cy.contains(text, { timeout: 20000 }).should('exist'));

      // Faults that have really shipped here: an object where a string
      // belonged, and a translation key that never resolved.
      cy.get('app-root').should('not.contain.text', '[object Object]');
      cy.get('app-root')
        .invoke('text')
        .should((body) => {
          expect(body).to.not.match(/\b(seo|menu|textsPage|cv|statement|quote)\.[a-zA-Z]+/);
        });

      // A page of chrome and nothing else is what /artworks looked like when
      // its data never arrived.
      cy.get('app-root').invoke('text').its('length').should('be.greaterThan', 120);
    });
  });

  it('the 404 page answers for an address that does not exist', () => {
    cy.visit('/this-route-does-not-exist', { failOnStatusCode: false });
    cy.contains('404').should('be.visible');
  });
});

describe('the artwork grid', () => {
  beforeEach(stubBackend);

  it('renders tiles, each with an image', () => {
    cy.visit('/artworks');
    cy.get('mat-grid-tile', { timeout: 30000 }).should('have.length.greaterThan', 50);
    cy.get('mat-grid-tile img.front-image').should('have.length.greaterThan', 10);
    cy.get('mat-grid-tile img.front-image')
      .first()
      .should('have.attr', 'src')
      .and('match', /^(https?:|data:image)/);
  });

  // The tiles were click handlers with no href, which left all 186 artwork
  // pages without a single inbound link for anything crawling the site.
  it('links to artworks with real anchors', () => {
    cy.visit('/artworks');
    cy.get('mat-grid-tile a.tile-link', { timeout: 30000 })
      .should('have.length.greaterThan', 50)
      .first()
      .should('have.attr', 'href')
      .and('match', /^\/artwork\/\d+$/);
  });

  it('opens an artwork from the grid', () => {
    cy.visit('/artworks');
    cy.get('mat-grid-tile a.tile-link', { timeout: 30000 }).first().click();
    cy.location('pathname').should('match', /^\/artwork\/\d+$/);
    cy.get('app-image-viewer', { timeout: 20000 }).should('exist');
  });
});

describe('the artwork page', () => {
  beforeEach(stubBackend);

  it('renders the viewer, the title and the technical details', () => {
    cy.visit('/artwork/152');
    cy.get('app-image-viewer', { timeout: 30000 }).should('exist');
    cy.get('h1', { timeout: 20000 }).should('not.be.empty');
    // Year, medium and dimensions live together in the caption.
    cy.get('.catalog-caption').invoke('text').should('match', /\d{4}.*\d+\s*x\s*\d+/);
  });

  it('offers the enquiry, download and links actions', () => {
    cy.visit('/artwork/152');
    cy.get('app-quote-button button', { timeout: 30000 }).should('exist');
    cy.get('app-download-button button').should('exist');
  });
});
