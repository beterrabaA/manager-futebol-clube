import Joi = require('joi');

export const loginSchema = Joi.object({
  email: Joi.string().email().empty().required(),
  password: Joi.string().required(),
}).messages({
  'any.empty': 'All fields must be filled',
  'any.required': 'All fields must be filled',
});

export const teamSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
});
