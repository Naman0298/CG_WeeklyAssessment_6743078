import { Page, expect } from "@playwright/test";

export class ContactPage {
    constructor(private page: Page) { }

    async openContactPage() {
        await this.page.getByRole('link', { name: 'Contact us' }).click();
    }

    async verifyPageLoaded() {
        await expect(this.page.getByText('GET IN TOUCH')).toBeVisible();
    }

    async fillForm(data: any) {
        await this.page.locator('[data-qa="name"]').fill(data.name);
        await this.page.locator('[data-qa="email"]').fill(data.email);
        await this.page.locator('[data-qa="subject"]').fill("Test Subject");
        await this.page.locator('[data-qa="message"]').fill("This is a test message");

        await this.page.locator('input[name="upload_file"]')
            .setInputFiles('tests/testdata/sample.txt');
        await this.page.waitForTimeout(1000);
    }

    async submitForm() {
        this.page.once('dialog', async dialog => {
            await dialog.accept();
        });

        await this.page.locator('[data-qa="submit-button"]').click();

        await this.page.waitForLoadState('domcontentloaded');
    }

    async verifySuccess() {
        const successMsg = this.page.locator('#contact-page .alert-success');

        await expect(successMsg).toBeVisible();
        await expect(successMsg).toContainText('Success!');
    }

    async goHome() {
        await this.page.getByRole('link', { name: 'Home' }).first().click();
    }
}