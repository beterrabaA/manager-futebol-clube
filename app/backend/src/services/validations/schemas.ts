import Joi = require('joi');

const ALL_FIELDS_REQUIRED = 'All fields must be filled';

export const loginSchema = Joi.object({
  email: Joi.string().email().empty().required(),
  password: Joi.string().empty().required(),
}).messages({
  'string.empty': ALL_FIELDS_REQUIRED,
  'string.email': ALL_FIELDS_REQUIRED,
  'any.required': ALL_FIELDS_REQUIRED,
});

export const teamSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
});
