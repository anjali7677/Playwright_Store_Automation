==============================
 Playwright Test Quick Reference
==============================

1. Running Tests:

- Run all tests in all browsers (default):
  npx playwright test

- Run tests only in Chromium:
  npx playwright test --project=chromium

- Run a specific test file:
  npx playwright test tests/yourTestFile.spec.js

- Run with debug mode (headful + slow motion):
  npx playwright test --headed --slow-mo=1000

2. Viewing Reports:

- Show built-in HTML report after test run:
  npx playwright show-report

- Generate and open Allure report (after tests):
  npm run test
  npm run allure:generate
  npm run allure:open


3. Playwright Config Notes:

- Multiple reporters setup example in playwright.config.ts:

  reporter: [
    ['list'],                              // Console output
    ['html', { open: 'never' }],          // Built-in HTML report
    ['allure-playwright', { outputFolder: 'my-allure-results' }],  // Allure reporter
  ],

- Screenshot and video config:

  use: {
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  }

4. Useful Playwright Test API:

- test.step() to create named steps in report:

  await test.step('Description', async () => {
    // test actions
  });

- Assertions:

  await expect(page.locator('selector')).toBeVisible();
  await expect(page).toHaveTitle('Page Title');
  await expect(locator).toHaveText('Expected Text');
  await expect(locator).toHaveCount(n);

- Handling dialogs/alerts:

  page.once('dialog', dialog => dialog.accept());

5. Locator Files:

- Keep selectors organized in locators files, e.g.,

  const homePageLocators = {
    loginButton: '#login2',
    loginUsernameInput: '#loginusername',
    loginPasswordInput: '#loginpassword',
    loginSubmitButton: "//button[text()='Log in']",
    logoutLink: "//a[text()='Log out']",
  };

- Import and use in tests:

  import homePageLocators from './locators/homePageLocators';
  await page.click(homePageLocators.loginButton);

6. Tips:

- Use retries for flaky tests, especially on CI:
  retries: process.env.CI ? 2 : 0

- Use workers: 1 on CI to avoid race conditions:
  workers: process.env.CI ? 1 : undefined

- Use trace collection for debugging flaky tests:
  trace: 'on-first-retry'

- Use meaningful console.log messages inside tests for easier debugging.

7. NPM Scripts Suggestions (add to package.json):

  "scripts": {
    "test": "playwright test",
    "test:chromium": "playwright test --project=chromium",
    "allure:generate": "allure generate my-allure-results --clean -o allure-report",
    "allure:open": "allure open allure-report"
  }

---



