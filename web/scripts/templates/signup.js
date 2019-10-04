import { html } from '../../node_modules/lit-html/lit-html.js';

const signup = () => html`
  <div>
    <h1>Sign up for bookme</h1>
    <form>
      <label>
        Email:
        <input type="email" />
      </label>
      <label>
        Password:
        <input type="password" />
      </label>
      <label>
        First name:
        <input type="text" />
      </label>
      <label>
        Last name:
        <input type="text" />
      </label>
      <button type="submit">Sign up</button>
      <p>Already have an account? <a href="/login">Log in</a></p>
    </form>
  </div>
`;

export default signup;
