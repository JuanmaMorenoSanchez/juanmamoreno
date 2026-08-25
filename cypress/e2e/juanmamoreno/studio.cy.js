/// <reference types="cypress" />

import { stubBackend } from '../../support/backend';

// The studio opens for one address. Everything here is a way of not being it.
describe('the studio door', () => {
  const encode = (value) =>
    btoa(JSON.stringify(value)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

  const tokenFor = (claims) =>
    `${encode({ alg: 'RS256' })}.${encode({
      iss: 'https://accounts.google.com',
      aud: '',
      email_verified: true,
      exp: Math.floor(Date.now() / 1000) + 3600,
      ...claims,
    })}.signature`;

  const visitWithToken = (token, path = '/studio') =>
    cy.visit(path, {
      onBeforeLoad: (win) => win.localStorage.setItem('juanmamoreno.adminToken', token),
    });

  beforeEach(stubBackend);

  it('sends a signed-out visitor to the door', () => {
    cy.visit('/studio');
    cy.location('pathname', { timeout: 20000 }).should('eq', '/door');
    cy.contains('Door').should('be.visible');
  });

  it('refuses a token for any other account', () => {
    visitWithToken(tokenFor({ email: 'someone.else@gmail.com' }));
    cy.location('pathname', { timeout: 20000 }).should('eq', '/door');
  });

  it('refuses a token whose address Google has not verified', () => {
    visitWithToken(tokenFor({ email: 'morenosanchezjuanma@gmail.com', email_verified: false }));
    cy.location('pathname', { timeout: 20000 }).should('eq', '/door');
  });

  it('refuses an expired token for the right account', () => {
    visitWithToken(
      tokenFor({ email: 'morenosanchezjuanma@gmail.com', exp: Math.floor(Date.now() / 1000) - 10 })
    );
    cy.location('pathname', { timeout: 20000 }).should('eq', '/door');
  });

  it('refuses something that is not a token', () => {
    visitWithToken('not-a-token');
    cy.location('pathname', { timeout: 20000 }).should('eq', '/door');
  });

  // Neither page should ever turn up in a search result.
  ['/door', '/studio'].forEach((path) => {
    it(`keeps ${path} out of search results`, () => {
      cy.visit(path);
      cy.get('head meta[name="robots"]', { timeout: 20000 })
        .should('have.attr', 'content')
        .and('contain', 'noindex');
    });
  });
});
