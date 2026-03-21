import { Page, expect } from "@playwright/test";

export class SignupPage {
    constructor(private page: Page) { }

    async verifySignupVisible() {
        await expect(this.page.locator("text=New User Signup!")).toBeVisible();
    }

    async enterSignupDetails(name: string, email: string) {
        await this.page.locator('[data-qa="signup-name"]').fill(name);
        await this.page.locator('[data-qa="signup-email"]').fill(email);
    }

    async clickSignup() {
        await this.page.locator('[data-qa="signup-button"]').click();
    }
}