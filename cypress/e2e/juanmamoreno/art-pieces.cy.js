/// <reference types="cypress" />

describe('art pieces list', () => {
    beforeEach(() => {
        cy.intercept('GET', 'https://juanmamoreno-backend-164035848667.europe-southwest1.run.app/nfts-snapshot').as('getPaintings')
        cy.intercept('GET', 'https://juanmamoreno-backend-164035848667.europe-southwest1.run.app/nft-thumbnails/*').as('getNftThumbnail')
        cy.visit('https://juanmamoreno.com')
    })
  
    it('displays a list of painting containers by default', () => {
        cy.wait('@getPaintings')
        cy.get('.mat-grid-list .mat-grid-tile').should('have.length.greaterThan', 137) // 138 is the current length. This lenght can only increase over time
    })

    it('should render the thumbnail image with base64 src', () => {
        cy.get('img.mat-mdc-card-image.mdc-card__media.front-image')
          .should('have.attr', 'src')
          .and('match', /^data:image\/jpeg;base64,/);
    });

    it('content is accessible', () => {
    })

    it('keyboard navigation', () => {
    })

})



// COSAS A TESTAR:

// 1. Page Load and Navigation Tests:

// Home Page Accessibility: Verify that the home page loads correctly without errors.
// Navigation Functionality: Ensure that all navigation links (e.g., About, Services, Contact) direct users to the appropriate pages.
// Responsive Design: Test the website's responsiveness across various devices (desktop, tablet, mobile) to confirm proper layout adjustments.
// 2. User Authentication Tests:

// Login Process: Validate that users can log in with valid credentials and are redirected to their dashboard.
// Registration Workflow: Ensure new users can register successfully, including form validation and confirmation messages.
// Password Recovery: Test the password reset functionality to confirm users can recover their accounts.
// 3. Form Submission Tests:

// Contact Form: Check that the contact form submits data correctly and displays appropriate success or error messages.
// Newsletter Subscription: Verify that subscribing to the newsletter adds the user's email to the mailing list.
// 4. Content Display Tests:

// Dynamic Content Loading: Ensure that dynamic content (e.g., blog posts, product listings) loads as expected.
// Media Rendering: Confirm that images, videos, and other media elements display correctly across different browsers.
// 5. Interactive Element Tests:

// Button and Link Interactions: Test that buttons and links trigger the expected actions, such as opening modals or navigating to new pages.
// Form Field Validation: Ensure that form fields validate user input correctly, providing appropriate feedback for invalid entries.
// 6. Performance and Security Tests:

// Load Time Assessment: Measure page load times to identify and address performance bottlenecks.
// Security Check: Test for vulnerabilities such as SQL injection or cross-site scripting (XSS) by simulating malicious inputs.
// 7. Third-Party Integration Tests:

// Payment Gateway: Verify that payment processing integrates smoothly with external services, handling transactions securely.
// Social Media Sharing: Ensure that social media sharing buttons function correctly, including generating appropriate previews.
// 8. Accessibility Tests:

// Keyboard Navigation: Confirm that users can navigate the site using keyboard shortcuts alone.
// Screen Reader Compatibility: Test that screen readers can interpret and convey content accurately to users with visual impairments.