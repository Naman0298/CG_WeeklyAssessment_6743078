import { test } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { LoginPage } from '../pages/LoginPage'
import data from '../test-data/data.json'

test('login and search integration', async ({ page }) => {
    const homePage = new HomePage(page)
    const loginPage = new LoginPage(page)

    await homePage.navigate()
    await homePage.closePopups()

    await loginPage.openLogin()

    await loginPage.enterMobile(data.mobileNumber)

    await loginPage.continueLogin()

    await loginPage.verifyOtpPage()
})