import { Page, expect } from '@playwright/test'

export class PropertyPage {
    constructor(private page: Page) { }

    async verifyPropertyDetails() {
        await expect(
            this.page.locator('text=Get Contact Details').first()
        ).toBeVisible()
    }

    async verifyPriceVisible() {
        await expect(
            this.page.locator('text=₹').first()
        ).toBeVisible()
    }
}