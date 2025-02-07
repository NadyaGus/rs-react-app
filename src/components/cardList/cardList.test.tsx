import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { describe, expect, it } from 'vitest';
import { LS_KEY, ROUTES } from '../../App';
import { MainPage } from '../../pages/main/mainPage';
import { DetailsPage } from '../../pages/details/detailsPage';
import userEvent from '@testing-library/user-event';

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

describe('main page', () => {
  it('should render 10 cards in result', async () => {
    render(<RouterProvider router={router} />);
    await user.type(screen.getByRole('searchbox'), 'naruto');
    await screen.findByRole('button', { name: 'Search' });
    await user.click(screen.getByRole('button', { name: 'Search' }));
    await screen.findByText('Naruto');

    expect(screen.getAllByRole('article')).toHaveLength(10);
  });
});
