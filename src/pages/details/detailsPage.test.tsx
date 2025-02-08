import { render, screen, waitFor } from '@testing-library/react';
import { RouterProvider } from 'react-router';
import { describe, expect, it } from 'vitest';
import { configureRouter, userTypeAndSearch } from '../../__test__/utils';
import userEvent from '@testing-library/user-event';
import animeData from '../../__test__/mock/animeData.json';
import { ROUTES } from '../../App';

const router = configureRouter();
const user = userEvent.setup();

describe('details page', () => {
  it('should show loader when details page is loading', async () => {
    render(<RouterProvider router={router} />);

    userTypeAndSearch();
    await screen.findByText('Naruto');

    const card = await screen.findByText(animeData.data[0].title_english);
    await user.click(card);

    expect(router.state.location.pathname).toBe(
      `${ROUTES.details}/${animeData.data[0].mal_id}`
    );

    await screen.findByTestId('loader');
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should show relevant data', async () => {
    render(<RouterProvider router={router} />);

    userTypeAndSearch();
    await screen.findByText('Naruto');

    const card = await screen.findByText(animeData.data[0].title_english);
    await user.click(card);

    waitFor(async () => {
      expect(
        screen.getByText(animeData.data[0].title_english)
      ).toBeInTheDocument();
      expect(screen.getByText(animeData.data[0].synopsis)).toBeInTheDocument();
      expect(
        screen.getByText(animeData.data[0].title_japanese)
      ).toBeInTheDocument();
    });
  });

  it('should hide page when clicking back button ', async () => {
    render(<RouterProvider router={router} />);

    waitFor(async () => {
      expect(
        screen.getByText(animeData.data[0].title_english)
      ).toBeInTheDocument();
      expect(screen.getByText(animeData.data[0].synopsis)).toBeInTheDocument();
      expect(
        screen.getByText(animeData.data[0].title_japanese)
      ).toBeInTheDocument();
      await user.click(screen.getByRole('button', { name: 'Go Back' }));

      expect(router.state.location.pathname).toBe(ROUTES.root);
    });
  });
});
