import { Page } from '@playwright/test'
import { BasePage } from './base-page.page';
import { LoginPage } from './login-page.page';


export class HomePage extends BasePage {

    constructor(page: Page) {
        super(page);

    }

    async goToLogin() {
        await this.signinLink.click();
        return new LoginPage(this.page);
    }
}