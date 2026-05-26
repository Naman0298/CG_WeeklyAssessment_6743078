import { test } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { SearchPage } from '../pages/SearchPage'
import data from '../test-data/data.json'

test('rent property flow', async ({ page }) => {
    const homePage = new HomePage(page)
    const searchPage = new SearchPage(page)

    await homePage.navigate()
    await homePage.closePopups()

    await homePage.selectRent()
    await homePage.enterCity(data.rentCity)
    await homePage.search()

    await searchPage.verifyResults()
})