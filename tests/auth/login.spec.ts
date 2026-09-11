import { test, expect } from '../../src/fixtures/test.fixture'
import { createCustomer } from '../../src/data/customer';


test.describe('Login page', () => {
  let customerEmail: string;

  test.afterEach(async ({ db }) => {
    if (customerEmail) {
      await db.user.deleteUserByEmail(customerEmail);
    }
  });

  test('user can login successfully', { tag: '@regression' },
    async ({ pages, userAPI }) => {
      const customer = createCustomer();
      customerEmail = customer.email;

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
