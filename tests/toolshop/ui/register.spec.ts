import { test, expect } from '../../../src/fixtures/test.fixture';

test.describe('Register New Account', () => {
  test('user can register a new account', async ({ homePage, customer }) => {
    // Create a new account
    await homePage.goto();
    const loginPage = await homePage.goToLogin();
    const registrationPage = await loginPage.goToRegistrationPage();
    await registrationPage.registerCustomer(customer);
    await expect(loginPage.loginTitle).toBeVisible();

    // Login with the newly created account
    const myAccountPage = await loginPage.login(customer.email, customer.password);
    await myAccountPage.verifyMyAccountPageIsOpen();
    await myAccountPage.verifyUserIsLoggedIn(customer.first_name, customer.last_name);
  });
});
