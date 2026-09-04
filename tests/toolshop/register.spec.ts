import { test, expect } from '../../src/fixtures/test.fixture';
import { customer } from '../../src/data/customer';

test('user can register a new account and use it to login', async ({ homePage }) => {
    await homePage.goto();
    // Create a new account
    const loginPage = await homePage.goToLogin();
    const registrationPage = await loginPage.goToRegistrationPage();
    await registrationPage.registerCustomer(customer);
    await expect(loginPage.loginTitle).toBeVisible();

    // Login with the newly created account
    const myAccountPage = await loginPage.login(customer.email, customer.password);
    await expect(myAccountPage.pageTitle).toHaveText('My account');
  });