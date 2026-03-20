import {test} from "@playwright/test"

test("tokyo_olympics",async({page})=>{
    await page.goto("https://www.olympics.com/en/olympic-games/tokyo-2020");
    await page.locator('//span[@class="sc-330a00-4 irujJD"]/a[@data-cy="link"]/button[@class="sc-daa2e5c2-0 fTQgVI right undefined"]').click();
    let silvermedal=await page.locator('//div[@data-medal-id="silver-medals-7"]/span').textContent();
    console.log("Silver Medal's of ZHANG Yufei",silvermedal);
    await page.screenshot({path:'screenshot/task9.png'});
})