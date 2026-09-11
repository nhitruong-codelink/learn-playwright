import { DatabaseClient } from './database.client';

export class UserQueries {
    constructor(private db: DatabaseClient) { }

    async deleteUserByEmail(email: string): Promise<void> {
        await this.db.execute(`DELETE FROM users WHERE email = ?`, [email]);
    }
}
