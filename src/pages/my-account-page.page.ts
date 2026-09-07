import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base-page.page';

export class MyAccountPage extends BasePage {

    readonly pageTitle: Locator;
    readonly navMenu: Locator;

    constructor(page: Page) {
        super(page);
        this.pageTitle = page.locator('[data-test="page-title"]');
        this.navMenu = page.locator('[data-test="nav-menu"]');
    }

    async verifyMyAccountPageIsOpen() {
        await expect(this.pageTitle).toHaveText('My account');
    }

    async verifyUserIsLoggedIn(firstName, lastName) {
        await expect(this.navMenu).toHaveText(`${firstName} ${lastName}`);
    }
}
