import animeData from './mock/animeData.json';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/dom';
import { mockConstants } from './mock/mockConstants';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../shared/store/store';
import { expect, vi } from 'vitest';
import MainPage from '../app/@root/page';
import DetailsPage from '../app/details/[id]/page';

const push = vi.fn();
const replace = vi.fn();
const prefetch = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push,
    replace,
    prefetch,
  }),
  useSearchParams: () => {
    const params = new URLSearchParams({ q: '', page: '1' });
    return {
      get: (key: string) => params.get(key),
    };
  },
  useParams: () => ({ id: '1' }),
  usePathname: () => '/',
}));

const renderMainPage = async () => {
  vi.mock('../api/fetchData', () => ({
    fetchData: {
      getResults: vi.fn(() => Promise.resolve(animeData)),
    },
  }));
  const page = await MainPage({
    searchParams: Promise.resolve({ q: '', page: '1' }),
  });
  return render(<Provider store={store}>{page}</Provider>);
};

const renderDetailsPage = async () => {
  const page = await DetailsPage({
    params: Promise.resolve({ id: '1' }),
  });
  return render(<Provider store={store}>{page}</Provider>);
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
