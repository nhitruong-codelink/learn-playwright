import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page.page';
import { RegistrationPage } from './registration-page.page';
import { MyAccountPage } from './my-account-page.page';

export class LoginPage extends BasePage {

    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly registerLink: Locator;
    readonly loginTitle: Locator;

    constructor(page: Page) {
        super(page);

        this.emailInput = page.locator('[data-test="email"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-submit"]');
        this.registerLink = page.locator('[data-test="register-link"]');
        this.loginTitle = page.getByRole('heading', { name: 'Login' });
    }

    async login(email: string, password: string) {
        await this.goToLogin();
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();

        return new MyAccountPage(this.page);
    }

    async goToRegistrationPage() {
        await this.registerLink.click();
        return new RegistrationPage(this.page);
    }
}