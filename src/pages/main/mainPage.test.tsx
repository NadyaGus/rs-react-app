import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LS_KEY, ROUTES } from '../../App';
import { DetailsPage } from '../details/detailsPage';
import { MainPage } from './mainPage';
import { createMemoryRouter, RouterProvider } from 'react-router';

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

describe('main page', () => {
  it('should render', async () => {
    render(<RouterProvider router={router} />);
    await screen.findByRole('button', { name: 'Search' });
    expect(await screen.findByText('Search')).toBeInTheDocument();
  });
});
