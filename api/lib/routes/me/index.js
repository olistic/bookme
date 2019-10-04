'use strict';

const config = require('./config');

module.exports = [
  {
    method: 'GET',
    path: '/me',
    config: config.get,
  },
];
