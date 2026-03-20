import { test, expect } from "@playwright/test"
import fs from "fs"
import path from "path"

type Student = {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
}

const students: Student[] = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../testdata/students.json"), "utf-8")
)

for (const student of students) {

    test(`Student Registration: ${student.firstName}`, async ({ page }) => {

        await page.goto("https://demoqa.com/automation-practice-form")

        await page.fill("#firstName", student.firstName)
        await page.fill("#lastName", student.lastName)
        await page.fill("#userEmail", student.email)

        await page.locator("label[for='gender-radio-1']").click()
        await page.fill("#userNumber", student.phone)

        await page.click("#dateOfBirthInput")
        await page.selectOption(".react-datepicker__month-select", "5")
        await page.selectOption(".react-datepicker__year-select", "2000")
        await page.locator(".react-datepicker__day--015").click()

        await page.locator("label[for='hobbies-checkbox-1']").click()

        await page.setInputFiles("#uploadPicture", "testdata/sample.jpg")

        await page.fill("#currentAddress", student.address)

        await page.locator("#state").click()
        await page.locator("div[id^='react-select'][id*='option']").first().click()

        await page.locator("#city").click()
        await page.locator("div[id^='react-select'][id*='option']").first().click()

        await page.click("#submit")

        await expect(page.locator("#example-modal-sizes-title-lg")).toBeVisible()

        const name = await page.locator("//td[text()='Student Name']/following-sibling::td").textContent()
        expect(name).toContain(student.firstName)

        const email = await page.locator("//td[text()='Student Email']/following-sibling::td").textContent()
        expect(email).toContain(student.email)

        await page.click("#closeLargeModal")
        await page.screenshot({ path: 'screenshot/task24.png', fullPage: true });

    })

}