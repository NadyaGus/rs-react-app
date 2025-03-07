import { defineConfig } from 'vitest/config';
import { reactRouter } from '@react-router/dev/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [!process.env.VITEST && reactRouter()],
  test: {
    coverage: {
      include: ['**/*.tsx'],
      exclude: [
        '**/*.test.tsx',
        '**/node_modules/**',
        '**/`*.spec.tsx',
        'src/__test__/setup-test.ts',
      ],
      provider: 'v8',
      reporter: ['text'],
    },
    environment: 'jsdom',
    globals: true,
    setupFiles: ['src/__test__/setup-test.ts'],
  },
});
