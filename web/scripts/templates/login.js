import { html } from '../../node_modules/lit-html/lit-html.js';
import { styleMap } from '../../node_modules/lit-html/directives/style-map.js';

import loginForm from './loginForm.js';
import unauthenticatedPage from './unauthenticatedPage.js';

const navigationBar = () => html`
  <p style=${styleMap(styles.text)}>Don't have an account?</p>
  <a class="button secondary medium" data-link href="/signup">Sign up</a>
`;

const login = () => unauthenticatedPage(loginForm, navigationBar);

const styles = {
  text: {
    margin: '0 24px 0 0',
  },
};

export default login;
