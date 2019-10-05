import { home, notFound } from './templates.js';

const routes = {
  '/': home,
};
const defaultRoute = notFound;

const authenticatedApp = () => {
  const template = routes[window.location.pathname] || defaultRoute;
  return template();
};

export default authenticatedApp;
