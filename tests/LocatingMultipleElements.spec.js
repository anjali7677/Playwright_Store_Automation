import { test, expect } from '@playwright/test';
import multipleElementLocator from './locators/multipleElementLocator';

test('Locate multiple elements and list their text', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');

  await page.waitForSelector(multipleElementLocator.productLinks);

  const items = page.locator(multipleElementLocator.productLinks);
  await expect(items).toHaveCount(9);

  const products = await page.$$(multipleElementLocator.productLinks);
  for (const product of products) {
    const productText = await product.textContent();
    console.log(productText);
  }
});
