import { Page, Locator } from '@playwright/test'
import { BasePage } from './base-page.page';
import { LoginPage } from './login-page.page';
import { FilterData } from '../data/enum/filter.enum';
import { Product } from '../data/product';


export class HomePage extends BasePage {

    readonly signinLink: Locator;
    readonly cards: Locator;
    readonly nextPageButton: Locator;

    constructor(page: Page) {
        super(page);
        this.signinLink = page.locator('[data-test="nav-sign-in"]');
        this.cards = page.locator('[data-test="product-card"]');
        this.nextPageButton = page.locator('[data-test="pagination-next"]');
    }

    getFilterCheckbox(filterData: string): Locator {
        return this.page.getByRole('checkbox', { name: filterData, exact: true });
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
            if (await this.nextPageButton.isHidden()) break;
            if (await this.nextPageButton.isDisabled()) break;               
            await this.nextPageButton.click();
        }
        return products;
    }

}