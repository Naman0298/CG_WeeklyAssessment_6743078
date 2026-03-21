import { Page, expect } from "@playwright/test";

export class HomePage {
    constructor(private page: Page) { }

    async navigate() {
        await this.page.goto("http://automationexercise.com");
    }

    async verifyHomePage() {
        await expect(this.page).toHaveTitle(/Automation Exercise/);
    }

    async clickSignupLogin() {
        await this.page.getByRole('link', { name: 'Signup / Login' }).click();
    }

    async clickProducts() {
        await this.page.getByRole('link', { name: 'Products' }).click();
    }

    async clickCart() {
        await this.page.getByRole('link', { name: 'Cart' }).click();
    }

    async scrollToFooter() {
        await this.page.locator('footer').scrollIntoViewIfNeeded();
    }

    async verifySubscriptionText() {
        await expect(this.page.getByText('SUBSCRIPTION')).toBeVisible();
    }

    async subscribe(email: string) {
        await this.page.locator('#susbscribe_email').fill(email);
        await this.page.locator('#subscribe').click();
    }

    async verifySubscriptionSuccess() {
        await expect(
            this.page.getByText('You have been successfully subscribed!')
        ).toBeVisible();
    }
}