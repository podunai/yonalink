import { Locator, Page } from "@playwright/test";

export class RequestDemoPage {
  readonly formTitle: Locator;
  readonly emailInput: Locator;
  readonly lastNameInput: Locator;
  readonly firstNameInput: Locator;
  readonly phoneNumberInput: Locator;
  readonly companyInput: Locator;
  readonly jobTitleInput: Locator;
  readonly messageInput: Locator;
  readonly countryInput: Locator;
  readonly contactForm: Locator;
  readonly privacyInput: Locator;
  readonly acceptCookiesButton: Locator;
  readonly formErrorText: Locator;

  constructor(protected page: Page) {
    this.contactForm = this.page.locator('//div[@id="contactForm"]');
    this.formTitle = this.page.locator('//h2[@id="heading"]');
    this.acceptCookiesButton = this.page.locator('//div[@class="cookies_pop-up"]//a[contains(text(),"Accept")]');
    this.emailInput = this.page.locator('//input[@type="email"]');
    this.privacyInput = this.page.locator(
      '//input[@name="Privacy"]/following-sibling::span[contains(@class, "form-checkbox-label")]',
    );
    this.lastNameInput = this.page.locator('//input[@name="Last-Name"]');
    this.firstNameInput = this.page.locator('//input[@name="First-Name"]');
    this.phoneNumberInput = this.page.locator('//input[@name="Phone-Number"]');
    this.companyInput = this.page.locator('//input[@name="Company"]');
    this.jobTitleInput = this.page.locator('//input[@name="Job-Title"]');
    this.messageInput = this.page.locator('//textarea[@name="Message"]');
    this.countryInput = this.page.locator('//input[@id="Country"]');
    this.formErrorText = this.page.locator('//div[@aria-label="Request a demo failure"]/div[@class="error-text"]');
  }

  /*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Selects a country from the dropdown list in the form based on the provided company name.
   *
   * @param company - The name of the company whose country needs to be selected in the form.
   */

  /*******  aa9bb174-9334-4eb6-b645-2ec005eb6c1b  *******/
  async chooseCountryInForm(company: string) {
    await this.countryInput.click();
    await this.page.locator(`//nav[@role="listbox"]//div[contains(text(), '${company}')]`).click();
  }

  /**
   * Fills out the form with the given information.
   *
   * @param {object} data - An object with the following properties:
   *   - `firstName`: The first name of the person requesting the demo.
   *   - `lastName`: The last name of the person requesting the demo.
   *   - `email`: The email of the person requesting the demo.
   *   - `country`: The country of the person requesting the demo.
   *   - `phoneNumber`: (optional) The phone number of the person requesting the demo.
   *   - `details`: (optional) Any additional details the person requesting the demo wants to share.
   *   - `jobTitle`: (optional) The job title of the person requesting the demo.
   *   - `company`: (optional) The company of the person requesting the demo.
   */
  async fillForm({
    firstName,
    lastName,
    email,
    country,
    phoneNumber,
    details,
    jobTitle,
    company,
  }: {
    firstName: string;
    lastName: string;
    email: string;
    country: string;
    phoneNumber?: string;
    details?: string;
    jobTitle?: string;
    company?: string;
  }) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.chooseCountryInForm(country);
    phoneNumber && (await this.phoneNumberInput.fill(phoneNumber));
    details && (await this.messageInput.fill(details));
    jobTitle && (await this.jobTitleInput.fill(jobTitle));
    company && (await this.companyInput.fill(company));
    await this.privacyInput.click({ force: true });
  }
}
