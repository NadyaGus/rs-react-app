import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { describe, expect, it } from 'vitest';
import { LS_KEY } from '../../App';
import { MainPage } from '../../pages/main/mainPage';
import { DetailsPage } from '../../pages/details/detailsPage';
import userEvent from '@testing-library/user-event';
import { mockConstants } from '../../__test__/mock/mockConstants';
import { ROUTES } from '../../utils/constants';

const routes = [
  {
    path: ROUTES.root,
    element: <MainPage localStorageKey={LS_KEY} />,
    children: [
      {
        path: ROUTES.details,
        element: <DetailsPage />,
      },
    ],
  },
];

const router = createMemoryRouter(routes, {
  initialEntries: [ROUTES.root],
});

const user = userEvent.setup();

describe('card list tests', () => {
  it('should render 10 cards in result', async () => {
    render(<RouterProvider router={router} />);
    await user.type(
      screen.getByRole('searchbox'),
      mockConstants.mockAnimeWithData
    );
    await screen.findByRole('button', { name: 'Search' });
    await user.click(screen.getByRole('button', { name: 'Search' }));
    await screen.findByText('Naruto');

    expect(screen.getAllByRole('article')).toHaveLength(10);
  });

  it('should render fallback message if no results', async () => {
    render(<RouterProvider router={router} />);

    await user.clear(screen.getByRole('searchbox'));
    await user.type(
      screen.getByRole('searchbox'),
      mockConstants.mockAnimeNoData
    );
    await screen.findByRole('button', { name: 'Search' });
    await user.click(screen.getByRole('button', { name: 'Search' }));
    await screen.findByText('No results found');
  });
});
