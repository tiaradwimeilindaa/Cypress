import LoginPage from '../support/pageObjects/loginPage';

const loginPage = new LoginPage();

describe('Login Test on OrangeHRM', () => {
  beforeEach(() => {
    loginPage.visit();
  });

  it('should login successfully with valid credentials', () => {
    loginPage.login('Admin', 'admin123');
    loginPage.getDashboardTitle().should('contain', 'Dashboard');
  });

  it('should show error on invalid credentials', () => {
    loginPage.login('invalidUser', 'invalidPass');
    cy.get('.oxd-alert-content-text')
      .should('contain', 'Invalid credentials');
  });
});
