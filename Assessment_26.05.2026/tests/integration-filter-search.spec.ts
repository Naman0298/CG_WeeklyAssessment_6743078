import { test } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { SearchPage } from '../pages/SearchPage'
import data from '../test-data/data.json'

test('search and filter integration', async ({ page }) => {
    const homePage = new HomePage(page)
    const searchPage = new SearchPage(page)

    await homePage.navigate()
    await homePage.closePopups()

    await homePage.selectBuy()
    await homePage.enterCity(data.buyCity)
    await homePage.search()

    await searchPage.verifyResults()

    await searchPage.applyPropertyType(data.propertyType)
    await searchPage.applyBhk(data.bhkType)
})