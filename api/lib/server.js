'use strict';

const Hapi = require('@hapi/hapi');

const connectors = require('./connectors');
const routes = require('./routes');

const server = Hapi.server({
  port: 3000,
  host: 'localhost',
});

exports.init = async () => {
  await server.register([routes]);
  await server.initialize();
  return server;
};

exports.start = async () => {
  await server.register([connectors, routes]);
  await server.start();
  console.log(`Server running at: ${server.info.uri}`); // eslint-disable-line no-console
  return server;
};
