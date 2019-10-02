'use strict';

const mongodb = require('./mongodb');

module.exports = {
  name: 'connectors',
  register: async () => {
    await mongodb();
  },
};
