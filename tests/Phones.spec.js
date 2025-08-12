import { test, expect } from '@playwright/test';
import phonesLocator from './locators/phonesLocator';

// Test 1 - Mobiles List Check
test('Mobiles list check', async ({ page }) => {
  console.log('Test 1: Mobiles list check started');
  await page.goto('https://www.demoblaze.com/index.html');
  await page.click(phonesLocator.phonesCategoryLink);
  
  await page.waitForSelector(phonesLocator.phoneItems, { timeout: 10000 });

  const products = await page.locator(phonesLocator.phoneItems).allTextContents();
  console.log('Phones found:', products);

  // Optional checks:
  // expect(products).toContain('Samsung galaxy s6');
  // expect(products).toContain('Nokia lumia 1520');

  console.log('Test 1: Mobiles list check completed');
});

// Test 2 - Product Details Verification
test('Verify Samsung galaxy s6 details', async ({ page }) => {
  console.log('Test 2: Verify Samsung galaxy s6 details started');
  await page.goto('https://www.demoblaze.com/index.html');
  await page.click(phonesLocator.phonesCategoryLink);

  await Promise.all([
    page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
    page.click(phonesLocator.samsungGalaxyS6Link),
  ]);

  await expect(page.locator(phonesLocator.productName)).toHaveText('Samsung galaxy s6');
  await expect(page.locator(phonesLocator.productPrice)).toContainText('$360');
  await expect(page.locator(phonesLocator.productMoreInfo)).toBeVisible();

  console.log('Test 2: Verify Samsung galaxy s6 details completed');
});

// Test 3 - Add to Cart and Verify
test('Add Samsung galaxy s6 to cart and verify', async ({ page }) => {
  console.log('Test 3: Add Samsung galaxy s6 to cart started');
  await page.goto('https://www.demoblaze.com/index.html');
  await page.click(phonesLocator.phonesCategoryLink);

  await Promise.all([
    page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
    page.click(phonesLocator.samsungGalaxyS6Link),
  ]);

  page.once('dialog', dialog => {
    console.log('Alert appeared:', dialog.message());
    dialog.accept();
  });
  await page.click(phonesLocator.addToCartButton);

  await page.waitForTimeout(1000);

  await page.click(phonesLocator.cartLink);
  await page.waitForSelector(phonesLocator.cartTableRows);

  const cartProductName = await page.locator(phonesLocator.cartProductNameCell).textContent();
  console.log('Product in cart:', cartProductName);

  // Correct - Samsung galaxy s6
  await expect(page.locator(phonesLocator.cartProductNameCell)).toHaveText('Samsung galaxy s8');

  console.log('Test 3: Add Samsung galaxy s6 to cart completed');
});
