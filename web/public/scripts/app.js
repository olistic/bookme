import { home, login, notFound, signup } from './templates.js';

const routes = {
  '/': home,
  '/login': login,
  '/signup': signup,
};
const defaultRoute = notFound;

const rootEl = document.getElementById('root');
rootEl.innerHTML = routes[window.location.pathname] || defaultRoute;
