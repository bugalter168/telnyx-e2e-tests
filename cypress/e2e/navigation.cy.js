const NavigationPage = require('../pages/NavigationPage');

describe('Navigation — Pages & Menu', () => {
  const navPage = new NavigationPage();

  beforeEach(() => {
    cy.viewport(1280, 800);
  });

  it('TC-08 — shows Global Coverage page with network coverage information', () => {
    navPage.visitGlobalCoverage();

    cy.url().should('include', '/global-coverage');
    cy.get('h1').should('be.visible').and('contain.text', 'Global coverage');
    cy.contains('[role="tab"]', 'Services').scrollIntoView().should('be.visible');
    cy.contains('[role="tab"]', 'Number types').scrollIntoView().should('be.visible');
    cy.contains('button', 'Search country').scrollIntoView().should('be.visible');
    cy.contains('button', 'Albania').should('exist');
  });

  it('TC-09 — navigates to Healthcare page via Solutions menu', () => {
    cy.visit('/');
    cy.get('#site-header button[data-state]')
      .filter(':contains("Solutions")')
      .should('be.visible')
      .click();
    cy.get('#site-header div[data-state="open"] a')
      .filter(':contains("Healthcare")')
      .filter(':visible').first().click();
    cy.url({ timeout: 10000 }).should('include', '/solutions/healthcare');
    cy.get('h1').should('be.visible');
  });

  it('TC-10 — navigates to Voice AI Agents page via Products menu', () => {
    cy.visit('/');
    cy.get('#site-header button[data-state]')
      .filter(':contains("Products")')
      .should('be.visible')
      .click();
    cy.get('#site-header div[data-state="open"] a')
      .filter(':contains("Voice")')
      .filter(':visible').first().click();
    cy.url({ timeout: 10000 }).should('match', /voice/i);
    cy.get('h1').should('be.visible');
  });

  it('TC-02 — navigates to Resources, opens a blog article, and verifies article content', () => {
    navPage.visitHome();
    navPage.siteHeader.should('be.visible');

    navPage.openResourcesMenu();
    navPage.resourcesMenuButton.should('have.attr', 'data-state', 'open');
    navPage.clickResourcesLink();

    cy.url().should('include', '/resources');
    cy.get('h1').should('be.visible');

    cy.get('a[href*="/resources/"]', { timeout: 10000 }).filter(':visible').first().click();
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