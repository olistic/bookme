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

export class Route {
  constructor(path, template) {
    this.path = path;
    this.template = template;
  }

  match() {
    return this.path === window.location.pathname;
  }

  render() {
    return this.match() ? this.template() : null;
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
