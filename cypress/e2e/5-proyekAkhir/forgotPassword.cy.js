import ForgotPasswordPage from '../../support/proyekAkhir/forgotPassword';

describe('Forgot Password Test', () => {
  const forgotPage = new ForgotPasswordPage();

  it('should trigger forgot password flow', () => {
    forgotPage.visit();
    forgotPage.goToForgotPassword();
    forgotPage.enterUsername('Admin');
    forgotPage.clickReset();
    cy.contains('Reset Password link sent successfully').should('exist');
  });
});
