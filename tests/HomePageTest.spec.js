import { test, expect } from '@playwright/test';
import homePageLocators from './locators/homePageLocators';

test('Login', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');

  await expect(page).toHaveTitle('STORE');

  await page.click(homePageLocators.loginButton);

  await page.fill(homePageLocators.loginUsernameInput, 'asahay921@gmail.com');
  await page.fill(homePageLocators.loginPasswordInput, 'Jeetanj@123');

  await page.click(homePageLocators.loginSubmitButton);

  const logoutlink = await page.locator(homePageLocators.logoutLink);
  await expect(logoutlink).toBeVisible();

  await page.close();
});
