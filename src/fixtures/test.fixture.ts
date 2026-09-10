import { expect, mergeTests } from '@playwright/test';
import { pageTest } from './page.fixture'
import { apiTest } from './api.fixture';
import { dataTest } from './data.fixture';
import { dbTest } from './db.fixture';

export const test = mergeTests(
    pageTest,
    apiTest,
    dataTest,
    dbTest
)

export { expect };