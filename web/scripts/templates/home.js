import { html } from '../../node_modules/lit-html/lit-html.js';

import { logOut } from '../services/auth.js';

const home = () => html`
  <div>
    <h1>Welcome to bookme</h1>
    <button @click=${logOut} type="button">Log out</button>
  </div>
`;

export default home;
