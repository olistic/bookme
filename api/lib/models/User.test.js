'use strict';

const User = require('./User');

describe('User', () => {
  test('is invalid if email is empty', async () => {
    expect.assertions(1);

    const user = new User();

    try {
      await user.validate();
    } catch (err) {
      expect(err.errors).toHaveProperty('email');
    }
  });

  test('is invalid if password is empty', async () => {
    expect.assertions(1);

    const user = new User();

    try {
      await user.validate();
    } catch (err) {
      expect(err.errors).toHaveProperty('password');
    }
  });

  test('is invalid if firstName is empty', async () => {
    expect.assertions(1);

    const user = new User();

    try {
      await user.validate();
    } catch (err) {
      expect(err.errors).toHaveProperty('firstName');
    }
  });

  test('is invalid if lastName is empty', async () => {
    expect.assertions(1);

    const user = new User();

    try {
      await user.validate();
    } catch (err) {
      expect(err.errors).toHaveProperty('lastName');
    }
  });

  test('has a fullName virtual field', () => {
    const user = new User({ firstName: 'Foo', lastName: 'Bar' });
    expect(user.fullName).toBe('Foo Bar');
  });
});
