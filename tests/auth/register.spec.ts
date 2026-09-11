import { test, expect } from '../../src/fixtures/test.fixture';
import { createCustomer } from '../../src/data/customer';

test.describe('Register New Account', () => {
  let customerEmail: string;

  test.afterEach(async ({ db }) => {
    if (customerEmail) {
      await db.user.deleteUserByEmail(customerEmail);
    }
  });

  test('user can register a new account', { tag: '@regression' },
    async ({ pages }) => {
      const customer = createCustomer();
      customerEmail = customer.email;

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
