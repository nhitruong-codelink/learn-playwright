import { Locator, expect } from '@playwright/test';

export async function fillOrAssertNotEmpty(locator: Locator, value?: string) {
    if (value) {
        await locator.fill(value);
    } else {
        await expect(locator).not.toBeEmpty();
    }
}
