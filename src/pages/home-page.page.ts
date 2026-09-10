import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from './base-page.page';
import { FilterData } from '../data/enum/filter.enum';
import { Product } from '../data/product';

export class HomePage extends BasePage {

    readonly cards: Locator;
    readonly nextPageButton: Locator;
    readonly filteredCards: Locator;
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly searchCaption: Locator;

    constructor(page: Page) {
        super(page);
        this.cards = page.locator('[data-test="product-card"]');
        this.nextPageButton = page.locator('[data-test="pagination-next"]');
        this.filteredCards = page.locator('[data-test="filter_completed"]');
        this.searchInput = page.locator('[data-test="search-query"]');
        this.searchButton = page.locator('[data-test="search-submit"]');
        this.searchCaption = page.locator('[data-test="search-caption"]');
    }

    getFilterCheckbox(filterData: string): Locator {
        return this.page.getByRole('checkbox', { name: filterData, exact: true });
    }

    getProductCard(productName) {
        return this.page.getByRole('heading', { name: productName, exact: true });
    }

    async filter(...items: FilterData[]) {
        for (const item of items) {
            await this.getFilterCheckbox(item).check();
        }
    }

    async getAllCards(): Promise<Product[]> {
        const products: Product[] = [];
        while (true) {
            const count = await this.cards.count();

            for (let i = 0; i < count; i++) {
                const card = this.cards.nth(i);
                products.push({
                    name: await card.innerText(),
                    category: {
                        name: '',
                    },
                });
            }
            if (await this.filteredCards.isVisible()) {
                if (await this.nextPageButton.isHidden()) break;
                if (await this.nextPageButton.isDisabled()) break;
                await this.nextPageButton.click();
            }
        }
        return products;
    }

    async search(productName) {
        await this.searchInput.fill(productName);
        await this.searchButton.click();
        await expect(this.searchCaption).toBeVisible();
    }

    async openProduct(productName) {
        await this.getProductCard(productName).click();
    }

}