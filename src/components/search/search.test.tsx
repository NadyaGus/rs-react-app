import { render, screen } from '@testing-library/react';
import { RouterProvider } from 'react-router';
import { describe, expect, it, vi } from 'vitest';
import { configureRouter, userTypeAndSearch } from '../../__test__/utils';
import userEvent from '@testing-library/user-event';
import animeData from '../../__test__/mock/animeData.json';
import { LS_KEY } from '../../App';

const router = configureRouter();
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
    render(<RouterProvider router={router} />);
    const value = localStorage.getItem(LS_KEY);
    expect(value).toBe(animeData.data[0].title_english);
    expect(screen.getByRole('searchbox')).toHaveValue(value);
  });

  it('should set new value to local storage', async () => {
    render(<RouterProvider router={router} />);
    await userTypeAndSearch(user);
    expect(localStorage.setItem).toHaveBeenCalledWith(LS_KEY, 'Naruto');
  });
});
