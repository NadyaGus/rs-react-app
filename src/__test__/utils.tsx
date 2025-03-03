import animeData from './mock/animeData.json';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/dom';
import { mockConstants } from './mock/mockConstants';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../shared/store/store';
import { expect, vi } from 'vitest';
import MainPage from '../app/page';
import DetailsPage from '../_pages/details/[id]';

const mockRouter = () => {
  return vi.mock('next/router', () => ({
    useRouter: vi.fn(() => ({
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      push: vi.fn(),
      replace: vi.fn(),
      reload: vi.fn(),
      back: vi.fn(),
      prefetch: vi.fn(),
      beforePopState: vi.fn(),
      events: {
        on: vi.fn(),
        off: vi.fn(),
        emit: vi.fn(),
      },
      isFallback: false,
    })),
  }));
};

const renderMainPage = async () => {
  mockRouter();
  return render(
    <Provider store={store}>
      <MainPage data={animeData} />
    </Provider>
  );
};

const renderDetailsPage = async () => {
  mockRouter();
  return render(
    <Provider store={store}>
      <DetailsPage data={animeData.data[0]} />
    </Provider>
  );
};

const userTypeAndSearch = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.clear(screen.getByRole('searchbox'));
  waitFor(() => {
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });
  waitFor(() =>
    user.type(screen.getByRole('searchbox'), mockConstants.mockAnimeWithData)
  );
  await screen.findByRole('button', { name: 'Search' });
  await user.click(screen.getByRole('button', { name: 'Search' }));
  await screen.findByText('Naruto');
};

export { userTypeAndSearch, renderMainPage, renderDetailsPage };
