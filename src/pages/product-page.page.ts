import { BasePage } from './base-page.page';
import { Page, Locator } from '@playwright/test'


export class ProductPage extends BasePage {

    readonly addToCartButton: Locator;
    readonly addSuccessAlert: Locator;

    constructor(page: Page) {
        super(page);
        this.addToCartButton = page.locator('[data-test="add-to-cart"]');
        this.addSuccessAlert = page.getByRole('alert', { name: 'Product added to shopping cart.', exact: true });

    }

    async addToCart() {
        await this.addToCartButton.click();
    }
}