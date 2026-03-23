import { test, expect } from "@playwright/test";
import { HomePage } from "../PageObjectModel/homePage";
import { SignupPage } from "../PageObjectModel/signupPagee";
import { AccountPage } from "../PageObjectModel/accountPage";
import userData from "../Utility/userData.json";
import { generateEmail } from "../Utility/emailUtility";

test("Register", async ({ page }) => {

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

    await account.deleteAccount();
});