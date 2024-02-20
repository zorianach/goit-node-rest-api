const Joi = require("joi");

const createContactSchema = Joi.object({
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

const updateContactSchema = Joi.object({
    name: Joi.string()
    .min(3)
    .max(40),
    email: Joi.string()
    .email(),
    phone: Joi.string()
})

module.exports = {
    createContactSchema,
    updateContactSchema
};