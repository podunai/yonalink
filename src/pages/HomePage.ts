import { Locator, Page } from "@playwright/test";

export class HomePage {
  readonly navigationHeader: Locator;

  constructor(protected page: Page) {
    this.navigationHeader = this.page.locator(`//*[@role="navigation"]`);
  }

  /*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Navigates to the home page.
   *
   * @returns A promise that resolves when the page has finished loading.
   */
  /*******  e2ee0553-c492-467c-9013-edbff89de202  *******/
  async goto() {
    await this.page.goto("");
  }
}
