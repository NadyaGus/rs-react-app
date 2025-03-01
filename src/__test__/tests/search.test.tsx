import { screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { renderMainPage, userTypeAndSearch } from '../utils';
import userEvent from '@testing-library/user-event';
import animeData from '../mock/animeData.json';
import { LS_KEY } from '../../pages';

const user = userEvent.setup();

vi.stubGlobal('localStorage', {
  getItem: vi.fn((key) => {
    if (key === LS_KEY) {
      return animeData.data[0].title_english;
    }
  }),
  setItem: vi.fn(),
});

describe('search', () => {
  it('should get value from local storage', async () => {
    await renderMainPage();
    const value = localStorage.getItem(LS_KEY);
    // expect(value).toBe(animeData.data[0].title_english);
    waitFor(() => expect(screen.getByRole('searchbox')).toHaveValue(value));
  });

  it('should set new value to local storage', async () => {
    await renderMainPage();
    await userTypeAndSearch(user);
    waitFor(() =>
      expect(localStorage.setItem).toHaveBeenCalledWith(LS_KEY, 'Naruto')
    );
  });
});
