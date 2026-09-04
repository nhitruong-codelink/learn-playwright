import { test as base, expect, APIRequestContext } from '@playwright/test';
import { LoginPage } from '../pages/login-page.page';
import { RegistrationPage } from '../pages/registration-page.page';
import { HomePage } from '../pages/home-page.page';
import { BaseAPI } from '../api/base.api';
import { UserAPI } from '../api/user.api';

type Fixtures = {
    loginPage: LoginPage;
    registrationPage: RegistrationPage;
    homePage: HomePage;
    apiClient: BaseAPI;
    userAPI: UserAPI;

};

export const test = base.extend<Fixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    registrationPage: async ({ page }, use) => {
        const registrationPage = new RegistrationPage(page);
        await use(registrationPage);
    },

    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },

    apiClient: async ({ request }, use) => {
        const apiClient = new BaseAPI(
          request,
          'https://api.practicesoftwaretesting.com'
        );
    
        await use(apiClient);
      },
    
      userAPI: async ({ apiClient }, use) => {
        await use(new UserAPI(apiClient));
      },
});

export { expect };
