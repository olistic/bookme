import { html } from '../../node_modules/lit-html/lit-html.js';
import { styleMap } from '../../node_modules/lit-html/directives/style-map.js';

const logo = () => html`
  <h1 style=${styleMap(styles.logo)}>📖🙋‍♂️</h1>
`;

const unauthenticatedPage = (children, navigationBar) => html`
  <main style=${styleMap(styles.main)}>
    <header style=${styleMap(styles.header)}>
      ${logo()}
      ${navigationBar
        ? html`
            <nav style=${styleMap(styles.navigationBar)}>
              ${navigationBar()}
            </nav>
          `
        : null}
    </header>
    <div style=${styleMap(styles.container)}>
      ${children()}
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
  navigationBar: {
    alignItems: 'center',
    display: 'flex',
  },
};

export default unauthenticatedPage;
