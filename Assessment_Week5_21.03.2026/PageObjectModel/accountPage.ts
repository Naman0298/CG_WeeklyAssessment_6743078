import { Page, expect } from "@playwright/test";

export class AccountPage {
    constructor(private page: Page) { }

    async fillAccountInfo(data: any) {
        await expect(this.page.locator("text=ENTER ACCOUNT INFORMATION")).toBeVisible();

        await this.page.locator('#id_gender1').check();
        await this.page.locator('#password').fill(data.password);

        await this.page.locator('#days').selectOption(data.day);
        await this.page.locator('#months').selectOption(data.month);
        await this.page.locator('#years').selectOption(data.year);

        await this.page.locator('#newsletter').check();
        await this.page.locator('#optin').check();

        await this.page.locator('#first_name').fill(data.firstName);
        await this.page.locator('#last_name').fill(data.lastName);
        await this.page.locator('#company').fill(data.company);
        await this.page.locator('#address1').fill(data.address1);
        await this.page.locator('#address2').fill(data.address2);

        await this.page.locator('#country').selectOption(data.country);
        await this.page.locator('#state').fill(data.state);
        await this.page.locator('#city').fill(data.city);
        await this.page.locator('#zipcode').fill(data.zipcode);
        await this.page.locator('#mobile_number').fill(data.mobile);

        await this.page.locator('[data-qa="create-account"]').click();
    }

    async verifyAccountCreated() {
        await expect(this.page.locator("text=ACCOUNT CREATED!")).toBeVisible();
    }

    async clickContinue() {
        await this.page.locator('[data-qa="continue-button"]').click();
    }

    async verifyLoggedIn(name: string) {
        await expect(this.page.locator(`text=Logged in as ${name}`)).toBeVisible();
    }

    async deleteAccount() {
        await this.page.locator('text=Delete Account').click();
        await expect(this.page.locator('text=ACCOUNT DELETED!')).toBeVisible();
        await this.page.locator('text=Continue').click();
    }
}