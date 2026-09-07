import { Locator, Page } from '@playwright/test';

export class BasePage {

    protected readonly page;
    protected readonly url = 'https://practicesoftwaretesting.com/';

    constructor(page: Page) {
        this.page = page
    }

    async goto() {
        await this.page.goto(this.url);
    }
}