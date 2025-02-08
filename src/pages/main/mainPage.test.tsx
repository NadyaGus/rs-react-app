import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import animeData from '../../__test__/mock/animeData.json';
import { configureRouter, userTypeAndSearch } from '../../__test__/utils';
import { RouterProvider } from 'react-router';
import { ROUTES } from '../../App';

const router = configureRouter();
const user = userEvent.setup();

describe('main page', () => {
  it('should render', async () => {
    render(<RouterProvider router={router} />);
    await screen.findByRole('button', { name: 'Search' });
    expect(await screen.findByText('Search')).toBeInTheDocument();
  });

  it('should navigate to details page and update url', async () => {
    render(<RouterProvider router={router} />);

    await userTypeAndSearch(user);

    const card = await screen.findByText(animeData.data[0].title_english);
    await user.click(card);

    expect(router.state.location.pathname).toBe(
      `${ROUTES.details}/${animeData.data[0].mal_id}`
    );
  });
});
