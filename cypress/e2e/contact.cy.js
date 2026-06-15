const ContactPage = require('../pages/ContactPage');

describe('Contact — Contact Us Form', () => {
  const contactPage = new ContactPage();
  let contactData;

  before(() => {
    cy.fixture('contact').then((data) => { contactData = data; });
  });

  beforeEach(() => {
    contactPage.visit();
    cy.get('h1, h2').should('contain.text', 'Talk to an expert');
    contactPage.form.should('be.visible');
  });

  // ---------------------------------------------------------------------------

  it('TC-05 — successfully submits Contact Us form', () => {
    contactPage.fillForm(contactData.validContact).submit();

    cy.get('.mktoError:visible').should('not.exist');
  });

  // ---------------------------------------------------------------------------

  it('TC-06 — shows inline validation error for invalid email format', () => {
    contactPage.fillForm({
      ...contactData.validContact,
      email: contactData.invalidEmail.email,
    }).submit();

    cy.url().should('include', '/contact-us');
    contactPage.errorMessages.should('be.visible');
  });

  // ---------------------------------------------------------------------------

  it('TC-07 — shows required field errors when submitting empty form', () => {
    contactPage.submit();

    cy.url().should('include', '/contact-us');
    cy.contains('This field is required.').should('be.visible');
  });
});