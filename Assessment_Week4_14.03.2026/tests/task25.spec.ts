import { test, expect } from '@playwright/test';
import user from '../testdata/users.json';

test('E2E Register → Login → Profile → Logout', async ({ page }) => {

    await page.goto('https://demoqa.com/register');

    await page.fill('#firstname', user.firstName);
    await page.fill('#lastname', user.lastName);
    await page.fill('#userName', user.username);
    await page.fill('#password', user.password);

    await page.click('#register');

    await page.goto('https://demoqa.com/login');

    await page.fill('#userName', user.username);
    await page.fill('#password', user.password);
    await page.click('#login');
    await expect(page).toHaveURL(/profile/);
    await expect(page.locator('#userName-value')).toContainText(user.username);

    await page.screenshot({ path: 'screenshot/task25.png', fullPage: true });
    await page.click('#submit');

    await expect(page).toHaveURL(/login/);

});