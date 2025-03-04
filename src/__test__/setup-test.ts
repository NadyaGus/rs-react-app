import '@testing-library/jest-dom/vitest';

import { afterAll, afterEach, beforeAll, vi } from 'vitest';

import { setupServer } from 'msw/node';

import { handlers } from './mock/handlers';

export const server = setupServer(...handlers);

window.URL.createObjectURL = vi.fn();

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
  usePathname: () => '/',
}));

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => server.close());

export { push, replace, prefetch };
