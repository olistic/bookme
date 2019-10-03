'use strict';

const hello = require('./hello');

module.exports = {
  name: 'routes',
  register: server => {
    server.route([...hello]);
  },
};
