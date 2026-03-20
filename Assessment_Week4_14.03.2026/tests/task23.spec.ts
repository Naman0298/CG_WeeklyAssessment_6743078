import { test, expect } from '@playwright/test';
import data from '../testdata/products.json';

test('Product Search → Product Details Validation', async ({ page }) => {
  test.setTimeout(180000);

  await page.goto('https://www.amazon.in');

  if (await page.locator('#captchacharacters').isVisible({ timeout: 2000 })) {
    console.log("Captcha detected on homepage! Please solve it manually. Waiting 30s...");
    await page.waitForTimeout(30000);
  }

  for (const product of data.products) {
    await page.fill('#twotabsearchtextbox', product);

    await page.press('#twotabsearchtextbox', 'Enter');

    await page.waitForLoadState('domcontentloaded');

    if (await page.locator('#captchacharacters').isVisible({ timeout: 2000 })) {
      console.log("Captcha detected after search! Please solve it manually. Waiting 30s...");
      await page.waitForTimeout(30000);
    }

    const searchResultLocator = page.locator('[data-component-type="s-search-result"] h2 a');
    await searchResultLocator.first().waitFor({ state: 'visible', timeout: 30000 });

    const firstProduct = searchResultLocator.first();

    const firstProductTitle = await firstProduct.textContent();
    console.log(`\nSearch Result Title: ${firstProductTitle?.trim()}`);

    const [productPage] = await Promise.all([
      page.context().waitForEvent('page'),
      firstProduct.click()
    ]);

    await productPage.waitForLoadState('domcontentloaded');

    if (await productPage.locator('#captchacharacters').isVisible({ timeout: 2000 })) {
      console.log("Captcha detected on product page! Please solve it manually. Waiting 30s...");
      await productPage.waitForTimeout(30000);
    }

    const productTitleLocator = productPage.locator('#productTitle');
    await productTitleLocator.waitFor({ state: 'visible', timeout: 30000 });
    const productTitle = await productTitleLocator.textContent();
    expect(productTitle).toBeTruthy();

    const priceLocator = productPage.locator('.a-price-whole').first();
    const productPrice = await priceLocator.textContent();
    expect(productPrice).toBeTruthy();

    const ratingLocator = productPage.locator('#acrPopover, span[data-hook="rating-out-of-text"]').first();
    const rating = await ratingLocator.textContent();
    expect(rating).toBeTruthy();

    console.log(`Product details page title: ${productTitle?.trim()}`);
    console.log(`Product Price: ₹${productPrice?.trim()}`);
    console.log(`Product Rating: ${rating?.trim()}`);

    await productPage.close();

    await page.fill('#twotabsearchtextbox', '');
  }
});