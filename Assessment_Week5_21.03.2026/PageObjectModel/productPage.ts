import { Page, expect } from "@playwright/test";

export class ProductPage {
    constructor(private page: Page) { }

    async addProduct(index: number) {
        const product = this.page.locator('.product-image-wrapper').nth(index);

        await product.hover();

        await product.locator('a.add-to-cart').first().click();
    }

    async navigateToProducts() {
        await this.page.getByRole('link', { name: 'Products' }).click();
    }

    async verifyBrandsVisible() {
        await expect(this.page.locator('text=Brands')).toBeVisible();
    }

    async clickBrand(brandName: string) {
        await this.page.locator(`a[href*="/brand_products/${brandName}"]`).click();
    }

    async verifyBrandPage(brandName: string) {
        await expect(
            this.page.getByRole('heading', { name: `Brand - ${brandName} Products` })
        ).toBeVisible();
    }

    async clickViewProduct(index: number) {
        await this.page.locator('text=View Product').nth(index).click();
    }

    async addReview(name: string, email: string, review: string) {
        await expect(this.page.locator('text=Write Your Review')).toBeVisible();

        await this.page.locator('#name').fill(name);
        await this.page.locator('#email').fill(email);
        await this.page.locator('#review').fill(review);

        await this.page.locator('#button-review').click();
    }

    async verifyReviewSuccess() {
        await expect(this.page.locator('text=Thank you for your review.')).toBeVisible();
    }
}