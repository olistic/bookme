'use strict';

const Joi = require('@hapi/joi');

exports.create = {
  payload: Joi.object({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required(),
  }),
};
