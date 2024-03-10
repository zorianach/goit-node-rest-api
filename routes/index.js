import express from "express";

import contactsRouter from "./contacts.js";
import usersRouter from "./users.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.use("/users", usersRouter);
router.use("/contacts", authenticate, contactsRouter);

export default router;