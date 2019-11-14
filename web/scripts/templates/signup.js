import { html } from '../../node_modules/lit-html/lit-html.js';
import { styleMap } from '../../node_modules/lit-html/directives/style-map.js';

import signupForm from './signupForm.js';
import unauthenticatedPage from './unauthenticatedPage.js';

const navigationBar = () => html`
  <p style=${styleMap(styles.text)}>Already have an account?</p>
  <a class="button secondary medium" data-link href="/login">Log in</a>
`;

const signup = () => unauthenticatedPage(signupForm, navigationBar);

const styles = {
  text: {
    margin: '0 24px 0 0',
  },
};

export default signup;
