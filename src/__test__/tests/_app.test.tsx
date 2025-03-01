// tests/_app.test.tsx
import { render, screen } from '@testing-library/react';

import { AppProps } from 'next/app';
import { it, vi } from 'vitest';
import { describe } from 'vitest';
import MyApp from '../../pages/_app';
import { expect } from 'vitest';
import animeData from '../mock/animeData.json';
import { Router } from 'next/router';

// Мок компонента страницы
function MockPage() {
  return <div>Mock Page Content</div>;
}

const mockRouterObject = {
  route: '/',
  pathname: '/',
  query: {},
  asPath: '/',
} as unknown as Router;

vi.mock('next/router', () => ({
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

describe('MyApp', () => {
  it('renders the page component wrapped in Layout', () => {
    const pageProps = {} as AppProps['pageProps'];
    render(
      <MyApp
        Component={MockPage}
        pageProps={pageProps}
        router={mockRouterObject}
        mainPageData={animeData}
      />
    );

    expect(screen.getByText('Mock Page Content')).toBeInTheDocument();
  });
});
