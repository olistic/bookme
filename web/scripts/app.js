import { render } from '../node_modules/lit-html/lit-html.js';

import { home, login, notFound, signup } from './templates.js';

const routes = {
  '/': home,
  '/login': login,
  '/signup': signup,
};
const defaultRoute = notFound;

const template = routes[window.location.pathname] || defaultRoute;
const rootEl = document.getElementById('root');
render(template(), rootEl);
