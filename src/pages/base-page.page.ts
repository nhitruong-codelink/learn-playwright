import { Locator, Page } from '@playwright/test';
import { LoginPage } from './login-page.page';

export class BasePage {
    
    protected readonly page;
    protected readonly url = 'https://practicesoftwaretesting.com/';

    readonly signinLink: Locator;

    constructor(page: Page){
        this.page = page

        this.signinLink = page.locator('[data-test="nav-sign-in"]');
    }

    async goto() {
        await this.page.goto(this.url);
    }

    async goToLogin() {
        await this.signinLink.click();
        return new LoginPage(this.page);
    }
}