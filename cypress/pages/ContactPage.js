class ContactPage {
  visit() {
    cy.visit('/contact-us');
    return this;
  }

  // ── Locators ──────────────────────────────────────────────────────────────

  get form() {
    return cy.get('form#mktoForm_1987', { timeout: 10000 });
  }

  get reasonSelect() {
    return cy.get('#Reason_for_Contact__c');
  }

  get firstNameInput() {
    return cy.get('#FirstName');
  }

  get lastNameInput() {
    return cy.get('#LastName');
  }

  get emailInput() {
    return cy.get('#Email');
  }

  get phoneExtSelect() {
    return cy.get('#Phone_Number_Extension__c');
  }

  get phoneInput() {
    return cy.get('#Phone_Number_Base__c');
  }

  get websiteInput() {
    return cy.get('#Website');
  }

  get sourceInput() {
    return cy.get('#How_did_you_hear_about_Telnyx_Open__c');
  }

  get submitButton() {
    return cy.get('form#mktoForm_1987 button.mktoButton');
  }

  get errorMessages() {
    return cy.get('.mktoError');
  }

  // ── Actions ───────────────────────────────────────────────────────────────

  fillForm({ firstName, lastName, email, phone, website, source, message }) {
    this.reasonSelect.select('Sales Inquiry');
    this.firstNameInput.type(firstName);
    this.lastNameInput.type(lastName);
    this.emailInput.type(email);
    this.phoneExtSelect.select('United States (+1)');
    this.phoneInput.type(phone);
    this.websiteInput.type(website);
    cy.get('#Form_Product__c').select('Voice');
    cy.get('#Use_Case_Form__c').select('Other');
    cy.get('#Form_Budget__c').select('Less than $1000');
    cy.get('#Form_Additional_Information__c').type(message);
    this.sourceInput.type(source);
    return this;
  }

  submit() {
    this.submitButton.scrollIntoView().click();
    return this;
  }
}

module.exports = ContactPage;