import { test as base } from '@playwright/test';
import { BaseAPI } from '../api/base.api';
import { UserAPI } from '../api/user.api';
import { ProductAPI } from '../api/product.api';
import { envConfig } from '../config/env.config';

export type APIFixtures = {
    apiClient: BaseAPI;
    userAPI: UserAPI;
    productAPI: ProductAPI
};

export const apiTest = base.extend<APIFixtures>({
    apiClient: async ({ request }, use) => {
        const apiClient = new BaseAPI(
            request, envConfig.apiBaseURL
        );
        await use(apiClient);
    },

    userAPI: async ({ apiClient }, use) => {
        await use(new UserAPI(apiClient));
    },

    productAPI: async ({ apiClient }, use) => {
        await use(new ProductAPI(apiClient));
    },
});