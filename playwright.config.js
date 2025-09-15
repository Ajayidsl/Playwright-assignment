// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 300000, // per test timeout (30s)
  expect: {
    timeout: 300000, // assertion timeout
  },

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: process.env.CI ? 2 : undefined,

  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 90000,
     baseURL: 'https://v11support.iconect.com/',
   // storageState: 'fixtures/storageState.json',
    ignoreHTTPSErrors: true,
    video: 'on',
    screenshot: 'on',
    trace: 'on',

    outputDir: 'test-results/artifacts',
  },
  

   reporter: [
    ['list'], 
    ['html'], 
    ['allure-playwright'] 
  ],

  projects: [
    {
      name: 'System Chrome',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
      },
    },
    {
      name: 'Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'WebKit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Pixel 5'],
        channel: 'chrome', // ✅ System Chrome for mobile emulation
      },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
});
