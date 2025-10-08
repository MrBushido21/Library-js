import { Router } from "express";
import { createUsers, getUserForUsername } from "../db/db.repository.js";
const router = Router();
// регистрация
router.post("/registration", async (req, res) => {
    const { username, password } = req.body;
    const data = await getUserForUsername(username);
    if (data) {
        return res.send("username already taken");
    }
    const user = {
        id: Math.floor(Math.random() * 100000),
        username: username,
        password: password
    };
    createUsers(user);
    return res.send(1);
});
// логин
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await getUserForUsername(username);
    if (!user) {
        console.log('Unknown user');
        return res.send('Unkorrect login or password');
    }
    if (username === user.username && password === user.password) {
        return res.send(1);
    }
    else {
        return res.send("Unkorrect login or password");
    }
});
export default router;
//# sourceMappingURL=routes.post.auth.js.map