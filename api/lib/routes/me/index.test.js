'use strict';

const User = require('../../models/User');
const { init } = require('../../server');

describe('/me', () => {
  const baseUrl = '/me';
  let server;

  beforeAll(async () => {
    server = await init();
  });

  afterAll(async () => {
    await server.stop();
  });

  describe('GET /', () => {
    const injectOptions = {
      method: 'GET',
      url: baseUrl,
      auth: {
        strategy: 'jwt',
        credentials: new User({
          email: 'millenniumfalcon@mail.com',
          password: 'hashedPassword',
          firstName: 'Han',
          lastName: 'Solo',
        }),
      },
    };

    test('responds with 200 and authenticated user', async () => {
      const response = await server.inject(injectOptions);

      expect(response.statusCode).toBe(200);
      const payload = JSON.parse(response.payload);
      expect(payload.email).toBe('millenniumfalcon@mail.com');
      expect(payload.firstName).toBe('Han');
      expect(payload.lastName).toBe('Solo');
      expect(payload.password).not.toBeDefined();
    });

    test('responds with 401 if not authenticated', async () => {
      const response = await server.inject({
        ...injectOptions,
        auth: undefined,
      });
      expect(response.statusCode).toBe(401);
    });
  });
});
