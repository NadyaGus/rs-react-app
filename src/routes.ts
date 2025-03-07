import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('./pages/main/mainPage.tsx'),
  route('/anime/:animeId', './pages/details/detailsPage.tsx'),
  route('*?', 'catchall.tsx'),
] satisfies RouteConfig;
