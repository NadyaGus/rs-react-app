import { type RouteConfig, route } from '@react-router/dev/routes';

export default [
  route('/anime/:animeId', './pages/details/detailsPage.tsx'),
  route('*?', 'catchall.tsx'),
] satisfies RouteConfig;
