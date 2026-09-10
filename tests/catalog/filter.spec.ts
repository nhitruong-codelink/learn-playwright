import { test, expect } from '../../src/fixtures/test.fixture'
import { FilterData as filter, FilterDataMap as mapping } from '../../src/data/enum/filter.enum';
import { Product } from '../../src/data/product';

test.describe('Product Grid Filtering', () => {
    test.beforeEach(async ({ pages }) => {
        await pages.home.goto();
    });

    test('filter products by a single sub-category', { tag: '@regression' },
        async ({ pages, productAPI }) => {
            await pages.home.filter(filter.HAMMER);
            await expect(pages.home.getFilterCheckbox(filter.HAMMER)).toBeChecked();

            const products: Product[] = (await productAPI.getProducts()).data;
            const cards = await pages.home.getAllCards();

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

    test('all sub-categories should be checked when parent category is checked', { tag: '@toolshop' },
        async ({ pages }) => {
            await pages.home.filter(filter.POWER_TOOLS);
            for (const sub of mapping[filter.POWER_TOOLS]) {
                const subCategoryCheckbox = pages.home.getFilterCheckbox(sub);
                await expect(subCategoryCheckbox).toBeChecked();
            }
        })
})

