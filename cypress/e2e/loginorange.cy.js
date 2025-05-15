describe('OrangeHRM Login Tests', () => {
  const url = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

  beforeEach(() => {
    cy.visit(url);
  });

  it('Should login successfully with valid credentials', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
    cy.get('h6').should('have.text', 'Dashboard');
  });

  it('Should show error for invalid credentials', () => {
    cy.get('input[name="username"]').type('WrongUser');
    cy.get('input[name="password"]').type('WrongPass123');
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-alert-content-text')
      .should('be.visible')
      .and('contain.text', 'Invalid credentials');
  });

  it('Should show required message when fields are empty', () => {
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-input-field-error-message')
      .should('have.length', 2)
      .and('contain.text', 'Required');
  });
});
