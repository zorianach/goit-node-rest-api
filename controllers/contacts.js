import HttpError from "../helpers/HttpError.js";
import Contact from "../schemas/contactsSchemas.js";
import express from "express";
import validateBody from "../helpers/validateBody.js";
import schemas from "../schemas/contactsSchemas.js";

const app = express();

export const getAllContacts = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, favorite = null } = req.query;
    const skip = (page - 1) * limit;
    const condition = { ownerId: req.user._id };
    if (favorite !== null && favorite !== undefined) {
      condition.favorite = favorite === "true"; // конвертуємо рядок в булеве значення
    }
    const result = await Contact.find(condition, "-createdAt -updatedAt", {
      skip,
      limit,
    });
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
    if (result.ownerId.toString() !== req.user._id.toString()) {
      throw HttpError(404, "Contact not found");
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
    if (result.ownerId.toString() !== req.user._id.toString()) {
      throw HttpError(404, "Contact not found");
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
    ownerId: req.user._id,
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
  try {
    const { contactId } = req.params;
    const { body } = req;
    const ownerId = req.user._id.toString();
    if (Object.keys(body).length === 0) {
      throw HttpError(400, "Body must have at least one field");
    }
    const result = await Contact.findByIdAndUpdate(
      { _id: contactId, ownerId },
      body,
      {
        new: true,
      }
    );
    if (!result) {
      throw HttpError(404, "Not found");
    }
    if (result.ownerId.toString() !== req.user._id.toString()) {
      throw HttpError(404, "Contact not found");
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;
  try {
    const result = await Contact.findByIdAndUpdate(
      { _id: contactId, ownerId },
      body,
      {
        new: true,
      }
    );
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
