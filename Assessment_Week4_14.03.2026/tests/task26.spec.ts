import { test, expect } from '@playwright/test';
import user from '../testdata/bookUser.json';

test('Register → Login → Add Book → Verify → Logout', async ({ page }) => {

    await page.goto('https://demoqa.com/register');

    await page.waitForSelector('#firstname');
    await page.fill('#firstname', user.firstName);
    await page.fill('#lastname', user.lastName);
    await page.fill('#userName', user.username);
    await page.fill('#password', user.password);
    await page.click('#register');

    await page.goto('https://demoqa.com/login');

    await page.waitForSelector('#userName');
    await page.fill('#userName', user.username);
    await page.fill('#password', user.password);
    await page.click('#login');

    await expect(page).toHaveURL(/profile/);

    await page.goto('https://demoqa.com/books');

    await page.waitForSelector('#searchBox');
    await page.fill('#searchBox', user.bookName);
    await page.click(`text=${user.bookName}`);

    await page.waitForSelector('text=Add To Your Collection');

    page.once('dialog', dialog => dialog.accept());
    await page.click('text=Add To Your Collection');

    await page.goto('https://demoqa.com/profile');

    await page.waitForSelector(`text=${user.bookName}`);
    await expect(page.locator(`text=${user.bookName}`)).toBeVisible();
    await page.screenshot({ path: 'screenshot/task26.png', fullPage: true });

    await page.click('#submit');

    await expect(page).toHaveURL(/login/);

});