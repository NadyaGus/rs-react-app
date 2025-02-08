import { createMemoryRouter } from 'react-router';
import { LS_KEY } from '../App';
import { DetailsPage } from '../pages/details/detailsPage';
import { MainPage } from '../pages/main/mainPage';
import animeData from './mock/animeData.json';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import { mockConstants } from './mock/mockConstants';
import { ROUTES } from '../utils/constants';

const configureRouter = () => {
  const routes = [
    {
      path: ROUTES.root,
      element: <MainPage localStorageKey={LS_KEY} />,
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

export { configureRouter, userTypeAndSearch };
