import { Page, expect } from '@playwright/test'

export class HomePage {
    constructor(private page: Page) { }

    async navigate() {
        // Intercept window.open and target="_blank" to force opening in the same tab
        await this.page.context().addInitScript(() => {
            window.open = function (url) {
                if (url) {
                    window.location.href = url;
                }
                return window;
            };

            const observer = new MutationObserver(() => {
                document.querySelectorAll('a[target="_blank"]').forEach(a => {
                    a.removeAttribute('target');
                });
            });
            observer.observe(document.documentElement, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['target']
            });
        });

        await this.page.goto('https://www.magicbricks.com/', {
            waitUntil: 'domcontentloaded',
            timeout: 60000
        })
        // Wait for keyword input to be visible to ensure page has loaded
        await this.page.locator('#keyword').waitFor({
            state: 'visible',
            timeout: 20000
        })
    }

    async closePopups() {
        await this.page.keyboard.press('Escape')
    }

    async verifyHomePage() {
        await expect(this.page).toHaveTitle(/MagicBricks/)
    }

    async selectBuy() {
        await this.page.locator('#buyheading').click({
            force: true
        })
    }

    async selectRent() {
        await this.page.locator('#rentheading').click({
            force: true
        })
    }

    async enterCity(city: string) {
        const cityInput = this.page.locator('#keyword')

        await cityInput.waitFor({
            state: 'visible'
        })

        // Wait a bit for the default city tag (e.g. Bangalore) to load and render
        await this.page.waitForTimeout(3000)

        // Print DOM structure of tag container for debugging
        const tagBoxHtml = await this.page.evaluate(() => {
            const input = document.getElementById('keyword');
            return input ? input.parentElement?.outerHTML : 'input not found';
        });
        console.log("CITY TAG BOX HTML AFTER 3S:", tagBoxHtml);

        // Try to clear existing selected city tags (like Bangalore)
        await this.page.evaluate(() => {
            const tagBox = document.getElementById('keyword_autoSuggestSelectedDiv');
            if (tagBox) {
                // Click close button on all tags (children that are not the input)
                Array.from(tagBox.children).forEach(child => {
                    if (child.id !== 'keyword') {
                        const closeBtn = child.querySelector('[class*="close"], [class*="remove"], [class*="delete"], span, a') || child;
                        (closeBtn as HTMLElement).click();
                    }
                });
            }
        });
        await this.page.waitForTimeout(1000)

        // Re-locate the input element fresh in case of DOM re-creation
        const freshInput = this.page.locator('#keyword')
        await freshInput.waitFor({ state: 'visible' })
        
        // Click input and parent div, and run browser-side focus/click
        await this.page.locator('#keyword_autoSuggestSelectedDiv').click({ force: true }).catch(() => {})
        await freshInput.click({ force: true }).catch(() => {})
        await this.page.evaluate(() => {
            const input = document.getElementById('keyword');
            if (input) {
                input.focus();
                input.click();
            }
            const $ = (window as any).jQuery || (window as any).$;
            if ($) {
                $('#keyword').focus().click();
            }
        });
        await this.page.waitForTimeout(3000) // Wait for dropdown list to render

        // Select the city directly from the popular cities dropdown list
        const cityLink = this.page.locator('.city-dropdown-wrap a, .city-drop-link-group a, .mb-search__suggest__list a, .mb-search__suggest a, #keyword_autoSuggestDiv a').filter({
            hasText: new RegExp('^' + city + '$', 'i')
        }).first()

        // Force click the link directly to bypass any visibility/actionability issues
        await cityLink.click({ force: true })
        await this.page.waitForTimeout(2000)
    }

    async search() {
        const searchButton = this.page.getByText('Search', {
            exact: true
        }).last()

        await searchButton.waitFor({
            state: 'visible'
        })

        await searchButton.click({
            force: true
        })

        await this.page.waitForTimeout(5000)
    }
}