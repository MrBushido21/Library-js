import { sqlRun } from "./db.constructor.js";
export const createTableUsers = async () => {
    await sqlRun(`
        CREATE TABLE IF NOT EXISTS users (
        id NUMBER PRIMARY KEY,
        email TEXT NOT NULL,
        password_hash TEXT NOT NULL,
        status TEXT NOT NULL,
        refresh_token TEXT,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
        );
        `);
};
//Переписать и декомпозировать
//# sourceMappingURL=db.createTable.js.map