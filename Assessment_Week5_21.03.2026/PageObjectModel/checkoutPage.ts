import { Page, expect } from "@playwright/test";

export class CheckoutPage {
    constructor(private page: Page) { }

    async placeOrder(comment: string) {
        await expect(this.page.locator('text=Review Your Order')).toBeVisible();

        await this.page.locator('textarea[name="message"]').fill(comment);
        await this.page.locator('text=Place Order').click();
    }

    async enterPayment(data: any) {
        await this.page.locator('[data-qa="name-on-card"]').fill(data.cardName);
        await this.page.locator('[data-qa="card-number"]').fill(data.cardNumber);
        await this.page.locator('[data-qa="cvc"]').fill(data.cvc);
        await this.page.locator('[data-qa="expiry-month"]').fill(data.expiryMonth);
        await this.page.locator('[data-qa="expiry-year"]').fill(data.expiryYear);

        await this.page.locator('[data-qa="pay-button"]').click();
    }

    async verifyOrderSuccess() {
        await expect(this.page.getByRole('heading', { name: 'Order Placed!' }))
            .toBeVisible();

        await expect(this.page.getByText('Your order has been confirmed!'))
            .toBeVisible();
    }
}