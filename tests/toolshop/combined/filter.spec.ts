import { test, expect } from '../../../src/fixtures/test.fixture'
import { FilterData as filter, FilterDataMap as mapping } from '../../../src/data/enum/filter.enum';
import { Product } from '../../../src/data/product';

test.describe('Product Grid Filtering', () => {
    test.beforeEach(async ({ homePage }) => {
        await homePage.goto();
    });

    test('filter products by a single sub-category', async ({ homePage, productAPI }) => {
        await homePage.filter(filter.HAMMER);
        await expect(homePage.getFilterCheckbox(filter.HAMMER)).toBeChecked();

        const products: Product[] = (await productAPI.getProducts()).data;
        const cards = await homePage.getAllCards();

        const result = cards.map(card => {
            const product = products.find(product => product.name === card.name);

            return {
                name: card.name,
                category: product?.category
            };
        });

        for (const item of result) {
            await expect(item.category?.name).toContain(filter.HAMMER)
        };
    });

    test('all sub-categories should be checked when parent category is checked', async ({ homePage }) => {
        await homePage.filter(filter.POWER_TOOLS);
        for (const sub of mapping[filter.POWER_TOOLS]) {
            const subCategoryCheckbox = homePage.getFilterCheckbox(sub);
            await expect(subCategoryCheckbox).toBeChecked();
        }
    })
})

