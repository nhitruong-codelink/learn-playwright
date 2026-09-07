import { Locator, Page } from '@playwright/test';

export class BasePage {

    protected readonly page;
    protected readonly url = 'https://practicesoftwaretesting.com/';

    readonly signinLink: Locator;

    constructor(page: Page) {
        this.page = page
        this.signinLink = page.locator('[data-test="nav-sign-in"]');
    }

    async goto() {
        await this.page.goto(this.url);
    }
}