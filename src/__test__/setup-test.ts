import '@testing-library/jest-dom/vitest';

import { afterAll, afterEach, beforeAll, vi } from 'vitest';

import { setupServer } from 'msw/node';

import { handlers } from './mock/handlers';
import { store } from '../store/store';
import { jikanApi } from '../api/createApi';

export const server = setupServer(...handlers);

window.URL.createObjectURL = vi.fn();

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  store.dispatch(jikanApi.util.resetApiState());
});
afterAll(() => server.close());
