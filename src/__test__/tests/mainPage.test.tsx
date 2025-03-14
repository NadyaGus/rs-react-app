import { describe, expect, it, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import animeData from '../mock/animeData.json';
import { renderMainPage, userTypeAndSearch } from '../utils';
import { ROUTES } from '../../shared/utils/constants';
import useRouter from '../router';

const user = userEvent.setup();

describe('main page', () => {
  it('should navigate to details page and update url', async () => {
    await renderMainPage();
    expect(screen.getByText('Search')).toBeInTheDocument();

    const mockPush = vi.fn();
    (useRouter as ReturnType<typeof vi.fn>).mockReturnValue({
      ...useRouter(),
    });

    await userTypeAndSearch(user);

    const card = await screen.findByAltText(animeData.data[0].title_english);
    await user.click(card);

    waitFor(() =>
      expect(mockPush).toHaveBeenCalledWith(
        `${ROUTES.details}/${animeData.data[0].mal_id}`
      )
    );
  });
});
