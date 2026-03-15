import { expect } from '@playwright/test';
import { Page, Locator } from "@playwright/test";


export class HelperBase{
    readonly page: Page
    constructor(page: Page){
        this.page = page
    }

    async waitForNumberofSeconds(timeinSeconds: number){
        await this.page.waitForTimeout(timeinSeconds * 1000)
    }

    async isElementVisible(locator: Locator): Promise<boolean> {
        try {
            await locator.waitFor({ state: 'attached' });
            await locator.isVisible();
            return true
        } catch {
            return false;
        }
    }

    async isTextEquals(locator: Locator, text: string): Promise<boolean> {
        try {
            await locator.waitFor({ state: 'attached' });
            const textVal = (await locator.textContent())?.trim() ?? '';
            await expect(textVal).toEqual(text)
            return true
        } catch {
            return false;
        }
    }

    async waitUntilVisibleAndClick(locator: Locator): Promise<void> {
        try {
            await locator.waitFor({ state: 'visible', timeout: 5000 });
            await locator.click();
        } catch (error) {
            console.error(`Failed to click locator: ${error}`);
        }
    }

    async waitUntilElementVisible(locator: Locator): Promise<void> {
        try {
            await locator.waitFor({ state: 'visible', timeout: 5000 });
        } catch (error) {
            console.error(`Failed to locate element: ${error}`);
        }
    }

    async clickViaJS(locator: Locator): Promise<void> {
        try {
            // Wait until the element exists in the DOM
            await locator.waitFor({ state: 'attached', timeout: 5000 });

            // Trigger native JS click
            await locator.evaluate((el: HTMLElement) => el.click());
        } catch (error) {
            console.error(`Failed to click element via JS: ${error}`);
            throw error;
        }
    }

       async clearAndfillText(locator: Locator, text: string): Promise<void> {
        try {
            await locator.waitFor({ state: 'visible', timeout: 5000 });
            locator.clear()
            locator.fill(text)
        } catch (error) {
            console.error(`Failed to locate element: ${error}`);
        }
    }


    async scrollToPageEnd(): Promise<void> {
        let previousHeight = await this.page.evaluate(() => document.body.scrollHeight);

        while (true) {
            // Scroll down by setting scrollTop to the bottom
            await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

            // Wait a bit for lazy-loaded content to render
            await this.page.waitForTimeout(1000);

            // Check new scroll height
            const newHeight = await this.page.evaluate(() => document.body.scrollHeight);

            if (newHeight === previousHeight) {
            // No more content loaded, break out
            break;
            }
            previousHeight = newHeight;
        }
    }

    async getElementText(locator: Locator): Promise<string> {
        let text = ''
        try {
            text = (await locator.innerText()).trim()
        } catch (error) {
            console.error(`Failed to get the element text: ${error}`);
        }
        return text
    }

}