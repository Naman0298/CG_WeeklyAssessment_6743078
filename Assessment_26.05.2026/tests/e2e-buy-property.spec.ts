import { test } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { SearchPage } from '../pages/SearchPage'
import { PropertyPage } from '../pages/PropertyPage'
import data from '../test-data/data.json'

test('buy property flow', async ({ page }) => {
  const homePage = new HomePage(page)
  const searchPage = new SearchPage(page)
  const propertyPage = new PropertyPage(page)

  await homePage.navigate()
  await homePage.closePopups()
  await homePage.verifyHomePage()

  await homePage.selectBuy()
  await homePage.enterCity(data.buyCity)
  await homePage.search()

  await searchPage.verifyResults()

  await searchPage.applyBhk(data.bhkType)

  await searchPage.openFirstProperty()

  await propertyPage.verifyPropertyDetails()
})