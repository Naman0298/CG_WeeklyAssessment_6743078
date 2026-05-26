import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { SearchPage } from '../pages/SearchPage'
import { PropertyPage } from '../pages/PropertyPage'
import { ResultsPage } from '../pages/ResultsPage'
import data from '../test-data/data.json'

test('property details validation flow', async ({ page }) => {
    const homePage = new HomePage(page)
    const searchPage = new SearchPage(page)
    const propertyPage = new PropertyPage(page)
    const resultsPage = new ResultsPage(page)

    await homePage.navigate()
    await homePage.closePopups()

    await homePage.selectBuy()
    await homePage.enterCity(data.commercialCity)
    await homePage.search()

    await resultsPage.openFirstProperty()

    await expect(
        page.getByText('Get Contact Details').first()
    ).toBeVisible()

    await searchPage.verifyResults()

    await searchPage.openFirstProperty()

    await propertyPage.verifyPropertyDetails()
    await propertyPage.verifyPriceVisible()
})