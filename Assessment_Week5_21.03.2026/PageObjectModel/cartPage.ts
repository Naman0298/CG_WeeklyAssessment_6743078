import { Page, expect } from "@playwright/test";

export class CartPage {
    constructor(private page: Page) { }

    async verifyCartItems() {
        await expect(this.page.locator('.cart_description')).toHaveCount(2);
    }

    async proceedToCheckout() {
        await this.page.locator('text=Proceed To Checkout').click();
    }
}