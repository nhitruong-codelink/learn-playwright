import 'dotenv/config';

export const envConfig = {
    uiBaseURL: process.env.UI_BASE_URL ?? 'http://localhost:4200',
    apiBaseURL: process.env.API_BASE_URL ?? 'http://localhost:8091',

    db: {
        host: process.env.DB_HOST ?? '127.0.0.1',
        port: Number(process.env.DB_PORT ?? 3306),
        database: process.env.DB_NAME ?? 'toolshop',
        user: process.env.DB_USER ?? 'root',
        password: process.env.DB_PASSWORD ?? 'root',
    },
};
