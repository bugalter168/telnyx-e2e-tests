class SignUpPage {
  visit() {
    cy.visit('/sign-up');
    return this;
  }

  // ── Locators ──────────────────────────────────────────────────────────────

  get emailInput() {
    return cy.get('input[type="email"]').first();
  }

  get firstNameInput() {
    return cy.get('input[name="first_name"], input[placeholder*="First"]');
  }

  get lastNameInput() {
    return cy.get('input[name="last_name"], input[placeholder*="Last"]');
  }

  get passwordInput() {
    return cy.get('input[type="password"]').first();
  }

  get termsCheckbox() {
    return cy.get('#sign-up-terms');
  }

  get submitButton() {
    return cy.get('button[type="submit"]').first();
  }

  // ── Actions ───────────────────────────────────────────────────────────────

  selectTab(tabName) {
    cy.contains('[role="tab"]', tabName).click();
    return this;
  }

  fillForm({ email, firstName, lastName, password }) {
    this.emailInput.clear().type(email);
    this.firstNameInput.clear().type(firstName);
    this.lastNameInput.clear().type(lastName);
    this.passwordInput.clear().type(password);
    return this;
  }

  checkTerms() {
    this.termsCheckbox.check({ force: true });
    return this;
  }

  submit() {
    this.submitButton.click();
    return this;
  }
}

module.exports = SignUpPage;