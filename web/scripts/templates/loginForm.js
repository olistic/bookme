import { html } from '../../node_modules/lit-html/lit-html.js';
import { styleMap } from '../../node_modules/lit-html/directives/style-map.js';

import { logIn } from '../services/auth.js';

const loginForm = () => {
  const handleSubmit = async event => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    await logIn(email, password);
  };

  return html`
    <form @submit=${handleSubmit} style=${styleMap(styles.form)}>
      <h1 style=${styleMap(styles.heading)}>Log in to <strong>bookme</strong></h1>
      <div class="form-group">
        <label>
          <span>Email</span>
          <input name="email" placeholder="email@domain.com" type="email" />
        </label>
      </div>
      <div class="form-group last">
        <label>
          <span>Password</span>
          <input name="password" placeholder="********" type="password" />
        </label>
      </div>
      <button class="primary large">Log in</button>
    </form>
  `;
};

const styles = {
  form: {
    backgroundColor: '#ffffff',
    borderRadius: '6px',
    boxShadow: '0 2px 2px 0 rgba(0, 25, 85, 0.04)',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '100%',
    padding: '64px 96px',
    width: '544px',
  },
  heading: {
    fontSize: '26px',
    fontWeight: 400,
    lineHeight: 1.23,
    margin: '0 0 24px',
    textAlign: 'center',
  },
};

export default loginForm;
