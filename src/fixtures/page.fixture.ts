import { test as base } from '@playwright/test';
import { BasePage } from '../pages/base-page.page';
import { HomePage } from '../pages/home-page.page';

export type PageFixtures = {
    homePage: HomePage;
    basePage: BasePage;
};

export const pageTest = base.extend<PageFixtures>({
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },
    basePage: async ({ page }, use) => {
        const basePage = new BasePage(page);
        await use(basePage);
    },
});