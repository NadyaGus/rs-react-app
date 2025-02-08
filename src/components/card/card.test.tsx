import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { describe, expect, it, vi } from 'vitest';
import { LS_KEY, ROUTES } from '../../App';
import { MainPage } from '../../pages/main/mainPage';
import { DetailsPage } from '../../pages/details/detailsPage';
import userEvent from '@testing-library/user-event';
import { mockConstants } from '../../__test__/mock/mockConstants';
import animeData from '../../__test__/mock/animeData.json';
import { fetchData } from '../../api/fetchData';

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
  initialEntries: [ROUTES.root, `${ROUTES.details}/20`],
  initialIndex: 0,
});

const user = userEvent.setup();

describe('card tests', () => {
  it('should show relevant data', async () => {
    render(<RouterProvider router={router} />);

    await user.type(
      screen.getByRole('searchbox'),
      mockConstants.mockAnimeWithData
    );
    await screen.findByRole('button', { name: 'Search' });
    await user.click(screen.getByRole('button', { name: 'Search' }));
    await screen.findByText('Naruto');

    const cards = await screen.findAllByRole('article');
    expect(cards[0]).toHaveTextContent(animeData.data[0].title_english);
    expect(cards[0]).toHaveTextContent(
      animeData.data[0].synopsis.slice(0, 100)
    );
  });

  it('should initiate api call', async () => {
    const spy = vi.spyOn(fetchData, 'getDetails');

    render(<RouterProvider router={router} />);

    await user.clear(screen.getByRole('searchbox'));
    await user.type(
      screen.getByRole('searchbox'),
      mockConstants.mockAnimeWithData
    );
    await screen.findByRole('button', { name: 'Search' });
    await user.click(screen.getByRole('button', { name: 'Search' }));

    const card = await screen.findByText(animeData.data[0].title_english);
    await user.click(card);

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
