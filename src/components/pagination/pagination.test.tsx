import { renderMainPage } from '../../__test__/utils';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ROUTES } from '../../utils/constants';
import useRouter from '../../__test__/router';

const user = userEvent.setup();

describe('pagination tests', () => {
  it('should navigate between pages', async () => {
    await renderMainPage();

    const mockPush = vi.fn();
    (useRouter as ReturnType<typeof vi.fn>).mockReturnValue({
      ...useRouter(),
    });

    waitFor(async () => {
      await screen.findByText('Naruto');
      await user.click(screen.getByRole('button', { name: 'Next' }));
      expect(mockPush).toHaveBeenCalledWith(`${ROUTES.root}?page=2`);
    });

    waitFor(async () => {
      await user.click(screen.getByRole('button', { name: 'Previous' }));
      expect(mockPush).toHaveBeenCalledWith(`${ROUTES.root}?page=1`);
    });
  });
});
