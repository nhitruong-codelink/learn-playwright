import { test as base } from '@playwright/test'
import { User, createCustomer } from "../data/customer";
import { Product } from '../data/product';

export type DataFixtures = {
    customer: User;
    product: Product;
};

export const dataTest = base.extend<DataFixtures>({
    customer: async ({ }, use) => {
        await use(createCustomer());
    },
});