import { createMemoryRouter, RouterProvider } from 'react-router';
import DetailsPage from '../pages/details/detailsPage';
import MainPage from '../pages/main/mainPage';
import animeData from './mock/animeData.json';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import { mockConstants } from './mock/mockConstants';
import { ROUTES } from '../utils/constants';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { CardsResponse } from '../types/cardTypes';
import { Route } from '../pages/details/+types/detailsPage';

const configureRouter = () => {
  const routes = [
    {
      path: ROUTES.root,
      element: <MainPage {...(animeData as CardsResponse)} />,
      children: [
        {
          path: ROUTES.detailsWithId,
          element: (
            <DetailsPage
              {...({
                data: {
                  data: {
                    data: {
                      ...animeData.data[0],
                    },
                  },
                },
                error: null,
              } as unknown as Route.ComponentProps)}
            />
          ),
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
const renderApp = async () => {
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
