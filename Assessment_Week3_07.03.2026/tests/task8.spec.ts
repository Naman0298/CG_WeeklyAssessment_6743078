import {test} from "@playwright/test"

test("icc ranks",async ({page})=>{
    await page.goto('https://www.icc-cricket.com/rankings')
    await page.locator('//a[@href="/rankings/batting/womens/odi"]').click();
    let ranking=await page.locator('//span[@class=" font-h4 pr-4 font-extrabold uppercase text-primary "]').textContent();
    console.log("Smriti Mandhana rank : ",ranking);
    await page.screenshot({path:"screenshot/task8.png"});
})