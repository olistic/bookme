'use strict';

const config = require('./config');

module.exports = [
  {
    method: 'POST',
    path: '/users',
    config: config.create,
  },
];
