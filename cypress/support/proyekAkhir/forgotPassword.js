class ForgotPasswordPage {
  visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  }

  goToForgotPassword() {
    cy.contains('Forgot your password?').click();
  }

  enterUsername(username) {
    cy.get('input[name="username"]').type(username);
  }

  clickReset() {
    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/sendPasswordReset').as('forgotPasswordRequest');
    cy.get('button[type="submit"]').click();
    cy.wait('@forgotPasswordRequest');
  }
}

export default ForgotPasswordPage;
