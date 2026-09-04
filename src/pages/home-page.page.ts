import { Page, Locator} from '@playwright/test'
import { BasePage } from './base-page.page';

export class HomePage extends BasePage {

    constructor(page: Page) {
        super(page);

    }
}