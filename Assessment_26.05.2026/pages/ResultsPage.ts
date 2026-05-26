import { Page, Locator } from '@playwright/test'

export class ResultsPage {
    readonly page: Page
    readonly firstProperty: Locator

    constructor(page: Page) {
        this.page = page

        this.firstProperty = page.locator('[class*="mb-srp__card"]').first()
    }

    async openFirstProperty() {
        const propertyCard = this.page.getByText('View Details').first()

        await propertyCard.waitFor({
            state: 'visible'
        })

        // Remove target="_blank" from links so they open in the same tab/page
        await this.page.evaluate(() => {
            document.querySelectorAll('a[target="_blank"]').forEach(a => a.removeAttribute('target'));
        })

        await propertyCard.click()

        await this.page.waitForTimeout(5000)
    }
}