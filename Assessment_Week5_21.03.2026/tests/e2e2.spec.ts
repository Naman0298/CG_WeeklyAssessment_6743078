import { test } from "@playwright/test";
import { HomePage } from "../PageObjectModel/homePage";
import { SignupPage } from "../PageObjectModel/signupPagee";
import { AccountPage } from "../PageObjectModel/accountPage";
import { ProductPage } from "../PageObjectModel/productPage";
import userData from "../Utility/userData.json";
import { generateEmail } from "../Utility/emailUtility";

test("Brand + Review E2E Flow", async ({ page }) => {

    const home = new HomePage(page);
    const signup = new SignupPage(page);
    const account = new AccountPage(page);
    const product = new ProductPage(page);

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

    await home.clickProducts();

    await product.verifyBrandsVisible();

    await product.clickBrand("Polo");

    await product.verifyBrandPage("Polo");

    await product.clickViewProduct(0);

    await product.addReview(
        testData.name,
        testData.email,
        "This is a great product!"
    );

    await product.verifyReviewSuccess();

    await product.clickBrand("H&M");

    await product.verifyBrandPage("H&M");

    await product.clickViewProduct(0);

    await product.addReview(
        testData.name,
        testData.email,
        "This is a great product!"
    );

    await product.verifyReviewSuccess();

    await account.deleteAccount();
});