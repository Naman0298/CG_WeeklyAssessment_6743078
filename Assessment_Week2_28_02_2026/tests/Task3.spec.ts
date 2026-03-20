import {test} from "@playwright/test"

test("task3",async({page})=>{
    await page.goto("https://demoapps.qspiders.com/ui?scenario=1");
    await page.locator('//input[@id="name"]').fill("AdityaTomar ");
    await page.locator('//input[@id="email"]').fill("tomaraditya948@gmail.com");
    await page.locator('//input[@id="password"]').fill("Adi@12u");
    await page.locator('button[type="submit"]').click();
    await page.locator('//input[@id="email"]').fill("tomaraditya@gmail.com");
    await page.locator('//input[@id="password"]').fill("Adi@12u");
        await page.locator('button[type="submit"]').click();
        await page.screenshot({ path:'screenshot/task3.png'});

});