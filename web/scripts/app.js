import { render } from 'https://unpkg.com/lit-html?module';

import authenticatedApp from './authenticatedApp.js';
import unauthenticatedApp from './unauthenticatedApp.js';
import { getLoggedInUser } from './services/auth.js';
import { getSession } from './utils/session.js';

const app = async () => {
  const session = getSession();
  const user = session ? await getLoggedInUser() : null;
  const isAuthenticated = !!user;
  const rootEl = document.getElementById('root');
  render(isAuthenticated ? authenticatedApp() : unauthenticatedApp(), rootEl);
};

app();
