import { test as base } from '@playwright/test';
import { BaseAPI } from '../api/base.api';
import { UserAPI } from '../api/user.api';

export type APIFixtures = {
    apiClient: BaseAPI;
    userAPI: UserAPI;
};

export const apiTest = base.extend<APIFixtures>({
    apiClient: async ({ request }, use) => {
        const apiClient = new BaseAPI(
            request,
            'https://api.practicesoftwaretesting.com'
        );

        await use(apiClient);
    },

    userAPI: async ({ apiClient }, use) => {
        await use(new UserAPI(apiClient));
    },
});