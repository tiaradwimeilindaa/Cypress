describe('Login OrangeHRM - Based on Full Test Case', () => {
  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/');
  });

  it('TC_001 - Login with correct Username and Password', () => {
  cy.visit('https://opensource-demo.orangehrmlive.com');

  cy.get('input[name="username"]').type('Admin');
  cy.get('input[name="password"]').type('admin123');
  cy.get('button[type="submit"]').click();

  cy.url().should('include', '/dashboard');
});

  
  // it('TC_001 - Login with correct username and password', () => {
  //   cy.get('input[name="username"]').type('Admin');
  //   cy.get('input[name="password"]').type('admin123');
  //   cy.get('button[type="submit"]').click();
  //   cy.url().should('include', '/dashboard');
  // });

  it("TC_002 - Click login button redirects to sign in page", () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });

  it('TC_003 - Cannot login with incorrect username', () => {
    cy.get('input[name="username"]').type('Admin1');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials');
  });

  it('TC_004 - Cannot login with incorrect password', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin12345');
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials');
  });

  it('TC_005 - Cannot login with only username filled', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-input-group__message').should('contain', 'Required');
  });

  it('TC_006 - Cannot login with only password filled', () => {
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-input-group__message').should('contain', 'Required');
  });

  it('TC_007 - Cannot login with empty username and password', () => {
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-input-group__message').should('contain', 'Required');
  });
});
