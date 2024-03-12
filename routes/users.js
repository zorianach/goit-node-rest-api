import express from "express";
import usersController from "../controllers/users.js";
import { authenticate } from "../middleware/auth.js";
import validateBody from "../helpers/validateBody.js";
import { registerSchema, logInSchema, updateSubscriptionSchema } from "../schemas/userSchemas.js";
import upload from "../middleware/upload.js";

const usersRouter = express.Router();
const jsonParser = express.json();

usersRouter.post(
  "/register",
  jsonParser,
  validateBody(registerSchema),
  usersController.register
);
usersRouter.post("/login", validateBody(logInSchema), usersController.login);
usersRouter.post("/logout", authenticate, usersController.logout);
usersRouter.get("/current", authenticate, usersController.getCurrent);
usersRouter.patch(
  "/",
  authenticate,
  validateBody(updateSubscriptionSchema),
  usersController.updateSubscription
);
usersRouter.patch("/avatars", authenticate, upload.single("avatar"), usersController.uploadAvatar)

export default usersRouter;
