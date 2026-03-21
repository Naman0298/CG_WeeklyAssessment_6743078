import { test, expect } from "@playwright/test";
import { HomePage } from "../PageObjectModel/homePage";
import { SignupPage } from "../PageObjectModel/signupPagee";
import { AccountPage } from "../PageObjectModel/accountPage";
import userData from "../Utility/userData.json";
import { generateEmail } from "../Utility/emailUtility";

test("Register → Logout → Login again", async ({ page }) => {

    const home = new HomePage(page);
    const signup = new SignupPage(page);
    const account = new AccountPage(page);

    const testData = {
        ...userData,
        email: generateEmail()
    };

    await home.navigate();
    await home.clickSignupLogin();
    await signup.enterSignupDetails(testData.name, testData.email);
    await signup.clickSignup();

    await account.fillAccountInfo(testData);
    await account.clickContinue();
    await account.verifyLoggedIn(testData.name);

    await page.getByRole('link', { name: 'Logout' }).click();

    const loginForm = page.locator('form').filter({ hasText: 'Login' });

    await loginForm.locator('[data-qa="login-email"]').fill(testData.email);
    await loginForm.locator('[data-qa="login-password"]').fill(testData.password);
    await loginForm.locator('[data-qa="login-button"]').click();
    await account.verifyLoggedIn(testData.name);

    await account.deleteAccount();
});