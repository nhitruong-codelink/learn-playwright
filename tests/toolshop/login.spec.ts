import { test, expect } from '../../src/fixtures/test.fixture'
import { customer } from '../../src/data/customer';


test('user can login successfully', async ({ homePage, userAPI }) => {
  // Create new customer via API
    await userAPI.registerCustomer(customer);

    await homePage.goto();
    const loginPage = await homePage.goToLogin();
    const myAccountPage = await loginPage.login(customer.email,customer.password);
    await expect(myAccountPage.pageTitle).toHaveText('My account')
  });
