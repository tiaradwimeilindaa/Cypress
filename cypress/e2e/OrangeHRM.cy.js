import LoginPage from '../support/pageObjects/loginPage'
const loginPage = new LoginPage()

describe('Login OrangeHRM with intercepts and validations', () => {
  beforeEach(() => {
    loginPage.visit()

    cy.intercept('GET', '/web/index.php/core/i18n/messages').as('messages')
    cy.intercept('GET', '/web/index.php/api/v2/dashboard/employees/time-at-work*').as('timeAtWork')
    cy.intercept('GET', '/web/index.php/api/v2/dashboard/employees/action-summary').as('actionSummary')
    cy.intercept('GET', '/web/index.php/api/v2/dashboard/shortcuts').as('shortcuts')
    cy.intercept('GET', '/web/index.php/api/v2/buzz/feed*').as('feed')
    cy.intercept('GET', '/web/index.php/api/v2/dashboard/employees/subunit').as('subunit')
    cy.intercept('GET', '/web/index.php/api/v2/dashboard/employees/locations').as('locations')
    cy.intercept('POST', '/web/index.php/events/push').as('push')
  })

  it('Positive Login - valid credentials', () => {
    loginPage.enterUsername('Admin')
    loginPage.enterPassword('admin123')
    loginPage.clickLogin()

    cy.wait('@messages').its('response.statusCode').should('be.oneOf', [200, 304])
    cy.wait('@timeAtWork').its('response.statusCode').should('eq', 200)
    cy.wait('@actionSummary').its('response.statusCode').should('eq', 200)
    cy.wait('@shortcuts').its('response.statusCode').should('eq', 200)
    cy.wait('@feed').its('response.statusCode').should('eq', 200)
    cy.wait('@subunit').its('response.statusCode').should('eq', 200)
    cy.wait('@locations').its('response.statusCode').should('eq', 200)
    cy.wait('@push').its('response.statusCode').should('eq', 200)

    loginPage.getDashboardText().should('contain.text', 'Dashboard')
  })

  it('Negative Login - invalid username & password', () => {
    loginPage.enterUsername('invalidUser')
    loginPage.enterPassword('invalidPass')
    loginPage.clickLogin()

    cy.get('.oxd-alert-content-text')
      .should('be.visible')
      .and('contain.text', 'Invalid credentials')

  })
})
