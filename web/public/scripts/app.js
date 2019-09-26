import { login, notFound, signup } from './templates.js';

const routes = {
  '/login': login,
  '/signup': signup,
};
const defaultRoute = notFound;

const rootEl = document.getElementById('root');
rootEl.innerHTML = routes[window.location.pathname] || defaultRoute;
