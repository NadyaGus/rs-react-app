import { createBrowserRouter } from 'react-router';
import { Home } from '@/pages/Home';
import { ControlledForm } from '@/pages/ControlledForm';
import { UncontrolledForm } from '@/pages/UncontrolledForm';

export const APP_ROUTES = {
  home: '/',
  controlledForm: '/controlled-form',
  uncontrolledForm: '/uncontrolled-form',
};

const routes = [
  {
    path: APP_ROUTES.home,
    element: <Home />,
  },
  {
    path: APP_ROUTES.controlledForm,
    element: <ControlledForm />,
  },
  {
    path: APP_ROUTES.uncontrolledForm,
    element: <UncontrolledForm />,
  },
];

export const router = createBrowserRouter(routes);
