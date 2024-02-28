import HttpError from "../helpers/HttpError.js";
import Contact from "../schemas/contactsSchemas.js";
import express from "express";
import validateBody from "../helpers/validateBody.js";
import schemas from "../schemas/contactsSchemas.js";

const app = express();

export const getAllContacts = async (req, res, next) => {
  try {
    const result = await Contact.find({}, "-createdAt -updatedAt");
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  const contact = {
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    favorite: req.body.favorite,
  };
  validateBody(schemas.createContactSchema);
  try {
    const result = await Contact.create(contact);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;
  validateBody(schemas.updateContactSchema);
  if (Object.keys(body).length === 0) {
    throw HttpError(400, "Body must have at least one field");
  }
  try {
    const result = await Contact.findByIdAndUpdate(contactId, body, {
      new: true,
    });
    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;
  validateBody(schemas.updateStatusSchema);
  try {
    const result = await Contact.findByIdAndUpdate(contactId, body, {
      new: true,
    });
    if (!result) {
      throw HttpError(404, `Not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export default {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
};
