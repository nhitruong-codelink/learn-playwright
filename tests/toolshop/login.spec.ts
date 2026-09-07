import { test } from '../../src/fixtures/test.fixture';

test.describe("Login page", () => {
  test('user can login successfully', async ({ homePage, userAPI, customer }) => {
    // Create new customer via API
    await userAPI.registerCustomer(customer);

    // Login
    await homePage.goto();
    const loginPage = await homePage.goToLogin();
    const myAccountPage = await loginPage.login(customer.email, customer.password);

    // Verify the user is logged in successfully
    await myAccountPage.verifyUserIsLoggedIn(customer.first_name, customer.last_name);
  });
});
