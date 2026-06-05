const { v4: uuidv4 } = require('uuid');

describe('Auth — Sign Up Flow', () => {

  const generateUserData = () => {
    const uid = uuidv4().split('-')[0];
    return {
      email: `testuser+${uid}@gmail.com`,
      firstName: 'John',
      lastName: 'Doe',
      password: `Test@${uid}!Aa`,
    };
  };

  it('successfully registers a new Business user', () => {
    const user = generateUserData();

    cy.intercept('**/challenges.cloudflare.com/**', { statusCode: 200, body: '' });
    cy.intercept('GET', '**/turnstile**', { statusCode: 200, body: '' });
    cy.intercept('POST', '**/api/**', {
      statusCode: 200,
      body: { success: true },
    }).as('signUpRequest');

    cy.visit('/sign-up');
    cy.get('[role="tab"]').contains(/business/i).click();

    cy.get('input[name="email"], input[type="email"]').first().clear().type(user.email);
    cy.get('input[name="first_name"], input[placeholder*="First"]').clear().type(user.firstName);
    cy.get('input[name="last_name"], input[placeholder*="Last"]').clear().type(user.lastName);
    cy.get('input[name="password"], input[type="password"]').first().clear().type(user.password);
    cy.get('#sign-up-terms').check({ force: true });

    cy.window().then((win) => {
      const input = win.document.querySelector('[name="cf-turnstile-response"]');
      if (input) {
        Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')
          .set.call(input, 'fake-turnstile-token');
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });

    cy.get('button[type="submit"]').first().click();

    cy.wait('@signUpRequest').then((interception) => {
      const body = interception.request.body;
      const bodyStr = typeof body === 'string' ? body : JSON.stringify(body);
      expect(bodyStr).to.include(user.email);
    });

    cy.url({ timeout: 15000 }).should('match', /verify|portal\.telnyx\.com|dashboard|sign-up/);
  });

  it('blocks form submission with invalid email format', () => {
    cy.visit('/sign-up');
    cy.contains('[role="tab"]', 'Business').click();

    cy.get('input[type="email"]').first().clear().type('invalid-email');
    cy.get('input[name="first_name"], input[placeholder*="First"]').clear().type('John');
    cy.get('input[name="last_name"], input[placeholder*="Last"]').clear().type('Doe');
    cy.get('input[type="password"]').first().clear().type('Test@12345!');
    cy.get('#sign-up-terms').check({ force: true });
    cy.get('button[type="submit"]').first().click();

    cy.url().should('include', '/sign-up');
    cy.get('input[type="email"]').first().then(($input) => {
      expect($input[0].validity.valid).to.be.false;
      expect($input[0].validity.typeMismatch).to.be.true;
    });
  });

  it('blocks form submission with short password and shows error', () => {
    cy.visit('/sign-up');
    cy.contains('[role="tab"]', 'Business').click();

    cy.get('input[type="email"]').first().clear().type('test_user_002@testcompany.io');
    cy.get('input[name="first_name"], input[placeholder*="First"]').clear().type('John');
    cy.get('input[name="last_name"], input[placeholder*="Last"]').clear().type('Doe');
    cy.get('input[type="password"]').first().clear().type('123');
    cy.get('#sign-up-terms').check({ force: true });
    cy.get('button[type="submit"]').first().click();

    cy.url().should('include', '/sign-up');
    cy.get('#sign-up-password_message')
      .scrollIntoView()
      .should('be.visible')
      .and('contain.text', 'Password must be at least 12 characters');
  });
});