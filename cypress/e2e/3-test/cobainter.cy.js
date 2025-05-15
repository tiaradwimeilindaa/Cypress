describe('Login Test with Intercept - OrangeHRM (Opsi 2 Selectors)', () => {
  it('should login successfully and intercept dashboard data using Opsi 2 selectors', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // --- Kolom Username ---
    // Opsi 1: Berdasarkan atribut 'name' (dikomentari)
    // cy.get('[name="username"]', { timeout: 10000 })
    //   .should('be.visible')
    //   .type('Admin');
    
    // Opsi 2: Berdasarkan atribut 'placeholder' (INI YANG AKTIF)
    // Pastikan nilai placeholder="Username" sudah benar sesuai hasil Inspect Element.
    cy.get('[placeholder="Username"]', { timeout: 10000 })
      .should('be.visible')
      .type('Admin');

    // --- Kolom Password ---
    // Opsi 1: Berdasarkan atribut 'name' (dikomentari)
    // cy.get('[name="password"]')
    //   .should('be.visible')
    //   .type('admin123');

    // Opsi 2: Berdasarkan atribut 'placeholder' (INI YANG AKTIF)
    // Pastikan nilai placeholder="Password" sudah benar sesuai hasil Inspect Element.
    cy.get('[placeholder="Password"]')
      .should('be.visible')
      .type('admin123');
    
    // Intercept request GET ke API dashboard
    cy.intercept(
      'GET', 
      'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary'
    ).as('actionSummary');
    
    // --- Tombol Login (Submit) ---
    // Opsi 1: Berdasarkan atribut 'type="submit"' (dikomentari)
    // cy.get('[type="submit"]')
    //   .should('be.visible')
    //   .click();
    
    // Opsi 2: Berdasarkan teks di dalam tombol (INI YANG AKTIF)
    // Pastikan tombol adalah elemen <button> dan berisi teks 'Login'.
    // Alternatif lain bisa menggunakan kelas CSS jika lebih stabil, contoh:
    // cy.get('button.orangehrm-login-button').should('be.visible').click(); // Cek nama kelas dengan Inspect Element
    cy.contains('button', 'Login') // Mencari elemen <button> yang berisi teks 'Login'
      .should('be.visible')
      .click();

    // Menunggu intercept selesai
    cy.wait('@actionSummary', { timeout: 15000 }).then((interception) => {
      cy.log('Intercepted actionSummary:', interception);
      expect(interception.response.statusCode).to.equal(200);
    });

    // Verifikasi bahwa login berhasil
    cy.url().should('include', '/dashboard');
    // Sesuaikan selector ini dengan elemen yang ada di dashboard setelah login
    cy.get('.oxd-topbar-header-breadcrumb', { timeout: 10000 }).should('be.visible'); 
    cy.contains('Dashboard', { timeout: 10000 }).should('be.visible');
  });
});