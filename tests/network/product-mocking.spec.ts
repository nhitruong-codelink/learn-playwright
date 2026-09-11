import { test, expect } from '../../src/fixtures/test.fixture';
import { envConfig } from '../../src/config/env.config';
import { createMockProductsResponse } from '../../src/data/mocks/product.mock';

test.describe('Product list network mocking', () => {
    test('renders a product coming from a mocked /products response', async ({ page, pages }) => {
        const mockedResponse = createMockProductsResponse();
        const mockedProduct = mockedResponse.data[0];

        await page.route(`${envConfig.apiBaseURL}/products*`, async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(mockedResponse),
            });
        });

        await pages.home.goto();

        await expect(pages.home.getProductCard(mockedProduct.name)).toBeVisible();
        await expect(pages.home.cardNames).toHaveCount(1);
    });
});
