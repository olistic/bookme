'use strict';

jest.mock('../../utils/tokens');

const User = require('../../models/User');
const { createAccessToken } = require('../../utils/tokens');
const { init } = require('../../server');

describe('/sessions', () => {
  const baseUrl = '/sessions';
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
      },
    };

    test('fetches user, compares password and responds with 201 and created session', async () => {
      const user = {
        id: '5d9752a543f1c5869e22c30d',
        comparePassword: jest.fn().mockResolvedValue(true),
      };
      jest.spyOn(User, 'findOne').mockResolvedValue(user);
      createAccessToken.mockReturnValue('token');

      const response = await server.inject(injectOptions);

      expect(User.findOne).toHaveBeenCalledTimes(1);
      expect(User.findOne).toHaveBeenCalledWith({ email: 'millenniumfalcon@mail.com' });
      expect(user.comparePassword).toHaveBeenCalledTimes(1);
      expect(user.comparePassword).toHaveBeenCalledWith('NeverTellMeTheOdds');
      expect(createAccessToken).toHaveBeenCalledTimes(1);
      expect(createAccessToken).toHaveBeenCalledWith('5d9752a543f1c5869e22c30d');
      expect(response.statusCode).toBe(201);
      const payload = JSON.parse(response.payload);
      expect(payload.token).toBe('token');
    });

    test("responds with 401 and generic error message if user doesn't exist", async () => {
      jest.spyOn(User, 'findOne').mockResolvedValue(null);
      const response = await server.inject(injectOptions);
      expect(response.statusCode).toBe(401);
      const payload = JSON.parse(response.payload);
      expect(payload.message).toBe('Invalid email/password combination');
    });

    test("responds with 401 and generic error message if password doesn't match", async () => {
      const user = {
        comparePassword: jest.fn().mockResolvedValue(false),
      };
      jest.spyOn(User, 'findOne').mockResolvedValue(user);
      const response = await server.inject(injectOptions);
      expect(response.statusCode).toBe(401);
      const payload = JSON.parse(response.payload);
      expect(payload.message).toBe('Invalid email/password combination');
    });
  });
});
