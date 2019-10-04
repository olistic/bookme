'use strict';

const User = require('../../models/User');
const { init } = require('../../server');

describe('/users', () => {
  const baseUrl = '/users';
  let server;

  beforeAll(async () => {
    server = await init();
  });

  afterAll(async () => {
    await server.stop();
  });

  describe('POST /', () => {
    const injectOptions = {
      method: 'POST',
      url: baseUrl,
      payload: {
        email: 'millenniumfalcon@mail.com',
        password: 'NeverTellMeTheOdds',
        firstName: 'Han',
        lastName: 'Solo',
      },
    };

    test('responds with 201 and created user', async () => {
      const user = {
        id: '5d9752a543f1c5869e22c30d',
        email: 'millenniumfalcon@mail.com',
        firstName: 'Han',
        lastName: 'Solo',
      };
      jest.spyOn(User, 'create').mockResolvedValue(user);
      const response = await server.inject(injectOptions);

      expect(User.create).toHaveBeenCalledTimes(1);
      expect(User.create).toHaveBeenCalledWith({
        email: 'millenniumfalcon@mail.com',
        password: 'NeverTellMeTheOdds',
        firstName: 'Han',
        lastName: 'Solo',
      });
      expect(response.statusCode).toBe(201);
      const payload = JSON.parse(response.payload);
      expect(payload.id).toBe('5d9752a543f1c5869e22c30d');
      expect(payload.email).toBe('millenniumfalcon@mail.com');
      expect(payload.firstName).toBe('Han');
      expect(payload.lastName).toBe('Solo');
    });

    test('responds with 400 if email is not provided', async () => {
      const response = await server.inject({
        ...injectOptions,
        payload: { ...injectOptions.payload, email: undefined },
      });
      expect(response.statusCode).toBe(400);
    });

    test('responds with 400 if email is not valid', async () => {
      const response = await server.inject({
        ...injectOptions,
        payload: { ...injectOptions.payload, email: 'invalid' },
      });
      expect(response.statusCode).toBe(400);
    });

    test('responds with 400 if password is not provided', async () => {
      const response = await server.inject({
        ...injectOptions,
        payload: { ...injectOptions.payload, password: undefined },
      });
      expect(response.statusCode).toBe(400);
    });

    test('responds with 400 if password is less than 8 characters', async () => {
      const response = await server.inject({
        ...injectOptions,
        payload: { ...injectOptions.payload, password: 'short' },
      });
      expect(response.statusCode).toBe(400);
    });

    test('responds with 409 if email already exists', async () => {
      jest.spyOn(User, 'create').mockImplementation(() => {
        const duplicateKeyError = new Error();
        duplicateKeyError.name = 'MongoError';
        duplicateKeyError.code = 11000;
        throw duplicateKeyError;
      });
      const response = await server.inject(injectOptions);
      expect(response.statusCode).toBe(409);
      const payload = JSON.parse(response.payload);
      expect(payload.message).toBe('Email already exists');
    });
  });
});
