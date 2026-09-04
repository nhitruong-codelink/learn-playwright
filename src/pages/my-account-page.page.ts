import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page.page';

export class MyAccountPage extends BasePage {

    readonly pageTitle: Locator;

    constructor(page: Page) {
        super(page);
        this.pageTitle = page.locator('[data-test="page-title"]');
    }

}
