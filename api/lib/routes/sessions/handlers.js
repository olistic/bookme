'use strict';

const Boom = require('@hapi/boom');

const User = require('../../models/User');
const { createAccessToken } = require('../../utils/tokens');

const unauthorizedError = Boom.unauthorized('Invalid email/password combination');

exports.create = async (request, h) => {
  const { email, password } = request.payload;

  const user = await User.findOne({ email });
  if (!user) {
    throw unauthorizedError;
  }

  const passwordMatches = await user.comparePassword(password);
  if (!passwordMatches) {
    throw unauthorizedError;
  }

  const token = createAccessToken(user.id);
  const session = { token };

  return h.response(session).code(201);
};
