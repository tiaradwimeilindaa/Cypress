class DashboardPage {
  clickMenuDirectory() {
    cy.intercept('GET', '**/api/v2/directory/employees*').as('getDirectory');
    cy.get('a[href="/web/index.php/directory/viewDirectory"]').click();
    cy.wait('@getDirectory');
  }

  verifyDirectoryPage() {
    cy.url().should('include', '/directory');
    cy.contains('Directory').should('be.visible');
  }
}

export default DashboardPage;
