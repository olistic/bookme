'use strict';

exports.get = async request => {
  const { credentials: user } = request.auth;
  return user;
};
