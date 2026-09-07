import { test as base } from '@playwright/test';
import { HomePage } from '../pages/home-page.page';

export type PageFixtures = {
    homePage: HomePage;
};

export const pageTest = base.extend<PageFixtures>({
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },
});