'use strict';

const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

/**
 * Create an access token that identifies the given user.
 *
 * @param {string} userId The identifier of the user.
 *
 * @returns {string} The access token.
 */
exports.createAccessToken = (userId, secret = jwtSecret) =>
  jwt.sign({ sub: userId }, secret);
