'use strict';

module.exports = {
  name: 'routes',
  register: server => {
    server.route({
      method: 'GET',
      path: '/',
      handler: () => 'Hello, world!',
    });
  },
};
