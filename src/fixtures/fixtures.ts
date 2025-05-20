import { test as base, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { RequestDemoPage } from "../pages/RequestDemoPage";
import { BasePage } from "../pages/BasePage";

type MyFixtures = {
  app: {
    homePage: HomePage;
    requestDemoPage: RequestDemoPage;
    basePage: BasePage;
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
      requestDemoPage: new RequestDemoPage(page),
      basePage: new BasePage(page),
    };
    await use(app);
  },
});

export { expect };
