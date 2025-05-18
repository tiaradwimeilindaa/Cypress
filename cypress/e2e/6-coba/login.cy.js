import LoginPage from '../support/pageObjects/loginPage'

const loginPage = new LoginPage()

describe('OrangeHRM Login Test with Intercept to /dashboard/shortcuts', () => {
  beforeEach(() => {
    loginPage.visit()
  })

  it('should login successfully and load dashboard shortcuts', () => {
    // Intercept request setelah login sukses
    cy.intercept('GET', '/web/index.php/api/v2/dashboard/shortcuts').as('dashboardShortcuts')

    // Login valid
    loginPage.enterUsername('Admin')
    loginPage.enterPassword('admin123')
    loginPage.clickLogin()

    // Tunggu dan validasi bahwa shortcut dashboard berhasil dimuat
    cy.wait('@dashboardShortcuts').its('response.statusCode').should('eq', 200)

    // Validasi tampilan dashboard
    loginPage.getDashboardText().should('contain.text', 'Dashboard')
  })

  it('should not reach dashboard API on invalid login', () => {
    // Intercept tetap di-setup untuk memastikan tidak dipanggil saat login gagal
    cy.intercept('GET', '/web/index.php/api/v2/dashboard/shortcuts').as('dashboardShortcuts')

    // Login invalid
    loginPage.enterUsername('wrongUser')
    loginPage.enterPassword('wrongPass')
    loginPage.clickLogin()

    // Validasi pesan error muncul
    cy.get('.oxd-alert-content-text').should('contain.text', 'Invalid credentials')

    // Tunggu beberapa detik untuk memastikan tidak ada request shortcut dikirim
    cy.wait(2000)

    // Pastikan shortcut dashboard TIDAK dipanggil
    cy.get('@dashboardShortcuts.all').should('have.length', 0)
  })
})
