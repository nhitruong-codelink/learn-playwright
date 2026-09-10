import { RowDataPacket } from 'mysql2/promise';

import { DatabaseClient } from './database.client';

export interface Order extends RowDataPacket {
    email: string;
    first_name: string;
    last_name: string;
    total_amount: number;
}

export class InvoiceQueries {
    constructor(private db: DatabaseClient) { }

    async getLatestOrderByEmail(email: string): Promise<Order> {
        const orders = await this.db.query<Order[]>(
            `SELECT u.email, u.first_name, u.last_name, i.total AS total_amount
             FROM invoices i
             JOIN users u ON u.id = i.user_id
             WHERE u.email = ?
             ORDER BY i.created_at DESC
             LIMIT 1`,
            [email]
        );

        return orders[0];
    }
}
