import { html } from '../../node_modules/lit-html/lit-html.js';
import { styleMap } from '../../node_modules/lit-html/directives/style-map.js';

import { logOut } from '../services/auth.js';

const home = () => html`
  <div>
    <h1 style=${styleMap(styles.heading)}>Welcome to <strong>bookme</strong></h1>
    <button @click=${logOut} class="button secondary medium" type="button">
      Log out
    </button>
  </div>
`;

const styles = {
  heading: {
    fontSize: '26px',
    fontWeight: 400,
    lineHeight: 1.23,
    margin: '0 0 24px',
  },
};

export default home;
