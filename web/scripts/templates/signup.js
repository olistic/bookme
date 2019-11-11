import { html } from '../../node_modules/lit-html/lit-html.js';
import { styleMap } from '../../node_modules/lit-html/directives/style-map.js';

import signupForm from './signupForm.js';
import unauthenticatedHeader from './unauthenticatedHeader.js';

const signup = () => html`
  <main style=${styleMap(styles.main)}>
    ${unauthenticatedHeader()}
    <div style=${styleMap(styles.container)}>
      ${signupForm()}
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

export default signup;
