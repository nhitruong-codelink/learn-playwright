import { expect, mergeTests } from '@playwright/test';
import { pageTest } from './page.fixture'
import { apiTest } from './api.fixture';
import { dbTest } from './db.fixture';

export const test = mergeTests(
    pageTest,
    apiTest,
    dbTest
)

export { expect };