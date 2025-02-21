import '@testing-library/jest-dom/vitest';

import { afterAll, afterEach, beforeAll, vi } from 'vitest';

import { setupServer } from 'msw/node';

import { handlers } from './mock/handlers';

export const server = setupServer(...handlers);

window.URL.createObjectURL = vi.fn();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
