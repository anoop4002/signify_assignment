import express from "express";
import { router } from "./routes/reviewroute.js";
import { createAndPopulateInMemoryDb } from "./handlers/db/sqlite.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);
//Initialize in-memory db
createAndPopulateInMemoryDb();

export { app }