import { Locator, Page } from "@playwright/test";

export class BasePage {
    constructor(protected page: Page) {
    }

    /**
     * Get the "Schedule a demo" button within the given parent element.
     *
     * @param parent - The parent element to search within.
     * @returns The "Schedule a demo" button.
     */
    getScheduleDemoButotnByParentEl(parent: Locator) {
        return parent.locator(`//a[contains(text(),'Schedule a demo')]`)
    }
}
