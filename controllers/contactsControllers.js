import HttpError from "../helpers/HttpError.js";
import { Contact }  from "../schemas/contactsSchemas.js";
import express from 'express'

const app = express();


export const getAllContacts = async (req, res, next) => {
  try {
    const result = await Contact.find({}, '-createdAt -updatedAt');
    console.log('result', result)
    // const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    // const result = await contactsServices.getContactById(contactId);
    console.log("result", result);
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
    // const result = await contactsServices.removeContact(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    // const result = await contactsServices.addContact(name, email, phone);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { body } = req;
    console.log("req.params", req.params);

    if (Object.keys(body).length === 0) {
      throw HttpError(400, "Body must have at least one field");
    }
    // const result = await contactsServices.updateContact(contactId, body);
    if (!result) {
      throw HttpError(404, "Not found");
    }

    console.log("result", result);
    res.status(200).json(result);
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
  };