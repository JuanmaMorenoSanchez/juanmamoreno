/// <reference types="cypress" />

describe('artwork page', () => {

    const testData = {
        name: 'Sample name',
        email: 'valid@email.com',
        message: 'Hello, this is an authomated test!'
    };

    beforeEach(() => {
        cy.intercept('GET', '**/nfts-snapshot', { body: [] }).as('getNfts');
        cy.visit('/contact');
        cy.wait('@getNfts');
    })
    
    it('should successfully submit the form when valid', () => {

        // cy.intercept('GET', '**/nfts-snapshot', { body: [] }).as('getNfts');
        // cy.visit('/your-page');
        // cy.wait('@getNfts');


        cy.intercept('POST', 'https://juanmamoreno-backend-164035848667.europe-southwest1.run.app/contact', {
          statusCode: 200,
          body: { message: 'Message sent successfully!' }
        }).as('sendMessage');

        cy.get('form').should('be.visible'); // wait until form is visible
    
        cy.get('input[formcontrolname="name"]').type(testData.name);
        cy.get('input[formcontrolname="email"]').type(testData.email);
        cy.get('textarea[formcontrolname="message"]').type(testData.message);
        cy.get('form').submit();
    
        // Wait for the intercepted call
        cy.wait('@sendMessage');
    
        // Verify snackbar message is shown
        cy.contains('Message sent successfully!').should('be.visible');
    
        // Check form is reset (e.g. name input should be empty)
        cy.get('input[formcontrolname="name"]').should('have.value', '');
    });
    
    it('should show an error snackbar if server fails', () => {
        cy.intercept('POST', 'https://juanmamoreno-backend-164035848667.europe-southwest1.run.app/contact', {
          statusCode: 500,
          body: { message: 'Server error occurred' }
        }).as('sendMessage');
    
        cy.get('input[formcontrolname="name"]').type(testData.name);
        cy.get('input[formcontrolname="email"]').type(testData.email);
        cy.get('textarea[formcontrolname="message"]').type(testData.message);
        cy.get('form').submit();
    
        // Wait for the intercepted call
        cy.wait('@sendMessage');
    
        // Verify error snackbar is shown
        cy.contains('Server error occurred').should('be.visible');
    
        // Ensure the form is re-enabled (try typing again)
        cy.get('input[formcontrolname="name"]').type('X').should('have.value', `${testData.name}X`);
    });
});