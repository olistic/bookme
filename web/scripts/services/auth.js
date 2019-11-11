import { get, post } from '../utils/api.js';
import { navigate } from '../utils/router.js';
import { removeSession, setSession } from '../utils/session.js';

export const logIn = async (email, password) => {
  const { data: session, error } = await post('/sessions', {
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

  navigate('/');
};

export const logOut = () => {
  removeSession();

  navigate('/login');
};

export const getLoggedInUser = async () => {
  const { data: user } = await get('/me');
  if (!user) {
    logOut();

    return null;
  }

  return user;
};
