import home from './templates/home.js';
import { Route, Router } from './utils/router.js';

const homeRoute = new Route('/', home, true);
const routes = [homeRoute];

const rootEl = document.getElementById('root');

const router = new Router(routes, rootEl);

const authenticatedApp = () => router.init();

export default authenticatedApp;
