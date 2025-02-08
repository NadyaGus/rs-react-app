import { render, screen } from '@testing-library/react';
import { RouterProvider } from 'react-router';
import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import animeData from '../../__test__/mock/animeData.json';
import { fetchData } from '../../api/fetchData';
import { configureRouter, userTypeAndSearch } from '../../__test__/utils';

const router = configureRouter();
const user = userEvent.setup();

describe('card tests', () => {
  it('should show relevant data', async () => {
    render(<RouterProvider router={router} />);

    await userTypeAndSearch();
    await screen.findByText('Naruto');

    const cards = await screen.findAllByRole('article');
    expect(cards[0]).toHaveTextContent(animeData.data[0].title_english);
    expect(cards[0]).toHaveTextContent(
      animeData.data[0].synopsis.slice(0, 100)
    );
  });

  it('should initiate api call', async () => {
    const spy = vi.spyOn(fetchData, 'getDetails');

    render(<RouterProvider router={router} />);

    await userTypeAndSearch();

    const card = await screen.findByText(animeData.data[0].title_english);
    await user.click(card);

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
