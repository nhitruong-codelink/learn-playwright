import { test, expect } from '../../src/fixtures/test.fixture';

test.describe('Home page visual regression', () => {
    test('home page matches baseline screenshot', async ({ page, pages }) => {
        await pages.home.goto();
        await expect(pages.home.cardNames.first()).toBeVisible();

        await expect(page).toHaveScreenshot('homepage.png', {
            fullPage: true,
            maxDiffPixelRatio: 0.02,
        });
    });
});
