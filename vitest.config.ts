import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
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
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['src/__test__/setup-test.ts'],
  },
});
