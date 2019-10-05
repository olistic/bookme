const sessionKey = 'session';

export const getSession = () => {
  const session = window.localStorage.getItem(sessionKey);
  return session ? JSON.parse(session) : null;
};

export const setSession = session => {
  window.localStorage.setItem(sessionKey, JSON.stringify(session));
};

export const removeSession = () => {
  window.localStorage.removeItem(sessionKey);
};
