describe('Negative Login Test - OrangeHRM', () => {
    it('Should show error for invalid credentials', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  
      // Input username yang salah
      cy.get('input[name="username"]').type('WrongUser');
  
      // Input password yang salah
      cy.get('input[name="password"]').type('WrongPass123');
  
      // Klik login
      cy.get('button[type="submit"]').click();
  
      // Validasi error message muncul
      cy.get('.oxd-alert-content-text')
        .should('be.visible')
        .and('contain.text', 'Invalid credentials');
    });
  
    it('Should show required message when fields are empty', () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  
      // Klik langsung login tanpa mengisi field
      cy.get('button[type="submit"]').click();
  
      // Validasi pesan required pada username dan password
      cy.get('.oxd-input-field-error-message')
        .should('have.length', 2)
        .and('contain.text', 'Required');
    });
  });
  