'use strict';

const Boom = require('@hapi/boom');

const User = require('../../models/User');

exports.create = async (request, h) => {
  const { email, password, firstName, lastName } = request.payload;

  try {
    const user = await User.create({
      email,
      password,
      firstName,
      lastName,
    });
    return h.response(user).code(201);
  } catch (err) {
    if (err.name === 'MongoError' && err.code === 11000) {
      throw Boom.conflict('Email already exists');
    }

    throw err;
  }
};
