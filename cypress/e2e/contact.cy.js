describe('Contact — Contact Us Form', () => {

  it('successfully submits form with all valid fields', () => {
    cy.visit('/contact-us');
    cy.contains(/talk to an expert/i).should('be.visible');

    cy.get('#Reason_for_Contact__c').select('Sales Inquiry');
    cy.get('#FirstName').clear().type('John');
    cy.get('#LastName').clear().type('Doe');
    cy.get('#Email').clear().type('john.doe@testcompany.io');
    cy.get('#Phone_Number_Extension__c').select('United States (+1)');
    cy.get('#Phone_Number_Base__c').clear().type('5550001234');
    cy.get('#Website').clear().type('https://testcompany.io');
    cy.get('#Form_Product__c').select('Voice');
    cy.get('#Use_Case_Form__c').select('Other');
    cy.get('#Form_Budget__c').select('Less than $1000');
    cy.get('#Form_Additional_Information__c')
      .clear().type('Testing Telnyx services for business communication');
    cy.get('#How_did_you_hear_about_Telnyx_Open__c').clear().type('Google Search');
    cy.get('button[type="submit"]').scrollIntoView().click();

    cy.url({ timeout: 10000 }).should('include', '/thank-you');
    cy.contains(/thank you/i).should('be.visible');
  });

  it('shows inline validation error for invalid Business email format', () => {
    cy.visit('/contact-us');
    cy.get('h1, h2').should('contain.text', 'Talk to an expert');
    cy.get('form#mktoForm_1987', { timeout: 10000 }).should('be.visible');

    cy.get('#Reason_for_Contact__c').select('Sales-Inquiry');
    cy.get('#FirstName').type('John');
    cy.get('#LastName').type('Doe');
    cy.get('#Email').type('not-an-email');
    cy.get('#Phone_Number_Extension__c').select('United Kingdom (+44)');
    cy.get('#Phone_Number_Base__c').type('555 000 1234');
    cy.get('#Website').type('https://testcompany.io');
    cy.get('#How_did_you_hear_about_Telnyx_Open__c').type('Google');
    cy.get('form#mktoForm_1987 button.mktoButton').scrollIntoView().click();

    cy.url().should('include', '/contact-us');
    cy.get('.mktoError').should('be.visible');
  });

  it('shows required field errors when submitting empty form', () => {
    cy.visit('/contact-us');
    cy.get('h1, h2').should('contain.text', 'Talk to an expert');
    cy.get('form').should('be.visible');

    cy.get('form#mktoForm_1987 button.mktoButton').scrollIntoView().click();

    cy.url().should('include', '/contact-us');
    cy.contains('This field is required.').should('be.visible');
  });
});