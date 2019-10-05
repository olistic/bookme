import { html } from '../../node_modules/lit-html/lit-html.js';

import { logIn } from '../services/auth.js';

const login = () => {
  const handleSubmit = async event => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    await logIn(email, password);
  };

  return html`
    <div>
      <h1>Log in to bookme</h1>
      <form @submit=${handleSubmit}>
        <label>
          Email:
          <input name="email" type="email" />
        </label>
        <label>
          Password:
          <input name="password" type="password" />
        </label>
        <button>Log in</button>
        <p>Don't have an account? <a href="/signup">Sign up</a></p>
      </form>
    </div>
  `;
};

export default login;
