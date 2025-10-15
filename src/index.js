import express, {} from "express";
import authRouter from "./routes/routes.post.auth.js";
import htmlRouter from "./routes/routes.get.html.js";
import { createTableUsers } from "./db/db.createTable.js";
import { deleteAll, deleteUser, getUsers } from "./db/db.repository.js";
import jwt from "jsonwebtoken";
const app = express();
const port = 3000;
const run = async () => {
    await createTableUsers();
    const jsonBodyModdleweare = express.json();
    app.use(jsonBodyModdleweare);
    app.use("/", htmlRouter);
    app.use('/', authRouter);
    app.get('/', async (req, res) => {
        // deleteAll()
        const data = await getUsers();
        res.send(data);
    });
    const payload = {
        id: 1,
        email: "user@email.com"
    };
    const secret = "secret";
    const token = jwt.sign(payload, secret, {
        algorithm: "HS256",
        expiresIn: "10m"
    });
    try {
        const decoded = jwt.verify(token, secret);
        console.log(decoded);
    }
    catch (error) {
        console.error("Token wrong");
    }
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
        console.log(token);
    });
};
run();
//# sourceMappingURL=index.js.map