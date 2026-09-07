import { expect, mergeTests } from '@playwright/test';
import { pageTest } from './page.fixture'
import { apiTest } from './api.fixture';
import { dataTest } from './data.fixture';

export const test = mergeTests(
    pageTest,
    apiTest,
    dataTest
)

export { expect };