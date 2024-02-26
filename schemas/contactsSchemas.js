import { Schema, model } from "mongoose";
import Joi from "joi";

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
}, {versionKey: false, timestamps: true});


export const createContactSchema = Joi.object({
    name: Joi.string()
    .min(3)
    .max(40)
    .required()
    .messages({'any.required': "Field 'name' is missing"}),
    email: Joi.string()
    .email()
    .required()
    .messages({'any.required': "Field 'email' is missing"}),
    phone: Joi.string()
    .required()
    .messages({'any.required': "Field 'phone' is missing"}),
});

export const updateContactSchema = Joi.object({
    name: Joi.string()
    .min(3)
    .max(40),
    email: Joi.string()
    .email(),
    phone: Joi.string()
})

export default {
    createContactSchema,
    updateContactSchema
};

export const Contact = model('contact', contactSchema);