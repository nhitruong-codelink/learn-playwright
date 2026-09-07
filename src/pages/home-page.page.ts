import { Page, Locator } from '@playwright/test'
import { BasePage } from './base-page.page';
import { LoginPage } from './login-page.page';
import { FilterData } from '../data/enum/filter.enum';


export class HomePage extends BasePage {

    readonly signinLink: Locator;

    constructor(page: Page) {
        super(page);
        this.signinLink = page.locator('[data-test="nav-sign-in"]');
    }

    getFilterCheckbox(filterData: string): Locator {
        return this.page.getByRole('checkbox', { name: filterData, exact: true })
    }

    async goToLogin() {
        await this.signinLink.click();
        return new LoginPage(this.page);
    }

    async filter(...items: FilterData[]) {
        for (const item of items) {
            await this.getFilterCheckbox(item).check();
        }
    }
}