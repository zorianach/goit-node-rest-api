import express from "express";
import contactsController from "../controllers/contactsControllers.js";
import validateBody from '../helpers/validateBody.js';
import schemas from '../schemas/contactsSchemas.js';

const contactsRouter = express.Router();
const jsonParser = express.json();


contactsRouter.get("/", contactsController.getAllContacts);

contactsRouter.get("/:contactId", contactsController.getOneContact);

contactsRouter.delete("/:contactId", contactsController.deleteContact);

contactsRouter.post(
  "/", jsonParser,
  contactsController.createContact
);

contactsRouter.put(
  "/:contactId",
  jsonParser,
  contactsController.updateContact
);

contactsRouter.patch("/:contactId/favorite", contactsController.updateStatusContact);

export default contactsRouter;
