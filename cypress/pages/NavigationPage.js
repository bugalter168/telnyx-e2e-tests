class NavigationPage {
  visitHome() {
    cy.visit('/');
    return this;
  }

  visitGlobalCoverage() {
    cy.visit('/global-coverage');
    return this;
  }

  get siteHeader() {
    return cy.get('#site-header');
  }

  get resourcesMenuButton() {
    return cy.get('#site-header button[data-state]').filter(':contains("Resources")');
  }

  openResourcesMenu() {
    this.resourcesMenuButton.should('be.visible').click();
    return this;
  }

  clickResourcesLink() {
    cy.get('#site-header div[data-state="open"] a[href="/resources"]')
      .filter(':visible')
      .first()
      .click();
    return this;
  }
}

module.exports = NavigationPage;