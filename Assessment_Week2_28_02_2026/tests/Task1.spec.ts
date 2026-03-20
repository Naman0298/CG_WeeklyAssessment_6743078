import {test} from "@playwright/test"

test("Amazon", async ({page}) => {
    await page.goto("https://www.amazon.com/")

    await page.locator('//input[@id="twotabsearchtextbox"]').fill("shoes")
    await page.locator('//input[@id="nav-search-submit-button"]').click()
    await page.waitForTimeout(5000)
    
    let name = await page.locator('//h2[@class="a-size-base-plus a-spacing-none a-color-base a-text-normal"]').first().textContent()
    console.log(name);

    let price = await page.locator('//span[@class="a-price-whole"]').first().textContent()
    console.log(price);

    await page.screenshot({ path:'screenshot/Task1.png'});


})