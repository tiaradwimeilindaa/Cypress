import LoginPage from '../../support/proyekAkhir/loginPage';

describe('Login Test', () => {
  const loginPage = new LoginPage();

  it('should login successfully', () => {
    loginPage.visit();
    loginPage.fillUsername('Admin');
    loginPage.fillPassword('admin123');
    loginPage.clickLogin();
    cy.url().should('include', '/dashboard');
  });
});
