const express = require("express");
const contactsRouter = express.Router();

const contactsController = require("../controllers/contactsControllers.js");
const validateBody = require("../helpers/validateBody.js");
const schemas = require("../schemas/contactsSchemas.js");

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

module.exports = contactsRouter;
