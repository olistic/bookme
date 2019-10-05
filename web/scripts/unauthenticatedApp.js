import { login, signup } from './templates.js';
import { redirect } from './utils/router.js';

const routes = {
  '/login': login,
  '/signup': signup,
};
const notMatch = () => redirect('/login');

const unauthenticatedApp = () => {
  const template = routes[window.location.pathname] || notMatch;
  return template();
};

export default unauthenticatedApp;
