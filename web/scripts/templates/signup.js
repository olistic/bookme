import { html } from '../../node_modules/lit-html/lit-html.js';

import { createUser } from '../services/users.js';
import { logIn } from '../services/auth.js';

const signup = () => {
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
    <div>
      <h1>Sign up for bookme</h1>
      <form @submit=${handleSubmit}>
        <label>
          Email:
          <input name="email" type="email" />
        </label>
        <label>
          Password:
          <input name="password" type="password" />
        </label>
        <label>
          First name:
          <input name="firstName" type="text" />
        </label>
        <label>
          Last name:
          <input name="lastName" type="text" />
        </label>
        <button>Sign up</button>
        <p>Already have an account? <a href="/login">Log in</a></p>
      </form>
    </div>
  `;
};

export default signup;
