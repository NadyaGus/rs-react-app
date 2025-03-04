import { screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { renderDetailsPage, renderMainPage } from '../utils';
import userEvent from '@testing-library/user-event';
import animeData from '../mock/animeData.json';
import { ROUTES } from '../../shared/utils/constants';
import useRouter from '../router';
import { server } from '../setup-test';
import { http, HttpResponse } from 'msw';

const user = userEvent.setup();

describe('details page', () => {
  it('should show relevant data', async () => {
    await renderDetailsPage();
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

  it('should show fallback message if no data', async () => {
    await renderDetailsPage();
    server.use(
      http.get('https://api.jikan.moe/v4/anime/100500', () => {
        return HttpResponse.error();
      })
    );
    waitFor(async () => {
      expect(screen.getByText('Something went wrong...')).toBeInTheDocument();
      expect(screen.getByText('Go Back')).toBeInTheDocument();
    });
  });

  it('should hide page when clicking back button ', async () => {
    await renderMainPage();

    const mockPush = vi.fn();
    (useRouter as ReturnType<typeof vi.fn>).mockReturnValue({
      ...useRouter(),
    });

    waitFor(async () => {
      expect(
        screen.getByText(animeData.data[0].title_english)
      ).toBeInTheDocument();
      expect(screen.getByText(animeData.data[0].synopsis)).toBeInTheDocument();
      expect(
        screen.getByText(animeData.data[0].title_japanese)
      ).toBeInTheDocument();
      await user.click(screen.getByRole('button', { name: 'Go Back' }));
      waitFor(() => expect(mockPush).toHaveBeenCalledWith(ROUTES.root));
    });
  });
});
