// @ts-check
const { defineConfig, devices } = require('@playwright/test');


module.exports = defineConfig({
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  fullyParallel: true,

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ]
});

