import LoginPage from '../pages/LoginPage';

describe('Login Test', () => {
  const loginPage = new LoginPage();

  it('should login with valid credentials', () => {
    loginPage.visit();
    loginPage.enterUsername('Admin');
    loginPage.enterPassword('admin123');
    loginPage.clickLogin();

    cy.url().should('include', '/dashboard');
  });
});
