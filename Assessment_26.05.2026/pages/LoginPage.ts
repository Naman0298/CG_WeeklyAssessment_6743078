import { Page, expect } from '@playwright/test'

export class LoginPage {
    constructor(public page: Page) { }

    async openLogin() {
        const loginButton = this.page.getByText('Login', {
            exact: true
        }).first()

        await loginButton.hover()
        await this.page.waitForTimeout(1000)
        await loginButton.click({ force: true })
        await this.page.waitForTimeout(2000)

        const signUpButton = this.page.locator('.mb-login__drop-cta').first()
        await signUpButton.waitFor({ state: 'visible' })

        try {
            const [newPage] = await Promise.all([
                this.page.context().waitForEvent('page', { timeout: 10000 }),
                signUpButton.click({ force: true })
            ])
            await newPage.waitForLoadState('domcontentloaded')
            this.page = newPage
        } catch (e) {
            // Fallback in case it navigated in the same page
            await this.page.waitForLoadState('domcontentloaded')
        }
    }

    async enterMobile(number: string) {
        const mobileInput = this.page.locator('input[type="tel"]')

        await mobileInput.waitFor({
            state: 'visible',
            timeout: 30000
        })

        await mobileInput.fill(number)
    }

    async continueLogin() {
        await this.page.getByRole('button').filter({
            hasText: 'Next'
        }).click({
            force: true
        })
    }

    async verifyOtpPage() {
        await expect(
            this.page.locator('text=OTP').first()
        ).toBeVisible()
    }
}