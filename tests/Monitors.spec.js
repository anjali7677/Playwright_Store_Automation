import { test, expect } from '@playwright/test';
import monitorLocators from './locators/monitorLocators';

// Test 1 - Monitors List Check
test('Monitors list check', async ({ page }) => {
  console.log('Test 1: Monitors list check started');
  await page.goto('https://www.demoblaze.com/index.html');

  await page.click(monitorLocators.monitorsCategoryLink);

  const monitorItems = page.locator(monitorLocators.monitorItems);
  await expect(monitorItems.first()).toBeVisible();

  const count = await monitorItems.count();
  console.log(`Number of monitors found: ${count}`);

  await expect(monitorItems).toHaveCount(2);

  const products = await monitorItems.allTextContents();
  console.log('Monitors found:', products);

  // Optional assertions:
  // expect(products).toContain('Apple monitor 24');
  // expect(products).toContain('ASUS Full HD');

  console.log('Test 1: Monitors list check completed');
});

// Test 2 - Product Details Verification
test('Verify Apple monitor 24 details', async ({ page }) => {
  console.log('Test 2: Verify Apple monitor 24 details started');
  await page.goto('https://www.demoblaze.com/index.html');

  await page.click(monitorLocators.monitorsCategoryLink);

  await Promise.all([
    page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
    page.click(monitorLocators.appleMonitorLink),
  ]);

  await expect(page.locator(monitorLocators.productName)).toHaveText('Apple monitor 24');
  await expect(page.locator(monitorLocators.productPrice)).toContainText('$400');
  await expect(page.locator(monitorLocators.productMoreInfo)).toBeVisible();

  console.log('Test 2: Verify Apple monitor 24 details completed');
});


// Test 3 - Add to Cart and Verify
test('Add Apple monitor 24 to cart and verify', async ({ page }) => {
  console.log('Test 3: Add Apple monitor 24 to cart started');
  await page.goto('https://www.demoblaze.com/index.html');

  await page.click(monitorLocators.monitorsCategoryLink);
  await page.click(monitorLocators.appleMonitorLink);

  page.once('dialog', dialog => {
    console.log('Alert appeared:', dialog.message());
    dialog.accept();
  });
  await page.click(monitorLocators.addToCartButton);

  await page.waitForTimeout(1000);

  await page.click(monitorLocators.cartLink);
  await page.waitForSelector(monitorLocators.cartTableRows);

  const cartProductName = await page.locator(monitorLocators.cartProductNameCell).textContent();
  console.log('Product in cart:', cartProductName);

  await expect(page.locator(monitorLocators.cartProductNameCell)).toHaveText('Apple monitor 24');

  console.log('Test 3: Add Apple monitor 24 to cart completed');
});
