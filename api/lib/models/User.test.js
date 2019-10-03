'use strict';

const mongoose = require('mongoose');

const User = require('./User');

describe('User', () => {
  let user;

  beforeEach(() => {
    user = new User({
      firstName: 'Han',
      lastName: 'Solo',
      email: 'millenniumfalcon@mail.com',
      password: 'NeverTellMeTheOdds',
    });
  });

  test('is saved successfully', async () => {
    const savedUser = await user.save();
    expect(savedUser).toMatchObject(user);
  });

  describe('fields', () => {
    describe('email', () => {
      test('is converted to lowercase before saving', async () => {
        const uppercaseEmail = 'MILLENNIUMFALCON@MAIL.COM';
        user.email = uppercaseEmail;
        const savedUser = await user.save();
        expect(savedUser.email).toBe(uppercaseEmail.toLowerCase());
      });

      test("doesn't allow duplicates", async () => {
        expect.assertions(2);

        await user.save();

        const user2 = new User({
          firstName: 'Lando',
          lastName: 'Calrissian',
          email: 'millenniumfalcon@mail.com',
          password: 'iMissTheFalcon',
        });
        try {
          await user2.save();
        } catch (err) {
          expect(err.name).toBe('MongoError');
          expect(err.code).toBe(11000);
        }
      });
    });

    describe('password', () => {
      test('is hashed before saving', async () => {
        const plaintextPassword = user.password;
        const savedUser = await user.save();
        expect(savedUser.password).not.toBe(plaintextPassword);
      });

      test('matches when comparing to original plain-text password', async () => {
        const plaintextPassword = user.password;
        const savedUser = await user.save();
        const matches = await savedUser.comparePassword(plaintextPassword);
        expect(matches).toBe(true);
      });

      test("doesn't match when comparing to wrong plain-text password", async () => {
        const savedUser = await user.save();
        const matches = await savedUser.comparePassword('wrong');
        expect(matches).toBe(false);
      });
    });

    test('has a fullName virtual field', () => {
      expect(user.fullName).toBe('Han Solo');
    });
  });

  describe('validation', () => {
    test('passes if all required fields are present', async () => {
      await user.validate();
    });

    test('fails if email is empty', async () => {
      expect.assertions(2);

      user.email = undefined;

      try {
        await user.validate();
      } catch (err) {
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.email).toBeDefined();
      }
    });

    test('fails if password is empty', async () => {
      expect.assertions(2);

      user.password = undefined;

      try {
        await user.validate();
      } catch (err) {
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.password).toBeDefined();
      }
    });

    test('fails if firstName is empty', async () => {
      expect.assertions(2);

      user.firstName = undefined;

      try {
        await user.validate();
      } catch (err) {
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.firstName).toBeDefined();
      }
    });

    test('fails if lastName is empty', async () => {
      expect.assertions(2);

      user.lastName = undefined;

      try {
        await user.validate();
      } catch (err) {
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.lastName).toBeDefined();
      }
    });
  });
});
