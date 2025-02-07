import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    coverage: {
      include: ['src/**/*.tsx'],
      exclude: ['src/**/*.test.tsx', 'node_modules/**', 'src/App.tsx'],
      provider: 'v8',
      reporter: ['text'],
    },
    environment: 'jsdom',
    globals: true,
    setupFiles: ['src/__test__/setup-test.ts'],
  },
});
