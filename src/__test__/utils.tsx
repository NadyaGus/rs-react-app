import { createMemoryRouter, RouterProvider } from 'react-router';
import { DetailsPage } from '../pages/details/detailsPage';
import { MainPage } from '../pages/main/mainPage';
import animeData from './mock/animeData.json';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import { mockConstants } from './mock/mockConstants';
import { ROUTES } from '../utils/constants';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store/store';

const configureRouter = () => {
  const routes = [
    {
      path: ROUTES.root,
      element: <MainPage />,
      children: [
        {
          path: ROUTES.detailsWithId,
          element: <DetailsPage />,
        },
      ],
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: [
      ROUTES.root,
      `${ROUTES.details}/${animeData.data[0].mal_id}`,
    ],
    initialIndex: 0,
  });

  return router;
};

const router = configureRouter();
const renderApp = () => {
  return render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

const userTypeAndSearch = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.clear(screen.getByRole('searchbox'));
  await user.type(
    screen.getByRole('searchbox'),
    mockConstants.mockAnimeWithData
  );
  await screen.findByRole('button', { name: 'Search' });
  await user.click(screen.getByRole('button', { name: 'Search' }));
  await screen.findByText('Naruto');
};

export { configureRouter, userTypeAndSearch, renderApp };
