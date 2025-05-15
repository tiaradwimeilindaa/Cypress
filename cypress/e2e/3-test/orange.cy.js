    describe('Login to OrangeHRM', () => {

        // Positif Test Case
        it('Should login successfully with valid credentials', () => {
          cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
      
          // Input valid username
          cy.get('input[name="username"]').type('Admin');
      
          // Input valid password
          cy.get('input[name="password"]').type('admin123');
      
          // Click login button
          cy.get('button[type="submit"]').click();
      
          // Assertion: Pastikan user masuk ke dashboard
          cy.url().should('include', '/dashboard');
          cy.get('h6').should('have.text', 'Dashboard');
        });
      
        // Negatif Test Case: Invalid username
        it('Should show error for invalid username', () => {
          cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
      
          // Input invalid username
          cy.get('input[name="username"]').type('InvalidUser');
      
          // Input valid password
          cy.get('input[name="password"]').type('admin123');
      
          // Click login button
          cy.get('button[type="submit"]').click();
      
          // Assertion: Pastikan pesan error tampil
          cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials');
        });
      
        // Negatif Test Case: Invalid password
        it('Should show error for invalid password', () => {
          cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
      
          // Input valid username
          cy.get('input[name="username"]').type('Admin');
      
          // Input invalid password
          cy.get('input[name="password"]').type('InvalidPassword');
      
          // Click login button
          cy.get('button[type="submit"]').click();
      
          // Assertion: Pastikan pesan error tampil
          cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials');
        });
      
        // Negatif Test Case: Empty username and password
        it('Should show error for empty username and password', () => {
          cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
      
          // Leave both fields empty
          cy.get('button[type="submit"]').click();
        });
      
      });
      
      