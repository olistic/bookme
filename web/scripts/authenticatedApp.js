import { home } from './templates.js';
import { redirect } from './utils/router.js';

const routes = {
  '/': home,
};
const notMatch = () => redirect('/');

const authenticatedApp = () => {
  const template = routes[window.location.pathname] || notMatch;
  return template();
};

export default authenticatedApp;
