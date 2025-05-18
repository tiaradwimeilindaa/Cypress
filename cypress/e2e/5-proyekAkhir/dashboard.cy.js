import LoginPage from '../../support/proyekAkhir/loginPage';
import DashboardPage from '../../support/proyekAkhir/dashboardPage';

describe('Dashboard Menu - Directory Test', () => {
  const loginPage = new LoginPage();
  const dashboardPage = new DashboardPage();

  beforeEach(() => {
    loginPage.visit();
    loginPage.fillUsername('Admin');
    loginPage.fillPassword('admin123');
    loginPage.clickLogin();
  });

  it('should access Directory menu from dashboard', () => {
    dashboardPage.clickMenuDirectory();
    dashboardPage.verifyDirectoryPage();
  });
});
