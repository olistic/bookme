'use strict';

const me = require('./me');
const sessions = require('./sessions');
const users = require('./users');

module.exports = {
  name: 'routes',
  register: server => {
    server.route([...me, ...sessions, ...users]);
  },
};
