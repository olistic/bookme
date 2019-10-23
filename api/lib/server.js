'use strict';

const Hapi = require('@hapi/hapi');

const auth = require('./auth');
const connectors = require('./connectors');
const routes = require('./routes');

const server = Hapi.server({
  host: '0.0.0.0',
  port: process.env.PORT || 3000,
  routes: {
    cors: true,
  },
});

exports.init = async () => {
  await server.register([auth, routes]);
  await server.initialize();
  return server;
};

exports.start = async () => {
  await server.register([connectors, auth, routes]);
  await server.start();
  console.log(`Server running at: ${server.info.uri}`); // eslint-disable-line no-console
  return server;
};
