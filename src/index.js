import express, {} from "express";
import authRouter from "./routes/routes.post.auth.js";
import htmlRouter from "./routes/routes.get.html.js";
import { createTable } from "./db/db.createTable.js";
import { deleteUser, getUser, getUsers } from "./db/db.repository.js";
const app = express();
const port = 3000;
const run = async () => {
    await createTable();
    const jsonBodyModdleweare = express.json();
    app.use(jsonBodyModdleweare);
    app.use("/", htmlRouter);
    app.use('/auth', authRouter);
    app.get('/', async (req, res) => {
        const data = await getUsers();
        res.send(data);
    });
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
};
run();
//# sourceMappingURL=index.js.map