'use strict';

const hapiAuthJwt2 = require('hapi-auth-jwt2');

const User = require('../models/User');

const validate = async decoded => {
  const { sub: userId } = decoded;
  const user = await User.findById(userId);
  if (!user) {
    return { isValid: false };
  }

  return { isValid: true, credentials: user };
};

const jwt = async server => {
  await server.register(hapiAuthJwt2);

  server.auth.strategy('jwt', 'jwt', {
    validate,
    key: process.env.JWT_SECRET,
    verifyOptions: { algorithm: ['HS256'] },
  });
};

module.exports = jwt;
