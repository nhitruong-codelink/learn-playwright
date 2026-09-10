import { test, expect } from '../../../src/fixtures/test.fixture';

test.describe('Register New Account', () => {
  test('user can register a new account', { tag: '@toolshop' },
    async ({ pages, customer }) => {
      // Create a new account
      await pages.home.goto();
      await pages.home.goToLogin();
      await pages.login.goToRegistrationPage();
      await pages.registration.registerCustomer(customer);
      await expect(pages.login.loginTitle).toBeVisible();

      // Login with the newly created account
      await pages.login.login(customer.email, customer.password);
      await expect(pages.myaccount.pageTitle).toHaveText('My account');
      await expect(pages.myaccount.navMenu).toHaveText(`${customer.first_name} ${customer.last_name}`);
    });
});
