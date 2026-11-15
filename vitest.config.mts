import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['test/**/*.test.ts'],
    // Les tests 2022/2023 (ex-mocha) utilisent describe/it en globals.
    globals: true,
  },
})
