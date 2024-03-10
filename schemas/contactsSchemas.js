import mongoose from "mongoose";
import Joi from "joi";

const contactSchema = new mongoose.Schema({
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
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
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
    favorite: Joi.boolean()
    .required()
    .messages({'any.required': "Field 'favorite' is missing"}),

});

export const updateContactSchema = Joi.object({
    name: Joi.string()
    .min(3)
    .max(40),
    email: Joi.string()
    .email(),
    phone: Joi.string(),
    favorite: Joi.boolean()
});

export const updateStatusSchema = Joi.object({
    favorite: Joi.boolean().required()
});

export default mongoose.model("Contact", contactSchema);