import { Locator, Page } from "@playwright/test";
import { clearPrice, clearName } from "../utils/clearString";

export class ProductPage {
  readonly page: Page;
  readonly ipAddressInput: Locator;
  readonly addonCheckbox: Locator;
  readonly addonPrice: Locator;
  readonly summaryAmount: Locator;
  readonly monthlyPrice: Locator;
  readonly continueToReviewButton: Locator;
  readonly continueToCheckoutButton: Locator;
  readonly itemTitle: Locator;
  readonly addonElement: Locator;
  readonly addonName: Locator;
  readonly orderButton: Locator;
  readonly title: Locator;

  constructor(page: Page) {
    this.page = page;
    this.ipAddressInput = page.locator('//input[contains(@id, "customfield")]');
    this.addonCheckbox = page.locator('//*[@id="productAddonsContainer"]//input[@name="addons[147]"]');
    this.summaryAmount = page.locator('//div[@class="total-due-today"]/span[@class="amt"]');
    this.monthlyPrice = page.locator('//span[@class="cycle"]');
    this.continueToReviewButton = page.locator('//*[@id="btnCompleteProductConfig"]');
    this.continueToCheckoutButton = page.locator('//*[@id="checkout"]');
    this.itemTitle = page.locator('//span[@class="item-title"]');
    this.addonElement = page.locator(`//*[@id="productAddonsContainer"]//div[contains(@class,"panel-addon")]`);
    this.addonName = page.locator('//div[contains(@class, "card-body")]/label');
    this.addonPrice = page.locator('//div[@class="panel-price"]');
    this.orderButton = page.locator('//div[@class="panel-add"]');
    this.title = page.locator('//h1[contains(text(), "Review & Checkout")]');
  }

  /**
   * Selects the first available addon on the product page and returns its
   * name and price.
   *
   * @returns An object with the addon's name and price.
   */
  async selectAddon() {
    const addonElement = this.getAddonElementByIndex(0);

    const name = await addonElement.locator(this.addonName).textContent();
    const price = await addonElement.locator(this.addonPrice).textContent();
    await addonElement.locator(this.orderButton).click();

    return {
      price: clearPrice(price!),
      name: clearName(name!),
    };
  }

  /**
   * Returns the nth addon element on the page.
   *
   * @param index - Index of the addon element to retrieve.
   * @returns A Locator pointing to the nth addon element.
   */
  getAddonElementByIndex(index: number): Locator {
    return this.addonElement.nth(index);
  }

  /**
   * Waits for the appearance of a summary title in the product total section.
   *
   * @param title - The title text to wait for.
   * @returns A promise that resolves when the title becomes visible.
   */

  async waitForAppearanceSummaryTitle(title: string): Promise<void> {
    await this.page
      .locator(`//div[@id="producttotal"]//span[contains(text(), '${title}')]`)
      .waitFor({ state: "visible" });
  }

  /**
   * Returns the total amount of the product including any add-ons.
   * @returns The total amount in a numerical format.
   */
  async getSummaryAmount(): Promise<number> {
    return clearPrice((await this.summaryAmount.textContent())!);
  }
}
