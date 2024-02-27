const express = require("express");

const contactsRouter = express.Router();

const contactsController = require("../controllers/contactsControllers.js");
const validateBody = require("../helpers/validateBody.js");
const schemas = require("../schemas/contactsSchemas.js");

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

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
