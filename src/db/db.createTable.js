import { sqlRun } from "./db.constructor.js";
export const createTable = async () => {
    await sqlRun(`
        CREATE TABLE IF NOT EXISTS users (
        id NUMBER PRIMARY KEY,
        username TEXT NOT NULL,
        password TEXT NOT NULL
        );
        `);
};
//# sourceMappingURL=db.createTable.js.map