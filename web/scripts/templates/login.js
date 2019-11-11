import { html } from '../../node_modules/lit-html/lit-html.js';
import { styleMap } from '../../node_modules/lit-html/directives/style-map.js';

import loginForm from './loginForm.js';
import unauthenticatedHeader from './unauthenticatedHeader.js';

const login = () => html`
  <main style=${styleMap(styles.main)}>
    ${unauthenticatedHeader()}
    <div style=${styleMap(styles.container)}>
      ${loginForm()}
    </div>
  </main>
`;

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    paddingTop: '40px',
  },
  container: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },
};

export default login;
