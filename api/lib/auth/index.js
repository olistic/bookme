'use strict';

const jwt = require('./jwt');

module.exports = {
  name: 'auth',
  register: async server => {
    await jwt(server);
  },
};
