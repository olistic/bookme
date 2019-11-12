import { pathToRegexp } from '../../node_modules/path-to-regexp/dist.es2015/index.js';
import { render } from '../../node_modules/lit-html/lit-html.js';

/**
 * Custom event fired when navigating using history.pushState().
 */
const pushstateEvent = new CustomEvent('pushstate');

/**
 * Navigate to the given path.
 *
 * @param {string} path The path.
 */
export const navigate = path => {
  history.pushState(null, '', path);

  window.dispatchEvent(pushstateEvent);
};

/**
 * Match a URL pathname to a path.
 *
 * See:
 * https://github.com/ReactTraining/react-router/blob/ef60b08d514e1db3354316c303783158f108bd3b/packages/react-router/modules/matchPath.js.
 *
 * @param {string} pathname The URL pathname.
 * @param {string} path The path.
 * @param {boolean} exact Whether the match should be exact or not.
 *
 * @returns {Object} The match object if there was a match, null otherwise.
 */
const matchPath = (pathname, path, exact = false) => {
  const keys = [];
  const regexp = pathToRegexp(path, keys, {
    end: exact,
  });

  const match = regexp.exec(pathname);

  if (!match) {
    return null;
  }

  const [url, ...values] = match;

  const isExact = pathname === url;
  if (exact && !isExact) {
    return null;
  }

  return {
    path,
    url: path === '/' && url === '' ? '/' : url,
    isExact,
    params: keys.reduce(
      (params, key, index) => ({
        ...params,
        [key.name]: values[index],
      }),
      {},
    ),
  };
};

export class Route {
  constructor(path, template, exact = false) {
    this.path = path;
    this.template = template;
    this.exact = exact;
  }

  match() {
    return matchPath(window.location.pathname, this.path, this.exact);
  }

  render() {
    const match = this.match();
    return match ? this.template(match) : null;
  }
}

export class Router {
  constructor(routes, rootEl) {
    this.routes = routes;
    this.rootEl = rootEl;
  }

  updateLinks() {
    // Override rendered anchor links' default behaviour.
    this.rootEl.querySelectorAll('a[data-link]').forEach(anchorEl => {
      anchorEl.addEventListener('click', event => {
        event.preventDefault();

        const path = anchorEl.pathname;
        navigate(path);
      });
    });
  }

  render() {
    render(this.routes.map(route => route.render()), this.rootEl);

    this.updateLinks();
  }

  init() {
    this.render();

    // Add navigation events listeners.
    window.addEventListener('pushstate', () => this.render());
    window.addEventListener('popstate', () => this.render());
  }
}
