import login from './templates/login.js';
import signup from './templates/signup.js';
import { Route, Router } from './utils/router.js';

const loginRoute = new Route('/login', login);
const signupRoute = new Route('/signup', signup);
const routes = [loginRoute, signupRoute];

const rootEl = document.getElementById('root');

const router = new Router(routes, rootEl);

const unauthenticatedApp = () => router.init();

export default unauthenticatedApp;
