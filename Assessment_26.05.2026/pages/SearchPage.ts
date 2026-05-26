import { Page, expect } from '@playwright/test'

export class SearchPage {
    constructor(private page: Page) { }

    async applyPropertyType(type: string) {
        const propertyDropdown = this.page.locator('#propType_buy')

        await propertyDropdown.scrollIntoViewIfNeeded()

        await propertyDropdown.click({
            force: true
        })

        const option = this.page.locator('li:visible').filter({
            hasText: type
        }).first()

        await option.click()
    }

    async applyBhk(bhk: string) {
        const bhkDropdown = this.page.locator('#bhk')

        await bhkDropdown.scrollIntoViewIfNeeded()

        await bhkDropdown.click({
            force: true
        })

        const bhkOption = this.page.locator('li:visible').filter({
            hasText: bhk
        }).first()

        await bhkOption.click()
    }

    async verifyResults() {
        // If we navigated to the property details page, go back to the search results page
        if (this.page.url().includes('propertyDetails') || this.page.url().includes('detail')) {
            await this.page.goBack()
            await this.page.waitForLoadState('domcontentloaded')
        }

        // Assert we are on the search results page by checking for the SRP card container
        await expect(
            this.page.locator('.mb-srp__card, [class*="mb-srp__card"]').first()
        ).toBeVisible({
            timeout: 25000
        })
    }

    async openFirstProperty() {
        const propertyCard = this.page.locator('h2').first()

        await propertyCard.waitFor({
            state: 'visible'
        })

        // Remove target="_blank" from links so they open in the same tab/page
        await this.page.evaluate(() => {
            document.querySelectorAll('a[target="_blank"]').forEach(a => a.removeAttribute('target'));
        })

        await propertyCard.click()
    }
}