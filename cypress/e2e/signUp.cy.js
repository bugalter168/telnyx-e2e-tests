const SignUpPage = require('../pages/SignUpPage');

describe('Auth — Sign Up Flow', () => {
  const signUpPage = new SignUpPage();
  let authData;

  before(() => {
    cy.fixture('auth').then((data) => { authData = data; });
  });

  beforeEach(() => {
    signUpPage.visit();
    cy.get('form', { timeout: 10000 }).should('be.visible');
  });

  // ---------------------------------------------------------------------------

  it('TC-01 — successfully registers a new Business user', () => {
    cy.intercept('**/challenges.cloudflare.com/**', { statusCode: 200, body: '' });
    cy.intercept('POST', '**/api/**', { statusCode: 200, body: { success: true } }).as('signUpRequest');

    signUpPage
      .selectTab('Business')
      .fillForm(authData.validUser)
      .checkTerms()
      .submit();

    cy.wait('@signUpRequest').then((interception) => {
      const body = interception.request.body;
      const bodyStr = typeof body === 'string' ? body : JSON.stringify(body);
      expect(bodyStr).to.include(authData.validUser.email);
    });

    cy.url({ timeout: 15000 }).should('match', /verify|portal\.telnyx\.com|dashboard|sign-up/);
  });

  // ---------------------------------------------------------------------------

  it('TC-03 — blocks form submission with invalid email format', () => {
    signUpPage
      .selectTab('Business')
      .fillForm(authData.invalidEmail)
      .checkTerms()
      .submit();

    cy.url().should('include', '/sign-up');
    signUpPage.emailInput.then(($input) => {
      expect($input[0].validity.valid).to.be.false;
      expect($input[0].validity.typeMismatch).to.be.true;
    });
  });

  // ---------------------------------------------------------------------------

  it('TC-04 — blocks form submission with short password and shows error', () => {
    signUpPage
      .selectTab('Business')
      .fillForm(authData.weakPassword)
      .checkTerms()
      .submit();

    cy.url().should('include', '/sign-up');
    cy.get('#sign-up-password_message')
      .scrollIntoView()
      .should('be.visible')
      .and('contain.text', 'Password must be at least 12 characters');
  });
});