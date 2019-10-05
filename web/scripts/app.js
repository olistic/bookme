import { render } from '../node_modules/lit-html/lit-html.js';

import { getLoggedInUser } from './services/auth.js';
import { getSession } from './utils/session.js';
import { home, login, notFound, signup } from './templates.js';

const authenticatedRoutes = {
  '/': home,
};
const unauthenticatedRoutes = {
  '/login': login,
  '/signup': signup,
};
const defaultRoute = notFound;

const app = async () => {
  const session = getSession();
  const user = session ? await getLoggedInUser() : null;
  const isAuthenticated = !!user;
  const routes = isAuthenticated ? authenticatedRoutes : unauthenticatedRoutes;
  const template = routes[window.location.pathname] || defaultRoute;
  const rootEl = document.getElementById('root');
  render(template(), rootEl);
};

app();
