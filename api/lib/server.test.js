'use strict';

const { init } = require('./server');

describe('GET /', () => {
  let server;

  beforeEach(async () => {
    server = await init();
  });

  afterEach(async () => {
    await server.stop();
  });

  test('responds with 200', async () => {
    const res = await server.inject({
      method: 'get',
      url: '/',
    });
    expect(res.statusCode).toBe(200);
  });
});
