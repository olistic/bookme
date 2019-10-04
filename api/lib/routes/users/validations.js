'use strict';

const Joi = require('@hapi/joi');

exports.create = {
  payload: Joi.object({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(8)
      .required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  }),
};
