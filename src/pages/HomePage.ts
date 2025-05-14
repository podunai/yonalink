import { Locator, Page } from "@playwright/test";
import { clearPrice } from "../utils/clearString";
import { getRandomElement } from "../utils/randomiser";

export class HomePage {
  readonly page: Page;
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly orderButton: Locator;
  readonly switchAccount: Locator;
  readonly productElement: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productElement = page.locator('//div[contains(@class, "col")]/div[contains(@id, "product")]');
    this.productName = page.locator('//span[contains(@id, "name")]');
    this.productPrice = page.locator('//div[contains(@id, "price")]/span');
    this.orderButton = page.locator('//a[contains(@id, "order-button")]');
    this.switchAccount = page.locator('//a[@data-original-title="Switch Account"]');
  }

  /**
   * Navigates to the cPanel store home page.
   */
  async goto() {
    await this.page.goto("/store/cpanel-licenses");
  }

  /**
   * Choose a product by id.
   *
   * @param productId - The id of the product.
   * @returns An object with the product name and price.
   */
  async chooseProductById() {
    const productElement = await getRandomElement(this.productElement);
    const productName = await productElement.locator(this.productName).textContent();
    const productPrice = await productElement.locator(this.productPrice).textContent();
    // const orderName = await productElement.locator(`//*[@id="product${productId}-name"]`).textContent();
    // const orderPrice = await this.page
    //   .locator(`//*[@id="product${productId}-price"]//span[@class="price"]`)
    //   .textContent();

    await productElement.locator(this.orderButton).click();
    return {
      name: productName!,
      price: clearPrice(productPrice!),
    };
  }
}
