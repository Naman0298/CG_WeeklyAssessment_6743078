import {selectors, test} from "@playwright/test"
import { text } from "stream/consumers"

test("Task 4", async ({page}) => {
await page.goto("https://www.olympics.com/en/olympic-games/tokyo-2020")
await page.locator("//button[@id='onetrust-accept-btn-handler']").click()

await page.locator("//p[@data-cy='ocs-text-module']").click()

let medalcount = await page.locator("//span[@class='Medal-styles__Medal-sc-645148e1-1 fqHqIZ'][@data-cy='medal-main']/span[@data-cy='ocs-text-module'][@class='OcsText-styles__StyledText-sc-bf256156-0 cjPVFu text--sm-body'][text()='2']").nth(2).textContent()
console.log(medalcount);

await page.screenshot({path:"screenshot/Task4.png", fullPage:true})

})