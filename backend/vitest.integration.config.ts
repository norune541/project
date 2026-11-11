import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['**/*-int.spec.ts'],
    environment: 'node',

    fileParallelism: false,

    testTimeout: 15_000,
    hookTimeout: 15_000,

    clearMocks: true,
    restoreMocks: true,
  },
});
