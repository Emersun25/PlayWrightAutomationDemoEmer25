import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';
import * as dotenv from 'dotenv';
import * as path from 'path';

const envFile = `.env.${process.env.TEST_ENV || 'dev'}`;
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

export default defineConfig<TestOptions>({
  timeout: 40000,
  globalTimeout: 60000,

  expect: { 
    timeout: 2000
  },

  retries: 1,
  reporter: 'html',


  use: {
    baseURL: process.env.URL,
    globalURL: process.env.URL,
    trace: 'on-first-retry',
    video: {
      mode: 'off',
      size: {width: 1920, height: 1080}
    },
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },


    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

});
