'use strict';

jest.mock('jsonwebtoken');

const jwt = require('jsonwebtoken');
const { createAccessToken } = require('./tokens');

describe('createAccessToken', () => {
  test('returns a JWT with the user identifier as sub claim', () => {
    jwt.sign.mockReturnValue('token');
    const token = createAccessToken('123', 'shhhhhhh');
    expect(jwt.sign).toHaveBeenCalledTimes(1);
    expect(jwt.sign).toHaveBeenCalledWith({ sub: '123' }, 'shhhhhhh');
    expect(token).toBe('token');
  });
});
