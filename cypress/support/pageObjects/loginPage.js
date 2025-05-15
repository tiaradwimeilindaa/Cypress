class LoginPage {
  visit() {
    cy.visit('/')
  }

  enterUsername(username) {
    cy.get('input[name="username"]').type(username)
  }

  enterPassword(password) {
    cy.get('input[name="password"]').type(password)
  }

  clickLogin() {
    cy.get('button[type="submit"]').click()
  }

  getDashboardText() {
    return cy.get('.oxd-topbar-header-breadcrumb > h6')
  }
}

export default LoginPage
