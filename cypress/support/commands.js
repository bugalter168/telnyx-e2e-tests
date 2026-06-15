/**
 * cy.login(email, password)
 *
 * Logs in via the Telnyx sign-in page and caches the session so subsequent
 * calls within the same spec reuse the authenticated state without re-visiting
 * the login page.
 *
 * Usage:
 *   beforeEach(() => { cy.login('user@example.com', 'Password1!'); });
 */
Cypress.Commands.add('login', (email, password) => {
  cy.session([email, password], () => {
    cy.visit('/sign-in');
    cy.get('input[type="email"]').type(email);
    cy.get('input[type="password"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.url({ timeout: 15000 }).should('not.include', '/sign-in');
  });
});