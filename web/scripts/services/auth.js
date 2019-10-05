import { get, post } from '../utils/api.js';
import { redirect } from '../utils/router.js';
import { removeSession, setSession } from '../utils/session.js';

const baseUrl = 'http://localhost:3000';

export const logIn = async (email, password) => {
  const { data: session, error } = await post(`${baseUrl}/sessions`, {
    email,
    password,
  });
  if (error) {
    if (error.status === 401) {
      throw new Error('Invalid email/password combination.');
    }

    throw new Error('Oops! Something went wrong...');
  }

  setSession(session);

  redirect('/');
};

export const logOut = () => {
  removeSession();

  redirect('/login');
};

export const getLoggedInUser = async () => {
  const { data: user } = await get(`${baseUrl}/me`);
  if (!user) {
    logOut();

    return null;
  }

  return user;
};
