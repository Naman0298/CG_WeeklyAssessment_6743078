import { test } from "@playwright/test";
import { HomePage } from "../PageObjectModel/homePage";
import { SignupPage } from "../PageObjectModel/signupPagee";
import { AccountPage } from "../PageObjectModel/accountPage";
import { ContactPage } from "../PageObjectModel/contactPage";
import userData from "../Utility/userData.json";
import { generateEmail } from "../Utility/emailUtility";

test("Full Integration Flow: Signup + Subscription + Contact Us", async ({ page }) => {

    const home = new HomePage(page);
    const signup = new SignupPage(page);
    const account = new AccountPage(page);
    const contact = new ContactPage(page);

    const testData = {
        ...userData,
        email: generateEmail()
    };

    await home.navigate();
    await home.verifyHomePage();

    await home.clickSignupLogin();
    await signup.verifySignupVisible();

    await signup.enterSignupDetails(testData.name, testData.email);
    await signup.clickSignup();

    await account.fillAccountInfo(testData);
    await account.verifyAccountCreated();
    await account.clickContinue();

    await account.verifyLoggedIn(testData.name);

    await home.scrollToFooter();
    await home.verifySubscriptionText();

    await home.subscribe(testData.email);
    await home.verifySubscriptionSuccess();

    await contact.openContactPage();
    await contact.verifyPageLoaded();

    await contact.fillForm(testData);
    await contact.submitForm();

    await contact.verifySuccess();

    await contact.goHome();
    await home.verifyHomePage();

    await account.deleteAccount();
});