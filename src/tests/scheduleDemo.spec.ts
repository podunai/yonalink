import { test, expect } from "../fixtures/fixtures";
import { readClientsFromCSV } from "../utils/csvReader";
import { Client } from "../interface";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const csvPath = path.resolve(__dirname, "../../testdata/clients.csv");

const clients: Client[] = readClientsFromCSV(csvPath);

test.describe("Schedule Demo on Yonalink", () => {
  const errorText = "Oops! Something went wrong while submitting the form.";

  for (const client of clients) {
    test(`Schedule demo for ${client.firstName} ${client.lastName}`, async ({ app }) => {
      await app.homePage.goto();
      await app.basePage.getScheduleDemoButotnByParentEl(app.homePage.navigationHeader).click();

      await expect(app.requestDemoPage.formTitle).toHaveText("Request a demo");

      await app.requestDemoPage.acceptCookiesButton.click();
      await app.requestDemoPage.fillForm(client);
      await app.basePage.getScheduleDemoButotnByParentEl(app.requestDemoPage.contactForm).click();

      await expect(app.requestDemoPage.formErrorText).toHaveText(errorText);
    });
  }
});
