'use strict';

const handlers = require('./handlers');
const validations = require('./validations');

exports.create = {
  handler: handlers.create,
  validate: validations.create,
};
