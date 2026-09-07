import { test, expect } from '../../../src/fixtures/test.fixture'
import { FilterData as item, FilterDataMap as mapping } from '../../../src/data/enum/filter.enum';

test.describe('Product Grid Filtering', () => {
    test.beforeEach(async ({ homePage }) => {
        await homePage.goto();
    });

    test('filter products by a single sub-category ', async ({ homePage }) => {
        await homePage.filter(item.HAMMER);
        await expect(homePage.getFilterCheckbox(item.HAMMER)).toBeChecked();
    });

    test('all sub-categories should be checked when parent category is checked', async ({ homePage }) => {
        await homePage.filter(item.POWER_TOOLS);
        for (const sub of mapping[item.POWER_TOOLS]) {
            const subCategoryCheckbox = homePage.getFilterCheckbox(sub);
            await expect(subCategoryCheckbox).toBeChecked();
        }
    })
})