class LoginPage {
  visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/');
  }
  
  getUsernameInput() {
    return cy.get('input[name="username"]');
  }

  getPasswordInput() {
    return cy.get('input[name="password"]');
  }

  getLoginButton() {
    return cy.get('button[type="submit"]');
  }

  login(username, password) {
    this.getUsernameInput().type(username);
    this.getPasswordInput().type(password);
    this.getLoginButton().click();
  }

  getDashboardTitle() {
    return cy.get('.oxd-topbar-header-title');
  }
}

export default LoginPage;
