import { Router } from "express";
import { createUsers, getUserForEmail } from "../db/db.repository.js";
import { comparePass, dateNow, hashedPass } from "../utils/utils.js";
const router = Router();
// регистрация
router.post("/registration", async (req, res) => {
    const { email, password_hash } = req.body;
    const hashed = await hashedPass(password_hash);
    const data = await getUserForEmail(email);
    if (data) {
        return res.send("email already taken");
    }
    const user = {
        id: Math.floor(Math.random() * 100000),
        email: email,
        password_hash: hashed,
        status: "user",
        refresh_token: null,
        created_at: dateNow,
        updated_at: dateNow
    };
    createUsers(user);
    return res.send(1);
});
// логин
router.post("/login", async (req, res) => {
    const { email, password_hash } = req.body;
    const data = await getUserForEmail(email);
    const isMatch = await comparePass(password_hash, data.password_hash);
    if (data && isMatch) {
        return res.send(1);
    }
    return res.send("Unkorrect login or password");
});
export default router;
//# sourceMappingURL=routes.post.auth.js.map