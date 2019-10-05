import { login, signup } from './templates.js';

const routes = {
  '/login': login,
  '/signup': signup,
};

const unauthenticatedApp = () => {
  let template = routes[window.location.pathname];
  if (!template) {
    window.location.assign('/login');
    template = login;
  }

  return template();
};

export default unauthenticatedApp;
