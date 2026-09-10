import { Page, Locator } from '@playwright/test';

export class BasePage {

    protected readonly page;
    protected readonly url = '/';

    readonly homeTab: Locator;
    readonly signinTab: Locator;
    readonly cartTab: Locator; 

    constructor(page: Page) {
        this.page = page
        this.signinTab = page.locator('[data-test="nav-sign-in"]');
        this.homeTab = page.locator('[data-test="nav-home"]');
        this.cartTab = page.locator('[data-test="nav-cart"]');
    }

    async goto() {
        await this.page.goto(this.url);
    }

    async goToHome() {
        await this.homeTab.click();
    }

    async goToLogin() {
        await this.signinTab.click();
    }

    async goToCart() {
        await this.cartTab.click();
    }
}