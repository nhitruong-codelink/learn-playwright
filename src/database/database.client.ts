import mysql, {
    Pool,
    RowDataPacket,
    ResultSetHeader,
} from 'mysql2/promise';

import { envConfig } from '../config/env.config';

export class DatabaseClient {
    private pool: Pool;

    constructor() {
        this.pool = mysql.createPool({
            host: envConfig.db.host,
            port: envConfig.db.port,
            database: envConfig.db.database,
            user: envConfig.db.user,
            password: envConfig.db.password,

            waitForConnections: true,
            connectionLimit: 5,
            queueLimit: 0,
        });
    }

    async query<T extends RowDataPacket[]>(
        sql: string,
        params: unknown[] = []
    ): Promise<T> {
        const [rows] = await this.pool.query<T>(sql, params);

        return rows;
    }

    async execute(
        sql: string,
        params: any[] = []
    ): Promise<ResultSetHeader> {
        const [result] = await this.pool.execute<ResultSetHeader>(
            sql,
            params
        );

        return result;
    }

    async close(): Promise<void> {
        await this.pool.end();
    }
}