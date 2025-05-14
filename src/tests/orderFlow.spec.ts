import { test, expect } from "../fixtures/fixtures";
import { formatPriceUSD } from "../helper/formatHelper";
import { Addon, Product } from "../interface";

test.describe("cPanel Store Order Flow", () => {
  test("should order a product and proceed to checkout", async ({ app }) => {
    const ip = "2.2.2.2";
    const sections = [
      "Personal Information",
      "Billing Address",
      "Account Security",
      "Terms & Conditions",
      "Payment Details",
    ];
    let productInfo: Product;
    let addonInfo: Addon;
    let initialSummaryAmount: number;

    await test.step("Navigate to the cPanel store", async () => {
      await app.homePage.goto();
      await expect(app.homePage.switchAccount).toBeHidden();
    });

    await test.step("Order a product", async () => {
      productInfo = await app.homePage.chooseProductById();
    });

    await test.step("Enter IP Address", async () => {
      await app.productPage.ipAddressInput.fill(ip);
    });

    await test.step("Select Addon", async () => {
      initialSummaryAmount = await app.productPage.getSummaryAmount();
      addonInfo = await app.productPage.selectAddon();
    });

    await test.step("Continue to Checkout", async () => {
      await app.productPage.waitForAppearanceSummaryTitle(addonInfo.name);

      const updatedSummaryAmount = await app.productPage.getSummaryAmount();
      expect(updatedSummaryAmount).toBeGreaterThan(initialSummaryAmount);

      await app.productPage.continueToReviewButton.click();
      await expect(app.productPage.title).toBeVisible();
    });

    await test.step("Verify Product and Price", async () => {
      await expect(app.productPage.monthlyPrice.nth(0)).toContainText(
        formatPriceUSD(productInfo.price + addonInfo.price),
      );
      await expect(app.productPage.monthlyPrice.nth(1)).toContainText(addonInfo.price.toString());
      await expect(app.productPage.itemTitle.nth(0)).toContainText(productInfo.name);
      await expect(app.productPage.itemTitle.nth(1)).toContainText(addonInfo.name);
    });

    await test.step("Proceed to Checkout", async () => {
      await app.productPage.continueToCheckoutButton.click({ force: true });

      await expect(app.checkoutPage.title).toBeVisible();
    });

    await test.step("Verify Checkout Information", async () => {
      await expect(app.checkoutPage.getTableElementByText(productInfo.name)).toBeVisible();
      await expect(app.checkoutPage.getTableElementByText(addonInfo.name)).toBeVisible();
      await expect(app.checkoutPage.getTableElementByText(ip).nth(0)).toBeVisible();
      await expect(app.checkoutPage.getTableElementByText(ip).nth(1)).toBeVisible();
      await expect(
        app.checkoutPage.getTableElementByText(formatPriceUSD(productInfo.price + addonInfo.price)),
      ).toBeVisible();
      await expect(app.checkoutPage.getTableElementByText(addonInfo.price.toString())).toBeVisible();

      for (const section of sections) {
        await expect(app.checkoutPage.getSectionElement(section)).toBeVisible();
      }

      await expect(app.checkoutPage.completeOrderButton).toBeDisabled();
      await expect(app.checkoutPage.completeOrderButton).toBeVisible();
    });
  });
});
