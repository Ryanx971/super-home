/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import envCompatible from 'vite-plugin-env-compatible';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), envCompatible(), tsconfigPaths()],
  server: {
    host: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      reporter: ['text', 'lcov'],
    },
  },
});

