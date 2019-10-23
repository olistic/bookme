import { html } from 'https://unpkg.com/lit-html?module';

import { logOut } from '../services/auth.js';

const home = () => html`
  <div>
    <h1>Welcome to bookme</h1>
    <button @click=${logOut} type="button">Log out</button>
  </div>
`;

export default home;
