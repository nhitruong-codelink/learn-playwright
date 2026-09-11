import { test as base } from '@playwright/test';
import { DatabaseClient } from '../database/database.client';
import { InvoiceQueries } from '../database/invoice.queries';
import { UserQueries } from '../database/user.queries';

export type DBFixtures = {
    db: {
        client: DatabaseClient;
        invoice: InvoiceQueries;
        user: UserQueries;
    };
};

export const dbTest = base.extend<DBFixtures>({
    db: async ({ }, use) => {
        const client = new DatabaseClient();
        // Give DatabaseClient and query modules to the test
        await use({
            client,
            invoice: new InvoiceQueries(client),
            user: new UserQueries(client),
        });
        // Cleanup after test
        await client.close();
    },
});
