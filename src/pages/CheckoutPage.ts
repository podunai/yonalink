import { Locator, Page } from "@playwright/test";

export class CheckoutPage {
  readonly page: Page;
  readonly orderSummary: Locator;
  readonly checkoutButton: Locator;
  readonly productTable: Locator;
  readonly completeOrderButton: Locator;
  readonly totalCartPrice: Locator;
  readonly title: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('//h1[contains(text(), "Checkout")]');
    this.orderSummary = page.locator('//*[@id="orderSummary"]');
    this.checkoutButton = page.locator('//*[@id="checkout"]');
    this.productTable = page.locator(".table-responsive");
    this.completeOrderButton = page.locator("#btnCompleteOrder");
    this.totalCartPrice = page.locator('//div[@id="totalCartPrice"]');
  }

  /**
   * Retrieves a table element by its text
   * @param text - text to be searched in the table
   * @returns Locator pointing to the table element
   */
  getTableElementByText(text: string): Locator {
    return this.page.locator(`//table//td[contains(text(), "${text}")]`);
  }

  /**
   * Retrieves a section element by its text
   * @param section - text to be searched in the sections
   * @returns Locator pointing to the section element
   */
  getSectionElement(section: string): Locator {
    return this.page.locator(`//span[contains(text(), "${section}")]`);
  }
}
