'use strict';

const { start } = require('./lib/server');

process.on('unhandledRejection', err => {
  console.log(err); // eslint-disable-line no-console
  process.exit(1);
});

start();
