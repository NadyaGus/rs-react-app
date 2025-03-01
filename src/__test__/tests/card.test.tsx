import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import animeData from '../mock/animeData.json';
import { renderMainPage, userTypeAndSearch } from '../utils';

const user = userEvent.setup();

describe('card tests', () => {
  it('should show relevant data', async () => {
    await renderMainPage();

    await userTypeAndSearch(user);
    await screen.findByText('Naruto');

    const cards = await screen.findAllByRole('article');
    expect(cards[0]).toHaveTextContent(animeData.data[0].title_english);
    expect(cards[0]).toHaveTextContent(
      animeData.data[0].synopsis.slice(0, 100)
    );
  });
});
