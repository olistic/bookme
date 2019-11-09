import { html } from '../../node_modules/lit-html/lit-html.js';
import { styleMap } from '../../node_modules/lit-html/directives/style-map.js';

import { createUser } from '../services/users.js';
import { logIn } from '../services/auth.js';

const signupForm = () => {
  const handleSubmit = async event => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;
    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;

    await createUser(email, password, firstName, lastName);
    await logIn(email, password);
  };

  return html`
    <form @submit=${handleSubmit} style=${styleMap(styles.form)}>
      <h1 style=${styleMap(styles.heading)}>Sign up for <strong>bookme</strong></h1>
      <div class="form-group">
        <label>
          <span>Email</span>
          <input name="email" placeholder="email@domain.com" type="email" />
        </label>
      </div>
      <div class="form-group">
        <label>
          <span>Password</span>
          <input name="password" placeholder="********" type="password" />
        </label>
      </div>
      <div class="form-group">
        <label>
          <span>First name</span>
          <input name="firstName" placeholder="John" type="text" />
        </label>
      </div>
      <div class="form-group last">
        <label>
          <span>Last name</span>
          <input name="lastName" placeholder="Doe" type="text" />
        </label>
      </div>
      <button class="primary large">Sign up</button>
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

export default signupForm;
