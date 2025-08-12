import { test, expect } from '@playwright/test';
import laptopLocators from './locators/laptopLocators';

// Test 1 - Laptops List Check
test('Laptops list check', async ({ page }) => {
  console.log('Test 1: Laptops list check started');
  await page.goto('https://www.demoblaze.com/index.html');

  await page.click(laptopLocators.laptopsCategoryLink);

  const laptopItems = page.locator(laptopLocators.laptopItems);
  await expect(laptopItems.first()).toBeVisible();

  const count = await laptopItems.count();
  console.log(`Number of laptops found: ${count}`);

  await expect(laptopItems).toHaveCount(6);

  const products = await laptopItems.allTextContents();
  console.log('Laptops found:', products);

  // Optional assertions:
  // expect(products).toContain('MacBook air');
  // expect(products).toContain('MacBook Pro');

  console.log('Test 1: Laptops list check completed');
});

// Test 2 - Product Details Verification
test('Verify MacBook air details', async ({ page }) => {
  console.log('Test 2: Verify MacBook air details started');
  await page.goto('https://www.demoblaze.com/index.html');

  await page.click(laptopLocators.laptopsCategoryLink);
  await page.click(laptopLocators.macBookAirLink);

  await expect(page.locator(laptopLocators.productName)).toHaveText('MacBook air');
  await expect(page.locator(laptopLocators.productPrice)).toContainText('$700');
  await expect(page.locator(laptopLocators.productMoreInfo)).toBeVisible();

  console.log('Test 2: Verify MacBook air details completed');
});

// Test 3 - Add to Cart and Verify
test('Add MacBook air to cart and verify', async ({ page }) => {
  console.log('Test 3: Add MacBook air to cart started');
  await page.goto('https://www.demoblaze.com/index.html');

  await page.click(laptopLocators.laptopsCategoryLink);
  await page.click(laptopLocators.macBookAirLink);

  page.once('dialog', dialog => {
    console.log('Alert appeared:', dialog.message());
    dialog.accept();
  });
  await page.click(laptopLocators.addToCartButton);

  // Wait to ensure backend processing
  await page.waitForTimeout(1000);

  await page.click(laptopLocators.cartLink);
  await page.waitForSelector(laptopLocators.cartTableRows);

  const cartProductName = await page.locator(laptopLocators.cartProductNameCell).textContent();
  console.log('Product in cart:', cartProductName);

  await expect(page.locator(laptopLocators.cartProductNameCell)).toHaveText('MacBook air');

  console.log('Test 3: Add MacBook air to cart completed');
});
