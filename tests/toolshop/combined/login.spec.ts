import { test, expect } from '../../../src/fixtures/test.fixture'

test.describe('Login page', () => {
  test('user can login successfully', { tag: '@toolshop' },
    async ({ pages, userAPI, customer }) => {
      // Create new customer via API
      await userAPI.registerCustomer(customer);

      // Login
      await pages.home.goto();
      await pages.home.goToLogin();
      await pages.login.login(customer.email, customer.password);

      // Verify the user is logged in successfully
      await expect(pages.myaccount.navMenu).toHaveText(`${customer.first_name} ${customer.last_name}`);
    });
});
