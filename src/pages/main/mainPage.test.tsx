import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import animeData from '../../__test__/mock/animeData.json';
import { configureRouter, userTypeAndSearch } from '../../__test__/utils';
import { RouterProvider } from 'react-router';
import { ROUTES } from '../../utils/constants';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

const user = userEvent.setup();

describe('main page', () => {
  it('should navigate to details page and update url', async () => {
    const router = configureRouter();
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );

    await userTypeAndSearch(user);

    const card = await screen.findByAltText(animeData.data[0].title_english);
    await user.click(card);

    expect(router.state.location.pathname).toBe(
      `${ROUTES.details}/${animeData.data[0].mal_id}`
    );
  });
});
