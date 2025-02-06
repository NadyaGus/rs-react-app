import { describe, expect, it } from 'vitest';
import { findByText, render } from '@testing-library/react';
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

render(<RouterProvider router={router} />);

describe('Test', () => {
  it('Test', () => {
    expect(2 + 2).toBe(4);
  });
});

describe('should render', () => {
  it('should render', async () => {
    render(<RouterProvider router={router} />);

    expect(findByText(document.body, 'Search')).toBeTruthy();
  });
});
