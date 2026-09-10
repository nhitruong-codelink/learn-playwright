import { test as base } from '@playwright/test';

import { LoginPage } from '../pages/login-page.page';
import { RegistrationPage } from '../pages/registration-page.page';
import { HomePage } from '../pages/home-page.page';
import { ProductPage } from '../pages/product-page.page';
import { MyAccountPage } from '../pages/my-account-page.page';
import { CheckoutPage } from '../pages/checkout-page.page';
import { ContactPage } from '../pages/contact-page.page';

export type PageFixtures = {
    pages: {
        login: LoginPage;
        registration: RegistrationPage;
        home: HomePage;
        product: ProductPage;
        myaccount: MyAccountPage;
        checkout: CheckoutPage;
        contact: ContactPage;
    };
};

export const pageTest = base.extend<PageFixtures>({
    pages: async ({ page }, use) => {
        await use({
            login: new LoginPage(page),
            registration: new RegistrationPage(page),
            home: new HomePage(page),
            product: new ProductPage(page),
            myaccount: new MyAccountPage(page),
            checkout: new CheckoutPage(page),
            contact: new ContactPage(page),
        });
    },
});
