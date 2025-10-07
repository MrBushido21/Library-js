import { Router } from "express";
import sqlite3 from "sqlite3";
import { createUsers } from "../db/db.repository.js";
const router = Router();
let users = [];
// регистрация
router.post("/registration", (req, res) => {
    const { username, password } = req.body;
    const user = {
        id: Math.floor(Math.random() * 100000),
        username: username,
        password: password
    };
    createUsers(user);
});
// логин
router.post("/login", (req, res) => {
});
export default router;
//# sourceMappingURL=routes.post.auth.js.map