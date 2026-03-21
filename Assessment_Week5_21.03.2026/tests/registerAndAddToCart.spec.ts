import { test } from "@playwright/test";
import { HomePage } from "../PageObjectModel/homePage";
import { SignupPage } from "../PageObjectModel/signupPagee";
import { AccountPage } from "../PageObjectModel/accountPage";
import { ProductPage } from "../PageObjectModel/productPage";
import { CartPage } from "../PageObjectModel/cartPage";
import userData from "../Utility/userData.json";
import { generateEmail } from "../Utility/emailUtility";

test("Register → Add Product to Cart → Verify Cart", async ({ page }) => {

    const home = new HomePage(page);
    const signup = new SignupPage(page);
    const account = new AccountPage(page);
    const product = new ProductPage(page);
    const cart = new CartPage(page);

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

    await home.clickProducts();

    await product.addProduct(0);
    await page.getByText('Continue Shopping').click();

    await product.addProduct(1);
    await page.getByText('View Cart').click();

    await cart.verifyCartItems();

    await account.deleteAccount();
});