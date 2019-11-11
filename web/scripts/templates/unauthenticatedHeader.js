import { html } from '../../node_modules/lit-html/lit-html.js';
import { styleMap } from '../../node_modules/lit-html/directives/style-map.js';

const unauthenticatedHeader = () => html`
  <header style=${styleMap(styles.header)}>
    <h1 style=${styleMap(styles.logo)}>📖🙋‍♂️</h1>
    <nav style=${styleMap(styles.navbar)}>
      ${window.location.pathname === '/login'
        ? html`
            <p style=${styleMap(styles.text)}>Don't have an account?</p>
            <a class="button secondary medium" data-link href="/signup">Sign up</a>
          `
        : html`
            <p style=${styleMap(styles.text)}>Already have an account?</p>
            <a class="button secondary medium" data-link href="/login">Log in</a>
          `}
    </nav>
  </header>
`;

const styles = {
  header: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 40px',
  },
  logo: {
    fontSize: '42px',
    margin: 0,
  },
  navbar: {
    alignItems: 'center',
    display: 'flex',
  },
  text: {
    margin: '0 24px 0 0',
  },
};

export default unauthenticatedHeader;
