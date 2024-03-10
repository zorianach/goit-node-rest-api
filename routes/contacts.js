import express from "express";
import contactsController from "../controllers/contacts.js";
import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
  updateStatusSchema,
} from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();
const jsonParser = express.json();

contactsRouter.get("/", contactsController.getAllContacts);
contactsRouter.get("/:contactId", contactsController.getOneContact);
contactsRouter.delete("/:contactId", contactsController.deleteContact);
contactsRouter.post(
  "/",
  jsonParser,
  validateBody(createContactSchema),
  contactsController.createContact
);
contactsRouter.put(
  "/:contactId",
  jsonParser,
  validateBody(updateContactSchema),
  contactsController.updateContact
);
contactsRouter.patch(
  "/:contactId/favorite",
  validateBody(updateStatusSchema),
  contactsController.updateStatusContact
);

export default contactsRouter;
