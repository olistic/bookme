'use strict';

const sessions = require('./sessions');
const users = require('./users');

module.exports = {
  name: 'routes',
  register: server => {
    server.route([...sessions, ...users]);
  },
};
