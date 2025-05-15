describe('OrangeHRM Login Scenarios', () => {
  beforeEach(() => {
    // Kunjungi halaman login sebelum setiap tes
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  });

  // TC_001: User can input the correct username and password
  it('TC_001 - Should login successfully with correct credentials and intercept dashboard data', () => {
    // Intercept API call yang diharapkan setelah login sukses
    cy.intercept(
      'GET',
      '**/api/v2/dashboard/employees/action-summary' // Menggunakan wildcard untuk URL host
    ).as('actionSummary');

    cy.intercept(
      'GET',
      '**/api/v2/dashboard/shortcuts'
    ).as('dashboardShortcuts');
    
    cy.intercept(
      'GET',
      '**/api/v2/dashboard/employees/leave-requests*' // Tanda bintang untuk mencocokkan query parameter
    ).as('leaveRequests');


    cy.get('[name="username"]', { timeout: 10000 }).should('be.visible').type('Admin');
    cy.get('[name="password"]').should('be.visible').type('admin123');
    cy.get('[type="submit"]').should('be.visible').click();

    // Tunggu intercept dan verifikasi responsnya
    cy.wait('@actionSummary', { timeout: 15000 }).then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
      // Anda bisa menambahkan assertion lain pada body response jika perlu
      // expect(interception.response.body).to.have.property('data');
    });

    cy.wait('@dashboardShortcuts', { timeout: 15000 }).then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });

    cy.wait('@leaveRequests', { timeout: 15000 }).then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });

    // Verifikasi bahwa login berhasil (misalnya, URL berubah atau elemen dashboard muncul)
    cy.url().should('include', '/dashboard');
    cy.contains('Dashboard', { timeout: 10000 }).should('be.visible'); // Asumsi ada teks "Dashboard"
    cy.get('.oxd-topbar-header-breadcrumb').should('be.visible'); // Contoh elemen di dashboard
  });

  // TC_002: User can click the button "Login" (asumsi sama dengan TC_001 jika credential benar)
  // Jika TC_002 hanya fokus pada klik tombol tanpa memperhatikan hasil, bisa disederhanakan.
  // Namun, biasanya "user can click" diikuti dengan "and see expected result".
  // Untuk kasus ini, saya anggap TC_002 adalah variasi dari login sukses.
  it('TC_002 - Should login successfully when button is clicked with correct credentials', () => {
    cy.intercept('GET', '**/api/v2/dashboard/employees/action-summary').as('actionSummary');
    cy.intercept('GET', '**/api/v2/dashboard/shortcuts').as('dashboardShortcuts');
    cy.intercept('GET', '**/api/v2/dashboard/employees/leave-requests*').as('leaveRequests');


    cy.get('[name="username"]').type('Admin');
    cy.get('[name="password"]').type('admin123');
    cy.get('[type="submit"]').click();

    cy.wait(['@actionSummary', '@dashboardShortcuts', '@leaveRequests'], { timeout: 15000 }); // Menunggu beberapa intercept sekaligus

    cy.url().should('include', '/dashboard');
    cy.contains('Dashboard').should('be.visible');
  });

  // TC_003: User can't login with incorrect username
  it('TC_003 - Should show error message for incorrect username', () => {
    cy.get('[name="username"]').type('UserSalah');
    cy.get('[name="password"]').type('admin123');
    cy.get('[type="submit"]').click();

    // Verifikasi pesan error (sesuaikan selector dan teks dengan pesan error aktual)
    cy.get('.oxd-alert--error').should('be.visible');
    cy.contains('Invalid credentials').should('be.visible');
  });

  // TC_004: User can't login with incorrect password
  it('TC_004 - Should show error message for incorrect password', () => {
    cy.get('[name="username"]').type('Admin');
    cy.get('[name="password"]').type('passwordSalah123');
    cy.get('[type="submit"]').click();

    // Verifikasi pesan error
    cy.get('.oxd-alert--error').should('be.visible');
    cy.contains('Invalid credentials').should('be.visible');
  });

  // TC_005: User can't login with only username filled
  it('TC_005 - Should show "Required" message for empty password field', () => {
    cy.get('[name="username"]').type('Admin');
    cy.get('[type="submit"]').click(); // Klik login tanpa mengisi password

    // Verifikasi pesan error untuk field password (sesuaikan selector dan teks)
    // Cari elemen span dengan teks "Required" yang berada dalam satu kontainer dengan input password
    cy.get('.oxd-input-group')
      .contains('.oxd-label', 'Password') // Cari grup input yang labelnya Password
      .parent() // Ke elemen .oxd-input-group
      .find('.oxd-input-field-error-message') // Cari pesan error di dalamnya
      .should('be.visible')
      .and('contain.text', 'Required');
  });
  
  // TC_006: User can't login with only password filled
  it('TC_006 - Should show "Required" message for empty username field', () => {
    cy.get('[name="password"]').type('admin123');
    cy.get('[type="submit"]').click(); // Klik login tanpa mengisi username

    // Verifikasi pesan error untuk field username (sesuaikan selector dan teks)
     cy.get('.oxd-input-group')
      .contains('.oxd-label', 'Username') // Cari grup input yang labelnya Username
      .parent() // Ke elemen .oxd-input-group
      .find('.oxd-input-field-error-message') // Cari pesan error di dalamnya
      .should('be.visible')
      .and('contain.text', 'Required');
  });

  // TC_007: User can't click button Login if username and password haven't input
  it('TC_007 - Should show "Required" messages for empty username and password fields', () => {
    cy.get('[type="submit"]').click(); // Klik login tanpa mengisi apapun

    // Verifikasi pesan error untuk username
    cy.get('.oxd-input-group')
      .contains('.oxd-label', 'Username')
      .parent()
      .find('.oxd-input-field-error-message')
      .should('be.visible')
      .and('contain.text', 'Required');
      
    // Verifikasi pesan error untuk password
    cy.get('.oxd-input-group')
      .contains('.oxd-label', 'Password')
      .parent()
      .find('.oxd-input-field-error-message')
      .should('be.visible')
      .and('contain.text', 'Required');
  });
});