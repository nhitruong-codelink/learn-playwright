import { Page, Locator } from '@playwright/test';

export class BasePage {

    protected readonly page;

    readonly homeTab: Locator;
    readonly signinTab: Locator;
    readonly cartTab: Locator; 
    readonly contactTab: Locator;

    constructor(page: Page) {
        this.page = page
        this.signinTab = page.locator('[data-test="nav-sign-in"]');
        this.homeTab = page.locator('[data-test="nav-home"]');
        this.cartTab = page.locator('[data-test="nav-cart"]');
        this.contactTab = page.locator('[data-test="nav-contact"]');
    }

    async goto() {
        await this.page.goto('/');
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

    async goToContact() {
        await this.contactTab.click();
    }
}