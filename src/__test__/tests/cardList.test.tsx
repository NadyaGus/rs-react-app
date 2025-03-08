import { screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { mockConstants } from '../mock/mockConstants';
import { renderMainPage } from '../utils';

const user = userEvent.setup();

describe('card list tests', () => {
  it('should render 10 cards in result', async () => {
    await renderMainPage();
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
    await renderMainPage();

    await user.clear(screen.getByRole('searchbox'));
    await user.type(
      screen.getByRole('searchbox'),
      mockConstants.mockAnimeNoData
    );
    await screen.findByRole('button', { name: 'Search' });
    await user.click(screen.getByRole('button', { name: 'Search' }));
    waitFor(async () => {
      expect(screen.getByText('No results found')).toBeInTheDocument();
    });
  });
});
