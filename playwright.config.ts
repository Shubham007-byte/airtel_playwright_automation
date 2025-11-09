import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  // put artifacts (screenshots, videos, traces) under reporting/
  outputDir: 'reporting/test-results',
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure'
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    // { name: 'firefox', use: { browserName: 'firefox' } },
    // { name: 'webkit', use: { browserName: 'webkit' } },
  ],
  reporter: [
    ['html', { open: 'never' }],
    ['junit', { outputFile: 'reporting/junit/results.xml' }]
  ],
});