import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  // * matches all URLs, the ? makes it optional so it will match / as well
  index('./pages/main/mainPage.tsx'),
  route('*?', 'catchall.tsx'),
  route('/about', './pages/about.tsx'),
] satisfies RouteConfig;
