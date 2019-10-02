'use strict';

const Hapi = require('@hapi/hapi');

const server = Hapi.server({
  port: 3000,
  host: 'localhost',
});

const plugins = [require('./routes')];

exports.init = async () => {
  await server.register(plugins);
  await server.initialize();
  return server;
};

exports.start = async () => {
  await server.register(plugins);
  await server.start();
  console.log(`Server running at: ${server.info.uri}`); // eslint-disable-line no-console
  return server;
};
