import { test } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://www.cricbuzz.com/");
  await page.getByRole("link", { name: "Live Scores" }).click();
  await page.getByRole("link", { name: "1st T20I • Kuala Lumpur," }).click();
  let runs = await page
    .locator(
      '//div[@class="flex justify-center items-center text-sm font-bold wb:font-normal"]',
    )
    .first()
    .innerText();

  let player1 = await page
    .locator(
      '//div[@class="grid scorecard-bat-grid tb:px-1 py-1 tb:scorecard-bat-grid-web wb:scorecard-bat-grid-web"]//a',
    )
    .first()
    .innerText();
  console.log(`Run of ${player1} is `, runs);
     await page.screenshot({path:'screenshot/task10.png'});
});