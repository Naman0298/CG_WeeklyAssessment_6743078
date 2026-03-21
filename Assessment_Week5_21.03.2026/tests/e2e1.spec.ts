import { test } from "@playwright/test";
import { HomePage } from "../PageObjectModel/homePage";
import { SignupPage } from "../PageObjectModel/signupPagee";
import { AccountPage } from "../PageObjectModel/accountPage";
import { ProductPage } from "../PageObjectModel/productPage";
import { CartPage } from "../PageObjectModel/cartPage";
import { CheckoutPage } from "../PageObjectModel/checkoutPage";
import userData from "../Utility/userData.json";
import { generateEmail } from "../Utility/emailUtility";

test("Full E2E Automation Exercise Flow", async ({ page }) => {

    const uniqueEmail = generateEmail();
    const testData = {
        ...userData,
        email: uniqueEmail
    };
    const home = new HomePage(page);
    const signup = new SignupPage(page);
    const account = new AccountPage(page);
    const product = new ProductPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

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
    await product.addProduct(0);
    await page.getByText('Continue Shopping').click();

    await product.addProduct(1);
    await page.getByText('View Cart').click();

    await cart.verifyCartItems();
    await cart.proceedToCheckout();

    await checkout.placeOrder("Test Order");
    await checkout.enterPayment(testData);
    await checkout.verifyOrderSuccess();

    await account.deleteAccount();
});