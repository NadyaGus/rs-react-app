import { configureRouter } from '../../__test__/utils';
import userEvent from '@testing-library/user-event';
import { screen, render, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { RouterProvider } from 'react-router';
import { ROUTES } from '../../utils/constants';

const router = configureRouter();
const user = userEvent.setup();

describe('pagination tests', () => {
  it('should navigate between pages', async () => {
    render(<RouterProvider router={router} />);

    waitFor(async () => {
      await screen.findByText('Naruto');
      await user.click(screen.getByRole('button', { name: 'Next' }));
      expect(router.state.location.pathname).toBe(`${ROUTES.root}?page=2`);
    });

    waitFor(async () => {
      await user.click(screen.getByRole('button', { name: 'Previous' }));
      expect(router.state.location.pathname).toBe(`${ROUTES.root}?page=1`);
    });
  });
});
