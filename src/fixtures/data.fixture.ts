import { test as base } from '@playwright/test'
import { User } from "../data/customer";

export type DataFixtures = {
    customer: User;
};

export const dataTest = base.extend<DataFixtures>({
    customer: async ({ }, use) => {
        const customer: User = {
            first_name: 'Sam',
            last_name: 'Sum',
            dob: '2000-11-20',
            phone: '5550199',
            email: `sam.sum.${Date.now()}@example.com`, // Keep this dynamic to avoid duplicate email errors
            password: 'Hope@This@Password@Works@123',
            address: {
                house_numnber: '42',
                street: 'Rempel Avenue',
                city: 'South Newell',
                state: 'Florida',
                country: 'United States of America (the)',
                postal_code: '90210'
            }
        }
        await use(customer);
    },
});