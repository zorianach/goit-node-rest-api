import express from "express";
import contactsController from "../controllers/contactsControllers.js";
import validateBody from '../helpers/validateBody.js';
import schemas from '../schemas/contactsSchemas.js';

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAllContacts);

contactsRouter.get("/:contactId", contactsController.getOneContact);

contactsRouter.delete("/:contactId", contactsController.deleteContact);

contactsRouter.post(
  "/",
  validateBody(schemas.createContactSchema),
  contactsController.createContact
);

contactsRouter.put(
  "/:contactId",
  validateBody(schemas.updateContactSchema),
  contactsController.updateContact
);

export default contactsRouter;
