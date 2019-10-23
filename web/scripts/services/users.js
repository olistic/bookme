import { post } from '../utils/api.js';

export const createUser = async (email, password, firstName, lastName) => {
  const { data: user, error } = await post('/users', {
    email,
    password,
    firstName,
    lastName,
  });
  if (error) {
    if (error.status === 409) {
      throw new Error('Email already exists.');
    }

    throw new Error('Oops! Something went wrong...');
  }

  return user;
};
