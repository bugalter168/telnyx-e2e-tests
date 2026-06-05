describe('Navigation — Pages & Menu', () => {

  beforeEach(() => {
    cy.viewport(1280, 800);
  });

  it('shows Global Coverage page with network coverage information', () => {
    cy.visit('/global-coverage');
    cy.url().should('include', '/global-coverage');
    cy.get('h1').should('be.visible').and('contain.text', 'Global coverage');
    cy.contains('[role="tab"]', 'Services').scrollIntoView().should('be.visible');
    cy.contains('[role="tab"]', 'Number types').scrollIntoView().should('be.visible');
    cy.contains('button', 'Search country').scrollIntoView().should('be.visible');
    cy.contains('button', 'Albania').should('exist');
  });

  it('navigates from homepage via Solutions > Healthcare to the Healthcare page', () => {
    cy.visit('/');
    cy.get('#site-header').should('be.visible');

    cy.get('#site-header button[data-state]')
      .filter(':contains("Solutions")')
      .should('be.visible')
      .click();

    cy.get('#site-header button[data-state]')
      .filter(':contains("Solutions")')
      .should('have.attr', 'data-state', 'open');

    cy.get('#site-header div[data-state="open"] a[href*="/solutions/healthcare"]')
      .filter(':visible')
      .click();

    cy.url().should('include', '/solutions/healthcare');
    cy.get('h1').should('contain.text', 'healthcare');

    cy.contains('a', 'Schedule a demo').scrollIntoView().click();

    cy.url().should('include', '/contact-us');
    cy.get('h1, h2').should('be.visible');
  });

  it('navigates from homepage via Products menu to the Voice AI Agents page', () => {
    cy.visit('/');
    cy.get('#site-header').should('be.visible');

    cy.get('#site-header button[data-state]')
      .filter(':contains("Products")')
      .should('be.visible')
      .click();

    cy.get('#site-header button[data-state]')
      .filter(':contains("Products")')
      .should('have.attr', 'data-state', 'open');

    cy.get('#site-header div[data-state="open"] a[href*="/products/voice-ai"]')
      .filter(':visible')
      .click();

    cy.url().should('include', '/products/voice-ai-agents');
    cy.get('h1').should('contain.text', 'Voice AI');

    cy.contains('a', 'Start building for free').should('be.visible').click();
    cy.url().should('match', /\/(sign-up|contact-us)/);
    cy.get('h1, h2').should('be.visible');
  });

  it('navigates to Resources, opens a blog article, and verifies article content', () => {
    cy.visit('/');
    cy.get('#site-header').should('be.visible');

    cy.get('#site-header button[data-state]')
      .filter(':contains("Resources")')
      .should('be.visible')
      .click();

    cy.get('#site-header button[data-state]')
      .filter(':contains("Resources")')
      .should('have.attr', 'data-state', 'open');

    cy.get('#site-header div[data-state="open"] a[href="/resources"]')
      .filter(':visible')
      .first()
      .click();

    cy.url().should('include', '/resources');
    cy.get('h1').should('be.visible');

    cy.get('a[href*="/resources/"]', { timeout: 10000 } ).filter(':visible').first().click();
    cy.url().should('match', /\/resources\/.+/);

    cy.get('h1').should('be.visible').invoke('text').should('have.length.greaterThan', 0);
    cy.get('p').should('have.length.greaterThan', 0);

    cy.get('a[href="/resources"]', { timeout: 10000 })
      .filter(':contains("Back to blog")')
      .should('be.visible')
      .click();

    cy.url().should('include', '/resources');
    cy.get('h1').should('be.visible');
  });
});