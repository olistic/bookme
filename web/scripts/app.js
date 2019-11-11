import authenticatedApp from './authenticatedApp.js';
import unauthenticatedApp from './unauthenticatedApp.js';
import { getLoggedInUser } from './services/auth.js';
import { getSession } from './utils/session.js';

const renderApp = async () => {
  const session = getSession();
  const user = session ? await getLoggedInUser() : null;
  const isAuthenticated = !!user;
  if (isAuthenticated) {
    authenticatedApp();
  } else {
    unauthenticatedApp();
  }
};

window.addEventListener('auth', renderApp);

renderApp();
