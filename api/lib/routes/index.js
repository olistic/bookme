'use strict';

const sessions = require('./sessions');

module.exports = {
  name: 'routes',
  register: server => {
    server.route([...sessions]);
  },
};
