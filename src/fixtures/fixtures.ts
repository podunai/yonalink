import { test as base, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { ProductPage } from "../pages/ProductPage";
import { CheckoutPage } from "../pages/CheckoutPage";

type MyFixtures = {
  app: {
    homePage: HomePage;
    productPage: ProductPage;
    checkoutPage: CheckoutPage;
  };
};

/**
 * Extends the base test fixture with custom fixtures.
 *
 */
export const test = base.extend<MyFixtures>({
  app: async ({ page }, use) => {
    const app = {
      homePage: new HomePage(page),
      productPage: new ProductPage(page),
      checkoutPage: new CheckoutPage(page),
    };

    await use(app);
  },
});

export { expect };
