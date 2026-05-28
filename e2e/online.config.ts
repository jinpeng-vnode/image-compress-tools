import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: '.',
  testMatch: 'online-*.spec.ts',
  timeout: 60000,
  expect: { timeout: 15000 },
  use: {
    baseURL: 'https://cimg.todonot.com',
    headless: true,
    screenshot: 'only-on-failure',
  },
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
})
