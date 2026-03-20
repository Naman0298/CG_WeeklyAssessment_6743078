import {test} from "@playwright/test"

test("Task 2",async({page})=>{

    await page.goto("https://www.flipkart.com/");
    await page.locator('//input[@title="Search for Products, Brands and More"]').first().fill("phones");
    await page.keyboard.press("Enter");
    await page.locator('//div[@class="ybaCDx"]').first().click();
    let price = await page.locator('//div[@class="hZ3P6w DeU9vF"]').nth(3).textContent()
    console.log(price);
    await page.screenshot({path:"screenshot/Task2.png"});
});